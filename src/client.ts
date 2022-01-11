import {Client} from "@opensearch-project/opensearch";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const waitCluster = async (client: Client, times = 0): Promise<void> => {
  try {
    await client.cluster.health({timeout: "50s"});
  } catch (err) {
    if (++times < 10) {
      await sleep(5000);
      return waitCluster(client, times);
    }
    console.error(err);
    process.exit(1);
  }
};

export const client = new Client({
  ssl: {
    rejectUnauthorized: false,
  },
  node: process.env.OPENSEARCH_URL,
  auth: {
    username: process.env.OPENSEARCH_USERNAME as string,
    password: process.env.OPENSEARCH_PASSWORD as string,
  },
});
