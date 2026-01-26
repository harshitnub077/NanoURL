"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Zap, Heart, Code, ExternalLink } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Analytics", href: "#analytics" },
    { name: "API", href: "/api" },
    { name: "Pricing", href: "/pricing" }
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" }
  ],
  resources: [
    { name: "Documentation", href: "/docs" },
    { name: "Help Center", href: "/help" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" }
  ],
  tech: [
    { name: "Next.js", href: "https://nextjs.org", external: true },
    { name: "React", href: "https://reactjs.org", external: true },
    { name: "TypeScript", href: "https://typescriptlang.org", external: true },
    { name: "Tailwind CSS", href: "https://tailwindcss.com", external: true }
  ]
};

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 bg-background/40 backdrop-blur-md">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="bg-primary/20 p-1.5 rounded-lg border border-primary/20 group-hover:bg-primary/30 transition-colors">
                <Zap className="h-5 w-5 text-primary fill-primary" />
              </div>
              <span className="text-xl font-bold font-display text-gradient">NanoURL</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              The world&apos;s fastest and most aesthetic URL shortener.
              Built with modern web technologies for exceptional performance.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="http://localhost:3001/harshit/linkdin"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 border border-white/5 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:-translate-y-1"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/harshit-kudhial/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 border border-white/5 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:-translate-y-1"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="mailto:harshitkudhial@gmail.com"
                className="p-2 rounded-full bg-white/5 border border-white/5 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:-translate-y-1"
              >
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider flex items-center gap-1">
              <Code className="h-3 w-3" />
              Tech Stack
            </h3>
            <ul className="space-y-2">
              {footerLinks.tech.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} NanoURL. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span>All systems operational</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Built with</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
            <span>by</span>
            <Link href="/about" className="text-primary hover:text-primary/80 transition-colors font-medium">
              Harshit Kudhial
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}