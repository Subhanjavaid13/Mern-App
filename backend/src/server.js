import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/notesRoutes.js";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

// Resolve paths from this file, not from the current working directory,
// so the server works no matter where it is started from.
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // backend/src
const backendDir = path.resolve(__dirname, ".."); // backend
const rootDir = path.resolve(backendDir, ".."); // repo root
const clientDist = path.join(rootDir, "frontend", "dist");

// Load backend/.env explicitly. On a host like Render the variables come from
// the dashboard instead, and this simply finds nothing to load.
dotenv.config({ path: path.join(backendDir, ".env") });

const port = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

const app = express();

// Serve the built frontend when it exists (i.e. after `npm run build` on the
// host). In local development the frontend runs on its own dev server instead.
const serveClient = fs.existsSync(path.join(clientDist, "index.html"));

// The Vite dev server is a different origin, so it needs CORS.
// In production the frontend is served by this same server, so CORS is not needed.
if (!isProduction) {
    app.use(cors({ origin: "http://localhost:5173" }));
}

app.use(express.json());

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

connectDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log(serveClient ? "Serving frontend from frontend/dist" : "API only (no frontend build found)");
        });
    })
    .catch((error) => {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    });
