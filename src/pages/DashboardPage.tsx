import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import DashboardLayout from '../components/layout/DashboardLayout';
import { ArrowRight, Info } from 'lucide-react';
import { useProperties } from '../hooks/useProperties';
import { useAlerts } from '../hooks/useAlerts';
import { DashboardVisuals } from '../components/DashboardVisuals';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const { properties, loading: propertiesLoading } = useProperties();
  const { alerts, loading: alertsLoading } = useAlerts();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  if (loading || !user || propertiesLoading || alertsLoading) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading...</div>;

  const highRisk = alerts.filter(a => a.risk_level === 'HIGH').length;
  const unread = alerts.filter(a => !a.read).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">What is happening with my properties?</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: 'Monitored Properties', value: properties.length, color: 'text-slate-900' },
            { label: 'Active Alerts', value: unread, color: 'text-primary' },
            { label: 'High-Risk Matches', value: highRisk, color: 'text-destructive' },
            { label: 'Pending Verification', value: 0, color: 'text-amber-600' },
            { label: 'Disputes Detected', value: alerts.length, color: 'text-slate-900' },
          ].map(kpi => (
            <Card key={kpi.label} className="transition-all hover:-translate-y-1 hover:shadow-lg border-b-4 hover:border-b-primary duration-300">
              <CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-slate-500 uppercase tracking-wider">{kpi.label}</CardTitle></CardHeader>
              <CardContent><div className={`text-4xl font-bold ${kpi.color} tracking-tight`}>{kpi.value}</div></CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 text-amber-700 text-sm">
          <Info className="h-4 w-4 shrink-0 mt-0.5" />
          LandGuard is an AI-assisted monitoring system. Information may be incomplete or inaccurate. It does not provide legal advice.
        </div>

        <DashboardVisuals />

        {/* Recent Alerts */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Alerts</h3>
            <Link to="/alerts"><Button variant="ghost" size="sm">View All <ArrowRight className="ml-1 h-4 w-4" /></Button></Link>
          </div>
          <div className="grid gap-3">
            {alerts.slice(0, 3).map(alert => {
              const prop = properties.find(p => p.id === alert.property_id);
              return (
                <Card key={alert.id} className={`transition-all hover:shadow-md duration-200 cursor-pointer ${!alert.read ? 'border-l-4 border-l-primary bg-indigo-50/30' : ''}`}>
                  <CardContent className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-slate-800">{alert.dispute_type}</span>
                        {!alert.read && <span className="px-1.5 py-0.5 text-[10px] font-bold bg-primary text-primary-foreground rounded">NEW</span>}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {prop?.survey_number} — {prop?.village}, {prop?.district}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Source: {alert.source} • {new Date(alert.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                          alert.risk_level === 'HIGH' ? 'bg-destructive/10 text-destructive' :
                          alert.risk_level === 'MEDIUM' ? 'bg-amber-100 text-amber-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>{alert.risk_level}</span>
                        <div className="text-xs text-slate-500 mt-1">{alert.verification_status}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Property Risk Overview */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Property Risk Overview</h3>
            <Link to="/properties"><Button variant="ghost" size="sm">View All <ArrowRight className="ml-1 h-4 w-4" /></Button></Link>
          </div>
          <div className="grid gap-3">
            {properties.map(prop => (
              <Card key={prop.id} className="hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 border-l-4 border-transparent hover:border-l-primary group">
                <CardContent className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <div>
                    <Link to={`/properties/${prop.id}`} className="font-semibold text-sm hover:text-primary transition-colors">
                      {prop.property_name || `Survey: ${prop.survey_number}`}
                    </Link>
                    <div className="text-sm text-muted-foreground">
                      {prop.survey_number} • {prop.village}, {prop.district}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className={`px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700`}>{prop.monitoring_status}</div>
                      <div className="text-xs text-slate-500 mt-1">0 signal(s)</div>
                    </div>
                    <Link to={`/properties/${prop.id}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
