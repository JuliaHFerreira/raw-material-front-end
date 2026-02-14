import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/config.js", (req, res) => {
  res.type("application/javascript");
  res.send(`window.APP_CONFIG = { API_BASE_URL: ${JSON.stringify(API_BASE_URL)} };`);
});

app.use(express.static(path.join(__dirname, "..", "public")));

app.listen(port, () => console.log("Front up on port", port));