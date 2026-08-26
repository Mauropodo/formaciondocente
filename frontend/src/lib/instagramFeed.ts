import { wordpressClient } from "../services/wordpress/client";

const WP_GRAPHQL_URL = import.meta.env.PUBLIC_WORDPRESS_GRAPHQL_URL ?? "";
const WP_BASE = WP_GRAPHQL_URL ? new URL(WP_GRAPHQL_URL).origin : "";
const WP_REST_ENDPOINT = `${WP_BASE}/wp-json/quadlayers/instagram/frontend/user-media`;

// ID de la página de WordPress que contiene el bloque de la galería configurado.
const FEED_PAGE_ID = 2;

// Cuenta de Instagram del proyecto (fallback si WordPress no devuelve config).
const FALLBACK_ACCOUNT_ID = "29273563102232773";

export interface FeedConfig {
  account_id: string;
  tag: string;
  limit: number;
  order_by: string;
}

export interface InstagramItem {
  id: string;
  media: {
    url: string;
    thumbnail: string;
    type: "IMAGE" | "VIDEO";
  };
  media_description?: string;
  share_url: string;
}

const FEED_CONFIG_QUERY = `
  query InstagramFeedConfig($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      content(format: RENDERED)
    }
  }
`;

const NAMED_ENTITIES: Record<string, string> = {
  "&quot;": '"',
  "&#039;": "'",
  "&apos;": "'",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&nbsp;": " ",
  "&aacute;": "á",
  "&eacute;": "é",
  "&iacute;": "í",
  "&oacute;": "ó",
  "&uacute;": "ú",
  "&ntilde;": "ñ",
  "&Aacute;": "Á",
  "&Eacute;": "É",
  "&Iacute;": "Í",
  "&Oacute;": "Ó",
  "&Uacute;": "Ú",
  "&Ntilde;": "Ñ",
  "&copy;": "©",
};

function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&(?:#x?[0-9a-f]+|[a-z]+);/gi, (match) => {
      if (NAMED_ENTITIES[match]) return NAMED_ENTITIES[match];

      if (match.startsWith("&#x") || match.startsWith("&#X")) {
        const code = Number.parseInt(match.slice(3, -1), 16);
        return Number.isFinite(code) ? String.fromCodePoint(code) : match;
      }

      if (match.startsWith("&#")) {
        const code = Number.parseInt(match.slice(2, -1), 10);
        return Number.isFinite(code) ? String.fromCodePoint(code) : match;
      }

      return match;
    })
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&");
}

async function getFeedConfig(): Promise<FeedConfig> {
  const fallback: FeedConfig = {
    account_id: FALLBACK_ACCOUNT_ID,
    tag: "",
    limit: 12,
    order_by: "top_media",
  };

  try {
    const data = await wordpressClient.query<{
      page: { content: string } | null;
    }>({
      query: FEED_CONFIG_QUERY,
      variables: { id: FEED_PAGE_ID },
      operationName: "InstagramFeedConfig",
    });

    const html = data.page?.content ?? "";
    const match = html.match(/data-feed="([^"]*)"/);
    if (!match) return fallback;

    try {
      const raw = JSON.parse(decodeHtmlEntities(match[1]));
      return {
        account_id: raw.account_id || FALLBACK_ACCOUNT_ID,
        tag: raw.tag || "",
        limit: Number(raw.limit) || 12,
        order_by: raw.order_by || "top_media",
      };
    } catch {
      return fallback;
    }
  } catch {
    return fallback;
  }
}

export async function getInstagramFeed(): Promise<InstagramItem[]> {
  const config = await getFeedConfig();

  const params = new URLSearchParams({
    account_id: config.account_id,
    limit: String(config.limit),
    hide_items_with_copyright: "true",
    hide_reels: "false",
    after: "",
    pagination: "0",
    order_by: config.order_by,
  });

  if (config.tag) {
    params.set("tag", config.tag);
  }

  try {
    const res = await fetch(`${WP_REST_ENDPOINT}?${params.toString()}`, {
      headers: { Accept: "application/json" },
    });

    if (!res.ok) return [];

    const json = (await res.json()) as { data?: InstagramItem[] };
    return json.data ?? [];
  } catch {
    return [];
  }
}
