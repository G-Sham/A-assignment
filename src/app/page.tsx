
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  BarChart3, 
  Search, 
  PenTool, 
  Globe, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Layers,
  MousePointer2
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 animate-grid opacity-20 pointer-events-none" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary neon-glow flex items-center justify-center">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="font-headline font-bold text-xl tracking-tight">ContentForge AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-white transition-colors">Features</Link>
            <Link href="#workflow" className="text-sm text-muted-foreground hover:text-white transition-colors">Workflow</Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-white transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-sm">Log in</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="text-sm px-6 rounded-full bg-primary hover:bg-primary/90 neon-glow">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 py-1.5 px-4 rounded-full bg-primary/10 text-primary border-primary/20 font-medium">
            Next-Gen SEO Infrastructure
          </Badge>
          <h1 className="font-headline text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
            Transform Ideas Into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent neon-text">
              High-Ranking Content
            </span> With AI
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Generate intelligent SEO-optimized blogs powered by deep AI research, 
            automated content synthesis, and real-time optimization.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link href="/dashboard">
              <Button size="lg" className="rounded-full h-14 px-8 bg-primary hover:bg-primary/90 text-lg group">
                Start Generating <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="rounded-full h-14 px-8 glass border-white/10 hover:bg-white/5 text-lg">
              Watch Demo
            </Button>
          </div>

          {/* Hero Mockup */}
          <div className="relative mt-20 max-w-5xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur-2xl opacity-20" />
            <GlassCard className="border-white/10 p-2 shadow-2xl relative">
              <Image 
                src="https://picsum.photos/seed/forge1/1200/800" 
                alt="Dashboard Preview" 
                width={1200} 
                height={800} 
                className="rounded-lg shadow-inner"
                data-ai-hint="futuristic dashboard"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary/20 rounded-full blur-3xl" />
            </GlassCard>
            
            {/* Floating Elements */}
            <GlassCard className="absolute -top-10 -right-10 hidden lg:block p-4 w-60 border-primary/20 float">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500/20 rounded-md">
                  <BarChart3 className="w-4 h-4 text-green-500" />
                </div>
                <span className="text-xs font-bold">SEO Score: 98/100</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[98%]" />
              </div>
            </GlassCard>
            <GlassCard className="absolute -bottom-10 -left-10 hidden lg:block p-4 w-60 border-accent/20 float [animation-delay:1s]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-md">
                  <Zap className="w-4 h-4 text-accent" />
                </div>
                <span className="text-xs font-bold">Generation Complete</span>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 relative">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="font-headline text-3xl md:text-5xl font-bold mb-6">Built for Modern Teams</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to automate your content engine and dominate search results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Search className="text-primary" />}
              title="Multi-Source Research"
              description="Our AI intelligently researches multiple online sources to extract meaningful insights for every article."
            />
            <FeatureCard 
              icon={<Layers className="text-secondary" />}
              title="SEO Intelligence Engine"
              description="Real-time readability metrics, keyword density analysis, and intelligent SERP-focused suggestions."
            />
            <FeatureCard 
              icon={<MousePointer2 className="text-accent" />}
              title="Pro-Editor Workspace"
              description="A next-gen rich text editor with markdown support and glassmorphic floating toolbars."
            />
          </div>
        </div>
      </section>

      {/* Workflow Showcase */}
      <section id="workflow" className="py-24 px-6 bg-white/[0.02]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-headline text-3xl md:text-5xl font-bold mb-8">Cinematic AI Workflow</h2>
              <div className="space-y-8">
                <WorkflowStep 
                  number="01" 
                  title="Keyword Analysis" 
                  description="Identify high-intent long-tail keywords using real-time search trends."
                />
                <WorkflowStep 
                  number="02" 
                  title="Content Extraction" 
                  description="Analyze top competitors and extract unique value propositions."
                />
                <WorkflowStep 
                  number="03" 
                  title="Synthesis & Generation" 
                  description="Synthesize information into human-like prose that avoids robotic patterns."
                />
              </div>
            </div>
            <div className="relative">
              <GlassCard className="p-8 border-white/10 aspect-square flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 mb-6 rounded-full bg-primary/20 flex items-center justify-center relative">
                   <div className="absolute inset-0 rounded-full border border-primary/40 animate-ping opacity-20" />
                   <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">AI Researching...</h3>
                <div className="w-full space-y-3">
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-2/3 animate-shimmer" />
                  </div>
                  <p className="text-xs text-muted-foreground">Scraping data from 12+ sources...</p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Sparkles className="text-white w-5 h-5" />
                </div>
                <span className="font-headline font-bold text-xl tracking-tight">ContentForge AI</span>
              </div>
              <p className="text-muted-foreground max-w-sm mb-8">
                Empowering content creators with the most advanced AI-driven SEO engine on the planet.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="#">Features</Link></li>
                <li><Link href="#">Pricing</Link></li>
                <li><Link href="#">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="#">Documentation</Link></li>
                <li><Link href="#">API Reference</Link></li>
                <li><Link href="#">Support</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-muted-foreground">© 2024 ContentForge AI. All rights reserved.</p>
            <div className="flex gap-8 text-xs text-muted-foreground">
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <GlassCard className="p-8 border-white/5 group hover:border-primary/20 transition-all">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </GlassCard>
  );
}

function WorkflowStep({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="flex gap-6 group">
      <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-sm font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all">
        {number}
      </div>
      <div>
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
