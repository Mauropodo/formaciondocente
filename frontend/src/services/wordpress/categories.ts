import type {
  Category,
  WordPressGraphQLCategoryConnection,
  WordPressGraphQLCategoryNode,
} from "../../types/category";
import { categorias as legacyCategories } from "../../lib/categorias.js";
import { wordpressClient } from "./client";
import { getAllPosts } from "./posts";
import { WORDPRESS_CATEGORIES_LIST_QUERY } from "./documents";

interface LegacyCategory {
  id: number;
  nombre: string;
  slug: string;
}

export function mapWordPressGraphQLCategory(category: WordPressGraphQLCategoryNode): Category {
  return {
    id: category.databaseId,
    slug: category.slug,
    name: category.name,
    count: Number(category.count ?? 0),
  };
}

export function mapWordPressGraphQLCategories(connection: WordPressGraphQLCategoryConnection): Category[] {
  return (connection.nodes ?? [])
    .map(mapWordPressGraphQLCategory)
    .filter((category) => category.count > 0);
}

export function getCategoriesClient() {
  return wordpressClient;
}

interface WordPressCategoriesQueryResult {
  categories?: WordPressGraphQLCategoryConnection | null;
}

async function getLegacyCategories(): Promise<Category[]> {
  const posts = await getAllPosts();
  const categoryCountMap = new Map<string, number>();

  for (const post of posts) {
    for (const category of post.categories) {
      categoryCountMap.set(category.slug, (categoryCountMap.get(category.slug) ?? 0) + 1);
    }
  }

  return (legacyCategories as LegacyCategory[])
    .map((category) => ({
      id: category.id,
      slug: category.slug,
      name: category.nombre,
      count: categoryCountMap.get(category.slug) ?? 0,
    }))
    .filter((category) => category.count > 0);
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const data = await wordpressClient.query<WordPressCategoriesQueryResult>({
      query: WORDPRESS_CATEGORIES_LIST_QUERY,
      operationName: "WordPressCategoriesList",
    });

    return mapWordPressGraphQLCategories(data.categories ?? {});
  } catch {
    return getLegacyCategories();
  }
}
