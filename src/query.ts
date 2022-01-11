import {Client} from "@opensearch-project/opensearch";

export const createQuery = (client: Client) => {
  return {
    queryBooks: async (title: string) => {
      const query = {
        query: {
          match: {
            title: {
              query: title,
            },
          },
        },
      };

      return client.search({
        index: "books",
        body: query,
        size: 100,
      });
    },
  };
};

export type Query = ReturnType<typeof createQuery>;
