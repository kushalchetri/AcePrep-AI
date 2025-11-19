# Interview Prep AI – Full Stack Project

A full-stack MERN application that helps users generate interview questions and answers using AI.  
Built with **React + Vite (frontend)** and **Node.js + Express + MongoDB (backend)**.

---

## Features

### Frontend (React + Vite)
- Modern UI with Tailwind CSS v4  
- AI-generated interview questions & answers  
- Syntax highlighting (Prism)  
- Animations with Framer Motion  
- Toast notifications  
- React Router navigation  

### Backend (Node + Express + MongoDB)
- User authentication (JWT)  
- Secure password hashing (bcryptjs)  
- File uploads using Multer  
- MongoDB database with Mongoose  
- API endpoints for AI interaction (Google GenAI)  

---

## Project Structure

project-root/
│
├── backend/ # Node.js + Express + MongoDB API
│ ├── server.js
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ └── README.md
│
├── frontend/ # React + Vite + Tailwind UI
│ ├── src/
│ ├── public/
│ └── README.md
│
└── README.md # (this file)

yaml
Copy code

---

## Installation

Clone the repo:

git clone https://github.com/your-username/your-repo-name.git

Install backend:
cd backend
npm install

Install frontend:
cd ../frontend
npm install

Running the Project

Start Backend
cd backend
npm run dev

Start Frontend
cd frontend
npm run dev

Environment Variables
Backend .env
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
 
Tech Stack
React 18
Vite
Tailwind CSS v4
Node.js
Express
MongoDB + Mongoose
JWT Auth
Google GenAI
Axios
Multer
Framer Motion