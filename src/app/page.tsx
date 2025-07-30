import Link from "next/link";
import Image from "next/image";
import { videos, seoCategories } from "@/lib/video-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function HomePage() {
  const featuredVideo = videos[7]; // Sister Squad drama
  const latestVideos = videos.slice(0, 6);

  return (
    <div className="container mx-auto px-6">
      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight">
            What Happened to Your Favorite YouTubers?
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The ultimate source for YouTube drama, scandals, and the real
            stories behind creator controversies. Discover what really happened
            to the biggest names on YouTube.
          </p>
        </div>

        {/* Featured Video */}
        <Card className="overflow-hidden border border-border shadow-sm py-0">
          <div className="grid md:grid-cols-2 gap-0">
            <AspectRatio ratio={16 / 9} className="relative bg-muted">
              <Image
                src={featuredVideo.thumbnailUrl}
                alt={featuredVideo.title}
                fill
                className="object-contain"
                priority
              />
              {/* <Badge className="absolute bottom-4 left-4" variant="default">
                FEATURED
              </Badge> */}
            </AspectRatio>
            <div className="p-6 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">
                {featuredVideo.title}
              </h2>
              <p className="text-muted-foreground mb-4 text-base">
                {featuredVideo.teaser}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {featuredVideo.keywords.slice(0, 3).map((keyword) => (
                  <Badge key={keyword} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
              <div>
                <Button asChild size="default">
                  <Link href={`/video/${featuredVideo.slug}`}>
                    Watch Full Recap
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Categories */}
      <section className="py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">
          Trending Topics
        </h2>
        <div className="flex flex-wrap gap-2">
          {seoCategories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="text-sm px-3 py-1.5"
              asChild
            >
              <Link href={`/${category.toLowerCase().replace(/\s+/g, "-")}`}>
                {category}
              </Link>
            </Badge>
          ))}
        </div>
      </section>

      {/* Latest Videos Grid */}
      <section className="py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">
          Latest YouTube Drama & Recaps
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {latestVideos.map((video) => (
            <Link
              key={video.id}
              href={`/video/${video.slug}`}
              className="group"
            >
              <Card className="h-full overflow-hidden border border-border transition-all hover:shadow-md hover:-translate-y-0.5">
                <CardHeader className="p-0">
                  <AspectRatio
                    ratio={16 / 9}
                    className="relative overflow-hidden bg-muted"
                  >
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </AspectRatio>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2 line-clamp-2 font-semibold">
                    {video.title}
                  </CardTitle>
                  <CardDescription className="text-sm mb-3 line-clamp-2">
                    {video.teaser}
                  </CardDescription>
                  <div className="flex flex-wrap gap-1.5">
                    {video.keywords.slice(0, 2).map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="secondary"
                        className="text-xs px-2 py-0.5"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">
          Your Source for YouTube Drama and Creator Updates
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 border border-border">
            <CardTitle className="text-xl font-serif mb-3">
              What Happened to Your Favorite YouTubers?
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              From Sister Squad breakups to mukbang controversies, we cover all
              the drama that shook the YouTube community. Our in-depth recaps
              reveal the truth behind creator feuds, disappearances, and
              scandals that changed YouTube forever.
            </CardDescription>
          </Card>
          <Card className="p-6 border border-border">
            <CardTitle className="text-xl font-serif mb-3">
              Stay Updated on YouTube Drama
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              Whether it&apos;s Dramageddon 2.0, the latest beauty guru feud, or
              finding out where your favorite creators ended up, YouTuber Recap
              brings you comprehensive coverage of all the tea spilled across
              the platform.
            </CardDescription>
          </Card>
        </div>
      </section>

      {/* More Videos */}
      <section className="py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">
          More YouTube Scandals & Updates
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {videos.slice(6).map((video) => (
            <Link
              key={video.id}
              href={`/video/${video.slug}`}
              className="group"
            >
              <Card className="h-full overflow-hidden border border-border transition-all hover:shadow-md hover:-translate-y-0.5">
                <CardHeader className="p-0">
                  <AspectRatio
                    ratio={16 / 9}
                    className="relative overflow-hidden bg-muted"
                  >
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </AspectRatio>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2 line-clamp-2 font-semibold">
                    {video.title}
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {video.teaser}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 mb-8">
        <Card className="p-8 md:p-12 text-center bg-accent border-accent">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl md:text-3xl font-serif mb-3">
              Never Miss the Drama
            </CardTitle>
            <CardDescription className="text-base md:text-lg mb-6 max-w-2xl mx-auto text-accent-foreground">
              Get the latest updates on YouTube controversies, creator feuds,
              and find out what really happened to your favorite internet
              personalities.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex gap-3 justify-center flex-wrap">
              <Button asChild size="default">
                <Link href="/youtube-drama-2024">Latest Drama</Link>
              </Button>
              <Button asChild variant="outline" size="default">
                <Link href="/what-happened-to">Browse All Recaps</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
