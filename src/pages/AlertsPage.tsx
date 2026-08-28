import DashboardLayout from '../components/layout/DashboardLayout';
import { Card, CardContent } from '../components/ui/card';
import { Bell, Info } from 'lucide-react';
import { useAlerts } from '../hooks/useAlerts';
import { useProperties } from '../hooks/useProperties';

export default function AlertsPage() {
  const { alerts, loading, markRead } = useAlerts();
  const { properties } = useProperties();
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Alerts</h2>
          <p className="text-muted-foreground">Property-related dispute alerts from monitored sources.</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 text-amber-700 text-sm">
          <Info className="h-4 w-4 shrink-0 mt-0.5" />
          Alerts are generated when a dispute signal is matched to one of your monitored properties. LandGuard does not provide legal advice.
        </div>
        <div className="grid gap-4">
          {loading ? (
             <div className="text-center text-slate-500 py-8">Loading alerts...</div>
          ) : alerts.length === 0 ? (
             <div className="text-center text-slate-500 py-8">No alerts found.</div>
          ) : alerts.map(alert => {
            const prop = properties.find(p => p.id === alert.property_id);
            return (
              <Card key={alert.id} className={`${!alert.read ? 'border-l-4 border-l-primary cursor-pointer' : ''}`} onClick={() => !alert.read && markRead(alert.id)}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        alert.risk_level === 'HIGH' ? 'bg-destructive/10' :
                        alert.risk_level === 'MEDIUM' ? 'bg-amber-100' : 'bg-slate-100'
                      }`}>
                        <Bell className={`h-5 w-5 ${
                          alert.risk_level === 'HIGH' ? 'text-destructive' :
                          alert.risk_level === 'MEDIUM' ? 'text-amber-600' : 'text-slate-500'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{alert.dispute_type}</span>
                          {!alert.read && <span className="px-1.5 py-0.5 text-[10px] font-bold bg-primary text-primary-foreground rounded">NEW</span>}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {prop?.survey_number} — {prop?.village}, {prop?.district}, {prop?.state}
                        </div>
                        <p className="text-sm text-slate-600 mt-2">New {alert.dispute_type.toLowerCase()} notice detected matching property identifiers.</p>
                        <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                          <span>Source: {alert.source} (p.{alert.source_page})</span>
                          <span>{new Date(alert.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                        alert.risk_level === 'HIGH' ? 'bg-destructive/10 text-destructive' :
                        alert.risk_level === 'MEDIUM' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>{alert.risk_level} RISK</span>
                      <span className="text-xs font-medium text-slate-500">{alert.verification_status}</span>
                      <span className="text-xs font-medium text-slate-500">{alert.verification_status}</span>
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
