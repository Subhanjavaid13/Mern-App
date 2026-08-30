import express from "express";
import router from "./routes/notesRoutes.js";
import connectDb from "./config/db.js";
import dotenv from "dotenv"

dotenv.config();
const port = process.env.PORT
const app = express();
app.use(express.json());
connectDb();

app.use("/api/notes",router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 