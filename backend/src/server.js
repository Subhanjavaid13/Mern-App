import express from "express";
import router from "./routes/notesRoutes.js";
import connectDb from "./config/db.js";
import dotenv from "dotenv"

dotenv.config();

const app = express();

connectDb();

app.use("/api/notes",router);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
}); 