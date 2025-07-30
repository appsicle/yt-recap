import type { Metadata } from "next";
import Link from "next/link";
import { Poppins, Libre_Baskerville, IBM_Plex_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "YouTuber Recap - What Happened to Your Favorite YouTube Stars",
  description: "The ultimate source for YouTube drama, scandals, and 'what happened to' stories. Discover the truth behind your favorite creators' controversies and disappearances.",
  keywords: "youtube drama, youtuber recap, what happened to, youtube scandals, influencer drama, content creator news, youtube tea, creator updates",
  openGraph: {
    title: "YouTuber Recap - What Happened to Your Favorite YouTube Stars",
    description: "The ultimate source for YouTube drama, scandals, and 'what happened to' stories.",
    url: "https://youtuberrecap.com",
    siteName: "YouTuber Recap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTuber Recap",
    description: "The ultimate source for YouTube drama and creator updates",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${poppins.variable} ${libreBaskerville.variable} ${ibmPlexMono.variable} antialiased`}>
        <header className="py-4 mb-4 border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xl font-bold text-primary hover:text-primary/80 transition-colors font-serif">
                YouTuber Recap
              </Link>
              <nav className="hidden md:flex items-center gap-8">
                <Link href="/youtube-drama-2024" className="text-sm hover:text-primary transition-colors">
                  Latest Drama
                </Link>
                <Link href="/what-happened-to" className="text-sm hover:text-primary transition-colors">
                  Where Are They Now
                </Link>
                <Link href="/youtube-scandals" className="text-sm hover:text-primary transition-colors">
                  Scandals
                </Link>
                <Link href="/about" className="text-sm hover:text-primary transition-colors">
                  About
                </Link>
              </nav>
              <Button variant="ghost" size="icon" className="md:hidden h-8 w-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </Button>
            </div>
          </div>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="pt-10 mb-0 bg-muted mt-16 border-t border-border">
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-3">
                <h3 className="font-semibold text-base">Popular Topics</h3>
                <ul className="space-y-2">
                  <li><Link href="/sister-squad-drama" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sister Squad Drama</Link></li>
                  <li><Link href="/mukbang-controversies" className="text-sm text-muted-foreground hover:text-primary transition-colors">Mukbang Controversies</Link></li>
                  <li><Link href="/beauty-guru-feuds" className="text-sm text-muted-foreground hover:text-primary transition-colors">Beauty Guru Feuds</Link></li>
                  <li><Link href="/youtube-breakups" className="text-sm text-muted-foreground hover:text-primary transition-colors">YouTube Breakups</Link></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-base">Trending Creators</h3>
                <ul className="space-y-2">
                  <li><Link href="/james-charles-drama" className="text-sm text-muted-foreground hover:text-primary transition-colors">James Charles</Link></li>
                  <li><Link href="/emma-chamberlain-scandal" className="text-sm text-muted-foreground hover:text-primary transition-colors">Emma Chamberlain</Link></li>
                  <li><Link href="/mukbang-controversies" className="text-sm text-muted-foreground hover:text-primary transition-colors">Nikocado Avocado</Link></li>
                  <li><Link href="/ex-buzzfeed-creators" className="text-sm text-muted-foreground hover:text-primary transition-colors">Ex-BuzzFeed Stars</Link></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-base">Categories</h3>
                <ul className="space-y-2">
                  <li><Link href="/youtube-drama-2024" className="text-sm text-muted-foreground hover:text-primary transition-colors">Drama & Tea</Link></li>
                  <li><Link href="/what-happened-to" className="text-sm text-muted-foreground hover:text-primary transition-colors">Disappearances</Link></li>
                  <li><Link href="/youtube-scandals" className="text-sm text-muted-foreground hover:text-primary transition-colors">Controversies</Link></li>
                  <li><Link href="/what-happened-to" className="text-sm text-muted-foreground hover:text-primary transition-colors">Updates</Link></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-base">About</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  YouTuber Recap is your ultimate source for YouTube drama, creator updates, and the stories behind the scandals.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-border text-center text-muted-foreground text-xs">
              <span>&copy; 2025 YouTuber Recap. All rights reserved.</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}