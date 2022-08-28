import {createApp} from "./app";
import {createBooksRepository} from "./repository/books";
import {createQuery} from "./query";
import {makeClient, OpensearchConfig} from "./client";

export interface ServerConfig {
  port: number;
}

export const startServer = (opensearchConfig: OpensearchConfig, serverConfig: ServerConfig) => {
  const client = makeClient(opensearchConfig);

  const booksRepository = createBooksRepository(client);
  const query = createQuery(client);

  const app = createApp(booksRepository, query);

  return app.listen(serverConfig.port, () => {
    console.log(`App is listening at port: ${serverConfig.port}`);
  });
};
