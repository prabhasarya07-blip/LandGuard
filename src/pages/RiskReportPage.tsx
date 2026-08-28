import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { DEMO_CONFIDENCE_SCORES, DEMO_FALSE_POSITIVE_INDICATORS, DEMO_DISPUTE_IMPACTS } from '../mock/demoData';
import { Printer, ArrowLeft, Shield, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { usePropertyIntelligence } from '../hooks/usePropertyIntelligence';

export default function RiskReportPage() {
  const { id } = useParams<{ id: string }>();
  const { property, disputes, loading } = usePropertyIntelligence(id);
  const confidenceScores = property ? DEMO_CONFIDENCE_SCORES[property.id] : null;
  const falsePositiveIndicators = property ? DEMO_FALSE_POSITIVE_INDICATORS[property.id] : null;

  if (loading || !property) return <div className="p-8 text-center">Loading Report...</div>;

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center print:hidden">
        <Link to={`/properties/${property.id}`}>
          <Button variant="ghost"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Property</Button>
        </Link>
        <Button onClick={() => window.print()}><Printer className="mr-2 h-4 w-4" /> Print / Save as PDF</Button>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none print:m-0 print:p-0">
        <div className="p-10 border-b-8 border-slate-900">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">LandGuard Risk Assessment Report</h1>
              <p className="text-slate-500 mt-2 font-medium">Generated on {new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <Shield className="h-12 w-12 text-slate-900 ml-auto mb-2" />
              <div className="text-xl font-bold">{property.risk_level} RISK</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 bg-slate-50 p-6 rounded-lg border">
            <div>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Subject Property</h3>
              <p className="font-semibold text-lg">{property.property_name || `Survey No: ${property.survey_number}`}</p>
              <p className="text-slate-700 mt-1">Survey: {property.survey_number} {property.khasra_number ? `| Khasra: ${property.khasra_number}` : ''}</p>
              <p className="text-slate-700">{property.village}, {property.taluk}</p>
              <p className="text-slate-700">{property.district}, {property.state}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Key Metrics</h3>
              <ul className="space-y-1 text-slate-700">
                <li><span className="font-semibold">Type:</span> {property.property_type}</li>
                <li><span className="font-semibold">Area:</span> {property.area}</li>
                <li><span className="font-semibold">Registered Owner:</span> {property.owner_name}</li>
                <li><span className="font-semibold">Signals Detected:</span> {property.signals_count}</li>
              </ul>
            </div>
          </div>
        </div>

        {confidenceScores && (
          <div className="p-10 border-b">
            <h2 className="text-2xl font-bold mb-6">1. AI Risk Confidence Score: <span className={
              confidenceScores.overall >= 80 ? 'text-destructive' : confidenceScores.overall >= 50 ? 'text-amber-500' : 'text-emerald-500'
            }>{confidenceScores.overall}/100</span></h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-4 bg-slate-50 border rounded-lg text-center">
                <div className="text-2xl font-bold text-slate-900 mb-1">{confidenceScores.identity_match}%</div>
                <div className="text-xs font-bold text-slate-500 uppercase">Identity Match</div>
              </div>
              <div className="p-4 bg-slate-50 border rounded-lg text-center">
                <div className="text-2xl font-bold text-slate-900 mb-1">{confidenceScores.source_trust}%</div>
                <div className="text-xs font-bold text-slate-500 uppercase">Source Trust</div>
              </div>
              <div className="p-4 bg-slate-50 border rounded-lg text-center">
                <div className="text-2xl font-bold text-slate-900 mb-1">{confidenceScores.corroboration}%</div>
                <div className="text-xs font-bold text-slate-500 uppercase">Corroboration</div>
              </div>
              <div className="p-4 bg-slate-50 border rounded-lg text-center">
                <div className="text-2xl font-bold text-slate-900 mb-1">{confidenceScores.severity}%</div>
                <div className="text-xs font-bold text-slate-500 uppercase">Severity</div>
              </div>
            </div>
          </div>
        )}

        {falsePositiveIndicators && falsePositiveIndicators.length > 0 && (
          <div className="p-10 border-b">
            <h2 className="text-2xl font-bold mb-6">2. False Positive Analysis</h2>
            <div className="space-y-4">
              {falsePositiveIndicators.map((ind, i) => (
                <div key={i} className="flex gap-4 p-4 border rounded-lg bg-slate-50">
                  <div className="mt-0.5">
                    {ind.status === 'match' ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> :
                     ind.status === 'mismatch' ? <AlertTriangle className="w-5 h-5 text-rose-600" /> :
                     <Info className="w-5 h-5 text-amber-600" />}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 mb-1">{ind.field}: <span className="font-normal text-slate-700">{ind.detail}</span></div>
                    <div className="text-sm text-slate-600">{ind.implication}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {disputes.length > 0 && (
          <div className="p-10 border-b">
            <h2 className="text-2xl font-bold mb-6">3. Detected Dispute Events</h2>
            <div className="space-y-8">
              {disputes.map(d => {
                const impact = DEMO_DISPUTE_IMPACTS[d.id];
                return (
                  <div key={d.id} className="border border-slate-200 rounded-lg overflow-hidden break-inside-avoid">
                    <div className="bg-slate-100 p-4 border-b flex justify-between items-center">
                      <h3 className="font-bold text-lg">{d.title}</h3>
                      <span className="text-xs font-bold px-2 py-1 bg-white rounded shadow-sm">{d.date}</span>
                    </div>
                    <div className="p-6">
                      <div className="mb-4">
                        <p className="text-sm text-slate-500 font-bold mb-1 uppercase">Extracted Text ({d.source_name})</p>
                        <p className="text-sm italic text-slate-700 p-4 bg-slate-50 border rounded">"{d.extracted_text}"</p>
                      </div>
                      <div className="flex justify-between items-center border-b pb-3 border-slate-200">
                        <div>
                          <h4 className="font-semibold text-slate-800">Source verification</h4>
                          <p className="text-sm text-slate-500">Current status: {disputes[0]?.verification_status || 'N/A'}</p>
                        </div>
                        <div className={`px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700`}>
                          ATTENTION
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-1">
                        <div>
                          <h4 className="font-semibold text-slate-800">Official verification</h4>
                          <p className="text-sm text-slate-500">Not yet verified against official government land records</p>
                        </div>
                        <div className={`px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600`}>
                          UNKNOWN
                        </div>
                      </div>
                      
                      {impact && (
                        <div className="mt-6 bg-rose-50 border border-rose-100 p-4 rounded-lg">
                          <h4 className="font-bold text-rose-900 mb-2">Impact Assessment ({impact.severity_tier})</h4>
                          <p className="text-sm text-rose-800 mb-4">{impact.what_this_means}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><strong className="text-slate-700">Financial Exposure:</strong> {impact.financial_exposure}</div>
                            <div><strong className="text-slate-700">Advice:</strong> {impact.transaction_advice}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="p-10 bg-slate-900 text-white text-center">
          <Shield className="h-8 w-8 mx-auto mb-4 opacity-50" />
          <p className="font-bold">LandGuard Property Intelligence Platform</p>
          <p className="text-sm text-slate-400 mt-2">This report does not constitute legal advice. Always verify with official records.</p>
        </div>
      </div>
    </div>
  );
}
