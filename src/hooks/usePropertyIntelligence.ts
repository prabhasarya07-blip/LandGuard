import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface Dispute {
  id: string;
  property_id: string;
  title: string;
  source_name: string;
  source_type: string;
  source_language: string;
  page_number: number;
  date: string;
  extracted_text: string;
  dispute_type: string;
  parties: string[];
  court?: string;
  case_number?: string;
  risk_level: string;
  match_explanation: Record<string, string>;
  verification_status: string;
  cluster_id: string | null;
}

export interface VerificationEvent {
  id: string;
  dispute_id: string;
  previous_status: string;
  new_status: string;
  reason: string;
  timestamp: string;
  actor: string;
}

export function usePropertyIntelligence(propertyId: string | undefined) {
  const { user } = useAuth();
  const [property, setProperty] = useState<any>(null);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [verifications, setVerifications] = useState<VerificationEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);

  const fetchIntelligence = useCallback(async () => {
    if (!propertyId) return;
    try {
      setLoading(true);
      
      const { data: propData, error: propError } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .single();
      if (propError) throw propError;
      setProperty(propData);

      const { data: disputesData, error: dispError } = await supabase
        .from('disputes')
        .select('*')
        .eq('property_id', propertyId)
        .order('date', { ascending: false });
      if (dispError) throw dispError;
      setDisputes(disputesData || []);
      
      // Fetch verifications (placeholder since we don't have a verifications table setup yet)
      setVerifications([]);

    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [propertyId]);

  useEffect(() => {
    fetchIntelligence();
  }, [fetchIntelligence]);

  const loadDemoIntelligence = async () => {
    if (!property || !user) return;
    try {
      setAnalysisLoading(true);
      
      const { data: dispute, error: disputeError } = await supabase
        .from('disputes')
        .insert([{
          property_id: property.id,
          title: 'Dispute Notice Detected',
          source_name: 'Demo Newspaper',
          source_type: 'Newspaper',
          source_language: 'English',
          page_number: 1,
          date: new Date().toISOString().split('T')[0],
          extracted_text: `PUBLIC NOTICE: This is to inform the general public that the property bearing Survey Number ${property.survey_number} situated at ${property.village} is subject to an active dispute between the parties...`,
          dispute_type: 'Ownership Dispute',
          parties: ['John Doe', 'Jane Doe'],
          risk_level: 'HIGH',
          match_explanation: { survey_number: 'Exact match', village: 'Exact match', source: 'Demo newspaper' },
          verification_status: 'AI DETECTED',
          cluster_id: null
        }])
        .select()
        .single();
        
      if (disputeError) throw disputeError;

      await supabase.from('properties').update({ monitoring_status: 'ACTIVE' }).eq('id', property.id);

      await supabase.from('alerts').insert([{
        user_id: user.id,
        property_id: property.id,
        dispute_id: dispute.id,
        dispute_type: dispute.dispute_type,
        risk_level: 'HIGH',
        date: dispute.date,
        source: dispute.source_name,
        source_page: dispute.page_number,
        verification_status: 'AI DETECTED',
        read: false
      }]);

      await fetchIntelligence();
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setAnalysisLoading(false);
    }
  };

  const updateVerification = async (disputeId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('disputes')
        .update({ verification_status: newStatus })
        .eq('id', disputeId);
      if (error) throw error;
      await fetchIntelligence();
    } catch (error: any) {
      alert("Failed to update verification status: " + error.message);
    }
  };

  return { property, disputes, verifications, loading, error, analysisLoading, loadDemoIntelligence, updateVerification, refresh: fetchIntelligence };
}
