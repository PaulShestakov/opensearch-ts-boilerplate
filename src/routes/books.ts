import express from "express";
import asyncHandler from "express-async-handler";
import {resolveConfig} from "prettier";
import {BooksRepository} from "../repository/books";

export const createBooksRouter = (booksRepository: BooksRepository) => {
  const router = express.Router();

  router.post(
    "/",
    asyncHandler(async (req, res) => {
      const {id, title, author, year, genre} = req.body;
      await booksRepository.addBook({id, title, author, year, genre});
      res.sendStatus(200);
    }),
  );

  return router;
};
