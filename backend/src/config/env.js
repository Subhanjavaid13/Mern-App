import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

/**
 * Loads backend/.env exactly once, resolved from this file rather than the
 * current working directory, so it works no matter where the server is started.
 *
 * Importing this module first guarantees the variables are available to every
 * other module at import time (ES module imports run before the importer's body).
 *
 * On a host like Render the variables come from the dashboard and there is
 * simply no file to load.
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // backend/src/config
const backendDir = path.resolve(__dirname, "..", ".."); // backend

dotenv.config({ path: path.join(backendDir, ".env") });

export const backendRoot = backendDir;
export const repoRoot = path.resolve(backendDir, "..");
