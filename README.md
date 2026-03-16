# 💬 QuickChat – Real-Time Chat Application

QuickChat is a full-stack real-time messaging application that allows users to communicate instantly with each other. The app supports user authentication, online status, and live messaging using WebSockets.

This project demonstrates practical experience with modern full-stack development, real-time communication, and cloud deployment.

---

## 🚀 Live Demo
https://chat-app-one-orcin-17.vercel.app

---

## 🧠 Features

- User Authentication (Signup & Login)
- Real-time messaging using Socket.IO
- Online / Offline user status
- Search users to start a conversation
- Instant message delivery
- Responsive chat interface

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Context API
- Axios
- Socket.IO Client
- CSS

### Backend
- Node.js
- Express.js
- Socket.IO
- REST API

### Database
- MongoDB
- MongoDB Atlas

### Deployment
- Vercel (Frontend)
- Cloud Deployment for Backend

---

## ⚙️ How It Works

1. User signs up or logs in.
2. Frontend communicates with backend APIs for authentication and user data.
3. Socket.IO establishes a real-time connection between users.
4. Messages are instantly delivered and displayed in the chat interface.

Architecture:

Frontend (React)
      ↓
Backend API (Node.js + Express)
      ↓
Real-time communication (Socket.IO)
      ↓
Database (MongoDB Atlas)
---

## 📂 Project Structure

QuickChat
│
├── client
│   ├── components
│   ├── context
│   ├── pages
│   └── App.jsx
│
├── server
│   ├── controllers
│   ├── routes
│   ├── socket
│   └── server.js
│
└── README.md
---

## 💻 Running the Project Locally

### Clone the repository

git clone https://github.com/your-username/quickchat.git
cd quickchat
### Install dependencies

Frontend
---
cd client
npm install
npm run dev

Backend
---
cd server
npm install
npm run server


## 🌍 Environment Variables

Create a .env file in the backend folder.

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
---

## 📈 Future Improvements

- Message read receipts
- File sharing
- Group chat
- Message notifications
- Typing indicators

---

## 👨‍💻 Author

Apoorva Asati  
GitHub: https://github.com/apoorva-as

---

## ⭐️ Purpose of the Project

This project was built to practice real-time application development and full-stack deployment using modern web technologies.
