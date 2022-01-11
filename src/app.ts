import express from "express";
import {Query} from "./query";
import {BooksRepository} from "./repository/books";
import {createBooksRouter} from "./routes/books";
import {createQueryRouter} from "./routes/query";

export const createApp = (booksRepository: BooksRepository, query: Query) => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({extended: false}));

  app.get("/health", (req, res) => res.sendStatus(200));

  app.use("/books", createBooksRouter(booksRepository));

  app.use("/query", createQueryRouter(query));

  app.use((req, res) => {
    console.log(req.originalUrl);
    res.status(404).json({message: `Not Found`});
  });

  app.use((error: any, req: any, res: any, next: any) => {
    console.error(`Unhandled error occurred: ${error.message}`, error);
    return res.status(500).json({message: error.message});
  });

  return app;
};
