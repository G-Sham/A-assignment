"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Sparkles, 
  ArrowRight, 
  Loader2, 
  Search, 
  Layers, 
  FileText, 
  CheckCircle2,
  AlertCircle,
  BarChart4
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { generateSeoBlogPost, GenerateSeoBlogPostOutput } from "@/ai/flows/generate-seo-blog-post";
import { provideSeoSuggestions, ProvideSeoSuggestionsOutput } from "@/ai/flows/provide-seo-suggestions";

export default function GeneratorPage() {
  const [step, setStep] = useState<"input" | "generating" | "result">("input");
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [result, setResult] = useState<GenerateSeoBlogPostOutput | null>(null);
  const [seoResult, setSeoResult] = useState<ProvideSeoSuggestionsOutput | null>(null);
  
  const [formData, setFormData] = useState({
    blogTopic: "",
    keywords: "",
    tone: "professional",
    blogLength: "medium" as "short" | "medium" | "long",
    audience: "",
    language: "English"
  });

  const handleGenerate = async () => {
    setStep("generating");
    setProgress(10);
    setStatusMessage("Analyzing keywords and sources...");
    
    try {
      // Simulate steps for cinematic effect
      setTimeout(() => { setProgress(30); setStatusMessage("Extracting core insights..."); }, 1500);
      setTimeout(() => { setProgress(50); setStatusMessage("Synthesizing human-like prose..."); }, 3000);
      
      const blog = await generateSeoBlogPost(formData);
      setResult(blog);
      
      setProgress(80);
      setStatusMessage("Performing SEO Intelligence Audit...");
      
      // Perform SEO analysis on introduction + first section
      const contentForSeo = `${blog.introduction}\n\n${blog.sections[0].content}`;
      const suggestions = await provideSeoSuggestions({
        blogContent: contentForSeo,
        keywords: formData.keywords.split(',').map(k => k.trim())
      });
      setSeoResult(suggestions);
      
      setProgress(100);
      setStatusMessage("Generation complete!");
      setTimeout(() => setStep("result"), 500);
    } catch (error) {
      console.error(error);
      setStep("input");
      alert("Failed to generate content. Please try again.");
    }
  };

  if (step === "generating") {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
        <div className="w-24 h-24 mb-12 rounded-full bg-primary/20 flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full border border-primary/40 animate-ping opacity-20" />
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
        <h2 className="text-3xl font-headline font-bold mb-4">Forge is Thinking...</h2>
        <p className="text-muted-foreground mb-12">{statusMessage}</p>
        
        <div className="w-full space-y-4">
          <Progress value={progress} className="h-2 bg-white/5" />
          <div className="flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
            <span>Research</span>
            <span>Synthesize</span>
            <span>Optimize</span>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-8 w-full opacity-50">
           <div className="flex flex-col items-center gap-2">
             <div className={`p-3 rounded-xl bg-white/5 ${progress >= 30 ? "text-primary border border-primary/20 bg-primary/10" : ""}`}>
               <Search className="w-5 h-5" />
             </div>
             <span className="text-xs">Research</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <div className={`p-3 rounded-xl bg-white/5 ${progress >= 60 ? "text-primary border border-primary/20 bg-primary/10" : ""}`}>
               <Layers className="w-5 h-5" />
             </div>
             <span className="text-xs">Synthesis</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <div className={`p-3 rounded-xl bg-white/5 ${progress >= 90 ? "text-primary border border-primary/20 bg-primary/10" : ""}`}>
               <Sparkles className="w-5 h-5" />
             </div>
             <span className="text-xs">Optimization</span>
           </div>
        </div>
      </div>
    );
  }

  if (step === "result" && result) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={() => setStep("input")} className="rounded-full">Back to Editor</Button>
          <div className="flex gap-4">
            <Button variant="outline" className="rounded-full">Export PDF</Button>
            <Button className="bg-primary hover:bg-primary/90 neon-glow rounded-full px-8">Save to Cloud</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <GlassCard className="lg:col-span-3 p-10 border-white/10 min-h-screen">
            <div className="max-w-3xl mx-auto space-y-10">
              <header className="space-y-4 border-b border-white/5 pb-10">
                <Badge className="bg-primary/20 text-primary border-primary/20">SEO Optimization Active</Badge>
                <h1 className="text-5xl font-headline font-bold leading-tight">{result.seoTitle}</h1>
                <p className="text-muted-foreground text-lg leading-relaxed">{result.metaDescription}</p>
              </header>

              <div className="prose prose-invert prose-lg max-w-none space-y-8">
                <p className="italic text-xl text-muted-foreground border-l-4 border-primary pl-6 py-2">
                  {result.introduction}
                </p>

                {result.sections.map((section, idx) => (
                  <section key={idx} className="space-y-4">
                    <h2 className="text-3xl font-bold">{section.heading}</h2>
                    <div className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                      {section.content}
                    </div>
                  </section>
                ))}

                <section className="bg-white/5 p-8 rounded-2xl border border-white/5 space-y-6">
                   <h3 className="text-2xl font-bold flex items-center gap-2">
                     <AlertCircle className="text-primary w-6 h-6" />
                     Frequently Asked Questions
                   </h3>
                   {result.faqs.map((faq, idx) => (
                     <div key={idx} className="space-y-2">
                       <p className="font-bold text-white">{faq.question}</p>
                       <p className="text-muted-foreground text-sm">{faq.answer}</p>
                     </div>
                   ))}
                </section>

                <div className="bg-primary/10 border border-primary/20 p-8 rounded-2xl text-center">
                  <h3 className="text-xl font-bold mb-4">Conclusion</h3>
                  <p className="text-muted-foreground mb-6">{result.conclusion}</p>
                  <Button className="bg-primary hover:bg-primary/90 rounded-full px-8">{result.callToAction}</Button>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* SEO Panel */}
          <div className="space-y-6">
            <GlassCard className="p-6 border-white/10">
              <h3 className="font-bold mb-4 flex items-center gap-2 text-primary">
                <BarChart4 className="w-4 h-4" /> SEO Score
              </h3>
              <div className="flex items-end justify-between mb-4">
                <span className="text-4xl font-headline font-bold">{seoResult?.seoScore || 0}</span>
                <span className="text-xs text-muted-foreground">/ 100</span>
              </div>
              <Progress value={seoResult?.seoScore || 0} className="h-2 bg-white/5 mb-4" />
              <p className="text-xs text-muted-foreground">Based on keyword density, readability, and structure.</p>
            </GlassCard>

            <GlassCard className="p-6 border-white/10">
              <h3 className="font-bold mb-4">Readability</h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-sm">
                   <span className="text-muted-foreground">Flesch Ease</span>
                   <span className="font-bold">{seoResult?.readabilityScore.fleschReadingEase}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                   <span className="text-muted-foreground">Grade Level</span>
                   <span className="font-bold">{seoResult?.readabilityScore.gradeLevel}</span>
                 </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 border-white/10">
              <h3 className="font-bold mb-4">Keywords</h3>
              <div className="space-y-4">
                {seoResult?.keywordDensityAnalysis.map((k, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-white">{k.keyword}</span>
                      <span className="text-muted-foreground">{k.density}%</span>
                    </div>
                    <Progress value={k.density * 20} className="h-1 bg-white/5" />
                  </div>
                ))}
              </div>
            </GlassCard>

            <div className="space-y-3">
               <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Suggestions</p>
               {seoResult?.overallSuggestions.slice(0, 3).map((s, idx) => (
                 <div key={idx} className="flex gap-3 text-sm text-muted-foreground bg-white/5 p-3 rounded-lg border border-white/5">
                   <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                   {s}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-headline font-bold mb-2">Create New Content</h1>
        <p className="text-muted-foreground">Input your requirements and let ContentForge forge high-ranking content.</p>
      </div>

      <GlassCard className="p-8 border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Blog Topic</Label>
              <Input 
                placeholder="e.g. The Future of Sustainable Architecture" 
                className="bg-white/5 border-white/10 h-12"
                value={formData.blogTopic}
                onChange={(e) => setFormData({...formData, blogTopic: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Target Keywords (comma separated)</Label>
              <Input 
                placeholder="e.g. green buildings, architecture, eco-friendly" 
                className="bg-white/5 border-white/10 h-12"
                value={formData.keywords}
                onChange={(e) => setFormData({...formData, keywords: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={formData.tone} onValueChange={(val) => setFormData({...formData, tone: val})}>
                <SelectTrigger className="bg-white/5 border-white/10 h-12">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="informational">Informational</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Target Audience</Label>
              <Input 
                placeholder="e.g. Real estate investors, architects" 
                className="bg-white/5 border-white/10 h-12"
                value={formData.audience}
                onChange={(e) => setFormData({...formData, audience: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Blog Length</Label>
              <Select value={formData.blogLength} onValueChange={(val: any) => setFormData({...formData, blogLength: val})}>
                <SelectTrigger className="bg-white/5 border-white/10 h-12">
                  <SelectValue placeholder="Select length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (~500 words)</SelectItem>
                  <SelectItem value="medium">Medium (~1000 words)</SelectItem>
                  <SelectItem value="long">Long (~1500+ words)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={formData.language} onValueChange={(val) => setFormData({...formData, language: val})}>
                <SelectTrigger className="bg-white/5 border-white/10 h-12">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleGenerate}
          className="w-full h-14 bg-primary hover:bg-primary/90 text-lg rounded-xl neon-glow group"
          disabled={!formData.blogTopic}
        >
          <Sparkles className="w-5 h-5 mr-3 group-hover:scale-125 transition-transform" />
          Generate Content Engine
          <ArrowRight className="w-5 h-5 ml-3" />
        </Button>
      </GlassCard>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-bold">Deep Research</p>
            <p className="text-[10px] text-muted-foreground">Synthesized from 10+ sources</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
            <BarChart4 className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-bold">SEO Audit</p>
            <p className="text-[10px] text-muted-foreground">Real-time keyword optimization</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-bold">Plagiarism Free</p>
            <p className="text-[10px] text-muted-foreground">100% human-like content</p>
          </div>
        </div>
      </div>
    </div>
  );
}
