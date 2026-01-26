"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Zap,
  BarChart,
  Link2,
  QrCode,
  Shield,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles
} from "lucide-react";

import { memo } from "react";

export const FeatureShowcase = memo(function FeatureShowcase() {
  const features = [
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Nano Speed",
      description: "Shorten and redirect URLs with sub-millisecond latency globally."
    },
    {
      icon: <BarChart className="h-10 w-10 text-cyan-400" />,
      title: "Real-time Data",
      description: "Live click tracking and visitor analytics with precision detail."
    },
    {
      icon: <Link2 className="h-10 w-10 text-purple-400" />,
      title: "Smart Redirects",
      description: "Dynamic routing based on device, location, or user language."
    },
    {
      icon: <Shield className="h-10 w-10 text-blue-400" />,
      title: "Secure & Private",
      description: "Enterprise-grade encryption and privacy-first data handling."
    },
    {
      icon: <Cpu className="h-10 w-10 text-indigo-400" />,
      title: "API Driven",
      description: "Developer-first architecture with powerful REST & GraphQL APIs."
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: "Custom Branding",
      description: "Use your own domains and vanity slugs for maximum link trust."
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="features-section" className="container py-32">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6"
        >
          <Layers className="h-3 w-3" /> Capabilities
        </motion.div>
        <h2 className="text-4xl md:text-6xl font-bold font-display text-gradient mb-6">
          Everything You Need
        </h2>
        <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
          Built for scale, designed for simplicity, and engineered for performance.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={item}>
            <Card className="glass h-full rounded-3xl border-white/5 transition-all duration-500 hover:border-primary/50 hover:bg-primary/5 hover:-translate-y-2 group">
              <CardHeader className="pt-8 px-8">
                <div className="mb-4 p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-primary/20 group-hover:border-primary/20 transition-all duration-500 inline-block">
                  {feature.icon}
                </div>
                <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <p className="text-muted-foreground text-lg group-hover:text-foreground transition-colors leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
});