export interface Category {
  id: number;
  slug: string;
  name: string;
  count: number;
}

export interface WordPressGraphQLCategoryNode {
  databaseId: number;
  slug: string;
  name: string;
  count?: number | null;
}

export interface WordPressGraphQLCategoryConnection {
  nodes?: WordPressGraphQLCategoryNode[] | null;
}

export interface CategoryBadge {
  id: number;
  nombre: string;
  slug: string;
  bg?: string;
  border?: string;
}
