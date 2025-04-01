import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { getAllEvents, getEventsById } from "./routes/events.js"; // Importing events routes
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Root route handler
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Simple ping route to check if the API is working
app.get("/ping", (req, res) => {
  res.send("Pong");
});

// Event routes
app.get("/events", getAllEvents);        
app.get("/events/:id", getEventsById);   

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} 🎉 🚀`);
});
