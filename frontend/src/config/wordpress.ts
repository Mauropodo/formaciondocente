export interface WordPressConfig {
  graphqlEndpoint: string;
  timeoutMs: number;
  retryCount: number;
}

export function getWordPressConfig(): WordPressConfig {
  return {
    graphqlEndpoint: import.meta.env.PUBLIC_WORDPRESS_GRAPHQL_URL ?? "",
    timeoutMs: 8000,
    retryCount: 2,
  };
}
