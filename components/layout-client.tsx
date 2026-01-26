"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/components/theme-provider';
import { ShortenedUrlProvider } from '@/context/shortened-url-context';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

const shapes = [
  { size: 180, left: 10, top: 20, delay: 0.0, rotate: '10deg', color: 'from-primary/10 to-transparent' },
  { size: 250, left: 30, top: 50, delay: 0.2, rotate: '20deg', color: 'from-purple-500/10 to-transparent' },
  { size: 200, left: 60, top: 10, delay: 0.4, rotate: '-15deg', color: 'from-cyan-500/10 to-transparent' },
  { size: 300, left: 80, top: 70, delay: 0.6, rotate: '5deg', color: 'from-primary/10 to-transparent' },
  { size: 150, left: 40, top: 80, delay: 0.8, rotate: '-20deg', color: 'from-purple-500/10 to-transparent' },
  { size: 220, left: 70, top: 30, delay: 1.0, rotate: '15deg', color: 'from-primary/10 to-transparent' },
];

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const pageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <ShortenedUrlProvider>
        {/* Loading overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div className="relative mb-6">
                  <div className="h-20 w-20 rounded-3xl bg-primary/20 flex items-center justify-center border border-primary/30">
                    <Zap className="h-10 w-10 text-primary fill-primary animate-pulse" />
                  </div>
                  <div className="absolute inset-0 h-20 w-20 rounded-3xl border-2 border-primary animate-ping opacity-20" />
                </div>
                <h2 className="text-3xl font-bold font-display text-gradient mb-2">NanoUrl</h2>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-[0.3em]">Initializing Speed</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated background global elements */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          {shapes.map((shape, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full bg-gradient-to-br blur-[100px] ${shape.color}`}
              style={{
                width: shape.size,
                height: shape.size,
                left: `${shape.left}%`,
                top: `${shape.top}%`,
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                y: [0, -40, 0],
                x: [0, 20, 0],
              }}
              transition={{
                delay: shape.delay,
                duration: 15,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="flex min-h-screen flex-col">
          <Navbar />
          <AnimatePresence mode="wait">
            <motion.main
              key={pathname}
              className="flex-1"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageVariants}
            >
              {children}
            </motion.main>
          </AnimatePresence>
          <Footer />
        </div>
      </ShortenedUrlProvider>
    </ThemeProvider>
  );
}