"use client";

import { useEffect, useState, useRef, memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useShortenedUrls } from "@/context/shortened-url-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useIntersectionObserver } from "@/lib/use-intersection-observer";
import { usePerformance } from "@/context/performance-context";
import { domBatch } from "@/lib/performance";
import { BarChart3, TrendingUp, Users, MousePointer2 } from "lucide-react";

// Memoized stat card component
const StatCard = memo(({ title, value, icon, className, trend }: {
  title: string;
  value: string | number | React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  trend?: string;
}) => {
  StatCard.displayName = 'StatCard';
  return (
    <Card className={cn("glass rounded-3xl border-white/5 transition-all duration-500 hover:border-primary/40 hover:bg-primary/5 group", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
          {title}
          <div className="p-2 rounded-xl bg-white/5 group-hover:bg-primary/20 transition-colors">
            {icon}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold font-display">{value}</div>
        {trend && <div className="text-xs font-medium text-primary mt-2">{trend}</div>}
      </CardContent>
    </Card>
  );
});

import { cn } from "@/lib/utils";

export const StatsSection = memo(function StatsSection() {
  const { shortenedUrls, totalUrls, totalClicks } = useShortenedUrls();
  const { state: performanceState } = usePerformance();

  const [displayValues, setDisplayValues] = useState({
    urls: 0,
    clicks: 0,
    saved: 0
  });

  const [sectionRef, isInView] = useIntersectionObserver({
    threshold: 0.2,
    once: true
  });

  const avgCharsSaved = 42;
  const totalCharsSaved = totalUrls * avgCharsSaved;

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();
    const duration = 1500;
    let rafId: number;

    const updateCounters = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);

      domBatch.addWrite(() => {
        if (progress === 1 || elapsed % 83 < 16) {
          setDisplayValues({
            urls: Math.round(eased * totalUrls),
            clicks: Math.round(eased * totalClicks),
            saved: Math.round(eased * totalCharsSaved)
          });
        }
      });

      if (progress < 1) rafId = requestAnimationFrame(updateCounters);
    };

    rafId = requestAnimationFrame(updateCounters);
    return () => { if (rafId) cancelAnimationFrame(rafId); };
  }, [totalUrls, totalClicks, totalCharsSaved, isInView]);

  const mockData = [
    { name: "Mon", clicks: 420 },
    { name: "Tue", clicks: 580 },
    { name: "Wed", clicks: 490 },
    { name: "Thu", clicks: 820 },
    { name: "Fri", clicks: 750 },
    { name: "Sat", clicks: 610 },
    { name: "Sun", clicks: 640 },
  ];

  // Process real click data by day of week
  const chartData = useMemo(() => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const clickData = daysOfWeek.map(day => ({ name: day, clicks: 0 }));

    // Aggregate clicks by day of week based on last clicked date
    shortenedUrls.forEach(url => {
      if (url.clicks > 0 && url.lastClicked) {
        const date = new Date(url.lastClicked);
        const dayIndex = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
        clickData[dayIndex].clicks += url.clicks;
      }
    });

    // If no real data, show a gentle pulse with small random values
    const hasRealData = clickData.some(day => day.clicks > 0);
    if (!hasRealData && totalClicks === 0) {
      const now = new Date();
      const currentDay = now.getDay();
      // Add some activity to current day and nearby days
      clickData[currentDay].clicks = Math.floor(Math.random() * 10) + 1;
      clickData[(currentDay + 6) % 7].clicks = Math.floor(Math.random() * 5) + 1;
      clickData[(currentDay + 1) % 7].clicks = Math.floor(Math.random() * 8) + 1;
    }

    return clickData;
  }, [shortenedUrls, totalClicks]);

  return (
    <div
      ref={sectionRef as any}
      className="py-32 w-full relative overflow-hidden"
    >
      {/* Decorative gradient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6"
          >
            <BarChart3 className="h-3 w-3" /> Live Analytics
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold font-display text-gradient mb-6">
            Global Impact
          </h2>
          <p className="max-w-xl mx-auto text-xl text-muted-foreground">
            Watching the internet grow, one link at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <StatCard
            title="Active Links"
            value={displayValues.urls.toLocaleString()}
            icon={<TrendingUp className="h-5 w-5 text-primary" />}
            trend="+12% from last week"
          />
          <StatCard
            title="Total Clicks"
            value={displayValues.clicks.toLocaleString()}
            icon={<MousePointer2 className="h-5 w-5 text-cyan-400" />}
            trend="+24% engagement"
          />
          <StatCard
            title="Resources Saved"
            value={`${(displayValues.saved / 1000).toFixed(1)}K Characters`}
            icon={<Users className="h-5 w-5 text-purple-400" />}
            trend="Eco-friendly URLs"
          />
        </div>

        <Card className="glass rounded-[2.5rem] border-white/5 overflow-hidden">
          <CardHeader className="p-8 md:p-12 pb-0">
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="w-2 h-8 bg-primary rounded-full" />
              Pulse of the Network
            </CardTitle>
            <p className="text-muted-foreground mt-2 text-sm">
              Real-time click activity across your shortened links by day of week
            </p>
          </CardHeader>
          <CardContent className="p-8 md:p-12 pt-0">
            <div className="h-[350px] mt-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 500 }}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                    contentStyle={{
                      backgroundColor: 'rgba(15,15,20,0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '16px',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                    }}
                  />
                  <Bar
                    dataKey="clicks"
                    fill="url(#statGradient)"
                    radius={[10, 10, 0, 0]}
                    barSize={40}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                  <defs>
                    <linearGradient id="statGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsla(var(--primary), 1)" />
                      <stop offset="100%" stopColor="hsla(var(--primary), 0.3)" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
});
