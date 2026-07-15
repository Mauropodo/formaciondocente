import { getWordPressConfig } from "../../config/wordpress";
import { WORDPRESS_GRAPHQL_HEALTHCHECK_QUERY } from "./documents";

export interface WordPressGraphQLRequestOptions {
  query: string;
  variables?: Record<string, unknown>;
  operationName?: string;
  timeoutMs?: number;
}

export interface WordPressGraphQLError {
  message: string;
  path?: Array<string | number>;
}

export interface WordPressGraphQLResponse<T> {
  data?: T;
  errors?: WordPressGraphQLError[];
}

export class WordPressGraphQLClientError extends Error {
  public readonly errors: WordPressGraphQLError[];

  constructor(
    message: string,
    errors: WordPressGraphQLError[] = [],
  ) {
    super(message);
    this.name = "WordPressGraphQLClientError";
    this.errors = errors;
  }
}

export interface WordPressClient {
  endpoint: string;
  isConfigured(): boolean;
  healthcheck(): Promise<boolean>;
  query<T>(options: WordPressGraphQLRequestOptions): Promise<T>;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createWordPressClient(): WordPressClient {
  const config = getWordPressConfig();

  return {
    endpoint: config.graphqlEndpoint,

    isConfigured() {
      return Boolean(config.graphqlEndpoint);
    },

    async healthcheck() {
      try {
        const data = await this.query<{ __typename?: string }>({
          query: WORDPRESS_GRAPHQL_HEALTHCHECK_QUERY,
          operationName: "WordPressHealthcheck",
        });

        return data.__typename === "RootQuery";
      } catch {
        return false;
      }
    },

    async query<T>({
      query,
      variables,
      operationName,
      timeoutMs,
    }: WordPressGraphQLRequestOptions): Promise<T> {
      if (!config.graphqlEndpoint) {
        throw new Error("PUBLIC_WORDPRESS_GRAPHQL_URL is not configured.");
      }

      let lastError: unknown;

      for (let attempt = 0; attempt <= config.retryCount; attempt += 1) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs ?? config.timeoutMs);

        try {
          const response = await fetch(config.graphqlEndpoint, {
            method: "POST",
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              query,
              variables,
              operationName,
            }),
          });

          if (!response.ok) {
            throw new Error(`WPGraphQL request failed with status ${response.status}.`);
          }

          const payload = (await response.json()) as WordPressGraphQLResponse<T>;

          if (payload.errors?.length) {
            throw new WordPressGraphQLClientError(
              "WPGraphQL returned one or more errors.",
              payload.errors,
            );
          }

          if (payload.data === undefined) {
            throw new WordPressGraphQLClientError("WPGraphQL response did not include data.");
          }

          return payload.data;
        } catch (error) {
          lastError = error;

          if (attempt < config.retryCount) {
            await sleep(250 * (attempt + 1));
            continue;
          }
        } finally {
          clearTimeout(timer);
        }
      }

      throw lastError instanceof Error
        ? lastError
        : new Error("WPGraphQL request failed with an unknown error.");
    },
  };
}

export const wordpressClient = createWordPressClient();
