export interface PostCategoryRef {
  id?: number;
  slug: string;
  name: string;
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  date: string;
  formattedDate: string;
  imageUrl: string | null;
  imageAlt: string | null;
  categories: PostCategoryRef[];
  primaryCategory: PostCategoryRef | null;
  authorName: string | null;
  link: string;
}

export interface PostListParams {
  categorySlug?: string | null;
  page?: number;
  perPage?: number;
}

export interface PaginatedPostsResult {
  items: Post[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

export interface WordPressGraphQLPostNode {
  id: string;
  databaseId: number;
  slug: string;
  title?: string | null;
  excerpt?: string | null;
  content?: string | null;
  date?: string | null;
  link?: string | null;
  featuredImage?: {
    node?: {
      sourceUrl?: string | null;
      altText?: string | null;
    } | null;
  } | null;
  categories?: {
    nodes?: Array<{
      databaseId: number;
      slug: string;
      name: string;
    }> | null;
  } | null;
  datosPublicacion?: {
    autor?: string | null;
  } | null;
}

export interface WordPressGraphQLPostsConnection {
  edges?: Array<{
    cursor?: string | null;
    node: WordPressGraphQLPostNode;
  }> | null;
  nodes?: WordPressGraphQLPostNode[] | null;
  pageInfo?: {
    hasNextPage?: boolean | null;
    hasPreviousPage?: boolean | null;
    endCursor?: string | null;
  } | null;
}

export interface WordPressGraphQLSinglePostResult {
  post?: WordPressGraphQLPostNode | null;
}
