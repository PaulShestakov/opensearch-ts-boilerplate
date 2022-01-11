import {Client} from "@opensearch-project/opensearch";
import {v4} from "uuid";

interface Book {
  id: string;
  title: string;
  author: string;
  year: string;
  genre: string;
}

export const createBooksRepository = (client: Client) => {
  const index = "books";

  return {
    addBook: async (book: Book) => {
      const id = v4();

      const response = await client.index({
        id: id,
        index: index,
        body: book,
        refresh: true,
      });
    },
  };
};

export type BooksRepository = ReturnType<typeof createBooksRepository>;
