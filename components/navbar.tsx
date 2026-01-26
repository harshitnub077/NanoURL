"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Menu, Home, Info, Mail, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home", icon: 'home' },
    { href: "/about", label: "About", icon: 'info' },
    { href: "/contact", label: "Contact", icon: 'mail' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <div className="bg-primary/20 p-2 rounded-xl border border-primary/20 group-hover:bg-primary/30 transition-colors">
              <Zap className="h-6 w-6 text-primary fill-primary" />
            </div>
            <span className="text-2xl font-bold font-display tracking-tight text-gradient">NanoUrl</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex gap-2">
            {links.map(({ href, label, icon }) => {
              const IconComponent = icon === 'home' ? Home : icon === 'info' ? Info : Mail;
              return (
                <NavigationMenuItem key={href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={href}
                      className={cn(
                        "relative flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-full",
                        pathname === href
                          ? "text-primary bg-primary/10 shadow-sm border border-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      )}
                    >
                      <IconComponent className={cn("h-4 w-4", pathname === href ? "text-primary" : "text-muted-foreground")} />
                      <span>{label}</span>
                      {pathname === href && (
                        <motion.div
                          className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-primary"
                          layoutId="navIndicator"
                        />
                      )}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <div className="bg-white/5 p-1 rounded-full border border-white/5">
            <ThemeToggle />
          </div>

          <Button className="hidden md:flex h-10 px-6 rounded-full font-bold bg-primary hover:bg-primary/90 text-white neon-glow-hover">
            Get Started
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground hover:bg-white/5 rounded-full">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass w-[300px] border-l border-white/5">
              <div className="flex items-center gap-3 mb-12 mt-4">
                <Zap className="h-8 w-8 text-primary fill-primary" />
                <span className="text-2xl font-bold font-display text-gradient">NanoUrl</span>
              </div>

              <nav className="flex flex-col gap-3">
                {links.map(({ href, label, icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-6 py-4 text-lg font-medium rounded-2xl transition-all duration-300 flex items-center gap-4",
                      pathname === href
                        ? "bg-primary/20 text-primary border border-primary/20 shadow-lg shadow-primary/10"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="absolute bottom-10 left-6 right-6">
                <Button className="w-full h-14 rounded-2xl font-bold text-lg bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20">
                  Get Started
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}