import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();
import cookieParser from "cookie-parser";
import { register, login, logout, getMe } from "../api/routes/auth.js";
import { requireAuth } from "../api/middleware/requireAuth.js";
import {getAllEvents, getEventsById} from "../api/routes/events.js";
import {ping} from "../api/routes/ping.js";

import { getAllBookings,getBookingById,createBooking,updateBooking,deleteBooking } from "../api/routes/bookings.js";  

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());


app.post("/register", register);
app.post("/login", login);
app.post("/logout", logout);
app.get("/me", requireAuth, getMe);
app.get("/ping",ping);
app.get("/events/:id",getEventsById);
app.get("/events",getAllEvents);


app.post("/bookings", requireAuth, createBooking)
app.get("/bookings", requireAuth, getAllBookings)
app.get("/bookings/:id",requireAuth, getBookingById)
app.put("/bookings/:id",requireAuth, updateBooking)
app.delete("/bookings/:id",requireAuth, deleteBooking)

export default app;
app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});