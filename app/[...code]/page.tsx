"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useShortenedUrls } from "@/context/shortened-url-context";
import { motion } from "framer-motion";
import { Loader2, AlertCircle, Home, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RedirectPage() {
    const params = useParams();
    const router = useRouter();
    const { getShortenedUrlByCode, registerClick, isLoaded } = useShortenedUrls();
    const [error, setError] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(true);

    useEffect(() => {
        if (!isLoaded || !params.code) return;

        // Join pieces for catch-all route (array for [...code])
        const codeArray = Array.isArray(params.code) ? params.code : [params.code];
        const fullCode = codeArray.join("/");

        const shortUrl = getShortenedUrlByCode(fullCode);

        if (shortUrl) {
            // Register the click for analytics
            registerClick(shortUrl.id);

            // Perform the redirection immediately
            let destination = shortUrl.originalUrl;
            // Ensure destination has a protocol
            if (!/^https?:\/\//i.test(destination)) {
                destination = `https://${destination}`;
            }
            window.location.href = destination;
        } else {
            setError(true);
            setIsRedirecting(false);
        }
    }, [params.code, getShortenedUrlByCode, registerClick, isLoaded]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full text-center space-y-6"
                >
                    <div className="flex justify-center">
                        <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20">
                            <AlertCircle className="h-12 w-12 text-red-500" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold font-display">Link Not Found</h1>
                    <p className="text-muted-foreground">
                        The link you&apos;re trying to reach doesn&apos;t exist or has expired.
                        Please check the URL or contact the sender.
                    </p>
                    <div className="pt-4">
                        <Button asChild size="lg" className="rounded-2xl">
                            <Link href="/">
                                <Home className="mr-2 h-5 w-5" /> Go Back Home
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
            {/* Background elements to match the hero style */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full text-center space-y-8 relative z-10"
            >
                <div className="space-y-4">
                    <div className="flex justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                            <Loader2 className="h-12 w-12 text-primary" />
                        </motion.div>
                    </div>
                    <h1 className="text-4xl font-extrabold font-display tracking-tight">Redirecting...</h1>
                    <p className="text-lg text-muted-foreground">
                        We&apos;re taking you to your destination at light speed.
                    </p>
                </div>

                <div className="p-6 rounded-3xl bg-secondary/50 border border-white/5 backdrop-blur-xl">
                    <div className="flex items-center justify-between text-sm uppercase tracking-widest font-bold text-primary mb-2">
                        <span>Nanourl Security Check</span>
                        <div className="flex gap-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-left">
                        <div className="p-3 rounded-2xl bg-primary/20">
                            <ExternalLink className="h-6 w-6 text-primary" />
                        </div>
                        <div className="overflow-hidden">
                            <div className="text-xs text-muted-foreground mb-0.5">Destination</div>
                            <div className="font-medium truncate text-foreground">
                                Routing through NanoUrl servers...
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-xs text-muted-foreground uppercase tracking-tighter">
                    Encryption Active • Ultra-Secure Routing
                </div>
            </motion.div>
        </div>
    );
}
