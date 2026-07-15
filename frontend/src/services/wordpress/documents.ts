export const WORDPRESS_GRAPHQL_HEALTHCHECK_QUERY = /* GraphQL */ `
  query WordPressHealthcheck {
    __typename
  }
`;

export const WORDPRESS_POST_CARD_FRAGMENT = /* GraphQL */ `
  fragment WordPressPostCardFields on Post {
    id
    databaseId
    slug
    title
    excerpt
    date
    link
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    categories {
      nodes {
        databaseId
        slug
        name
      }
    }
    ... on WithAcfDatosPublicacion {
      datosPublicacion {
        autor
      }
    }
  }
`;

export const WORDPRESS_POSTS_LIST_QUERY = /* GraphQL */ `
  ${WORDPRESS_POST_CARD_FRAGMENT}
  query WordPressPostsList($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      edges {
        cursor
        node {
          ...WordPressPostCardFields
        }
      }
      nodes {
        ...WordPressPostCardFields
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
    }
  }
`;

export const WORDPRESS_CATEGORIES_LIST_QUERY = /* GraphQL */ `
  query WordPressCategoriesList {
    categories(first: 100) {
      nodes {
        databaseId
        slug
        name
        count
      }
    }
  }
`;

export const WORDPRESS_SINGLE_POST_QUERY = /* GraphQL */ `
  ${WORDPRESS_POST_CARD_FRAGMENT}
  query WordPressSinglePost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ...WordPressPostCardFields
      content
    }
  }
`;
