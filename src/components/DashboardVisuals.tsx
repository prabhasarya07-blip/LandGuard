import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';

const pieData = [
  { name: 'High Risk', value: 4, color: '#ef4444' },
  { name: 'Medium Risk', value: 7, color: '#f59e0b' },
  { name: 'Low Risk', value: 12, color: '#3b82f6' },
  { name: 'Clear', value: 35, color: '#10b981' }
];

const trendData = [
  { month: 'Jan', disputes: 2 },
  { month: 'Feb', disputes: 3 },
  { month: 'Mar', disputes: 2 },
  { month: 'Apr', disputes: 5 },
  { month: 'May', disputes: 4 },
  { month: 'Jun', disputes: 8 },
  { month: 'Jul', disputes: 12 }
];

const scanSources = [
  "Scanned Vijaya Karnataka Pg 3...",
  "Analyzing Karnataka High Court Orders...",
  "Cross-referencing BBMP records...",
  "Extracting entities from Deccan Herald...",
  "Matching Survey #44 against active disputes...",
  "Querying RERA Karnataka database..."
];

export function DashboardVisuals() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 mt-6">
      {/* Risk Distribution Chart */}
      <Card className="col-span-1 border-slate-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Portfolio Risk Distribution</CardTitle>
          <CardDescription>AI-Assessed risk levels across monitored properties</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-xs font-medium text-slate-600 mt-2">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></div>
                {d.name}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Area Chart for Dispute Trends */}
      <Card className="col-span-1 lg:col-span-1 border-slate-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Dispute Detection Trend</CardTitle>
          <CardDescription>Historical volume of property-related notices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDisputes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="disputes" stroke="#6366f1" fillOpacity={1} fill="url(#colorDisputes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Live AI Scanner Animation */}
      <Card className="col-span-1 border-slate-200 shadow-sm bg-slate-900 text-slate-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50 animate-pulse"></div>
        <CardHeader className="pb-2 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
              Live OCR Engine
            </CardTitle>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">ACTIVE</span>
          </div>
          <CardDescription className="text-slate-400">Monitoring 2,400+ regional sources</CardDescription>
        </CardHeader>
        <CardContent className="pt-4 h-[250px] relative">
          <div className="space-y-3 font-mono text-xs text-slate-400 h-full overflow-hidden flex flex-col justify-end pb-4 relative z-10">
            {scanSources.map((source, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: [0, 1, 0.4], x: 0 }}
                transition={{ 
                  duration: 4,
                  delay: i * 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  repeatDelay: scanSources.length * 2
                }}
                className="border-l-2 border-indigo-500 pl-2 py-1 bg-slate-800/50"
              >
                <span className="text-indigo-400 mr-2">[{new Date().toISOString().split('T')[1].substring(0,8)}]</span>
                {source}
              </motion.div>
            ))}
          </div>
          
          {/* Scanning Line Overlay */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-[2px] bg-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-20"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
