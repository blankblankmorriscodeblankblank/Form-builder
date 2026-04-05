import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import rateLimit from "express-rate-limit";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  const staticFallbackLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("/{*path}", staticFallbackLimiter, (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
