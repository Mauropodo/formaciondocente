import type {
  PaginatedPostsResult,
  Post,
  PostListParams,
  PostCategoryRef,
  WordPressGraphQLPostNode,
  WordPressGraphQLPostsConnection,
  WordPressGraphQLSinglePostResult,
} from "../../types/post";
import { posts as legacyPosts } from "../../lib/posts.js";
import { wordpressClient } from "./client";
import { WORDPRESS_POSTS_LIST_QUERY, WORDPRESS_SINGLE_POST_QUERY } from "./documents";

interface LegacyPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  fecha: string;
  imagen?: string;
  autor?: string;
  categoria: string;
  categoriaSlug: string;
}

export function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function formatDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsed);
}

function normalizeAuthorName(value?: string | null): string | null {
  const cleaned = value?.trim();
  return cleaned ? cleaned : null;
}

function normalizeImageUrl(value?: string | null): string | null {
  const cleaned = value?.trim();
  return cleaned ? cleaned : null;
}

function normalizeLink(slug: string, value?: string | null): string {
  const cleaned = value?.trim();
  return cleaned || `/relatos/${slug}`;
}

function mapLegacyCategory(post: LegacyPost): PostCategoryRef {
  return {
    slug: post.categoriaSlug,
    name: post.categoria,
  };
}

function mapCategories(
  categories: Array<{ databaseId?: number; slug: string; name: string }>,
): PostCategoryRef[] {
  return categories
    .filter((category) => Boolean(category.slug && category.name))
    .map((category) => ({
      id: category.databaseId,
      slug: category.slug,
      name: category.name,
    }));
}

export function mapLegacyPost(post: LegacyPost): Post {
  const primaryCategory = mapLegacyCategory(post);

  return {
    id: post.id,
    slug: post.slug,
    title: stripHtml(post.title),
    excerpt: stripHtml(post.excerpt),
    contentHtml: post.content ?? "",
    date: post.fecha,
    formattedDate: formatDate(post.fecha),
    imageUrl: normalizeImageUrl(post.imagen),
    imageAlt: null,
    categories: [primaryCategory],
    primaryCategory,
    authorName: normalizeAuthorName(post.autor),
    link: normalizeLink(post.slug),
  };
}

export function mapWordPressGraphQLPost(node: WordPressGraphQLPostNode): Post {
  const categories = mapCategories(
    node.categories?.nodes?.map((category) => ({
      databaseId: category.databaseId,
      slug: category.slug,
      name: category.name,
    })) ?? [],
  );

  return {
    id: node.databaseId,
    slug: node.slug,
    title: stripHtml(node.title ?? ""),
    excerpt: stripHtml(node.excerpt ?? ""),
    contentHtml: node.content ?? "",
    date: node.date ?? "",
    formattedDate: formatDate(node.date ?? ""),
    imageUrl: normalizeImageUrl(node.featuredImage?.node?.sourceUrl),
    imageAlt: normalizeAuthorName(node.featuredImage?.node?.altText) ?? stripHtml(node.title ?? ""),
    categories,
    primaryCategory: categories[0] ?? null,
    authorName: normalizeAuthorName(node.datosPublicacion?.autor),
    link: normalizeLink(node.slug, node.link),
  };
}

async function getLegacyPosts(): Promise<Post[]> {
  return [...(legacyPosts as LegacyPost[])]
    .map(mapLegacyPost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

interface WordPressPostsQueryResult {
  posts?: WordPressGraphQLPostsConnection | null;
}

async function getAllWordPressPosts(): Promise<Post[]> {
  const collectedPosts: Post[] = [];
  let after: string | null = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const data = await wordpressClient.query<WordPressPostsQueryResult>({
      query: WORDPRESS_POSTS_LIST_QUERY,
      operationName: "WordPressPostsList",
      variables: {
        first: 100,
        after,
      },
    });

    const connection = data.posts;
    const nodes = connection?.nodes ?? [];
    collectedPosts.push(...nodes.map(mapWordPressGraphQLPost));

    hasNextPage = Boolean(connection?.pageInfo?.hasNextPage);
    after = connection?.pageInfo?.endCursor ?? null;

    if (!after) {
      hasNextPage = false;
    }
  }

  return collectedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    return await getAllWordPressPosts();
  } catch {
    return getLegacyPosts();
  }
}

export function getPostsClient() {
  return wordpressClient;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const data = await wordpressClient.query<WordPressGraphQLSinglePostResult>({
      query: WORDPRESS_SINGLE_POST_QUERY,
      operationName: "WordPressSinglePost",
      variables: { slug },
    });

    if (!data.post) {
      return null;
    }

    return mapWordPressGraphQLPost(data.post);
  } catch {
    const legacyPost = (legacyPosts as LegacyPost[]).find((post) => post.slug === slug);
    return legacyPost ? mapLegacyPost(legacyPost) : null;
  }
}

export async function getRelatedPosts(slug: string, limit = 5): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.slug !== slug).slice(0, limit);
}

export async function getPaginatedPosts({
  categorySlug,
  page = 1,
  perPage = 12,
}: PostListParams = {}): Promise<PaginatedPostsResult> {
  const posts = await getAllPosts();
  const filteredPosts = categorySlug
    ? posts.filter((post) => post.primaryCategory?.slug === categorySlug)
    : posts;

  const totalItems = filteredPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  return {
    items: filteredPosts.slice(start, end),
    totalItems,
    totalPages,
    currentPage,
    perPage,
  };
}
