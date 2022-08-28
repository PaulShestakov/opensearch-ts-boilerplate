export const opensearchConfig = {
  url: process.env.OPENSEARCH_URL as string,
  username: process.env.OPENSEARCH_USERNAME as string,
  password: process.env.OPENSEARCH_PASSWORD as string,
};

export const serverConfig = {
  port: process.env.PORT as unknown as number,
};
