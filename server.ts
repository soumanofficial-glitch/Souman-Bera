import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route to handle lead submissions
  app.post("/api/leads", async (req, res) => {
    const leadData = req.body;
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbz_65NsIp09yv5vO-pR3va-v6XrQE6hVB6KXOohDx17UNs2oryWfD9A4uZAs1TUT8V4/exec";

    console.log("Received lead:", leadData);

    if (!GOOGLE_SCRIPT_URL) {
      console.warn("GOOGLE_SCRIPT_URL not set. Lead saved locally only (log).");
      return res.json({ 
        status: "success", 
        message: "Lead received but GOOGLE_SCRIPT_URL is not configured." 
      });
    }

    try {
      // Forward to Google Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
      });

      if (response.ok) {
        res.json({ status: "success", message: "Lead sent to Google Sheets" });
      } else {
        const errorText = await response.text();
        console.error("Google Script Error:", errorText);
        res.status(500).json({ status: "error", message: "Failed to send lead to Google Sheets" });
      }
    } catch (error) {
      console.error("Error forwarding lead:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
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
