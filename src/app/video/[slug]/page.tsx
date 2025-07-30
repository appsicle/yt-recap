import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { videos, getRelatedVideos, generateMetaTags } from "@/lib/video-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface VideoPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return videos.map((video) => ({
    slug: video.slug,
  }));
}

export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const video = videos.find((v) => v.slug === params.slug);
  
  if (!video) {
    return {
      title: "Video Not Found - YouTuber Recap",
    };
  }

  const metaTags = generateMetaTags(video);
  return metaTags;
}

export default function VideoPage({ params }: VideoPageProps) {
  const video = videos.find((v) => v.slug === params.slug);
  
  if (!video) {
    notFound();
  }

  const relatedVideos = getRelatedVideos(video.id);
  const videoId = video.url.split("v=")[1]?.split("&")[0];

  return (
    <article className="container mx-auto px-6 py-8">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/youtube-drama-2024">YouTube Drama</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-sm">{video.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 leading-tight">{video.title}</h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
          <time dateTime={video.publishDate}>
            {new Date(video.publishDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          {video.metaDescription}
        </p>
      </header>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8 max-w-4xl mx-auto">
        {video.keywords.map((keyword) => (
          <Badge key={keyword} variant="secondary" className="text-xs px-3 py-1" asChild>
            <Link href={`/${keyword.toLowerCase().replace(/\s+/g, "-")}`}>
              {keyword}
            </Link>
          </Badge>
        ))}
      </div>

      {/* Video Embed */}
      <section className="max-w-4xl mx-auto mb-12">
        <AspectRatio ratio={16 / 9} className="rounded-lg overflow-hidden shadow-md bg-muted border border-border">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </AspectRatio>
      </section>

      {/* Article Content */}
      <section className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-serif font-bold mb-4">The Full Story</h2>
        <p className="text-base text-muted-foreground leading-relaxed mb-8">
          {video.teaser}
        </p>
        
        <h3 className="text-xl font-serif font-semibold mb-3">What You'll Discover</h3>
        <p className="text-base text-muted-foreground leading-relaxed mb-8">
          This comprehensive recap dives deep into one of YouTube's most talked-about stories. 
          Watch the full video above to uncover all the details, shocking revelations, and insider information 
          that will finally answer your questions about what really happened.
        </p>

        <Card className="bg-secondary border border-secondary my-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-serif">Key Topics Covered</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {video.relatedTopics.map((topic) => (
                <li key={topic} className="flex items-start text-sm">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-secondary-foreground">{topic}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <p className="text-base text-muted-foreground leading-relaxed">
          Don't miss this explosive deep dive into one of YouTube's most controversial moments. 
          The truth behind the drama will leave you speechless.
        </p>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto mb-12">
        <Card className="bg-primary text-primary-foreground text-center border-primary p-8">
          <CardHeader className="pb-3 px-0 pt-0">
            <CardTitle className="text-2xl font-serif">Want More YouTube Drama?</CardTitle>
            <CardDescription className="text-primary-foreground/90 text-base mt-2">
              Subscribe to never miss the latest creator controversies and scandals
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 pb-0 px-0">
            <Button asChild size="default" variant="ghost" className="text-secondary">
              <Link href={video.url} target="_blank" rel="noopener noreferrer">
                Watch on YouTube
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Related Videos */}
      <section>
        <h2 className="text-2xl font-serif font-bold mb-6">More Drama You'll Love</h2>
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {relatedVideos.map((relatedVideo) => (
            <Link key={relatedVideo.id} href={`/video/${relatedVideo.slug}`} className="group">
              <Card className="h-full overflow-hidden border border-border transition-all hover:shadow-md hover:-translate-y-0.5">
                <CardHeader className="p-0">
                  <AspectRatio ratio={16 / 9} className="relative overflow-hidden bg-muted">
                    <Image
                      src={relatedVideo.thumbnailUrl}
                      alt={relatedVideo.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </AspectRatio>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-base mb-2 line-clamp-2 font-semibold">{relatedVideo.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {relatedVideo.teaser}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}