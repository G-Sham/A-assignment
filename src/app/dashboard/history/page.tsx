
"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  ExternalLink, 
  Clock, 
  BarChart2,
  Calendar
} from "lucide-react";

const history = [
  { id: 1, title: "The Rise of Edge Computing in 2024", date: "Oct 24, 2023", score: 98, status: "Published", keywords: "Edge Computing, Cloud, Future" },
  { id: 2, title: "10 SEO Tips for Small Businesses", date: "Oct 22, 2023", score: 85, status: "Published", keywords: "SEO, Marketing, Tips" },
  { id: 3, title: "Understanding Generative AI Infrastructure", date: "Oct 20, 2023", score: 92, status: "Archived", keywords: "AI, Genkit, Next.js" },
  { id: 4, title: "A Deep Dive into React Server Components", date: "Oct 18, 2023", score: 88, status: "Published", keywords: "React, Web Development" },
  { id: 5, title: "How to Build a Modern SaaS Stack", date: "Oct 15, 2023", score: 95, status: "Draft", keywords: "SaaS, Startup, Tech" },
];

export default function HistoryPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline mb-2">Project History</h1>
          <p className="text-muted-foreground">Manage and review your generated content library.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            placeholder="Filter projects by title or keyword..." 
            className="w-full h-11 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <Button variant="outline" className="h-11 rounded-xl glass border-white/10">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <GlassCard className="border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead className="border-b border-white/5 bg-white/5">
            <tr className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <th className="px-6 py-4">Article Title</th>
              <th className="px-6 py-4">Keywords</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">SEO Score</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {history.map((item) => (
              <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-6">
                  <p className="text-sm font-bold group-hover:text-primary transition-colors">{item.title}</p>
                </td>
                <td className="px-6 py-6">
                  <p className="text-xs text-muted-foreground">{item.keywords}</p>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border border-primary/20 bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                      {item.score}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                   <Badge variant="outline" className={item.status === 'Published' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-white/5"}>
                     {item.status}
                   </Badge>
                </td>
                <td className="px-6 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}
