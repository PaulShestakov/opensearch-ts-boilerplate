import express from "express";
import asyncHandler from "express-async-handler";
import {Query} from "../query";

export const createQueryRouter = (query: Query) => {
  const router = express.Router();

  router.get(
    "/",
    asyncHandler(async (req, res) => {
      const {title} = req.query;
      const response = await query.queryBooks(title as string);
      res.json({books: response.body.hits.hits.map((hit: any) => hit._source)});
    }),
  );

  return router;
};
