import { getAllPosts, mapLegacyPost } from '../services/wordpress/posts';
import { posts as legacyPosts } from '../lib/posts.js';

export const prerender = false;

const siteUrl = 'https://identidadprofesional.cl';

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/quienes-somos/', priority: '0.8', changefreq: 'monthly' },
  { path: '/investigacion/', priority: '0.8', changefreq: 'monthly' },
  { path: '/relatos/', priority: '0.9', changefreq: 'weekly' },
  { path: '/contacto/', priority: '0.6', changefreq: 'yearly' },
];

const FETCH_TIMEOUT_MS = 3000;
const CACHE_TTL_MS = 1000 * 60 * 60;

let cachedXml: { xml: string; ts: number } | null = null;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function entry(loc: string, lastmod?: string, changefreq?: string, priority?: string): string {
  const parts = [`<loc>${escapeXml(loc)}</loc>`];
  if (lastmod) parts.push(`<lastmod>${lastmod}</lastmod>`);
  if (changefreq) parts.push(`<changefreq>${changefreq}</changefreq>`);
  if (priority) parts.push(`<priority>${priority}</priority>`);
  return `<url>${parts.join('')}</url>`;
}

function getLegacyFallbackPosts() {
  return [...(legacyPosts as Array<Record<string, unknown>>)]
    .map((post) => mapLegacyPost(post as never))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

async function getPostsSafely() {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('WordPress fetch timed out')), FETCH_TIMEOUT_MS),
  );

  try {
    return await Promise.race([getAllPosts(), timeout]);
  } catch {
    return getLegacyFallbackPosts();
  }
}

function buildXml(posts: Array<{ slug?: string; date?: string }>, today: string): string {
  const urls: string[] = staticRoutes.map((route) =>
    entry(`${siteUrl}${route.path}`, today, route.changefreq, route.priority),
  );

  for (const post of posts) {
    const slug = post.slug?.trim();
    if (!slug) continue;
    const parsed = post.date ? new Date(post.date) : null;
    const lastmod = parsed && !Number.isNaN(parsed.getTime())
      ? parsed.toISOString().slice(0, 10)
      : today;
    urls.push(entry(`${siteUrl}/relatos/${encodeURIComponent(slug)}/`, lastmod, 'monthly', '0.7'));
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

export async function GET({ }: any) {
  const today = new Date().toISOString().slice(0, 10);

  if (cachedXml && Date.now() - cachedXml.ts < CACHE_TTL_MS) {
    return new Response(cachedXml.xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  const posts = await getPostsSafely();
  const xml = buildXml(posts, today);
  cachedXml = { xml, ts: Date.now() };

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
