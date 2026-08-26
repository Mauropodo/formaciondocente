import { wordpressClient } from "../services/wordpress/client";

const WP_GRAPHQL_URL = import.meta.env.PUBLIC_WORDPRESS_GRAPHQL_URL ?? "";
const WP_BASE = WP_GRAPHQL_URL ? new URL(WP_GRAPHQL_URL).origin : "";
const WP_REST_ENDPOINT = `${WP_BASE}/wp-json/profeedwp/v1/linkedin/company-posts/smart`;

// ID de la página de WordPress que contiene el bloque ProFeed de LinkedIn.
const FEED_PAGE_ID = 94;

const FALLBACK_COMPANY_URL = "";

export interface LinkedInItem {
  id: string;
  post_url: string;
  image_url: string | null;
  headline: string;
  text: string;
  date_published: string;
}

function attr(html: string, name: string): string {
  const m = html.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return m ? m[1] : "";
}

async function getFeedConfig(): Promise<{
  companyUrl: string;
  pageSize: number;
  showImages: boolean;
  refreshInterval: number;
} | null> {
  try {
    const data = await wordpressClient.query<{
      page: { content: string } | null;
    }>({
      query: `query LinkedInFeedConfig($id: ID!) {
        page(id: $id, idType: DATABASE_ID) { content(format: RENDERED) }
      }`,
      variables: { id: FEED_PAGE_ID },
      operationName: "LinkedInFeedConfig",
    });

    const html = data.page?.content ?? "";
    const block = html.match(
      /<div[^>]*class="[^"]*wp-block-profeedwp-profeedwp[^"]*"[^>]*>/i,
    );
    if (!block) return null;

    const tag = block[0];
    const companyUrl = attr(tag, "data-company-url") || FALLBACK_COMPANY_URL;
    if (!companyUrl) return null;

    return {
      companyUrl,
      pageSize: Number(attr(tag, "data-posts-to-show")) || 6,
      showImages: attr(tag, "data-show-images") !== "false",
      refreshInterval: Number(attr(tag, "data-refresh-interval")) || 43200,
    };
  } catch {
    return null;
  }
}

export async function getLinkedInFeed(): Promise<LinkedInItem[]> {
  const config = await getFeedConfig();
  if (!config) return [];

  const params = new URLSearchParams({
    company_url: config.companyUrl,
    page_size: String(config.pageSize),
  });

  try {
    const res = await fetch(`${WP_REST_ENDPOINT}?${params.toString()}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return [];

    const json = (await res.json()) as { posts?: LinkedInItem[] };
    const posts = json.posts ?? [];

    return config.showImages ? posts.filter((p) => p.image_url) : posts;
  } catch {
    return [];
  }
}
