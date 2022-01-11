import got from "got";
import {v4} from "uuid";
import retry from "async-retry";

const url = process.env.SERVICE_URL;

const waitForService = async () =>
  retry(async () => {
    return got.get(`${url}/health`);
  });

const addBook = async (book: any) => {
  return got.post(`${url}/books`, {json: book});
};

const queryBooks = async (title: any) => {
  return got(`${url}/query?title=${title}`).json();
};

describe("books tests", () => {
  beforeAll(async () => {
    await waitForService();
  });

  it("added book should get searchable by title", async () => {
    const book = {
      id: v4(),
      title: "The Outsider",
      author: "Stephen King",
      year: "2018",
      genre: "Crime fiction",
    };

    await addBook(book);

    console.log(book);

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
