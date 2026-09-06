// Must be first: loads backend/.env before any other module reads process.env
import { repoRoot } from "./config/env.js";

import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import router from "./routes/notesRoutes.js";
import connectDb from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

const port = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";
const clientDist = path.join(repoRoot, "frontend", "dist");

const app = express();

// Render (and most hosts) sit behind a proxy; needed for correct client IPs,
// which the rate limiter uses as its per-client key.
app.set("trust proxy", 1);

// Serve the built frontend when it exists (i.e. after `npm run build` on the
// host). In local development the frontend runs on its own dev server instead.
const serveClient = fs.existsSync(path.join(clientDist, "index.html"));

// The Vite dev server is a different origin, so it needs CORS.
// In production the frontend is served by this same server, so CORS is not needed.
if (!isProduction) {
    app.use(cors({ origin: "http://localhost:5173" }));
}

app.use(express.json());

// Health check for uptime monitoring (not rate limited)
app.get("/api/health", (_, res) => {
    res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// Rate limit the API only — static assets must not consume the quota
app.use("/api", rateLimiter);
app.use("/api/notes", router);

// Unknown API routes answer with JSON, never the HTML shell
app.use("/api", (_, res) => {
    res.status(404).json({ message: "Not found" });
});

if (serveClient) {
    app.use(express.static(clientDist));

    // SPA fallback: any other GET request returns index.html so client-side
    // routes (/create, /note/:id) work on a direct visit or refresh.
    // NOTE: Express 5 rejects a bare "*" path, so use middleware instead.
    app.use((req, res, next) => {
        if (req.method !== "GET") return next();
        res.sendFile(path.join(clientDist, "index.html"));
    });
}

// Errors always answer as JSON, and details are never leaked in production
app.use((error, req, res, _next) => {
    console.error("Unhandled error:", error);
    res.status(error.status || 500).json({
        message: isProduction ? "Internal Server Error" : error.message,
    });
});

connectDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log(serveClient ? "Serving frontend from frontend/dist" : "API only (no frontend build found)");
        });
    })
    .catch((error) => {
        console.error("Failed to connect to the database:", error.message);
        process.exit(1);
    });
