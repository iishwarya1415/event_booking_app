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

## 🧠 How It Works (Technically)

- React handles all the routing and views (landing, login, event detail, etc.)
- Prisma connects the backend to a PostgreSQL database
- Secure routes are protected using JWTs stored in **HTTP-only cookies**
- Google Maps API shows venue locations on event pages
- Bookings and events are linked via database relationships

---

## 🗄️ Database Structure

We have 3 main tables:

### 👤 `users`

| Column         | Type      | Description                     |
|----------------|-----------|---------------------------------|
| `id`           | integer   | Unique user ID (primary key)    |
| `email`        | varchar   | User login email (unique)       |
| `username`     | varchar   | Chosen display name             |
| `password_hash`| bytea     | Hashed password                 |

---

### 🎫 `events`

| Column            | Type      | Description                            |
|-------------------|-----------|----------------------------------------|
| `id`              | integer   | Unique event ID                        |
| `title`           | varchar   | Name of the event                      |
| `description`     | text      | Event description                      |
| `event_date`      | timestamp | Date & time of the event               |
| `venue_name`      | varchar   | Venue name                             |
| `venue_address`   | varchar   | Venue location                         |
| `tickets_available` | integer | Number of tickets available            |

---

### 🧾 `bookings`

| Column          | Type      | Description                                |
|-----------------|-----------|--------------------------------------------|
| `id`            | integer   | Unique booking ID                          |
| `user_id`       | integer   | Linked to a user (foreign key)             |
| `event_id`      | integer   | Linked to an event (foreign key)           |
| `tickets_count` | integer   | Number of tickets booked                   |

> A single user can have many bookings, and each booking is tied to one event.

---

## 🌍 Pages & Features Overview

| Page             | Path            | Access         | What It Does                             |
|------------------|------------------|----------------|------------------------------------------|
| **Landing Page** | `/`              | Public         | Browse all events                        |
| **Event Details**| `/events/:id`    | Public         | View event info + map                    |
| **Login**        | `/login`         | Public         | Secure user login                        |
| **Register**     | `/register`      | Public         | Create a new account                     |
| **Dashboard**    | `/dashboard`     | Auth Required  | View your profile and bookings           |
| **Bookings**     | `/bookings/:id`  | Auth Required  | View, edit, or cancel a booking          |
| **Checkout**     | `/checkout`      | Auth Required  | Book tickets for an event                |

---

## ⚙️ APIs Used

- `POST /api/auth/login` – Login user
- `POST /api/auth/register` – Register user
- `POST /api/auth/logout` – Logout user
- `GET /api/users/:id` – Get user profile
- `GET /api/events` – Get all events
- `GET /api/events/:id` – Get specific event
- `POST /api/bookings` – Create a booking
- `GET /api/bookings` – View all your bookings
- `GET /api/bookings/:id` – View one booking
- `PUT /api/bookings/:id` – Update ticket quantity
- `DELETE /api/bookings/:id` – Cancel a booking

---

## 🚀 Deployment

This project has been fully deployed and is available online:

| Component | URL |
|----------|-----|
| 🖥️ **Frontend** (React) 
| 🛠 **Backend API** (Node.js) 
| 🗄 **Database** (PostgreSQL) 

> All components are live, and the app is accessible and functional in production.

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

cd client
npm install
npm run dev
