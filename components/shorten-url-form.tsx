"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Sparkles, Wand2, Globe, Bookmark, Zap, Shield, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

import { useShortenedUrls } from "@/context/shortened-url-context";
import { usePerformance } from "@/context/performance-context";

export function ShortenUrlForm() {
  const { toast } = useToast();
  const [brandName, setBrandName] = useState("harshit");
  const [urlPath, setUrlPath] = useState("creative");
  const [originalUrl, setOriginalUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("customize");
  const [brandingOption, setBrandingOption] = useState("branded");
  const [origin, setOrigin] = useState("");
  const { addShortenedUrl } = useShortenedUrls();

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const getFullUrl = () => {
    const finalCode = brandingOption === "branded" ? `${brandName}/${urlPath}` : urlPath;
    if (!origin) return `/${finalCode}`;
    return `${origin}/${finalCode}`;
  };

  const getClickableUrl = () => {
    const finalCode = brandingOption === "branded" ? `${brandName}/${urlPath}` : urlPath;
    if (!origin) return `/${finalCode}`;
    return `${origin}/${finalCode}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getClickableUrl());
    setCopied(true);

    toast({
      title: "Copied!",
      description: "Your branded NanoUrl is ready to share.",
    });

    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!originalUrl) {
      toast({
        title: "Error",
        description: "Please enter a URL to shorten.",
        variant: "destructive",
      });
      return;
    }

    const finalCode = brandingOption === "branded" ? `${brandName}/${urlPath}` : urlPath;
    addShortenedUrl(originalUrl, finalCode);

    toast({
      title: "Success!",
      description: "Your branded NanoUrl has been created. Check the Live Preview tab!",
    });

    setActiveTab("preview");
  };

  return (
    <div id="url-shortener-box" className="container py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Sparkles className="h-3 w-3" /> Custom Branding
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Design Your Identity</h2>
          <p className="text-muted-foreground text-lg">Create short links that people actually trust and click.</p>
        </div>

        <Card className="glass shadow-2xl overflow-hidden rounded-3xl border-white/5">
          <CardContent className="p-0">
            <Tabs defaultValue="customize" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex w-full bg-white/5 p-2 rounded-none border-b border-white/5 h-16">
                <TabsTrigger value="customize" className="flex-1 text-base data-[state=active]:bg-white/10 data-[state=active]:text-primary rounded-xl transition-all">
                  <Wand2 className="mr-2 h-4 w-4" /> Customize
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex-1 text-base data-[state=active]:bg-white/10 data-[state=active]:text-primary rounded-xl transition-all">
                  <Globe className="mr-2 h-4 w-4" /> Live Preview
                </TabsTrigger>
              </TabsList>

              <div className="p-6 md:p-10">
                <TabsContent value="customize" className="mt-0 space-y-8">
                  <div className="space-y-3">
                    <Label htmlFor="original-url" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      Target URL
                    </Label>
                    <div className="relative group">
                      <Input
                        id="original-url"
                        type="url"
                        placeholder="https://example.com/very-long-link"
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        className="h-14 bg-white/5 border-white/10 rounded-2xl px-5 text-lg focus:ring-primary/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="brand-name" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        Your Brand Space
                      </Label>
                      <div className="relative group">
                        <Input
                          id="brand-name"
                          type="text"
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value.replace(/\s+/g, '').toLowerCase())}
                          className="h-14 bg-white/5 border-white/10 rounded-2xl px-5 text-lg focus:ring-primary/50 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="url-path" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        Slug URL
                      </Label>
                      <Input
                        id="url-path"
                        type="text"
                        value={urlPath}
                        onChange={(e) => setUrlPath(e.target.value.replace(/\s+/g, '-').toLowerCase())}
                        className="h-14 bg-white/5 border-white/10 rounded-2xl px-5 text-lg"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        Feature Set
                      </Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant={brandingOption === "branded" ? "default" : "outline"}
                          className={cn("h-14 rounded-2xl border-white/10", brandingOption === "branded" && "bg-primary hover:bg-primary/90")}
                          onClick={() => setBrandingOption("branded")}
                        >
                          <Shield className="h-4 w-4 mr-2" /> Branded
                        </Button>
                        <Button
                          variant={brandingOption === "analytics" ? "default" : "outline"}
                          className={cn("h-14 rounded-2xl border-white/10", brandingOption === "analytics" && "bg-primary hover:bg-primary/90")}
                          onClick={() => setBrandingOption("analytics")}
                        >
                          <BarChart3 className="h-4 w-4 mr-2" /> Stats
                        </Button>
                        <Button
                          variant={brandingOption === "pro" ? "default" : "outline"}
                          className={cn("h-14 rounded-2xl border-white/10", brandingOption === "pro" && "bg-primary hover:bg-primary/90")}
                          onClick={() => setBrandingOption("pro")}
                        >
                          <Zap className="h-4 w-4 mr-2" /> Pro
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleSave}
                    className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg neon-glow-hover"
                  >
                    Generate Branded Link
                  </Button>
                </TabsContent>

                <TabsContent value="preview" className="mt-0">
                  <div className="flex flex-col items-center">
                    <div className="w-full max-w-lg p-1 bg-gradient-to-r from-primary/30 to-cyan-500/30 rounded-[2.5rem] shadow-2xl mb-8">
                      <div className="bg-background rounded-[2.4rem] overflow-hidden border border-white/5">
                        <div className="bg-white/5 p-6 border-b border-white/5 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
                            {brandName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-lg">{brandName}</div>
                            <div className="text-xs text-primary font-medium tracking-widest uppercase">Verified Partner</div>
                          </div>
                        </div>
                        <div className="p-8 space-y-6">
                          <div className="space-y-2">
                            <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Your Nano Link</div>
                            <div className="text-2xl md:text-3xl font-bold break-all text-gradient">
                              {getFullUrl()}
                            </div>
                          </div>

                          <div className="pt-4 grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                              <div className="text-xs text-muted-foreground mb-1 uppercase tracking-tight">Status</div>
                              <div className="font-bold text-green-400 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Active
                              </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                              <div className="text-xs text-muted-foreground mb-1 uppercase tracking-tight">Safety</div>
                              <div className="font-bold text-cyan-400">Encrypted</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      onClick={copyToClipboard}
                      className="h-14 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold group"
                    >
                      {copied ? (
                        <>
                          <Check className="mr-2 h-5 w-5" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-5 w-5" /> Copy to Clipboard
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}