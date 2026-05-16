
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  BarChart4, 
  History, 
  FileText, 
  Settings,
  Sparkles,
  LogOut,
  Bell,
  Search,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useEffect } from 'react';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: Sparkles, label: 'AI Generator', href: '/dashboard/generate' },
  { icon: History, label: 'History', href: '/dashboard/history' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    if (!auth) return;
    await signOut(auth);
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 animate-grid opacity-[0.03] pointer-events-none" />
      
      <aside className="w-64 border-r border-white/5 flex flex-col glass z-20">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center neon-glow">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="font-headline font-bold text-lg tracking-tight">ContentForge AI</span>
          </Link>

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

        <div className="mt-auto p-6">
          <Button 
            variant="ghost" 
            onClick={handleSignOut}
            className="w-full justify-start text-muted-foreground hover:text-white hover:bg-white/5"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sign out
          </Button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative z-10 overflow-auto">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-background/50 backdrop-blur-md">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                placeholder="Search projects..." 
                className="w-full h-10 pl-10 pr-4 bg-white/5 border border-white/5 rounded-full text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">{user.displayName}</p>
                <p className="text-[10px] text-muted-foreground">User ID: {user.uid.slice(0, 8)}</p>
              </div>
              <Avatar>
                <AvatarImage src={user.photoURL || undefined} />
                <AvatarFallback>{user.displayName?.slice(0, 2).toUpperCase() || 'U'}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
