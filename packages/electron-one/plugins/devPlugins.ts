//plugins\devPlugin.ts
import { ViteDevServer } from "vite";
import { buildSync } from "esbuild";
import { spawn } from "child_process";
import electron from "electron";
import { getRandomIp } from "../utils/getIpv4Address";
interface AddressInfo {
  address: string;
  family: string;
  port: number;
}

export let devPlugin = () => {
  return {
    name: "dev-plugin",
    configureServer(server: ViteDevServer) {
      buildSync({
        entryPoints: ["./src/main/mainEntry.ts"],
        bundle: true,
        platform: "node",
        outfile: "./dist/mainEntry.js",
        external: ["electron"],
      });

      server.httpServer!.once("listening", () => {
        // let { spawn } = require("child_process");
        let addressInfo = server.httpServer!.address() as AddressInfo;
        console.log(addressInfo, "address");
        let httpAddress = `http://localhost:${addressInfo.port}`;
        console.log(httpAddress, "httpAddress");
        let electronProcess = spawn(
          // require("electron").toString(),

          electron.toString(),

          ["./dist/mainEntry.js", httpAddress],
          {
            cwd: process.cwd(),
            stdio: "inherit",
          }
        );
        electronProcess.on("close", () => {
          server.close();
          process.exit();
        });
      });
    },
  };
};

export let getReplacer = () => {
  let externalModels = [
    "os",
    "fs",
    "path",
    "events",
    "child_process",
    "crypto",
    "http",
    "buffer",
    "url",
    "better-sqlite3",
    "knex",
  ];
  let result = {};
  for (let item of externalModels) {
    result[item] = () => ({
      find: new RegExp(`^${item}$`),
      code: `const ${item} = require('${item}');export { ${item} as default }`,
    });
  }
  result["electron"] = () => {
    let electronModules = [
      "clipboard",
      "ipcRenderer",
      "nativeImage",
      "shell",
      "webFrame",
    ].join(",");
    return {
      find: new RegExp(`^electron$`),
      code: `const {${electronModules}} = require('electron');export {${electronModules}}`,
    };
  };
  return result;
};
