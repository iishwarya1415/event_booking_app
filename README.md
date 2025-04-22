# 🎟️ Event Booking Application

**CS5610 – Web Development**  

---

## 📌 About the Project

The **Event Booking App** is a full-stack web platform that makes discovering and booking local events easy and enjoyable. Users can browse upcoming shows, check out venue maps, and securely book tickets — all in one place.

This as a SaaS-style application using **React** for the front end, **Node.js + Prisma** for the backend, and **JWT-based authentication with cookies** to keep user sessions secure.

---

## 🎯 What You Can Do

- 🔍 Browse a list of upcoming events
- 📍 View detailed event info + Google Maps venue integration
- 📝 Register and log in securely
- 🎟️ Book tickets to events you're excited about
- 📄 Manage your bookings (update or cancel)
- 🔐 Stay protected with cookie-based authentication

---

## 🧠 How It Works 

- React handles all the routing and views (landing, login, event detail, etc.)
- Prisma connects the backend to a PostgreSQL database
- Secure routes are protected using JWTs stored in **HTTP-only cookies**
- Google Maps API shows venue locations on event pages
- Bookings and events are linked via database relationships

---
## 🌍 Pages & Features Overview

| Page             | Path            | Access         | What It Does                             |
|------------------|------------------|----------------|------------------------------------------|
| **Home Page**    | `/`              | Public         | Overview of the app and page to Login and Register                        |
| **Event Details**| `/events/:id`    | Public         | View events info                   |
| **Login**        | `/login`         | Public         | Secure user login                        |
| **Register**     | `/register`      | Public         | Create a new account                     |
| **Landing Page**    | `/dashboard`     | Auth Required  | View all the events available          |
| **Booking Details**     | `/bookings/:id`  | Auth Required  | View, edit, or cancel a booking          |
| **Logout**       | `/bookings/:id`  | Auth Required  | After logging out it redirects to the Home Page          |
| **Checkout**     | `/checkout`      | Auth Required  | Book tickets for an event  


## 🚀 Deployment

This project has been fully deployed and is available online:

| 🖥️ **Frontend** (React) https://eventbookingapp-six.vercel.app/ 

| 🛠 **Backend API** (Node.js) https://event-booking-app-gd8i.onrender.com

---

## 🛠 Stack

- **React** (Frontend)
- **React Router** (Navigation)
- **Node.js + Express** (Backend)
- **Prisma ORM** (Database queries)
- **PostgreSQL** (Database)
- **JWT + Cookies** (Auth)
- **Google Maps API** (Venue maps)
- **Vercel + Render** (Deployment)

---

## 🚀 Running Locally

### 📦 Client

cd client,
npm install,
npm run dev
