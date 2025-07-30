import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { videos, getVideosByKeyword, generateSEOPaths } from "@/lib/video-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface DynamicPageProps {
  params: { slug: string[] };
}

const pageContent: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  "youtube-drama-2024": {
    title: "YouTube Drama 2024 - Latest Creator Controversies & Scandals",
    description:
      "Stay updated with the biggest YouTube drama of 2024. From creator feuds to shocking revelations, get all the tea on your favorite YouTubers.",
    keywords: [
      "youtube drama 2024",
      "creator controversies",
      "influencer scandals",
      "youtube tea",
    ],
  },
  "what-happened-to": {
    title: "What Happened To Your Favorite YouTubers - Where Are They Now",
    description:
      "Discover what happened to disappeared YouTubers and creators who left the platform. Get answers about your favorite content creators.",
    keywords: [
      "what happened to",
      "youtuber disappearances",
      "where are they now",
      "creator updates",
    ],
  },
  "youtube-scandals": {
    title: "Biggest YouTube Scandals - Shocking Creator Controversies",
    description:
      "The most shocking YouTube scandals that rocked the platform. From beauty guru feuds to creator controversies that changed everything.",
    keywords: [
      "youtube scandals",
      "creator controversies",
      "influencer drama",
      "youtube exposures",
    ],
  },
  "sister-squad-drama": {
    title: "Sister Squad Drama - James Charles, Emma Chamberlain & Dolan Twins",
    description:
      "The complete story of Sister Squad's dramatic breakup. Dramageddon 2.0, Ethma rumors, and everything that tore YouTube's biggest friend group apart.",
    keywords: [
      "sister squad",
      "james charles drama",
      "emma chamberlain",
      "dolan twins",
      "dramageddon",
    ],
  },
  "mukbang-controversies": {
    title: "Mukbang YouTuber Controversies - Stephanie Soo, Nikocado & More",
    description:
      "All the drama from the mukbang community. From Stephanie Soo vs Nikocado Avocado to other food YouTuber feuds.",
    keywords: [
      "mukbang drama",
      "stephanie soo",
      "nikocado avocado",
      "food youtuber controversies",
    ],
  },
  "beauty-guru-feuds": {
    title: "Beauty Guru Feuds - Makeup Community Drama & Tea",
    description:
      "The biggest beauty guru feuds that shook the makeup community. From Tati vs James Charles to other shocking beauty influencer drama.",
    keywords: [
      "beauty guru drama",
      "makeup youtuber feuds",
      "beauty community tea",
      "tati westbrook",
    ],
  },
  "youtube-breakups": {
    title: "YouTube Group Breakups - Why Your Favorite Squads Split",
    description:
      "Why did your favorite YouTube groups break up? From O2L to Sister Squad, discover the real reasons behind YouTube's biggest splits.",
    keywords: [
      "youtube breakups",
      "youtube groups",
      "squad breakups",
      "collab channel drama",
    ],
  },
  "ex-buzzfeed-creators": {
    title: "Ex-BuzzFeed Creators - Where Are They Now in 2024",
    description:
      "Track the careers of former BuzzFeed employees. From Try Guys to Safiya Nygaard, see what happened after they left BuzzFeed.",
    keywords: [
      "ex buzzfeed",
      "try guys",
      "safiya nygaard",
      "buzzfeed alumni",
      "ladylike",
    ],
  },
  "james-charles-drama": {
    title: "James Charles Drama - Sister Squad to Scandals",
    description:
      "Complete timeline of James Charles controversies, from Sister Squad drama to Dramageddon 2.0 and beyond.",
    keywords: [
      "james charles",
      "sister squad",
      "dramageddon",
      "beauty guru drama",
    ],
  },
  "emma-chamberlain-scandal": {
    title: "Emma Chamberlain Drama & Sister Squad Breakup",
    description:
      "The truth about Emma Chamberlain's exit from Sister Squad, Ethma rumors, and her YouTube journey.",
    keywords: ["emma chamberlain", "sister squad", "ethma", "dolan twins"],
  },
  // Individual creator/topic pages
  "stephanie-soo": {
    title: "Stephanie Soo Drama - Mukbang Controversies & Feuds",
    description: "All the drama involving mukbanger Stephanie Soo, from the Nikocado Avocado feud to other controversies.",
    keywords: ["stephanie soo", "mukbang drama", "nikocado avocado", "veronica wang"],
  },
  "nikocado-avocado": {
    title: "Nikocado Avocado Controversies - Mukbang Drama & Feuds",
    description: "The complete story of Nikocado Avocado's YouTube controversies and mukbang community drama.",
    keywords: ["nikocado avocado", "mukbang drama", "stephanie soo", "youtube feuds"],
  },
  "try-guys": {
    title: "Try Guys Drama - From BuzzFeed to Scandal",
    description: "The Try Guys journey from BuzzFeed to independence, including the shocking scandal that rocked their channel.",
    keywords: ["try guys", "buzzfeed", "ned fulmer", "youtube scandal"],
  },
  "ladylike": {
    title: "Ladylike - Ex-BuzzFeed Creators Where Are They Now",
    description: "What happened to the Ladylike crew after leaving BuzzFeed? Track their independent careers.",
    keywords: ["ladylike", "buzzfeed", "female youtubers", "content creators"],
  },
  "bestdressed": {
    title: "What Happened to Bestdressed (Ashley)?",
    description: "The story behind fashion YouTuber bestdressed's disappearance and the controversies that led to her hiatus.",
    keywords: ["bestdressed", "ashley bestdressed", "fashion youtuber", "youtube disappearance"],
  },
  "nigahiga": {
    title: "What Happened to Nigahiga (Ryan Higa)?",
    description: "Where did YouTube legend Ryan Higa go? The story of nigahiga's transition away from YouTube.",
    keywords: ["nigahiga", "ryan higa", "youtube og", "rhpc"],
  },
  "o2l": {
    title: "O2L (Our 2nd Life) - Why Did They Break Up?",
    description: "The real reasons behind O2L's breakup, from Connor Franta's departure to the group's final days.",
    keywords: ["o2l", "our 2nd life", "connor franta", "kian and jc"],
  },
  "connor-franta": {
    title: "Connor Franta - O2L Drama & Coming Out Story",
    description: "Connor Franta's journey from O2L member to independent creator, including his coming out story.",
    keywords: ["connor franta", "o2l", "youtube coming out", "lgbtq youtubers"],
  },
  "dolan-twins": {
    title: "Dolan Twins - Sister Squad Drama & YouTube Exit",
    description: "What happened to the Dolan Twins? From Sister Squad to stepping back from YouTube.",
    keywords: ["dolan twins", "sister squad", "ethma", "youtube twins"],
  },
  "james-charles": {
    title: "James Charles Drama Timeline - All Controversies",
    description: "Complete timeline of James Charles controversies, from Dramageddon to recent scandals.",
    keywords: ["james charles", "dramageddon", "sister squad", "beauty guru drama"],
  },
  "emma-chamberlain": {
    title: "Emma Chamberlain - Sister Squad Drama & Success Story",
    description: "Emma Chamberlain's YouTube journey, Sister Squad breakup, and rise to mainstream fame.",
    keywords: ["emma chamberlain", "sister squad", "ethma", "youtube success"],
  },
  "zoella": {
    title: "Zoella Controversies - Advent Calendar to Ghost Writing",
    description: "All of Zoella's controversies explained, from the advent calendar scandal to ghostwriting drama.",
    keywords: ["zoella", "british youtubers", "advent calendar", "youtube uk"],
  },
  "tati-westbrook": {
    title: "Tati Westbrook - Dramageddon & Beauty Guru Feuds",
    description: "Tati Westbrook's role in Dramageddon, the Bye Sister video, and beauty community drama.",
    keywords: ["tati westbrook", "dramageddon", "james charles", "beauty guru drama"],
  },
  // Missing routes found during crawl
  "beauty-community-drama": {
    title: "Beauty Community Drama - Makeup YouTuber Feuds & Tea",
    description: "All the drama from the beauty community on YouTube. From Dramageddon to palette controversies, get the full story.",
    keywords: ["beauty community", "makeup drama", "beauty guru feuds", "youtube beauty tea"],
  },
  "creator-disappearances": {
    title: "YouTuber Disappearances - Where Did They Go?",
    description: "Tracking down disappeared YouTubers and content creators who vanished from the platform. Find out what really happened.",
    keywords: ["youtuber disappearances", "where are they now", "youtube mysteries", "creator hiatus"],
  },
  "influencer-controversies": {
    title: "Influencer Controversies - YouTube Creator Scandals",
    description: "The biggest influencer controversies that shook YouTube. From sponsorship scandals to public meltdowns.",
    keywords: ["influencer controversies", "youtube scandals", "creator drama", "influencer tea"],
  },
  "where-are-they-now": {
    title: "Where Are They Now - Tracking Your Favorite YouTubers",
    description: "Find out where your favorite YouTubers ended up. From career changes to platform switches, we track them all.",
    keywords: ["where are they now", "youtuber updates", "creator tracking", "youtube alumni"],
  },
  "youtube-drama": {
    title: "YouTube Drama - All the Creator Controversies & Tea",
    description: "Your comprehensive source for all YouTube drama, creator feuds, and platform controversies.",
    keywords: ["youtube drama", "creator tea", "youtube controversies", "influencer feuds"],
  },
  "youtube-history": {
    title: "YouTube History - Moments That Changed the Platform",
    description: "The most significant moments in YouTube history, from platform-changing scandals to creator milestones.",
    keywords: ["youtube history", "platform evolution", "youtube milestones", "creator history"],
  },
  "mukbanger-feud": {
    title: "Mukbanger Feuds - Food YouTuber Drama & Controversies",
    description: "All the drama from the mukbang community, featuring feuds between popular food YouTubers.",
    keywords: ["mukbanger feud", "food youtuber drama", "mukbang controversies", "eating show drama"],
  },
  "stephanie-soo-scandal": {
    title: "Stephanie Soo Scandal - Nikocado Drama Explained",
    description: "The complete breakdown of Stephanie Soo's controversies, including the explosive Nikocado Avocado feud.",
    keywords: ["stephanie soo scandal", "nikocado drama", "mukbang feud", "youtube controversy"],
  },
  "youtube-controversies": {
    title: "YouTube Controversies - Platform Scandals & Creator Drama",
    description: "Every major YouTube controversy explained. From algorithm scandals to creator feuds that changed the platform.",
    keywords: ["youtube controversies", "platform scandals", "creator drama", "youtube tea"],
  },
  "youtube-drama-2019": {
    title: "YouTube Drama 2019 - The Year Everything Changed",
    description: "2019 was YouTube's most dramatic year. From Dramageddon 2.0 to Sister Squad's breakup, relive the chaos.",
    keywords: ["youtube drama 2019", "dramageddon", "sister squad", "james charles scandal"],
  },
  // Long-tail SEO: "What happened to" specific queries
  "what-happened-to-sister-squad": {
    title: "What Happened to Sister Squad? The Complete Story",
    description: "The real story behind Sister Squad's dramatic breakup. Why did James Charles, Emma Chamberlain, and the Dolan Twins stop being friends?",
    keywords: ["what happened to sister squad", "sister squad breakup", "james charles emma chamberlain", "dolan twins drama"],
  },
  "what-happened-to-emma-chamberlain": {
    title: "What Happened to Emma Chamberlain? Where Is She Now?",
    description: "From Sister Squad member to mainstream success - what happened to Emma Chamberlain after the YouTube drama?",
    keywords: ["what happened to emma chamberlain", "emma chamberlain now", "emma chamberlain 2024", "where is emma chamberlain"],
  },
  "what-happened-to-james-charles": {
    title: "What Happened to James Charles? Drama Timeline & Updates",
    description: "Everything that happened to James Charles - from Dramageddon to recent controversies. Get the full timeline.",
    keywords: ["what happened to james charles", "james charles controversy", "james charles drama timeline", "james charles now"],
  },
  "what-happened-to-nikocado-avocado": {
    title: "What Happened to Nikocado Avocado? The Shocking Truth",
    description: "The controversial journey of Nikocado Avocado - from vegan YouTuber to mukbang drama king. What really happened?",
    keywords: ["what happened to nikocado avocado", "nikocado avocado drama", "nikocado transformation", "mukbang controversy"],
  },
  "what-happened-to-stephanie-soo": {
    title: "What Happened to Stephanie Soo? Mukbang Drama Explained",
    description: "The truth about what happened between Stephanie Soo and Nikocado Avocado, plus where she is now.",
    keywords: ["what happened to stephanie soo", "stephanie soo drama", "stephanie soo nikocado", "mukbang drama"],
  },
  "what-happened-to-bestdressed": {
    title: "What Happened to Bestdressed (Ashley)? Why She Disappeared",
    description: "Fashion YouTuber bestdressed vanished from the platform. Here's what really happened to Ashley and why she left.",
    keywords: ["what happened to bestdressed", "ashley bestdressed disappearance", "bestdressed controversy", "fashion youtuber drama"],
  },
  "what-happened-to-nigahiga": {
    title: "What Happened to Nigahiga? Where Is Ryan Higa Now?",
    description: "YouTube legend Ryan Higa (nigahiga) stepped back from the platform. Find out what happened and where he is now.",
    keywords: ["what happened to nigahiga", "ryan higa now", "nigahiga disappearance", "youtube og creators"],
  },
  "what-happened-to-o2l": {
    title: "What Happened to O2L? Why Our 2nd Life Broke Up",
    description: "The real reasons O2L (Our 2nd Life) broke up - from Connor Franta leaving to the group's final days.",
    keywords: ["what happened to o2l", "our 2nd life breakup", "o2l drama", "connor franta o2l"],
  },
  "what-happened-to-the-dolan-twins": {
    title: "What Happened to the Dolan Twins? Why They Left YouTube",
    description: "Ethan and Grayson Dolan were YouTube superstars until they disappeared. Here's what happened to the Dolan Twins.",
    keywords: ["what happened to the dolan twins", "dolan twins quit youtube", "ethan grayson dolan now", "dolan twins 2024"],
  },
  "what-happened-to-connor-franta": {
    title: "What Happened to Connor Franta? From O2L to Now",
    description: "Connor Franta's journey from O2L member to independent creator - including his coming out story and current projects.",
    keywords: ["what happened to connor franta", "connor franta now", "connor franta o2l drama", "connor franta 2024"],
  },
  "what-happened-to-jennxpenn": {
    title: "What Happened to JennxPenn? YouTube Squad Drama",
    description: "JennxPenn was part of YouTube's biggest girl squad. Find out what happened and where she is now.",
    keywords: ["what happened to jennxpenn", "jennxpenn drama", "jennxpenn now", "youtube girl squad"],
  },
  "what-happened-to-andrea-russett": {
    title: "What Happened to Andrea Russett? From YouTube to Hollywood",
    description: "Andrea Russett's transformation from YouTube star to actress - what happened along the way?",
    keywords: ["what happened to andrea russett", "andrea russett now", "andrea russett youtube", "andrea russett 2024"],
  },
  "what-happened-to-zoella": {
    title: "What Happened to Zoella? Rise and Fall of a YouTube Queen",
    description: "From advent calendar scandal to ghostwriting controversy - what really happened to Zoella?",
    keywords: ["what happened to zoella", "zoella controversy", "zoella scandal", "british youtuber drama"],
  },
  "what-happened-to-tati-westbrook": {
    title: "What Happened to Tati Westbrook After Dramageddon?",
    description: "Tati Westbrook started Dramageddon with 'Bye Sister.' Here's what happened to her after the drama.",
    keywords: ["what happened to tati westbrook", "tati westbrook now", "tati after dramageddon", "bye sister aftermath"],
  },
  // Long-tail compound queries
  "why-did-sister-squad-break-up": {
    title: "Why Did Sister Squad Break Up? The Real Reasons Revealed",
    description: "The truth about why Sister Squad broke up - from secret relationships to Dramageddon 2.0.",
    keywords: ["why did sister squad break up", "sister squad breakup reasons", "sister squad drama explained", "youtube squad breakup"],
  },
  "james-charles-and-emma-chamberlain-drama": {
    title: "James Charles and Emma Chamberlain Drama - What Really Happened",
    description: "The complete story of the drama between James Charles and Emma Chamberlain that ended Sister Squad.",
    keywords: ["james charles emma chamberlain drama", "sister squad feud", "youtube friendship drama", "influencer feuds"],
  },
  "stephanie-soo-and-nikocado-avocado-drama": {
    title: "Stephanie Soo and Nikocado Avocado Drama - The Full Story",
    description: "Everything about the explosive feud between mukbangers Stephanie Soo and Nikocado Avocado.",
    keywords: ["stephanie soo nikocado drama", "mukbang feud", "youtube food drama", "mukbanger controversy"],
  },
  "emma-chamberlain-and-dolan-twins-relationship": {
    title: "Emma Chamberlain and Dolan Twins - The Ethma Relationship Explained",
    description: "Was Ethma real? The truth about Emma Chamberlain and Ethan Dolan's rumored relationship.",
    keywords: ["emma chamberlain dolan twins", "ethma relationship", "ethan dolan emma chamberlain", "youtube couples"],
  },
  "youtube-drama-timeline-2019": {
    title: "YouTube Drama Timeline 2019 - Every Scandal That Year",
    description: "A complete timeline of 2019's YouTube drama - the year that changed everything with Dramageddon 2.0.",
    keywords: ["youtube drama timeline 2019", "2019 youtube scandals", "dramageddon timeline", "youtube controversies 2019"],
  },
  "where-is-emma-chamberlain-now": {
    title: "Where Is Emma Chamberlain Now? Life After YouTube Drama",
    description: "Emma Chamberlain's current projects and success after leaving Sister Squad and YouTube drama behind.",
    keywords: ["where is emma chamberlain now", "emma chamberlain 2024", "emma chamberlain current", "emma chamberlain today"],
  },
  "where-are-the-dolan-twins-now": {
    title: "Where Are the Dolan Twins Now? Life After YouTube",
    description: "What Ethan and Grayson Dolan are doing now after stepping back from YouTube.",
    keywords: ["where are the dolan twins now", "dolan twins 2024", "ethan grayson dolan current", "dolan twins today"],
  },
  "is-sister-squad-still-friends": {
    title: "Is Sister Squad Still Friends? The Current Status",
    description: "Are James Charles, Emma Chamberlain, and the Dolan Twins still friends? The current status of their relationships.",
    keywords: ["is sister squad still friends", "sister squad now", "sister squad relationship status", "youtube friendships"],
  },
  "biggest-youtube-scandals-2019": {
    title: "Biggest YouTube Scandals 2019 - The Year of Drama",
    description: "2019's biggest YouTube scandals ranked - from Dramageddon to Sister Squad's breakup.",
    keywords: ["biggest youtube scandals 2019", "youtube drama 2019", "2019 controversies", "youtube scandals ranked"],
  },
  "youtube-beauty-community-drama-timeline": {
    title: "YouTube Beauty Community Drama Timeline - Every Feud Explained",
    description: "A complete timeline of beauty community drama on YouTube - from the beginning to now.",
    keywords: ["beauty community drama timeline", "beauty guru feuds", "makeup youtube drama", "beauty influencer scandals"],
  },
};

