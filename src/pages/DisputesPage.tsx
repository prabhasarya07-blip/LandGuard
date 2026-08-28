import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { DEMO_DISPUTES, DISPUTE_TYPES, INDIAN_STATES } from '../mock/demoData';
import { FileText, Filter } from 'lucide-react';

export default function DisputesPage() {
  const [filterState, setFilterState] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterRisk, setFilterRisk] = useState('');

  const filtered = DEMO_DISPUTES.filter(d => {
    if (filterState && d.state !== filterState) return false;
    if (filterType && d.dispute_type !== filterType) return false;
    if (filterRisk && d.risk_level !== filterRisk) return false;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Detected Disputes</h2>
            <p className="text-muted-foreground">All land-dispute notices extracted from monitored sources.</p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Filter className="h-4 w-4 text-slate-400" />
              <select value={filterState} onChange={(e) => setFilterState(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm">
                <option value="">All States</option>
                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm">
                <option value="">All Types</option>
                {DISPUTE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <select value={filterRisk} onChange={(e) => setFilterRisk(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm">
                <option value="">All Risk Levels</option>
                {['HIGH', 'MEDIUM', 'LOW'].map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              {(filterState || filterType || filterRisk) && (
                <Button variant="ghost" size="sm" onClick={() => { setFilterState(''); setFilterType(''); setFilterRisk(''); }}>
                  Clear
                </Button>
              )}
              <span className="text-xs text-muted-foreground ml-auto">{filtered.length} result(s)</span>
            </div>
          </CardContent>
        </Card>

        {/* Dispute List */}
        <div className="grid gap-4">
          {filtered.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-slate-400">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No disputes match the current filters.</p>
              </CardContent>
            </Card>
          ) : (
            filtered.map(dispute => (
              <Card key={dispute.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{dispute.title}</span>
                        <span className="text-xs font-mono text-muted-foreground bg-slate-100 px-1.5 py-0.5 rounded">{dispute.cluster_id}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Survey No: {dispute.survey_number} • {dispute.village}, {dispute.district}, {dispute.state}
                      </div>
                      <p className="text-sm text-slate-600 mt-2 line-clamp-2">{dispute.extracted_text}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-muted-foreground">
                        <span>Type: {dispute.dispute_type}</span>
                        <span>Source: {dispute.source_name} ({dispute.source_language})</span>
                        <span>Page: {dispute.page_number}</span>
                        <span>Date: {dispute.date}</span>
                        {dispute.case_number && <span>Case: {dispute.case_number}</span>}
                      </div>
                      {/* Match Explanation */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {Object.entries(dispute.match_explanation).map(([key, val]) => (
                          <span key={key} className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
                            <span className="font-medium capitalize">{key.replace('_', ' ')}:</span> {val}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                        dispute.risk_level === 'HIGH' ? 'bg-destructive/10 text-destructive' :
                        dispute.risk_level === 'MEDIUM' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>{dispute.risk_level}</span>
                      <span className="text-xs font-medium text-slate-500">{dispute.verification_status}</span>
                      <span className="text-xs text-slate-400">Confidence: {dispute.match_confidence}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
