# 🛠️ Notes App Backend

A **real-time collaborative** notes app backend using **Node.js**, **Express**, **TypeScript**, **MongoDB**, and **Socket.IO**.

---

## 🚀 Features

* 🔐 **JWT Auth** with role-based access
* 📝 **Notes CRUD** (Create, Read, Update, Delete)
* ⚡ **Real-time sync** with Socket.IO
* ✅ **Zod validation** for requests
* 🛡️ Middleware: Auth, Role, Validation, 404, ErrorHandler

---

## 🧪 Tech Stack

Node.js · Express · TypeScript · MongoDB · Mongoose · Socket.IO · Zod · JWT

---

## 📂 Structure

```
src/
├── config/         # Env & DB setup
├── controllers/    # Route logic
├── middleware/     # Auth, error, validation
├── models/         # Mongoose schemas
├── routes/         # API endpoints
├── sockets/        # Real-time events
├── validations/    # Zod schemas
├── app.ts          # Express config
└── server.ts       # Server entry
```

---

## 📋 API Routes

### Auth

* `POST /api/auth/signup`
* `POST /api/auth/login`

### Notes *(Protected)*

* `GET /api/notes`
* `POST /api/notes`
* `GET /api/notes/:id`
* `PATCH /api/notes/:id`
* `DELETE /api/notes/:id`

---

## ⚙️ Setup

```bash
git clone https://github.com/MuhammedshihadTP/Note_App_Server.git
cd notes-backend
npm install
npm run dev
```

---

## 🧪 Testing Checklist

* ✅ Signup & Login
* ✅ Token validation
* ✅ Notes CRUD
* ✅ Real-time sync (Socket.IO)

---

