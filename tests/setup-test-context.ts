import {startServer} from "../src/server";
import {promisify} from "node:util";
import {makeClient, waitForClusterToBeUp} from "../src/client";
import {opensearchConfig, serverConfig} from "./config";

export const setupTestContext = () => {
  let cleanup: any;

  beforeAll(async () => {
    const client = makeClient(opensearchConfig);
    await waitForClusterToBeUp(client);

    const server = startServer(opensearchConfig, serverConfig);

    cleanup = async () => {
      await promisify(server.close.bind(server));
    };
  });

  afterAll(async () => {
    if (cleanup) {
      await cleanup;
    }
  });
};
