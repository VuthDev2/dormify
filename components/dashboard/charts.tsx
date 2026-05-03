'use client';

import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell,
  PieChart, 
  Pie,
  RadialBarChart,
  RadialBar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  CartesianGrid,
  Label
} from 'recharts';

// --- Shared Constants & Colors ---
const PRIMARY = 'var(--primary)';
const TEXT_MUTED = 'var(--muted-foreground)';
const BORDER = 'var(--border)';

// --- Sparkline (Mini Chart for Stat Cards) ---
export function Sparkline({ data, color = PRIMARY }: { data: number[], color?: string }) {
  const chartData = data.map((v, i) => ({ val: v, id: i }));
  
  return (
    <div className="h-full w-full opacity-30">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <Area 
            type="monotone" 
            dataKey="val" 
            stroke={color} 
            strokeWidth={1.5} 
            fill={color} 
            fillOpacity={0.15} 
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// --- High-End Area Chart for Premium Performance ---
export function PerformanceChart({ data }: { data: any[] }) {
  return (
    <div className="h-[300px] w-100%">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={PRIMARY} stopOpacity={0.25}/>
              <stop offset="95%" stopColor={PRIMARY} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--muted-foreground)" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="var(--muted-foreground)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: TEXT_MUTED, fontSize: 9, fontWeight: 700 }}
            dy={10} 
          />
          <YAxis 
            hide 
            domain={['dataMin - 10', 'dataMax + 10']} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--card)', 
              borderColor: BORDER, 
              borderRadius: '1rem',
              fontSize: '10px',
              fontWeight: 800,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}
            itemStyle={{ color: PRIMARY }}
          />
          <Area 
            type="monotone" 
            dataKey="target" 
            stroke="var(--muted-foreground)" 
            strokeWidth={1} 
            strokeDasharray="4 4"
            fillOpacity={1} 
            fill="url(#colorTarget)" 
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={PRIMARY} 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorValue)" 
            animationDuration={2000}
            activeDot={{ r: 6, strokeWidth: 0, fill: PRIMARY }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// --- Pro Occupancy Bar Chart ---
export function EfficiencyRadarChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
        <PolarAngleAxis 
          dataKey="subject" 
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 700 }}
        />
        <PolarRadiusAxis angle={30} domain={[0, 100]} hide />
        <Radar
          name="Performance"
          dataKey="A"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.1}
          animationDuration={1500}
        />
        <Radar
          name="Baseline"
          dataKey="B"
          stroke="hsl(var(--muted-foreground))"
          fill="hsl(var(--muted-foreground))"
          fillOpacity={0.05}
          animationDuration={1500}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function DualBarComparisonChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 700 }}
          dy={10}
        />
        <YAxis hide />
        <Tooltip 
          cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                 <div className="bg-card border border-border shadow-xl rounded-xl p-3 space-y-1.5">
                    <p className="text-[10px] font-black uppercase text-muted-foreground">{payload[0].payload.name}</p>
                    <div className="space-y-1">
                       <div className="flex items-center justify-between gap-8">
                          <span className="text-[10px] font-bold text-primary uppercase">Current</span>
                          <span className="text-xs font-black text-foreground">{payload[0].value}%</span>
                       </div>
                       <div className="flex items-center justify-between gap-8">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">Target</span>
                          <span className="text-xs font-black text-foreground">{payload[1].value}%</span>
                       </div>
                    </div>
                 </div>
              );
            }
            return null;
          }}
        />
        <Bar 
          dataKey="current" 
          fill="hsl(var(--primary))" 
          radius={[4, 4, 0, 0]} 
          barSize={24}
        />
        <Bar 
          dataKey="target" 
          fill="hsl(var(--muted-foreground))" 
          fillOpacity={0.2}
          radius={[4, 4, 0, 0]} 
          barSize={24}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function RevenueVsBudgetChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15}/>
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 600 }}
          dy={10}
        />
        <YAxis 
          hide 
          domain={['auto', 'auto']}
        />
        <Tooltip 
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-card border border-border shadow-xl rounded-xl p-3 space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{payload[0].payload.name}</p>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-8">
                       <span className="text-[10px] font-bold text-primary uppercase">Actual</span>
                       <span className="text-xs font-black text-foreground">${payload[0].value?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                       <span className="text-[10px] font-bold text-muted-foreground uppercase">Budget</span>
                       <span className="text-xs font-black text-foreground">${payload[1].value?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Area
          type="monotone"
          dataKey="actual"
          stroke="hsl(var(--primary))"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorActual)"
          animationDuration={1500}
        />
        <Area
          type="monotone"
          dataKey="budget"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth={2}
          strokeDasharray="5 5"
          fill="transparent"
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function OccupancyBarChart({ data }: { data: any[] }) {
  return (
    <div className="h-[240px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: TEXT_MUTED, fontSize: 9, fontWeight: 700 }}
            dy={10} 
          />
          <Tooltip 
             cursor={{ fill: 'var(--primary)', opacity: 0.05 }}
             contentStyle={{ 
              backgroundColor: 'var(--card)', 
              borderColor: BORDER, 
              borderRadius: '0.75rem',
              fontSize: '10px',
              boxShadow: 'shadow-xl'
            }}
          />
          <Bar 
            dataKey="occupancy" 
            fill={PRIMARY} 
            radius={[4, 4, 0, 0]} 
            barSize={24}
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fillOpacity={entry.occupancy > 90 ? 1 : 0.6} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// --- Asset Allocation Pie Chart ---
export function AllocationPieChart({ data }: { data: any[] }) {
  return (
    <div className="h-[180px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={50}
            outerRadius={70}
            paddingAngle={5}
            dataKey="value"
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={PRIMARY} fillOpacity={1 - (index * 0.25)} />
            ))}
          </Pie>
          <Tooltip 
             contentStyle={{ 
              backgroundColor: 'var(--card)', 
              borderRadius: '0.5rem',
              fontSize: '9px',
              border: `1px solid ${BORDER}`
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// --- Efficiency Radar for Pro Health ---
export function HealthRadar({ data }: { data: any[] }) {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke={BORDER} />
          <PolarAngleAxis dataKey="subject" tick={{ fill: TEXT_MUTED, fontSize: 8, fontWeight: 700 }} />
          <Radar
            name="Health"
            dataKey="A"
            stroke={PRIMARY}
            fill={PRIMARY}
            fillOpacity={0.2}
            animationDuration={2000}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
