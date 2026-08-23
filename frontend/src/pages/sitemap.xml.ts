import { getAllPosts } from '../services/wordpress/posts';

export const prerender = false;

const siteUrl = 'https://identidadprofesional.cl';

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/quienes-somos/', priority: '0.8', changefreq: 'monthly' },
  { path: '/investigacion/', priority: '0.8', changefreq: 'monthly' },
  { path: '/relatos/', priority: '0.9', changefreq: 'weekly' },
  { path: '/contacto/', priority: '0.6', changefreq: 'yearly' },
];

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

export async function GET({ }: any) {
  const today = new Date().toISOString().slice(0, 10);

  const urls: string[] = staticRoutes.map((route) =>
    entry(`${siteUrl}${route.path}`, today, route.changefreq, route.priority),
  );

  try {
    const posts = await getAllPosts();
    for (const post of posts) {
      const slug = post.slug?.trim();
      if (!slug) continue;
      const parsed = post.date ? new Date(post.date) : null;
      const lastmod = parsed && !Number.isNaN(parsed.getTime())
        ? parsed.toISOString().slice(0, 10)
        : today;
      urls.push(entry(`${siteUrl}/relatos/${encodeURIComponent(slug)}/`, lastmod, 'monthly', '0.7'));
    }
  } catch {
    // Si el CMS no responde, el sitemap se sirve solo con rutas estáticas.
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
