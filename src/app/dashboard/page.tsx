
"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Clock, 
  Plus, 
  MoreVertical,
  Zap,
  BarChart4
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: 'Mon', score: 40 },
  { name: 'Tue', score: 65 },
  { name: 'Wed', score: 55 },
  { name: 'Thu', score: 85 },
  { name: 'Fri', score: 75 },
  { name: 'Sat', score: 90 },
  { name: 'Sun', score: 95 },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline mb-2">Welcome back, Alex</h1>
          <p className="text-muted-foreground">Monitor your content performance and AI workspace activity.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 neon-glow rounded-full px-6">
          <Plus className="w-4 h-4 mr-2" />
          Create New Blog
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          label="Total Blogs" 
          value="248" 
          change="+12% this month" 
          icon={<FileText className="w-5 h-5 text-primary" />} 
        />
        <StatsCard 
          label="Avg. SEO Score" 
          value="92/100" 
          change="+4% improvement" 
          icon={<BarChart4 className="w-5 h-5 text-accent" />} 
        />
        <StatsCard 
          label="AI Credits" 
          value="4,200" 
          change="850 used today" 
          icon={<Zap className="w-5 h-5 text-yellow-500" />} 
        />
        <StatsCard 
          label="Total Impressions" 
          value="12.4k" 
          change="+22% increase" 
          icon={<TrendingUp className="w-5 h-5 text-green-500" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <GlassCard className="lg:col-span-2 p-6 border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold">SEO Performance Trends</h3>
            <select className="bg-white/5 border border-white/10 rounded-md text-xs px-2 py-1 outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsla(255,100%,100%,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{backgroundColor: 'hsl(var(--card))', borderColor: 'hsla(255,100%,100%,0.1)', borderRadius: '8px'}}
                  itemStyle={{color: 'hsl(var(--primary))'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Recent Activity */}
        <GlassCard className="p-6 border-white/5">
          <h3 className="text-lg font-bold mb-6">Recent Projects</h3>
          <div className="space-y-6">
            <ActivityItem 
              title="Future of Web3" 
              time="2h ago" 
              score={98} 
              status="Published" 
            />
            <ActivityItem 
              title="AI in Healthcare" 
              time="5h ago" 
              score={84} 
              status="Draft" 
            />
            <ActivityItem 
              title="Sustainable Tech" 
              time="1d ago" 
              score={91} 
              status="Analyzing" 
            />
            <ActivityItem 
              title="Quantum Computing" 
              time="2d ago" 
              score={76} 
              status="In Progress" 
            />
          </div>
          <Button variant="ghost" className="w-full mt-6 text-sm text-primary hover:text-primary hover:bg-primary/5">
            View All Activity
          </Button>
        </GlassCard>
      </div>
    </div>
  );
}

function StatsCard({ label, value, change, icon }: { label: string, value: string, change: string, icon: React.ReactNode }) {
  return (
    <GlassCard className="p-6 border-white/5 group hover:border-primary/20 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <MoreVertical className="w-4 h-4 text-muted-foreground cursor-pointer" />
      </div>
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <h2 className="text-2xl font-bold mb-1 tracking-tight">{value}</h2>
      <p className="text-[10px] text-green-500 font-medium">{change}</p>
    </GlassCard>
  );
}

function ActivityItem({ title, time, score, status }: { title: string, time: string, score: number, status: string }) {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center font-bold text-xs text-primary">
          {score}
        </div>
        <div>
          <p className="text-sm font-bold group-hover:text-primary transition-colors">{title}</p>
          <div className="flex items-center gap-2 mt-1">
            <Clock className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">{time}</span>
            <span className="text-[10px] text-muted-foreground">•</span>
            <span className={cn(
              "text-[10px] font-medium",
              status === 'Published' ? "text-green-500" : "text-primary"
            )}>{status}</span>
          </div>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
    </div>
  );
}
