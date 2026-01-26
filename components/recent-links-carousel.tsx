"use client";

import { useShortenedUrls } from "@/context/shortened-url-context";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink, Copy, Trash2, Clock, MousePointer2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function RecentLinksCarousel() {
  const { shortenedUrls, registerClick, removeShortenedUrl } = useShortenedUrls();
  const { toast } = useToast();

  const deleteShortenedUrl = (id: string) => {
    removeShortenedUrl(id);
    toast({
      title: "Link deleted",
      description: "URL removed from your history.",
    });
  };

  if (shortenedUrls.length === 0) return null;

  const copyToClipboard = (shortUrl: string) => {
    const fullUrl = `${window.location.origin}/${shortUrl}`;
    navigator.clipboard.writeText(fullUrl);
    toast({
      title: "Copied!",
      description: `${fullUrl} copied to clipboard.`,
    });
  };

  const handleLinkClick = (id: string, originalUrl: string) => {
    registerClick(id);
    window.open(originalUrl, "_blank");
  };

  return (
    <section className="container py-24">
      <div className="flex flex-col items-center justify-center mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4"
        >
          <Clock className="h-3 w-3" /> History
        </motion.div>
        <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Your Nano Vault</h2>
        <p className="text-muted-foreground text-lg max-w-xl">
          Quick access to your recently crafted links and their live performance data.
        </p>
      </div>

      <Carousel opts={{ align: "start", loop: false }} className="w-full">
        <CarouselContent className="-ml-4">
          {shortenedUrls.map((url) => (
            <CarouselItem key={url.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                className="h-full"
              >
                <Card className="glass h-full rounded-[2rem] border-white/5 overflow-hidden transition-all duration-500 hover:border-primary/40 hover:bg-primary/5 group">
                  <CardHeader className="p-6 pb-2">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1 overflow-hidden">
                        <CardTitle className="text-xl font-bold truncate text-gradient">
                          nano.url/{url.shortCode}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground truncate opacity-60">
                          {url.originalUrl}
                        </p>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-none rounded-lg px-2.5 py-1">
                        <MousePointer2 className="h-3 w-3 mr-1" /> {url.clicks}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 pb-4">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/50 mt-4">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(url.createdAt, { addSuffix: true })}
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1 rounded-xl bg-white/5 hover:bg-primary hover:text-white transition-all border-white/5"
                      onClick={() => copyToClipboard(url.shortCode)}
                    >
                      <Copy className="h-3.5 w-3.5 mr-2" /> Copy
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1 rounded-xl bg-white/5 hover:bg-cyan-500 hover:text-white transition-all border-white/5"
                      onClick={() => handleLinkClick(url.id, url.originalUrl)}
                    >
                      <ExternalLink className="h-3.5 w-3.5 mr-2" /> Visit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="glass border-white/10 rounded-3xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-2xl font-bold">Purge this link?</AlertDialogTitle>
                          <AlertDialogDescription className="text-muted-foreground text-lg">
                            This action is permanent. This NanoUrl will be removed from your vault forever.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-xl border-white/10">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive hover:bg-destructive/90 text-white rounded-xl"
                            onClick={() => deleteShortenedUrl(url.id)}
                          >
                            Confirm Purge
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-12 gap-4">
          <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-2xl bg-white/5 border-white/10 hover:bg-primary hover:text-white" />
          <CarouselNext className="static translate-y-0 h-12 w-12 rounded-2xl bg-white/5 border-white/10 hover:bg-primary hover:text-white" />
        </div>
      </Carousel>
    </section>
  );
}