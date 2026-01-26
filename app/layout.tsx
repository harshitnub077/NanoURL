import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Poppins, Outfit } from 'next/font/google';
import { LayoutClient } from '@/components/layout-client';
import { ShortenedUrlProvider } from '@/context/shortened-url-context';
import { PerformanceProvider } from '@/context/performance-context';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { SEO } from '@/components/seo';
import { Toaster } from 'sonner';

const poppins = Poppins({ 
  subsets: ['latin'], 
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800']
});
const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: {
    default: 'NanoURL - Modern URL Shortener',
    template: '%s | NanoURL'
  },
  description: 'Create short, branded links with real-time analytics. The fastest and most beautiful URL shortener built with Next.js, React, and TypeScript.',
  keywords: ['URL shortener', 'link shortener', 'analytics', 'branding', 'Next.js', 'React', 'TypeScript'],
  authors: [{ name: 'Harshit Kudhial' }],
  creator: 'Harshit Kudhial',
  publisher: 'NanoURL',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'http://localhost:3000',
    title: 'NanoURL - Modern URL Shortener',
    description: 'Create short, branded links with real-time analytics. The fastest and most beautiful URL shortener built with Next.js and TypeScript.',
    siteName: 'NanoURL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NanoURL - Modern URL Shortener',
    description: 'Create short, branded links with real-time analytics. The fastest and most beautiful URL shortener built with Next.js and TypeScript.',
    creator: '@yourusername',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SEO />
      <body className={`${poppins.variable} ${outfit.variable} font-sans antialiased bg-background text-foreground`} suppressHydrationWarning>
        <ErrorBoundary>
          <PerformanceProvider>
            <ShortenedUrlProvider>
              <LayoutClient>
                {children}
              </LayoutClient>
              <Toaster
                position="bottom-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    color: 'hsl(var(--card-foreground))',
                  },
                }}
              />
            </ShortenedUrlProvider>
          </PerformanceProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}