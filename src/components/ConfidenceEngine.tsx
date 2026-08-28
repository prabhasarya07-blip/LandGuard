import { Progress } from './ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ConfidenceScores, FalsePositiveIndicator, DisputeImpact } from '../mock/demoData';
import { Shield, FileText, CheckCircle2, AlertTriangle, AlertCircle, Info, Scale, Activity } from 'lucide-react';

export function ConfidenceScoreWidget({ scores }: { scores: ConfidenceScores }) {
  if (!scores || scores.overall === 0) return null;

  const getColor = (score: number, inverse = false) => {
    if (inverse) {
      if (score >= 80) return 'bg-destructive text-destructive';
      if (score >= 50) return 'bg-amber-500 text-amber-500';
      return 'bg-emerald-500 text-emerald-500';
    }
    if (score >= 80) return 'bg-emerald-500 text-emerald-500';
    if (score >= 50) return 'bg-amber-500 text-amber-500';
    return 'bg-destructive text-destructive';
  };

  const getTextColor = (score: number, inverse = false) => {
    if (inverse) {
      if (score >= 80) return 'text-destructive';
      if (score >= 50) return 'text-amber-500';
      return 'text-emerald-500';
    }
    if (score >= 80) return 'text-emerald-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-destructive';
  };

  return (
    <Card className="border-2 border-slate-200">
      <CardHeader className="pb-3 bg-slate-50 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Risk Confidence Breakdown</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Overall Score</span>
            <span className={`text-xl font-bold ${getTextColor(scores.overall, true)}`}>{scores.overall}/100</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium flex items-center gap-1.5"><Shield className="w-4 h-4 text-slate-400" /> Identity Match</span>
              <span className="font-bold">{scores.identity_match}%</span>
            </div>
            <Progress value={scores.identity_match} className="h-2" indicatorColor={getColor(scores.identity_match)} />
            <p className="text-xs text-slate-500 leading-tight">Is this actually your property?</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium flex items-center gap-1.5"><FileText className="w-4 h-4 text-slate-400" /> Source Trust</span>
              <span className="font-bold">{scores.source_trust}%</span>
            </div>
            <Progress value={scores.source_trust} className="h-2" indicatorColor={getColor(scores.source_trust)} />
            <p className="text-xs text-slate-500 leading-tight">How reliable is the publication?</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-slate-400" /> Corroboration</span>
              <span className="font-bold">{scores.corroboration}%</span>
            </div>
            <Progress value={scores.corroboration} className="h-2" indicatorColor={getColor(scores.corroboration)} />
            <p className="text-xs text-slate-500 leading-tight">Do multiple sources agree?</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium flex items-center gap-1.5"><AlertTriangle className="w-4 h-4 text-slate-400" /> Severity</span>
              <span className="font-bold">{scores.severity}%</span>
            </div>
            <Progress value={scores.severity} className="h-2" indicatorColor={getColor(scores.severity, true)} />
            <p className="text-xs text-slate-500 leading-tight">How bad is this if real?</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function FalsePositivePanel({ indicators }: { indicators: FalsePositiveIndicator[] }) {
  if (!indicators || indicators.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-indigo-500" />
          False Positive Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {indicators.map((ind, i) => (
          <div key={i} className="flex gap-3 text-sm">
            <div className="mt-0.5 shrink-0">
              {ind.status === 'match' ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> :
               ind.status === 'mismatch' ? <AlertTriangle className="w-5 h-5 text-rose-500" /> :
               ind.status === 'partial' ? <AlertCircle className="w-5 h-5 text-amber-500" /> :
               <Info className="w-5 h-5 text-slate-400" />}
            </div>
            <div>
              <div className="font-semibold text-slate-900">{ind.field}: <span className="font-normal text-slate-600">{ind.detail}</span></div>
              <div className="text-xs mt-1 px-2 py-1 bg-slate-50 rounded border border-slate-100 text-slate-600 italic">
                {ind.implication}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function ImpactAssessment({ impact }: { impact: DisputeImpact }) {
  if (!impact) return null;

  return (
    <Card className="border-rose-200 overflow-hidden">
      <div className="bg-rose-50 px-6 py-3 border-b border-rose-200 flex items-center gap-2">
        <Scale className="w-5 h-5 text-rose-600" />
        <h3 className="font-semibold text-rose-900">Dispute Impact Assessment</h3>
        <span className="ml-auto px-2.5 py-0.5 bg-rose-600 text-white text-xs font-bold rounded shadow-sm">{impact.severity_tier} SEVERITY</span>
      </div>
      <CardContent className="p-6 space-y-4">
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">What this means</h4>
          <p className="text-sm text-slate-800">{impact.what_this_means}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-3 rounded border">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> Financial Exposure</h4>
            <p className="text-sm font-medium text-slate-700">{impact.financial_exposure}</p>
          </div>
          <div className="bg-amber-50 p-3 rounded border border-amber-200">
            <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Transaction Advice</h4>
            <p className="text-sm font-medium text-amber-900">{impact.transaction_advice}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 pt-2 border-t">
          <div>
             <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Typical Resolution</h4>
             <p className="text-sm text-slate-700">{impact.typical_resolution}</p>
          </div>
          <div>
             <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Est. Litigation Cost</h4>
             <p className="text-sm text-slate-700">{impact.litigation_cost_range}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
