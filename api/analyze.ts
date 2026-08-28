import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import Tesseract from 'tesseract.js';
import { GoogleGenAI } from '@google/genai';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
const geminiApiKey = process.env.GEMINI_API_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);
let ai = geminiApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { imageUrl, propertyId } = req.body;
  
  if (!imageUrl || !propertyId) {
    return res.status(400).json({ error: 'Missing imageUrl or propertyId' });
  }
  
  if (!ai) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
  }

  try {
    // 1. OCR Extraction using Tesseract
    const { data: { text } } = await Tesseract.recognize(imageUrl, 'eng', { logger: m => console.log(m) });
    
    // 2. AI Classification and Extraction
    const prompt = `
    Analyze the following OCR text from a newspaper notice. 
    1. Determine if it is a LAND_DISPUTE, NOT_LAND_DISPUTE, or UNCERTAIN.
    2. Extract the following information. Return null/unknown if missing. Never invent information.
    
    Format as JSON exactly:
    {
      "classification": "LAND_DISPUTE",
      "extracted": {
        "title": "...",
        "survey_number": "...",
        "khasra_number": "...",
        "village": "...",
        "taluk": "...",
        "district": "...",
        "state": "...",
        "parties": ["..."],
        "dispute_type": "...",
        "court": "...",
        "case_number": "...",
        "dates": ["..."]
      }
    }
    
    OCR TEXT:
    ${text}
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        }
    });

    const aiResultStr = response.text || "{}";
    const aiData = JSON.parse(aiResultStr);
    
    // 3. Match against the Property
    const { data: property, error: propError } = await supabase
      .from('properties')
      .select('*')
      .eq('id', propertyId)
      .single();
      
    if (propError || !property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Matching Engine
    let risk_level = 'NONE';
    let risk_status = 'No relevant dispute signals detected';
    const match_explanation: Record<string, string> = {};
    const ext = aiData.extracted;
    
    if (aiData.classification === 'LAND_DISPUTE') {
      const matchSurvey = ext.survey_number && property.survey_number === ext.survey_number;
      const matchVillage = ext.village && property.village?.toLowerCase() === ext.village.toLowerCase();
      
      if (matchSurvey) {
        risk_level = 'HIGH';
        risk_status = 'High-priority potential dispute signal detected — verification recommended.';
        match_explanation['survey_number'] = 'Exact match';
        if (matchVillage) match_explanation['village'] = 'Exact match';
        match_explanation['source'] = 'Demo newspaper';
      } else if (matchVillage) {
        risk_level = 'LOW';
        risk_status = 'Low-confidence signal detected. Identifiers are an approximate match; manual review is suggested.';
        match_explanation['village'] = 'Exact match';
      }
    }

    if (risk_level !== 'NONE') {
      // Create Dispute
      const { data: dispute, error: disputeError } = await supabase
        .from('disputes')
        .insert([{
          property_id: property.id,
          title: ext.title || 'Dispute Notice Detected',
          source_name: 'Demo Source Monitoring',
          source_type: 'Newspaper',
          source_language: 'English',
          page_number: 1,
          date: new Date().toISOString().split('T')[0],
          extracted_text: text,
          dispute_type: ext.dispute_type || 'Unknown Dispute',
          parties: ext.parties || [],
          risk_level,
          match_explanation,
          verification_status: 'AI DETECTED',
          cluster_id: null
        }])
        .select()
        .single();
        
      if (disputeError) throw disputeError;

      // Update Property Risk
      await supabase
        .from('properties')
        .update({ monitoring_status: 'ACTIVE' })
        .eq('id', property.id);

      // Create Alert
      await supabase
        .from('alerts')
        .insert([{
          property_id: property.id,
          dispute_id: dispute.id,
          dispute_type: dispute.dispute_type,
          risk_level: risk_level,
          date: dispute.date,
          source: dispute.source_name,
          source_page: dispute.page_number,
          verification_status: 'AI DETECTED',
          read: false
        }]);

      return res.status(200).json({ 
        success: true, 
        message: 'Match found', 
        ocrText: text,
        aiData, 
        dispute 
      });
    }

    return res.status(200).json({ success: true, message: 'No relevant match', ocrText: text });

  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
