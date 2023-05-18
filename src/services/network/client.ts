import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        characters: {
          keyArgs: false,
          merge(existing = { results: [] }, incoming) {
            return {
              ...incoming,
              results: [...existing.results, ...incoming.results],
            };
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache,
});
