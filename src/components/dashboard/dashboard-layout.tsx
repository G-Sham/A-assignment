
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  PenSquare, 
  BarChart4, 
  History, 
  FileText, 
  Settings,
  Sparkles,
  LogOut,
  Bell,
  Search,
  ChevronRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: Sparkles, label: 'AI Generator', href: '/dashboard/generate' },
  { icon: BarChart4, label: 'SEO Analytics', href: '/dashboard/analytics' },
  { icon: History, label: 'History', href: '/dashboard/history' },
  { icon: FileText, label: 'Drafts', href: '/dashboard/drafts' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 animate-grid opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col glass z-20">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center neon-glow">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="font-headline font-bold text-lg tracking-tight">ContentForge AI</span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                    isActive 
                      ? "bg-primary/10 text-primary border border-primary/20" 
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  )}>
                    <item.icon className={cn("w-4 h-4", isActive && "text-primary")} />
                    <span className="text-sm font-medium">{item.label}</span>
                    {isActive && <ChevronRight className="w-3 h-3 ml-auto opacity-50" />}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          <div className="glass p-4 rounded-xl border-primary/20 bg-primary/5">
            <p className="text-[10px] uppercase tracking-wider text-primary font-bold mb-2">Workspace Plan</p>
            <p className="text-sm font-bold mb-3">Professional AI</p>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-primary w-2/3" />
            </div>
            <p className="text-[10px] text-muted-foreground">67% of AI usage used</p>
          </div>

          <Link href="/login">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-white hover:bg-white/5">
              <LogOut className="w-4 h-4 mr-3" />
              Sign out
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10 overflow-auto">
        {/* Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-background/50 backdrop-blur-md">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                placeholder="Search projects, drafts..." 
                className="w-full h-10 pl-10 pr-4 bg-white/5 border border-white/5 rounded-full text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
            </Button>
            <div className="h-8 w-[1px] bg-white/10 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">Alex Rivera</p>
                <p className="text-[10px] text-muted-foreground">Marketing Director</p>
              </div>
              <Avatar>
                <AvatarImage src="https://picsum.photos/seed/user1/40/40" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
