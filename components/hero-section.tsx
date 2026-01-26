"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef, memo, useMemo } from "react";
import { ArrowRight, Copy, Link2, Check, Loader2, Sparkles, Zap } from "lucide-react";
import { throttle, domBatch } from "@/lib/performance";
import { useIntersectionObserver } from "@/lib/use-intersection-observer";
import { usePerformance } from "@/context/performance-context";
import { useShortenedUrls } from "@/context/shortened-url-context";
import { HeroStats } from "@/components/hero-stats";

// Define the type for individual shape objects
interface ShapeProps {
  size: string;
  left: string;
  top: string;
  delay: number;
  duration: number;
  color: string;
}

export const HeroSection = memo(function HeroSection() {
  const [demoUrl, setDemoUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [shortenedLink, setShortenedLink] = useState("");
  const [origin, setOrigin] = useState("");
  const { addShortenedUrl } = useShortenedUrls();

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  const heroRef = useRef<HTMLDivElement>(null);

  const { state: performanceState } = usePerformance();

  const [heroSectionRef, isHeroVisible] = useIntersectionObserver({
    threshold: 0.1,
    once: false
  });

  const handleMouseMove = useRef(
    throttle((e: React.MouseEvent<HTMLDivElement>) => {
      if (!heroRef.current || !isHeroVisible || performanceState.prefersReducedMotion) return;

      domBatch.addRead(() => {
        const rect = heroRef.current!.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        if (Math.abs(x - mousePosition.x) > 0.01 || Math.abs(y - mousePosition.y) > 0.01) {
          domBatch.addWrite(() => {
            setMousePosition({ x, y });
          });
        }
      });
    }, 50)
  ).current;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12
      }
    },
  };

  const shapes: ShapeProps[] = [
    { size: "h-64 w-64", left: "5%", top: "10%", delay: 0, duration: 25, color: "from-primary/20 to-purple-500/10" },
    { size: "h-96 w-96", left: "70%", top: "40%", delay: 1, duration: 35, color: "from-cyan-500/10 to-primary/20" },
  ];

  const handleCopy = () => {
    if (shortenedLink) {
      navigator.clipboard.writeText(shortenedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const [shortening, setShortening] = useState(false);
  const [shortened, setShortened] = useState(false);

  const simulateShortening = () => {
    if (!demoUrl) return;
    setShortening(true);
    const newUrl = addShortenedUrl(demoUrl);
    setShortenedLink(`${origin}/${newUrl.shortCode}`);
    setShortened(true);
    setShortening(false);
  };

  return (
    <div
      ref={(el) => {
        if (el) {
          // @ts-ignore
          heroRef.current = el;
          // @ts-ignore
          heroSectionRef.current = el;
        }
      }}
      className="relative overflow-hidden w-full min-h-[90vh] flex items-center"
      onMouseMove={handleMouseMove}
    >
      {/* Background Animated Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {shapes.map((shape, i) => (
          <motion.div
            key={i}
            className={cn("absolute rounded-full blur-[80px] bg-gradient-to-br", shape.color, shape.size)}
            animate={{
              x: mousePosition.x * 40 * (i + 1),
              y: mousePosition.y * 40 * (i + 1),
              scale: [1, 1.1, 1],
            }}
            transition={{
              scale: { duration: shape.duration, repeat: Infinity, ease: "easeInOut" },
              x: { type: "spring", stiffness: 50 },
              y: { type: "spring", stiffness: 50 }
            }}
            style={{ left: shape.left, top: shape.top }}
          />
        ))}
      </div>

      <div className="container relative z-10 py-20 pb-28">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={item}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md"
            >
              <Zap className="h-4 w-4 text-primary fill-primary animate-pulse" />
              <span className="text-sm font-medium tracking-wide">NanoUrl V2 is now Live</span>
            </motion.div>

            <motion.h1
              variants={item}
              className="mb-8 text-5xl font-extrabold tracking-tight sm:text-7xl md:text-8xl font-display"
            >
              <span className="text-gradient">NanoUrl</span>
              <br />
              <span className="text-foreground/90">Speed. Scale. Style.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mb-12 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              The definitive URL shortener for modern creators.
              Lightning fast, ultra secure, and designed for the future.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap justify-center gap-6 mb-20 w-full">
              <div className="relative group w-full max-w-2xl px-4">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex flex-col md:flex-row gap-3 bg-card p-2 rounded-2xl border border-white/10 shadow-2xl">
                  <div className="flex-grow flex items-center px-4">
                    <Link2 className="h-5 w-5 text-muted-foreground mr-3" />
                    <input
                      type="text"
                      placeholder="Paste your long link here..."
                      className="bg-transparent border-none outline-none w-full text-foreground py-3 text-lg"
                      value={demoUrl}
                      onChange={(e) => setDemoUrl(e.target.value)}
                    />
                  </div>
                  <Button
                    size="lg"
                    className="h-14 px-8 rounded-xl font-bold text-lg bg-primary hover:bg-primary/90 text-white neon-glow-hover"
                    onClick={simulateShortening}
                    disabled={shortening}
                  >
                    {shortening ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <>
                        Shorten <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>

            <AnimatePresence>
              {shortened && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="w-full max-w-lg mx-auto bg-primary/10 border border-primary/20 p-4 rounded-2xl backdrop-blur-xl flex items-center justify-between mb-12"
                >
                  <div className="flex flex-col items-start px-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Success! Your link is ready</span>
                    <span className="text-xl font-bold text-foreground break-all">{shortenedLink}</span>
                  </div>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-12 w-12 rounded-xl"
                    onClick={handleCopy}
                  >
                    {copied ? <Check className="h-5 w-5 text-green-400" /> : <Copy className="h-5 w-5" />}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={item} className="flex flex-wrap justify-center gap-8 text-sm font-medium text-muted-foreground/60 tracking-wider uppercase">
              <span className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> 1M+ Links Created</span>
              <span className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> Enterprise Grade</span>
              <span className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> 99.9% Uptime</span>
            </motion.div>
          </motion.div>

          <HeroStats />
        </div>
      </div>
    </div>
  );
});
