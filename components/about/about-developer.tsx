"use client";

import { motion } from "framer-motion";
import { Code, Database, Palette, Zap, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const technologies = [
  {
    category: "Frontend",
    icon: Code,
    skills: ["Next.js 15", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion"]
  },
  {
    category: "UI/UX",
    icon: Palette,
    skills: ["Radix UI", "Responsive Design", "Dark/Light Mode", "Accessibility", "Mobile-First"]
  },
  {
    category: "Data & Analytics",
    icon: Database,
    skills: ["Recharts", "Local Storage", "Real-time Updates", "Performance Monitoring", "Data Visualization"]
  },
  {
    category: "Performance",
    icon: Zap,
    skills: ["Code Splitting", "Lazy Loading", "SEO Optimization", "Core Web Vitals", "Bundle Optimization"]
  }
];

const projects = [
  {
    name: "NanoURL",
    description: "Modern URL shortener with analytics dashboard",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
    github: "https://github.com/yourusername/nanourl",
    live: "http://localhost:3000"
  },
  {
    name: "Portfolio Website",
    description: "Personal portfolio showcasing projects and skills",
    tech: ["React", "Next.js", "Framer Motion"],
    github: "https://github.com/yourusername/portfolio",
    live: "https://yourportfolio.com"
  }
];

export function AboutDeveloper() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet the Developer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate full-stack developer specializing in modern web technologies
            and creating exceptional user experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Developer Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Code className="w-6 h-6 text-primary" />
                  </div>
                    Harshit Kudhial
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Full-stack developer with expertise in React, Next.js, and TypeScript.
                  Passionate about building scalable web applications with exceptional user experiences.
                </p>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">Python</Badge>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="http://localhost:3001/harshit/linkdin" className="gap-2">
                      <Github className="w-4 h-4" />
                      GitHub
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://www.linkedin.com/in/harshit-kudhial/" className="gap-2">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="mailto:harshitkudhial@gmail.com" className="gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">Technical Expertise</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <tech.icon className="w-5 h-5 text-primary" />
                        {tech.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1">
                        {tech.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h3 className="text-3xl font-bold text-center">Featured Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {project.name}
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={project.live} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}