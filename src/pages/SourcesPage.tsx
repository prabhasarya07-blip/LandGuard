import DashboardLayout from '../components/layout/DashboardLayout';
import { Card, CardContent } from '../components/ui/card';
import { DEMO_NEWSPAPER_SOURCES } from '../mock/demoData';
import { Newspaper } from 'lucide-react';

export default function SourcesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Newspaper Sources</h2>
          <p className="text-muted-foreground">Monitored newspaper and public-notice sources across supported regions.</p>
        </div>

        <div className="grid gap-4">
          {DEMO_NEWSPAPER_SOURCES.map(src => (
            <Card key={src.id}>
              <CardContent className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Newspaper className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{src.name}</h3>
                    <div className="text-sm text-muted-foreground">{src.language} • {src.region} • {src.content_type}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Coverage</div>
                    <div className="font-medium">{src.coverage}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Last Processed</div>
                    <div className="font-medium">{src.last_processed}</div>
                  </div>
                  <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                    src.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                  }`}>{src.status}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
