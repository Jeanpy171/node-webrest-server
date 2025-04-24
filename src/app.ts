import { envs } from "./config/env";
import { Server } from "./presentation/server";

(() => {
  main();
})();

function main() {
  const server = new Server({ PORT: envs.PORT, PUBLIC_PATH: envs.PUBLIC_PATH });
  server.start();
}
