import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON payload parser with a high limit for base64 images
  app.use(express.json({ limit: "10mb" }));

  // API endpoint to save the user's base64 uploaded image directly to the server disk
  app.post("/api/save-hero-image", (req, res) => {
    try {
      const { image } = req.body;
      if (!image || !image.startsWith("data:image/")) {
        return res.status(400).json({ error: "Invalid image format" });
      }

      // Safeguard: If the image matches the old default base64 placeholder (man with glasses),
      // do not overwrite our high-quality mont4.png on disk.
      if (image.includes("iVBORw0KGgoAAAANSUhEUgAAAxQAAAMUCAYAAA")) {
        console.log("Safeguarded: Refusing to overwrite mont4.png with the old placeholder image.");
        return res.json({ success: true, path: "/mont4.png" });
      }

      // Extract raw base64 data
      const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return res.status(400).json({ error: "Invalid base64 string" });
      }

      const buffer = Buffer.from(matches[2], "base64");
      
      // Ensure the public directory exists
      const publicDir = path.join(process.cwd(), "public");
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }

      // Save to public directory
      const filePath = path.join(publicDir, "mont4.png");
      fs.writeFileSync(filePath, buffer);
      console.log(`Saved image to ${filePath}`);

      // Also save directly to dist/mont4.png if dist exists so it is available immediately without full rebuild
      const distDir = path.join(process.cwd(), "dist");
      if (fs.existsSync(distDir)) {
        fs.writeFileSync(path.join(distDir, "mont4.png"), buffer);
        console.log(`Saved image to dist/mont4.png`);
      }

      return res.json({ success: true, path: "/mont4.png" });
    } catch (err: any) {
      console.error("Error saving hero image:", err);
      return res.status(500).json({ error: err.message });
    }
  });

  // API endpoint to save the entire builder data to /src/data.ts to keep edits persistent in source files
  app.post("/api/save-builder-data", (req, res) => {
    try {
      const { data } = req.body;
      if (!data) {
        return res.status(400).json({ error: "No data provided" });
      }

      // Format the data content as a valid TypeScript module
      const fileContent = `import { LandingPageData } from './types';
import { defaultHeroImage } from './defaultHeroImage';

export const defaultLandingPageData: LandingPageData = ${JSON.stringify(data, null, 2)};
`;

      const dataFilePath = path.join(process.cwd(), "src", "data.ts");
      fs.writeFileSync(dataFilePath, fileContent, "utf-8");
      console.log(`Successfully saved builder data to ${dataFilePath}`);

      return res.json({ success: true });
    } catch (err: any) {
      console.error("Error saving builder data:", err);
      return res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
