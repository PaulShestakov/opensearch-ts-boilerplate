// eslint-disable-next-line node/no-unpublished-import
import dockerCompose from "docker-compose";
import path from "node:path";
import url from "node:url";

try {
  console.log("💅 Preparing test environment...");
  const start = Date.now();

  if (!process.env.CI) {
    const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
    const root = path.join(__dirname, "..");

    await dockerCompose.upAll({cwd: root, log: true});
  }

  console.log(`✅ Test environment was prepared in ${Date.now() - start}ms`);
} catch (err) {
  console.error("❌ Failed to prepare test environment:", err);

  // eslint-disable-next-line no-process-exit
  process.exit(1);
}
