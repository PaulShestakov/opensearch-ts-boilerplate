/* eslint-disable node/no-unpublished-import */
import got from "got";
import {v4} from "uuid";
import retry from "async-retry";
import {setupTestContext} from "./setup-test-context";
import {serverConfig} from "./config";

const serverUrl = `http://localhost:${serverConfig.port}`;

const addBook = async (book: any) => {
  return got.post(`${serverUrl}/books`, {json: book});
};

const queryBooks = async (title: any) => {
  return got(`${serverUrl}/query?title=${title}`).json();
};

describe("books tests", () => {
  setupTestContext();

  it("added book should get searchable by title", async () => {
    const book = {
      id: v4(),
      title: "The Outsider",
      author: "Stephen King",
      year: "2018",
      genre: "Crime fiction",
    };

    await addBook(book);

    const predicate = (books: any[]) => books.find((item) => item.id === book.id);

    await expect(
      retry(async () => {
        const response: any = await queryBooks("The Outsider");

        if (!predicate(response.books)) {
          throw new Error("Added book was not found in search results");
        }
      }),
    ).resolves.not.toThrow();
  });
});
