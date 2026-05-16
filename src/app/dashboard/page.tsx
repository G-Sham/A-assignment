
"use client";

import { useMemo } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  FileText, 
  Clock, 
  Plus, 
  Zap, 
  BarChart4, 
  ChevronRight,
  Loader2,
  MoreVertical
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
import { useUser, useFirestore, useCollection } from "@/firebase";
import { collection, query, where, orderBy } from "firebase/firestore";
import { cn } from "@/lib/utils";
import Link from "next/link";

const chartData = [
  { name: 'Mon', score: 40 },
  { name: 'Tue', score: 65 },
  { name: 'Wed', score: 55 },
  { name: 'Thu', score: 85 },
  { name: 'Fri', score: 75 },
  { name: 'Sat', score: 90 },
  { name: 'Sun', score: 95 },
];

export default function DashboardOverview() {
  const { user } = useUser();
  const db = useFirestore();

  const blogPostsQuery = useMemo(() => {
    if (!db || !user) return null;
    return query(
      collection(db, "blogPosts"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
  }, [db, user]);

  const { data: history, loading } = useCollection(blogPostsQuery);

  const stats = useMemo(() => {
    if (!history) return { count: 0, avgScore: 0 };
    const count = history.length;
    const totalScore = history.reduce((acc, curr: any) => acc + (curr.seoScore || 0), 0);
    const avgScore = count > 0 ? Math.round(totalScore / count) : 0;
    return { count, avgScore };
  }, [history]);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline mb-2">Welcome back, {user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'User'}</h1>
          <p className="text-muted-foreground">Monitor your content performance and AI workspace activity.</p>
        </div>
        <Link href="/dashboard/generate">
          <Button className="bg-primary hover:bg-primary/90 neon-glow rounded-full px-6">
            <Plus className="w-4 h-4 mr-2" />
            Create New Blog
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          label="Total Blogs" 
          value={stats.count.toString()} 
          change={`${stats.count > 0 ? '+1' : '0'} today`} 
          icon={<FileText className="w-5 h-5 text-primary" />} 
        />
        <StatsCard 
          label="Avg. SEO Score" 
          value={`${stats.avgScore}/100`} 
          change="Real-time average" 
          icon={<BarChart4 className="w-5 h-5 text-accent" />} 
        />
        <StatsCard 
          label="AI Credits" 
          value="4,200" 
          change="Available for use" 
          icon={<Zap className="w-5 h-5 text-yellow-500" />} 
        />
        <StatsCard 
          label="Total Impressions" 
          value="0" 
          change="Tracking active" 
          icon={<TrendingUp className="w-5 h-5 text-green-500" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
              <AreaChart data={chartData}>
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

        <GlassCard className="p-6 border-white/5">
          <h3 className="text-lg font-bold mb-6">Recent Projects</h3>
          <div className="space-y-6">
            {history?.slice(0, 4).map((item: any) => (
              <ActivityItem 
                key={item.id}
                title={item.seoTitle} 
                time="Recent" 
                score={item.seoScore} 
                status={item.status} 
              />
            ))}
            {(!history || history.length === 0) && (
              <p className="text-sm text-muted-foreground text-center py-8">No recent activity.</p>
            )}
          </div>
          <Link href="/dashboard/history" className="block w-full">
            <Button variant="ghost" className="w-full mt-6 text-sm text-primary hover:text-primary hover:bg-primary/5">
              View All Activity
            </Button>
          </Link>
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
      <div className="flex items-center gap-4 overflow-hidden">
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center font-bold text-xs text-primary flex-shrink-0">
          {score}
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-bold group-hover:text-primary transition-colors truncate">{title}</p>
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
      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all flex-shrink-0" />
    </div>
  );
}
