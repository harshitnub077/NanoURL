"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useShortenedUrls } from "@/context/shortened-url-context";

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  description: string;
}

const stats: StatItem[] = [
  {
    label: "Links Shortened",
    value: 0,
    suffix: "+",
    description: "URLs processed"
  },
  {
    label: "Click Rate",
    value: 0,
    suffix: "%",
    description: "Average engagement"
  },
  {
    label: "Characters Saved",
    value: 0,
    suffix: "K+",
    description: "Space optimized"
  },
  {
    label: "Uptime",
    value: 99,
    suffix: ".9%",
    description: "Service reliability"
  }
];

export function HeroStats() {
  const { totalUrls, totalClicks } = useShortenedUrls();
  const [animatedStats, setAnimatedStats] = useState(stats);

  useEffect(() => {
    // Calculate real metrics
    const avgCharsSaved = 42; // Average characters saved per URL
    const totalCharsSaved = totalUrls * avgCharsSaved;
    const clickRate = totalUrls > 0 ? Math.round((totalClicks / totalUrls) * 100) : 0;

    const realStats = [
      {
        ...stats[0],
        value: totalUrls
      },
      {
        ...stats[1],
        value: clickRate
      },
      {
        ...stats[2],
        value: Math.round(totalCharsSaved / 1000)
      },
      {
        ...stats[3],
        value: 99.9
      }
    ];

    setAnimatedStats(realStats);
  }, [totalUrls, totalClicks]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
      {animatedStats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.7, type: "spring" }}
            className="text-3xl md:text-4xl font-bold text-primary mb-1"
          >
            {stat.value.toLocaleString()}
            {stat.suffix}
          </motion.div>
          <div className="text-sm font-medium text-foreground mb-1">
            {stat.label}
          </div>
          <div className="text-xs text-muted-foreground">
            {stat.description}
          </div>
        </motion.div>
      ))}
    </div>
  );
}