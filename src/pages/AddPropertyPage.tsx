import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { INDIAN_STATES, DISTRICTS } from '../mock/demoData';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function AddPropertyPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    state: '', district: '', taluk: '', village: '', survey_number: '',
    khasra_number: '', property_name: '', owner_name: '', area: '',
    property_type: '', notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (field === 'state') setForm(prev => ({ ...prev, state: value, district: '', taluk: '', village: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => navigate('/properties'), 1500);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" className="mb-4" onClick={() => navigate('/properties')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Properties
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Add Property for Monitoring</CardTitle>
            <CardDescription>Register a property to start monitoring for land-dispute signals.</CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="text-center py-8">
                <div className="text-emerald-600 text-lg font-semibold mb-2">✓ Property Registered</div>
                <p className="text-sm text-muted-foreground">Monitoring has been activated. Redirecting...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm text-slate-700 border-b pb-2">Required Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">State *</label>
                      <select value={form.state} onChange={(e) => handleChange('state', e.target.value)} required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="">Select state</option>
                        {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">District *</label>
                      <select value={form.district} onChange={(e) => handleChange('district', e.target.value)} required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="">Select district</option>
                        {(DISTRICTS[form.state] || []).map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Taluk / Tehsil *</label>
                      <Input value={form.taluk} onChange={(e) => handleChange('taluk', e.target.value)} required placeholder="e.g. Bengaluru East" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Village *</label>
                      <Input value={form.village} onChange={(e) => handleChange('village', e.target.value)} required placeholder="e.g. Whitefield" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Survey Number / Khasra Number *</label>
                    <Input value={form.survey_number} onChange={(e) => handleChange('survey_number', e.target.value)} required placeholder="e.g. 145/2" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-sm text-slate-700 border-b pb-2">Optional Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Property Name</label>
                      <Input value={form.property_name} onChange={(e) => handleChange('property_name', e.target.value)} placeholder="e.g. Whitefield Plot" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Owner Name</label>
                      <Input value={form.owner_name} onChange={(e) => handleChange('owner_name', e.target.value)} placeholder="e.g. Rajesh Kumar" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Area</label>
                      <Input value={form.area} onChange={(e) => handleChange('area', e.target.value)} placeholder="e.g. 2400 sq ft" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Property Type</label>
                      <select value={form.property_type} onChange={(e) => handleChange('property_type', e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="">Select type</option>
                        {['Residential', 'Commercial', 'Agricultural', 'Industrial', 'Mixed Use'].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Notes</label>
                    <textarea value={form.notes} onChange={(e) => handleChange('notes', e.target.value)}
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
                      placeholder="Any additional details..." />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? 'Registering Property...' : 'Register & Start Monitoring'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
