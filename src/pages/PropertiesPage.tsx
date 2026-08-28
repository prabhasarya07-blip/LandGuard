import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useProperties } from '../hooks/useProperties';
import { Plus, Trash2 } from 'lucide-react';

export default function PropertiesPage() {
  const { properties, loading, deleteProperty } = useProperties();

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Properties</h2>
          <p className="text-muted-foreground">Manage your monitored properties.</p>
        </div>
        <Link to="/properties/add">
          <Button><Plus className="mr-2 h-4 w-4" /> Add Property</Button>
        </Link>
      </div>

      {loading ? (
        <Card><CardContent className="p-12 text-center text-slate-400">Loading properties...</CardContent></Card>
      ) : properties.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center text-slate-400">
            <p className="text-lg mb-2">No properties monitored yet.</p>
            <p className="text-sm">Add a property to start monitoring land-dispute signals.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {properties.map(property => (
            <Card key={property.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border-l-4 border-transparent hover:border-l-primary cursor-pointer group">
              <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {property.property_name || `Survey No: ${property.survey_number}`}
                  </h3>
                  <p className="text-sm text-slate-500">
                    Survey: {property.survey_number} • {property.village}, {property.taluk}, {property.district}, {property.state}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">Added {new Date(property.created_at).toLocaleDateString('en-IN')}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700`}>
                      {property.monitoring_status || 'ACTIVE'}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link to={`/properties/${property.id}`}>
                      <Button variant="outline" size="sm" className="w-full">View Intelligence</Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => deleteProperty(property.id)}>
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
