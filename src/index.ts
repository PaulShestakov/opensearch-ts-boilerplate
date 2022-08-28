// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import {opensearchConfig, serverConfig} from "./config";
import {startServer} from "./server";

startServer(opensearchConfig, serverConfig);