export async function generateMetadata({
  params,
}: DynamicPageProps): Promise<Metadata> {
  const slug = params.slug.join("/");
  const content = pageContent[slug];

  if (!content) {
    return {
      title: "YouTube Drama & Creator Updates - YouTuber Recap",
      description: "The latest YouTube drama, scandals, and creator updates.",
    };
  }

  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords.join(", "),
    openGraph: {
      title: content.title,
      description: content.description,
      type: "website",
    },
  };
}

export default function DynamicPage({ params }: DynamicPageProps) {
  const slug = params.slug.join("/");
  const content = pageContent[slug];

  if (!content) {
    // For unmatched paths, create a generic SEO page
    const searchTerm = params.slug[params.slug.length - 1].replace(/-/g, " ");
    const relevantVideos = getVideosByKeyword(searchTerm);

    if (relevantVideos.length === 0) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 capitalize">
          {searchTerm} - YouTube Drama & Updates
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
          Discover all the latest drama and updates about {searchTerm} in the
          YouTube community.
        </p>
        <VideoGrid videos={relevantVideos} />
      </div>
    );
  }

  // Get videos based on the page type
  let filteredVideos = videos;
  if (slug === "sister-squad-drama") {
    filteredVideos = videos.filter((v) =>
      v.title.toLowerCase().includes("sister squad")
    );
  } else if (slug === "mukbang-controversies" || slug === "mukbanger-feud") {
    filteredVideos = videos.filter(
      (v) =>
        v.title.toLowerCase().includes("stephanie soo") ||
        v.title.toLowerCase().includes("nikocado")
    );
  } else if (slug === "ex-buzzfeed-creators") {
    filteredVideos = videos.filter((v) =>
      v.title.toLowerCase().includes("buzzfeed")
    );
  } else if (slug === "what-happened-to" || slug === "where-are-they-now" || slug === "creator-disappearances") {
    filteredVideos = videos; // Show all "what happened to" videos
  } else if (slug === "james-charles-drama" || slug === "james-charles") {
    filteredVideos = videos.filter(
      (v) =>
        v.title.toLowerCase().includes("sister squad") ||
        v.title.toLowerCase().includes("james")
    );
  } else if (slug === "emma-chamberlain-scandal" || slug === "emma-chamberlain") {
    filteredVideos = videos.filter((v) =>
      v.title.toLowerCase().includes("sister squad")
    );
  } else if (slug === "beauty-guru-feuds" || slug === "beauty-community-drama") {
    filteredVideos = videos.filter(
      (v) =>
        v.title.toLowerCase().includes("sister squad") ||
        v.keywords.some((k) => k.toLowerCase().includes("beauty"))
    );
  } else if (slug === "youtube-breakups") {
    filteredVideos = videos.filter(
      (v) =>
        v.title.toLowerCase().includes("squad") ||
        v.title.toLowerCase().includes("o2l") ||
        v.title.toLowerCase().includes("crew")
    );
  } else if (slug === "youtube-drama" || slug === "youtube-controversies" || slug === "influencer-controversies") {
    filteredVideos = videos; // Show all drama videos
  } else if (slug === "youtube-drama-2019") {
    filteredVideos = videos.filter(
      (v) =>
        v.keywords.some((k) => k.toLowerCase().includes("2019")) ||
        v.title.toLowerCase().includes("sister squad")
    );
  } else if (slug === "stephanie-soo" || slug === "stephanie-soo-scandal") {
    filteredVideos = videos.filter((v) =>
      v.title.toLowerCase().includes("stephanie soo")
    );
  } else if (slug === "nikocado-avocado") {
    filteredVideos = videos.filter((v) =>
      v.title.toLowerCase().includes("nikocado")
    );
  } else if (slug === "youtube-history") {
    filteredVideos = videos; // Show all videos as they're all part of YouTube history
  } else if (slug.startsWith("what-happened-to-")) {
    // Handle "what happened to X" queries
    const creator = slug.replace("what-happened-to-", "").replace(/-/g, " ");
    filteredVideos = videos.filter(
      (v) =>
        v.title.toLowerCase().includes(creator) ||
        v.keywords.some((k) => k.toLowerCase().includes(creator)) ||
        v.teaser.toLowerCase().includes(creator)
    );
  } else if (slug.startsWith("where-is-") || slug.startsWith("where-are-")) {
    // Handle "where is/are X now" queries
    const searchTerm = slug.replace(/where-(is|are)-/, "").replace(/-now$/, "").replace(/-/g, " ");
    filteredVideos = videos.filter(
      (v) =>
        v.title.toLowerCase().includes(searchTerm) ||
        v.keywords.some((k) => k.toLowerCase().includes(searchTerm))
    );
  } else if (slug.includes("-and-") && slug.includes("-drama")) {
    // Handle "X and Y drama" queries
    const parts = slug.replace("-drama", "").split("-and-");
    filteredVideos = videos.filter(
      (v) =>
        parts.every(part => 
          v.title.toLowerCase().includes(part.replace(/-/g, " ")) ||
          v.keywords.some((k) => k.toLowerCase().includes(part.replace(/-/g, " ")))
        )
    );
  } else if (slug.startsWith("why-did-")) {
    // Handle "why did X" queries
    const subject = slug.replace("why-did-", "").replace(/-/g, " ");
    filteredVideos = videos.filter(
      (v) =>
        v.title.toLowerCase().includes(subject) ||
        v.keywords.some((k) => k.toLowerCase().includes(subject))
    );
  } else if (slug.includes("-timeline")) {
    // Handle timeline queries
    const topic = slug.replace("-timeline", "").replace(/-/g, " ");
    filteredVideos = videos.filter(
      (v) =>
        v.keywords.some((k) => k.toLowerCase().includes(topic)) ||
        v.title.toLowerCase().includes(topic)
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize">
              {slug.replace(/-/g, " ")}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <header className="pb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
          {content.title}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
          {content.description}
        </p>
      </header>

      {/* Featured Content */}
      {filteredVideos.length > 0 && (
        <section className="py-16">
          <div className="p-10 bg-muted rounded-lg">
            <h2 className="text-3xl font-serif font-bold mb-10">
              Featured Stories
            </h2>
            <VideoGrid videos={filteredVideos} />
          </div>
        </section>
      )}

      {/* SEO Content */}
      <section className="py-16">
        <h2 className="text-3xl font-serif font-bold mb-10">
          Everything You Need to Know
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8">
            <CardContent className="p-0">
              <p className="text-muted-foreground leading-relaxed">
                Stay updated with comprehensive coverage of{" "}
                {slug.replace(/-/g, " ")}. Our in-depth recaps and analysis
                bring you the full story behind every controversy, feud, and
                dramatic moment in the YouTube community.
              </p>
            </CardContent>
          </Card>
          <Card className="p-8">
            <CardContent className="p-0">
              <p className="text-muted-foreground leading-relaxed">
                From shocking revelations to behind-the-scenes drama, we cover
                it all. Get the real story about your favorite creators and the
                controversies that changed YouTube forever.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Topics */}
      <section className="py-16">
        <h2 className="text-3xl font-serif font-bold mb-10">
          Explore More Topics
        </h2>
        <div className="flex flex-wrap gap-3">
          {Object.keys(pageContent)
            .filter((key) => key !== slug)
            .slice(0, 6)
            .map((key) => (
              <Badge
                key={key}
                variant="outline"
                className="text-base px-4 py-2 capitalize"
                asChild
              >
                <Link href={`/${key}`}>{key.replace(/-/g, " ")}</Link>
              </Badge>
            ))}
        </div>
      </section>
    </div>
  );
}

function VideoGrid({ videos: videoList }: { videos: typeof videos }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videoList.map((video) => (
        <Link key={video.id} href={`/video/${video.slug}`} className="group">
          <Card className="h-full overflow-hidden transition-all hover:-translate-y-1">
            <CardHeader className="p-0">
              <AspectRatio
                ratio={16 / 9}
                className="relative overflow-hidden bg-muted"
              >
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                {video.viewCount && (
                  <Badge className="absolute top-3 right-3" variant="default">
                    {video.viewCount}
                  </Badge>
                )}
              </AspectRatio>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-xl mb-3 line-clamp-2">
                {video.title}
              </CardTitle>
              <p className="text-muted-foreground text-base line-clamp-3">
                {video.teaser}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
