import { Card, CardContent } from './ui/card';
import { PartyIntelligenceData } from '../mock/demoData';
import { Network, AlertTriangle, Users, MapPin, Scale, Search, History } from 'lucide-react';

export function PartyIntelligenceCard({ data }: { data: PartyIntelligenceData }) {
  if (!data) return null;

  return (
    <Card className="border-2 border-slate-200 overflow-hidden">
      <div className={`px-6 py-4 flex items-center gap-3 border-b ${
        data.risk_classification === 'SERIAL_CLAIMANT' || data.risk_classification === 'HIGH_RISK_LITIGANT'
          ? 'bg-rose-50 border-rose-200'
          : 'bg-slate-50'
      }`}>
        <div className={`p-2 rounded-full ${data.risk_classification === 'SERIAL_CLAIMANT' ? 'bg-rose-100' : 'bg-slate-200'}`}>
          <Search className={`w-6 h-6 ${data.risk_classification === 'SERIAL_CLAIMANT' ? 'text-rose-600' : 'text-slate-600'}`} />
        </div>
        <div>
          <h3 className="font-bold text-lg text-slate-900">Background: {data.party_name}</h3>
          <div className="flex gap-2 mt-1">
            <span className={`text-xs font-bold px-2 py-0.5 rounded shadow-sm ${
              data.risk_classification === 'SERIAL_CLAIMANT' ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {data.risk_classification.replace('_', ' ')}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 bg-slate-200 text-slate-700 rounded shadow-sm">
              {data.total_disputes_involved} Known Disputes
            </span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-0">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
          
          {/* Network & Aliases */}
          <div className="p-6 space-y-6 bg-slate-50">
            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase mb-3">
                <Users className="w-4 h-4" /> Aliases & Entities
              </h4>
              <ul className="space-y-2">
                {data.known_aliases.map((alias, i) => (
                  <li key={i} className="text-sm font-medium text-slate-700 bg-white border px-3 py-1.5 rounded">{alias}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase mb-3">
                <Network className="w-4 h-4" /> Known Associates
              </h4>
              <ul className="space-y-2">
                {data.network_connections.map((conn, i) => (
                  <li key={i} className="text-sm font-medium text-slate-700 bg-white border px-3 py-1.5 rounded">{conn}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase mb-3">
                <MapPin className="w-4 h-4" /> Active Regions
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.active_jurisdictions.map((loc, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-slate-200 text-slate-700 rounded">{loc}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Dispute History Network */}
          <div className="p-6 md:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase">
                <History className="w-4 h-4" /> Dispute History Pattern
              </h4>
              <div className="flex items-center gap-1 text-xs text-rose-600 bg-rose-50 px-2 py-1 rounded font-bold">
                <AlertTriangle className="w-3 h-3" /> CARTEL BEHAVIOR DETECTED
              </div>
            </div>

            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {data.historical_claims.map((claim, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-200 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border bg-white shadow-sm transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold text-slate-900">Survey {claim.property_survey}</div>
                      <div className="text-xs text-slate-500 font-medium">{claim.date}</div>
                    </div>
                    <div className="text-sm text-slate-600 mb-2">{claim.village}</div>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t">
                      <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded text-slate-700">{claim.case_status}</span>
                      <span className="text-xs text-slate-500">{claim.outcome}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
