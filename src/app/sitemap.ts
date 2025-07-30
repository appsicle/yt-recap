import { MetadataRoute } from 'next';
import { videos } from '@/lib/video-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://youtuberrecap.com';
  
  // Main pages and category pages
  const mainPages = [
    '',
    '/about',
    '/youtube-drama-2024',
    '/what-happened-to',
    '/youtube-scandals',
    '/sister-squad-drama',
    '/mukbang-controversies',
    '/beauty-guru-feuds',
    '/youtube-breakups',
    '/ex-buzzfeed-creators',
    '/james-charles-drama',
    '/emma-chamberlain-scandal',
    '/beauty-community-drama',
    '/creator-disappearances',
    '/influencer-controversies',
    '/where-are-they-now',
    '/youtube-drama',
    '/youtube-history',
    '/mukbanger-feud',
    '/stephanie-soo-scandal',
    '/youtube-controversies',
    '/youtube-drama-2019',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Long-tail SEO pages - "What happened to" queries
  const whatHappenedPages = [
    '/what-happened-to-sister-squad',
    '/what-happened-to-emma-chamberlain',
    '/what-happened-to-james-charles',
    '/what-happened-to-nikocado-avocado',
    '/what-happened-to-stephanie-soo',
    '/what-happened-to-bestdressed',
    '/what-happened-to-nigahiga',
    '/what-happened-to-o2l',
    '/what-happened-to-the-dolan-twins',
    '/what-happened-to-connor-franta',
    '/what-happened-to-jennxpenn',
    '/what-happened-to-andrea-russett',
    '/what-happened-to-zoella',
    '/what-happened-to-tati-westbrook',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9, // Higher priority for long-tail SEO
  }));

  // Individual creator pages
  const creatorPages = [
    '/stephanie-soo',
    '/nikocado-avocado',
    '/try-guys',
    '/ladylike',
    '/bestdressed',
    '/nigahiga',
    '/o2l',
    '/connor-franta',
    '/dolan-twins',
    '/james-charles',
    '/emma-chamberlain',
    '/zoella',
    '/tati-westbrook',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Compound long-tail queries
  const compoundPages = [
    '/why-did-sister-squad-break-up',
    '/james-charles-and-emma-chamberlain-drama',
    '/stephanie-soo-and-nikocado-avocado-drama',
    '/emma-chamberlain-and-dolan-twins-relationship',
    '/youtube-drama-timeline-2019',
    '/where-is-emma-chamberlain-now',
    '/where-are-the-dolan-twins-now',
    '/is-sister-squad-still-friends',
    '/biggest-youtube-scandals-2019',
    '/youtube-beauty-community-drama-timeline',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // Video pages
  const videoPages = videos.map((video) => ({
    url: `${baseUrl}/video/${video.slug}`,
    lastModified: new Date(video.publishDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...mainPages, ...whatHappenedPages, ...creatorPages, ...compoundPages, ...videoPages];
}