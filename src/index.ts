// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import {client, waitCluster} from "./client";
import {createApp} from "./app";
import {createBooksRepository} from "./repository/books";
import {startServer} from "./server";
import {createQuery} from "./query";

const main = async () => {
  await waitCluster(client);

  const booksRepository = createBooksRepository(client);
  const query = createQuery(client);

  const app = createApp(booksRepository, query);
  startServer(app);
};

main();
