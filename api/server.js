import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Serve static files
app.use(
  express.static(path.resolve(__dirname, "../dist/client"), { index: false })
);

// SSR route
app.get(async (req, res) => {
  const template = fs.readFileSync(
    path.resolve(__dirname, "../dist/client/index.html"),
    "utf-8"
  );

  const { render } = await import("../dist/server/entry-server.js");
  const appHtml = await render(req.url);

  const html = template.replace(`<!--app-html-->`, appHtml);
  res.setHeader("Content-Type", "text/html");
  res.end(html);
});

export default app;
