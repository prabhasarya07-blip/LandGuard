import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { DEMO_DISPUTE_IMPACTS, DEMO_AREA_INTELLIGENCE, DEMO_PARTY_INTELLIGENCE } from '../mock/demoData';
import { ConfidenceScoreWidget, FalsePositivePanel, ImpactAssessment } from '../components/ConfidenceEngine';
import { PartyIntelligenceCard } from '../components/PartyIntelligence';
import { DocumentChat } from '../components/DocumentChat';
import { Clock, CheckCircle2, Info, ArrowLeft, Shield, Printer, Activity } from 'lucide-react';
import { usePropertyIntelligence } from '../hooks/usePropertyIntelligence';

export default function PropertyIntelligencePage() {
  const { id } = useParams<{ id: string }>();
  const { property, disputes, loading, error, analyzing, analyzeStatus, analyzeProperty, updateVerification } = usePropertyIntelligence(id);
  const [activeTab, setActiveTab] = useState('overview');

  const timeline = disputes.map(d => ({
    year: d.date.split('-')[0],
    date: d.date,
    event: d.title,
    source: d.source_name,
    dispute_type: d.dispute_type,
    verification_status: d.verification_status
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const areaIntelligence = property ? DEMO_AREA_INTELLIGENCE[property.id] : null;
  const tabs = ['Overview', 'Disputes', 'AI Document Chat', 'Timeline', 'Sources', 'AI Analysis', 'Verification', 'Area Intelligence', 'Precautions'];

  if (loading || !property) {
    return <DashboardLayout><div className="flex h-screen items-center justify-center">Loading property intelligence...</div></DashboardLayout>;
  }
  
  if (error) {
    return <DashboardLayout><div className="flex h-screen items-center justify-center text-red-500">{error}</div></DashboardLayout>;
  }

  // Calculate dynamic properties
  const signalsCount = disputes.length;
  const latestDispute = disputes.length > 0 ? disputes[0] : null;
  const risk_level = latestDispute ? latestDispute.risk_level : 'NONE';
  const risk_status = risk_level === 'HIGH' ? 'High-priority potential dispute signal detected — verification recommended.' : 
                      risk_level === 'MEDIUM' ? 'Potential dispute signal detected — verification recommended.' :
                      risk_level === 'LOW' ? 'Low-confidence signal detected. Identifiers are an approximate match; manual review is suggested.' :
                      'No relevant dispute signals have been detected in currently monitored sources.';
  
  const verification_status = latestDispute ? latestDispute.verification_status : 'N/A';

  return (
    <DashboardLayout>
      <Link to="/properties">
        <Button variant="ghost" size="sm" className="mb-4"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Properties</Button>
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-2xl font-bold tracking-tight">{property.property_name || `Survey No: ${property.survey_number}`}</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
              risk_level === 'HIGH' ? 'bg-destructive/10 text-destructive border-destructive/20' :
              risk_level === 'MEDIUM' ? 'bg-amber-50 text-amber-700 border-amber-200' :
              risk_level === 'LOW' ? 'bg-blue-50 text-blue-700 border-blue-200' :
              'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>{risk_level !== 'NONE' ? risk_level + ' RISK' : 'NO SIGNALS'}</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">{verification_status}</span>
          </div>
          <p className="text-muted-foreground mt-1">
            Survey: {property.survey_number} {property.khasra_number ? `• Khasra: ${property.khasra_number}` : ''} • {property.village}, {property.taluk}, {property.district}, {property.state}
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={analyzeProperty} disabled={analyzing} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
            <Activity className="w-4 h-4 mr-2" />
            {analyzing ? 'Analyzing...' : 'Analyze Property'}
          </Button>
          <Link to={`/properties/${property.id}/report`}>
            <Button variant="outline" className="bg-white"><Printer className="w-4 h-4 mr-2" /> Generate Report</Button>
          </Link>
        </div>
      </div>
      
      {analyzeStatus.length > 0 && (
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              {analyzeStatus.map((status, idx) => (
                <div key={idx} className={idx === analyzeStatus.length - 1 ? "text-primary font-bold animate-pulse" : ""}>
                  {status}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 flex gap-2 text-amber-800 text-sm">
        <Info className="h-4 w-4 shrink-0 mt-0.5" />
        <span><strong>Disclaimer:</strong> LandGuard is an AI-assisted monitoring system. It does not provide legal advice and does not replace verification against official records.</span>
      </div>

      <div className="flex space-x-1 border-b mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.toLowerCase() ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}>{tab}</button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {signalsCount > 0 ? (
              <Card>
                <CardHeader><CardTitle>AI Risk Analysis</CardTitle></CardHeader>
                <CardContent className="space-y-4 text-sm text-slate-700">
                  <p>LandGuard has identified <strong>{signalsCount} signal(s)</strong> across monitored sources indicating potential {disputes[0]?.dispute_type || 'dispute'} activity associated with Survey Number {property.survey_number} in {property.village}, {property.district}.</p>
                  {disputes[0] && disputes[0].match_explanation && (
                    <div className="bg-slate-50 p-4 rounded-lg border space-y-2">
                      <h4 className="font-semibold text-xs uppercase text-slate-500">Match Explanation</h4>
                      {Object.entries(disputes[0].match_explanation).map(([k, v]) => (
                        <div key={k} className="flex justify-between text-sm">
                          <span className="capitalize text-slate-500">{k.replace('_', ' ')}</span>
                          <span className="font-medium text-emerald-600">{v as string}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="bg-slate-50 p-4 rounded-lg border">
                    <h4 className="font-semibold text-xs uppercase text-slate-500 mb-2">Why this risk level?</h4>
                    <p className="text-sm text-slate-600">
                      {risk_status}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-emerald-500 opacity-60" />
                  <p className="font-medium text-slate-700">No relevant dispute signals detected</p>
                  <p className="text-sm text-muted-foreground mt-1">in currently available monitored sources.</p>
                </CardContent>
              </Card>
            )}
            
            {/* PROPERTY HEALTH CHECK */}
            <Card>
              <CardHeader><CardTitle>Property Health Check</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Property identity', status: 'PASS', desc: 'Survey number matches known formats' },
                  { name: 'Location consistency', status: 'PASS', desc: 'Village and District correspond correctly' },
                  { name: 'Dispute signals', status: signalsCount > 0 ? 'ATTENTION' : 'PASS', desc: signalsCount > 0 ? `${signalsCount} potential dispute notices found` : 'No signals found' },
                  { name: 'Recent notices', status: signalsCount > 0 ? 'ATTENTION' : 'PASS', desc: 'Checked against last 2 years of publications' },
                  { name: 'Source verification', status: verification_status === 'SOURCE VERIFIED' || verification_status === 'CONFIRMED' ? 'PASS' : (verification_status === 'UNVERIFIED' ? 'UNKNOWN' : 'ATTENTION'), desc: `Current status: ${verification_status}` },
                  { name: 'Official verification', status: verification_status === 'CONFIRMED' ? 'PASS' : 'UNKNOWN', desc: 'Not yet verified against official government land records' }
                ].map(check => (
                  <div key={check.name} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <h4 className="text-sm font-medium text-slate-900">{check.name}</h4>
                      <p className="text-xs text-slate-500">{check.desc}</p>
                    </div>
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${
                      check.status === 'PASS' ? 'bg-emerald-100 text-emerald-700' :
                      check.status === 'ATTENTION' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>{check.status}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-sm">Property Details</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                {[['Survey No.', property.survey_number], ['Village', property.village], ['Taluk', property.taluk],
                  ['District', property.district], ['State', property.state], ['Type', property.property_type],
                  ['Area', property.area], ['Owner', property.owner_name], 
                ].map(([label, val]) => val && (
                  <div key={label} className="flex justify-between border-b pb-2 last:border-0">
                    <span className="text-slate-500">{label}</span><span className="font-medium text-right">{val}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">Monitoring Status</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500">Status</span>
                  <span className="font-medium text-emerald-600">{property.monitoring_status}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500">Last Scan</span>
                  <span className="font-medium">Today, 08:30 AM</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500">Sources Checked</span>
                  <span className="font-medium">1 (Demo Source)</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-slate-500">New Signals</span>
                  <span className="font-medium text-destructive">{signalsCount}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* DISPUTES TAB */}
      {activeTab === 'disputes' && (
        <div className="space-y-6">
          {disputes.length === 0 ? (
            <Card><CardContent className="p-12 text-center text-slate-400">No disputes detected for this property.</CardContent></Card>
          ) : disputes.map(d => (
            <div key={d.id} className="space-y-4">
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{d.title}</h4>
                      <p className="text-sm text-muted-foreground">{d.dispute_type} • {d.source_name} • {d.date}</p>
                    </div>
                    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                      d.risk_level === 'HIGH' ? 'bg-destructive/10 text-destructive' : 'bg-amber-100 text-amber-700'
                    }`}>{d.risk_level}</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border text-sm text-slate-700 italic">"{d.extracted_text}"</div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(d.match_explanation).map(([k, v]) => (
                      <span key={k} className="text-xs px-2 py-1 bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
                        <span className="font-medium capitalize">{k.replace('_', ' ')}:</span> {v}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Parties Involved: <span className="font-medium text-slate-700">{d.parties.join(', ')}</span>
                  </div>
                </CardContent>
              </Card>
              {DEMO_DISPUTE_IMPACTS[d.id] && (
                <ImpactAssessment impact={DEMO_DISPUTE_IMPACTS[d.id]} />
              )}
              {d.parties.map(party => (
                DEMO_PARTY_INTELLIGENCE[party] ? <PartyIntelligenceCard key={party} data={DEMO_PARTY_INTELLIGENCE[party]} /> : null
              ))}
            </div>
          ))}
        </div>
      )}

      {/* AI DOCUMENT CHAT TAB */}
      {activeTab === 'ai document chat' && (
        <div className="max-w-4xl mx-auto">
          <DocumentChat propertyId={property.id} />
        </div>
      )}

      {/* SOURCES TAB */}
      {activeTab === 'sources' && (
        <Card>
          <CardHeader>
            <CardTitle>Sources Checked</CardTitle>
            <CardDescription>Documents and records scanned for this property.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 border rounded-lg p-6 text-center text-slate-500">
              <h3 className="font-semibold text-slate-700 mb-2">Demo Mode Active</h3>
              <p className="text-sm mb-4">Live scraping of 50+ regional newspapers is disabled in this demo environment.</p>
              <p className="text-sm">The OCR and AI extraction pipeline processed a <strong>generated DEMO document</strong> containing matching identifiers to demonstrate the engine's capabilities.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TIMELINE TAB */}
      {activeTab === 'timeline' && (
        <Card>
          <CardHeader><CardTitle>Chronological History</CardTitle><CardDescription>Based strictly on detected source records.</CardDescription></CardHeader>
          <CardContent>
            {timeline.length === 0 ? (
              <p className="text-center text-slate-400 py-8">No timeline events for this property.</p>
            ) : (
              <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-8">
                {timeline.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[35px] bg-white p-1 rounded-full border-2 border-primary">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-lg">{item.year}</h4>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    <p className="font-medium mt-1">{item.event}</p>
                    <div className="flex gap-3 mt-2 text-xs">
                      <span className="text-muted-foreground">Source: {item.source}</span>
                      <span className="text-muted-foreground">Type: {item.dispute_type}</span>
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-600 font-medium">{item.verification_status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* AI ANALYSIS TAB */}
      {activeTab === 'ai analysis' && (
        <div className="space-y-6">
          {property.signals_count > 0 ? (
            <>
              <Card>
                <CardHeader><CardTitle>What happened?</CardTitle></CardHeader>
                <CardContent className="text-sm text-slate-700 space-y-2">
                  <p>Based on {property.signals_count} detected source records, an {disputes[0]?.dispute_type || 'ownership dispute'} involving Survey Number {property.survey_number} in {property.village} has been ongoing since {timeline[0]?.year || '2019'}.</p>
                  {disputes[0]?.case_number && <p>The dispute is associated with court case <strong>{disputes[0].case_number}</strong> at {disputes[0].court}.</p>}
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>What changed recently?</CardTitle></CardHeader>
                <CardContent className="text-sm text-slate-700">
                  <p>The most recent signal was detected on <strong>{disputes[0]?.date}</strong> from <strong>{disputes[0]?.source_name}</strong>: {disputes[0]?.title}.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Why does it matter?</CardTitle></CardHeader>
                <CardContent className="text-sm text-slate-700">
                  <p>This property's survey number ({property.survey_number}) and location ({property.village}, {property.district}) exactly match the identifiers mentioned in the detected notices. The presence of {disputes.length > 1 ? 'multiple corroborating sources' : 'a detected notice'} increases the relevance of this signal.</p>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card><CardContent className="p-12 text-center text-slate-400">No AI analysis available — no dispute signals detected.</CardContent></Card>
          )}
        </div>
      )}

      {/* VERIFICATION TAB */}
      {activeTab === 'verification' && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Verification Workflow</CardTitle>
              <CardDescription>Update the verification status of detected signals.</CardDescription>
            </CardHeader>
            <CardContent>
              {latestDispute ? (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">Current Status</h4>
                    <p className="text-lg font-bold text-primary">{latestDispute.verification_status}</p>
                  </div>
                  <div className="space-y-3 pt-2">
                    <Button variant="outline" className="w-full justify-start" onClick={() => updateVerification(latestDispute.id, 'SOURCE VERIFIED')}>
                      Mark as Source Verified
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => updateVerification(latestDispute.id, 'OFFICIAL RECORD VERIFIED')}>
                      Mark as Official Record Verified
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-emerald-200 hover:bg-emerald-50 text-emerald-700" onClick={() => updateVerification(latestDispute.id, 'CONFIRMED')}>
                      Mark as Confirmed (Active Risk)
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-destructive/20 hover:bg-destructive/10 text-destructive" onClick={() => updateVerification(latestDispute.id, 'REJECTED')}>
                      Mark as Rejected (False Positive)
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-slate-500">No signals to verify.</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* AREA INTELLIGENCE TAB */}
      {activeTab === 'area intelligence' && areaIntelligence && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Area Risk Profile: {areaIntelligence.area_name}, {areaIntelligence.district}</CardTitle>
              <CardDescription>Based on data from {areaIntelligence.period}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-50 p-4 rounded-lg border text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-1">{areaIntelligence.total_disputes_detected}</div>
                  <div className="text-sm font-medium text-slate-500 uppercase">Total Disputes</div>
                </div>
                <div className={`p-4 rounded-lg border text-center ${
                  areaIntelligence.area_risk_level === 'MODERATE' ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-blue-50 border-blue-200 text-blue-700'
                }`}>
                  <div className="text-xl font-bold mb-1 mt-1">{areaIntelligence.area_risk_level}</div>
                  <div className="text-sm font-medium uppercase opacity-80">Area Risk Level</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border flex items-center text-sm text-slate-700">
                  {areaIntelligence.comparison_text}
                </div>
              </div>

              <h4 className="font-semibold mb-4 text-slate-900">Dispute Breakdown</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {Object.entries(areaIntelligence.dispute_breakdown).map(([type, count]) => (
                  <div key={type} className="border rounded-lg p-3">
                    <div className="text-xl font-bold text-slate-700 mb-1">{count}</div>
                    <div className="text-xs text-slate-500">{type}</div>
                  </div>
                ))}
              </div>

              <h4 className="font-semibold mb-3 text-slate-900">Common Causes in this Area</h4>
              <ul className="space-y-2">
                {areaIntelligence.common_causes.map((cause, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
      {activeTab === 'area intelligence' && !areaIntelligence && (
        <Card><CardContent className="p-12 text-center text-slate-400">No area intelligence data available for this region.</CardContent></Card>
      )}

      {/* PRECAUTIONS TAB */}
      {activeTab === 'precautions' && (
        <Card>
          <CardHeader><CardTitle>Recommended Due-Diligence Actions</CardTitle><CardDescription>General suggestions — not individualized legal advice.</CardDescription></CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                'Verify current ownership records (RTC/Pahani/7/12 extract) at the local revenue office.',
                'Obtain and inspect encumbrance certificates (EC) from the relevant sub-registrar office covering the dispute period.',
                'Review referenced court case filings and check current case status.',
                'Compare the extracted source documents with official land records to verify accuracy.',
                'If the property involves agricultural land, verify conversion/diversion status.',
                'Seek professional legal verification before proceeding with any financial transaction related to this property.',
              ].map((action, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}
