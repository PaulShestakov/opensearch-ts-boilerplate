import {Client} from "@opensearch-project/opensearch";

export interface OpensearchConfig {
  url: string;
  username: string;
  password: string;
}

export const makeClient = (config: OpensearchConfig) => {
  return new Client({
    ssl: {
      rejectUnauthorized: false,
    },
    node: config.url,
    auth: {
      username: config.username,
      password: config.password,
    },
  });
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const waitForClusterToBeUp = async (client: Client, times = 0): Promise<void> => {
  try {
    await client.cluster.health({timeout: "50s"});
  } catch (err) {
    if (++times < 10) {
      await sleep(5000);
      return waitForClusterToBeUp(client, times);
    }
    console.error(err);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
};
