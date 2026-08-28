import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Search, Bell, CheckCircle2, MapPin, Eye, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const steps = [
    { icon: MapPin, title: 'Register Property', desc: 'Add your property with survey number and location details.' },
    { icon: Search, title: 'Continuous Monitoring', desc: 'LandGuard scans newspaper notices and public records daily.' },
    { icon: Eye, title: 'AI Detection', desc: 'OCR extracts notices. AI classifies and matches disputes to your property.' },
    { icon: Bell, title: 'Instant Alerts', desc: 'Receive dashboard alerts with source evidence and risk analysis.' },
    { icon: CheckCircle2, title: 'Verification', desc: 'Analysts verify findings. View full audit trail and dispute history.' },
    { icon: Shield, title: 'Due Diligence', desc: 'Get recommended precautionary actions before any transaction.' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* Header */}
      <header className="px-8 py-4 flex justify-between items-center border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <h1 className="text-2xl font-bold tracking-tight">LandGuard</h1>
        <div className="flex items-center gap-3">
          <Link to="/login"><Button variant="ghost">Log In</Button></Link>
          <Link to="/login"><Button>Monitor a Property</Button></Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-24 px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-blue-200">
            AI-Powered Property Intelligence Platform
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Know the dispute history<br />behind the property.
          </h2>
          <p className="mt-6 text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            LandGuard automatically monitors newspaper notices and other available public information to identify potential land-dispute signals associated with monitored properties.
          </p>
          <div className="flex justify-center gap-4 mt-10">
            <Link to="/login"><Button size="lg" className="text-lg px-8 bg-white text-slate-900 hover:bg-slate-100">Monitor a Property</Button></Link>
            <a href="#how-it-works"><Button size="lg" variant="outline" className="text-lg px-8 bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white">See How It Works</Button></a>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">The Problem</h3>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Land disputes in India are fragmented across regional newspapers, court notices, and government records in multiple languages. Buyers, investors, and property owners have no reliable way to continuously monitor potential risks before or after a transaction. By the time a dispute surfaces, it is often too late.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">How LandGuard Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="absolute top-6 right-6 text-xs font-bold text-slate-300">0{i + 1}</div>
                  <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-500">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Key Capabilities</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['Document Ingestion', 'Process and structure land-dispute notices from regional sources into unified data.'],
              ['Intelligence & Matching', 'Uses advanced pattern recognition to classify notices and extract structured data.'],
              ['Dispute Clustering & History', 'Groups related newspaper reports into unified dispute clusters with full chronological timelines.'],
              ['Source Provenance & Evidence', 'Every finding links back to the original document, page, and extracted text — full audit trail.'],
              ['Explainable Risk Signals', 'Risk levels with transparent explanations — no opaque scores. See exactly why a property was flagged.'],
              ['Verification Workflow', 'Multi-step verification ladder from AI DETECTED to CONFIRMED, with analyst review and audit logs.'],
            ].map(([title, desc], i) => (
              <div key={i} className="flex gap-4 p-5 rounded-lg border bg-white">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">{title}</h4>
                  <p className="text-sm text-slate-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Regions */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">Supported Regions</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { region: 'Karnataka', languages: 'English, Kannada', sources: '3 newspapers' },
              { region: 'Gujarat', languages: 'English, Gujarati', sources: '2 newspapers' },
              { region: 'New Delhi', languages: 'English, Hindi', sources: '3 newspapers' },
            ].map((r, i) => (
              <div key={i} className="p-6 rounded-xl border bg-slate-50 text-center">
                <h4 className="text-xl font-bold mb-2">{r.region}</h4>
                <p className="text-sm text-slate-500">{r.languages}</p>
                <p className="text-xs text-slate-400 mt-1">{r.sources}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 px-8 bg-amber-50 border-y border-amber-200">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">Important Disclaimer</h3>
          <p className="text-sm text-amber-700 leading-relaxed">
            LandGuard is an AI-assisted property due-diligence and early-warning system. Information identified from public notices and other sources may be incomplete or inaccurate. LandGuard does not provide legal advice and does not replace verification against official government, land, registration, or court records.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold mb-4">Start monitoring your property today</h3>
          <p className="text-slate-400 mb-8">Register your property and let LandGuard watch for potential dispute signals.</p>
          <Link to="/login"><Button size="lg" className="text-lg px-10 bg-white text-slate-900 hover:bg-slate-100">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-500">&copy; 2026 LandGuard. All rights reserved.</div>
          <div className="flex gap-6 text-sm text-slate-500">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
