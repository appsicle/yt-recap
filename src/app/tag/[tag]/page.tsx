import { redirect } from "next/navigation";

interface TagPageProps {
  params: { tag: string };
}

// Redirect tag pages to the main category pages
export default function TagPage({ params }: TagPageProps) {
  const tagToCategory: Record<string, string> = {
    "youtube-drama": "/youtube-drama-2024",
    "content-creator-feuds": "/youtube-drama-2024",
    "influencer-controversies": "/youtube-scandals",
    "youtube-breakups": "/youtube-breakups",
    "where-are-they-now": "/what-happened-to",
    "youtube-scandals": "/youtube-scandals",
    "creator-disappearances": "/what-happened-to",
    "youtube-history": "/what-happened-to",
    "mukbang-drama": "/mukbang-controversies",
    "beauty-community-drama": "/beauty-guru-feuds",
    "sister-squad": "/sister-squad-drama",
    "james-charles": "/james-charles-drama",
    "emma-chamberlain": "/emma-chamberlain-scandal",
    "dolan-twins": "/sister-squad-drama",
    "dramageddon": "/sister-squad-drama",
    "stephanie-soo": "/mukbang-controversies",
    "nikocado-avocado": "/mukbang-controversies",
    "beauty-guru-drama": "/beauty-guru-feuds",
    "makeup-youtuber-feuds": "/beauty-guru-feuds",
    "youtube-groups": "/youtube-breakups",
    "squad-breakups": "/youtube-breakups",
    "ex-buzzfeed": "/ex-buzzfeed-creators",
    "try-guys": "/ex-buzzfeed-creators",
    "safiya-nygaard": "/ex-buzzfeed-creators",
  };

  const normalizedTag = params.tag.toLowerCase();
  const redirectPath = tagToCategory[normalizedTag] || `/youtube-drama-2024`;
  
  redirect(redirectPath);
}