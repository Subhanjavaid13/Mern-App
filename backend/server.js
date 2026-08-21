import express from "express";
import router from "./routes/notesRoutes.js";

const app = express();


app.use("/api/notes",router);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
}); 