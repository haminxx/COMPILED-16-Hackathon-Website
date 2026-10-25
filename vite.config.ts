import { defineConfig, type Connect, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import { handleDemoCall } from "./server/demo-call.ts";

function readBody(req: Connect.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function demoCallDev() {
  return {
    name: "freq-demo-call",
    configureServer(server: ViteDevServer) {
      server.middlewares.use("/api/demo-call", async (req, res) => {
        const url = new URL(req.url ?? "/", "http://127.0.0.1");
        const body = req.method === "POST" ? await readBody(req) : undefined;
        const request = new Request(url, {
          method: req.method,
          headers: { "content-type": "application/json" },
          body,
        });
        const response = await handleDemoCall(request, process.env);
        res.statusCode = response.status;
        res.setHeader("content-type", "application/json; charset=utf-8");
        res.end(await response.text());
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), demoCallDev()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
