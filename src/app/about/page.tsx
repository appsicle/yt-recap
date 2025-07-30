import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About YouTuber Recap - Your Source for YouTube Drama",
  description: "Learn about YouTuber Recap, the ultimate destination for YouTube drama, creator controversies, and 'what happened to' stories.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">About YouTuber Recap</h1>
        
        <Card className="p-10 mb-12 bg-secondary border-secondary">
          <CardContent className="p-0">
            <p className="text-secondary-foreground text-lg md:text-xl leading-relaxed mb-0">
              YouTuber Recap is your ultimate destination for comprehensive coverage of YouTube drama, 
              creator controversies, and the stories behind your favorite content creators' biggest moments.
            </p>
          </CardContent>
        </Card>

        <div>
          <section className="py-12">
            <h2 className="text-3xl font-serif font-bold mb-10">What We Cover</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Creator Drama</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    From Sister Squad breakups to mukbang controversies, we dive deep into the feuds 
                    and conflicts that shape the YouTube community.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">What Happened To Stories</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Wondering where your favorite creators went? We track down the truth behind 
                    disappearances and career changes.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">YouTube History</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    We document the moments that changed YouTube forever, from Dramageddon to 
                    the rise and fall of creator groups.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Comprehensive Recaps</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Our in-depth video recaps provide all the context, timeline, and details you 
                    need to understand complex YouTube stories.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="py-12">
            <h2 className="text-3xl font-serif font-bold mb-10">Why YouTuber Recap?</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              The YouTube landscape moves fast. Creators rise and fall, friendships break apart, 
              and controversies emerge overnight. It's hard to keep track of everything happening 
              in the creator economy.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              That's where we come in. YouTuber Recap provides thorough, well-researched recaps 
              that give you the full story - not just the headlines. We dig deep to uncover the 
              truth behind the drama, providing context and timeline that helps you understand 
              what really happened.
            </p>
          </section>

          <section className="py-12">
            <h2 className="text-3xl font-serif font-bold mb-10">Our Mission</h2>
            <Card className="p-8 bg-accent border-accent">
              <CardContent className="p-0">
                <p className="text-accent-foreground mb-0 text-lg md:text-xl leading-relaxed">
                  To be the most comprehensive and reliable source for YouTube creator news, 
                  drama recaps, and "what happened to" stories, helping viewers stay informed 
                  about their favorite content creators.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="text-center py-12">
            <h2 className="text-3xl font-serif font-bold mb-6">Start Exploring</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Ready to dive into the latest YouTube drama and creator updates?
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild size="lg">
                <Link href="/">
                  Browse All Recaps
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/youtube-drama-2024">
                  Latest Drama
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/what-happened-to">
                  Where Are They Now
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}