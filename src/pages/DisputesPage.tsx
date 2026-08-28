import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Shield, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DISPUTE_TYPES } from '../mock/demoData';
import { useDisputes } from '../hooks/useDisputes';
import { useProperties } from '../hooks/useProperties';

export default function DisputesPage() {
  const [filterType, setFilterType] = useState('');
  const [filterRisk, setFilterRisk] = useState('');
  
  const { disputes, loading } = useDisputes();
  const { properties } = useProperties();

  const filtered = disputes.filter(d => {
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
              {(filterType || filterRisk) && (
                <Button variant="ghost" size="sm" onClick={() => { setFilterType(''); setFilterRisk(''); }}>
                  Clear
                </Button>
              )}
              <span className="text-xs text-muted-foreground ml-auto">{filtered.length} result(s)</span>
            </div>
          </CardContent>
        </Card>

        {/* Dispute List */}
        <div className="grid gap-4">
          {loading ? (
             <div className="text-center py-8 text-slate-500">Loading disputes...</div>
          ) : filtered.length === 0 ? (
             <div className="text-center py-8 text-slate-500">No disputes found.</div>
          ) : filtered.map(dispute => {
            const prop = properties.find(p => p.id === dispute.property_id);
            return (
              <Card key={dispute.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-4 flex-1">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Shield className={`h-5 w-5 ${dispute.risk_level === 'HIGH' ? 'text-destructive' : 'text-amber-500'}`} />
                          <h3 className="font-bold text-lg">{dispute.title}</h3>
                        </div>
                        <p className="text-sm text-slate-600">Property: {prop?.survey_number} • {prop?.village}, {prop?.district}</p>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div><span className="text-slate-500 block text-xs">Date Detected</span><span className="font-medium">{new Date(dispute.date).toLocaleDateString()}</span></div>
                        <div><span className="text-slate-500 block text-xs">Type</span><span className="font-medium">{dispute.dispute_type}</span></div>
                        <div><span className="text-slate-500 block text-xs">Source</span><span className="font-medium">{dispute.source_name}</span></div>
                        <div><span className="text-slate-500 block text-xs">Verification</span><span className="font-medium text-primary">{dispute.verification_status}</span></div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
                      <div className="text-right mb-2 hidden md:block">
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          dispute.risk_level === 'HIGH' ? 'bg-destructive/10 text-destructive' : 'bg-amber-100 text-amber-700'
                        }`}>{dispute.risk_level} RISK</div>
                      </div>
                      <Link to={`/properties/${dispute.property_id}`}><Button variant="outline" className="w-full">View Details</Button></Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
