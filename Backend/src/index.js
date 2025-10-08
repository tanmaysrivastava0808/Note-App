import express from "express";
import NoteRoutes from "./Routes/note-route.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/ratelimiter.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());
app.use(rateLimiter);

app.use('/v1/api/notes', NoteRoutes);


const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  })
});