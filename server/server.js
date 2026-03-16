import express from 'express';
import cors from 'cors';
import http from 'http';
import "dotenv/config";
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import { Server } from 'socket.io';

// Create Express app and HTTP Server
const app = express();
const server = http.createServer(app);


// Initialize Socket.IO
export const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

//store online users 
export const userSocketMap = {}; // { userId: socketId }


// Socket.IO connection handling
io.on("connection", (socket) => {
const userId = socket.handshake.query.userId;
console.log("user connected: ", userId);

if (userId) userSocketMap[userId] = socket.id;

//emit online users to all clients
io.emit("onlineUsers", Object.keys(userSocketMap));

socket.on("disconnect", () => {
  console.log("user disconnected: ", userId);
  delete userSocketMap[userId];
  io.emit("getonlineUsers", Object.keys(userSocketMap));

     })

});


// Middleware setup
app.use(express.json({ limit: "4mb" }));
app.use(cors());



// Import routes
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);





// Connect to MongoDB
await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log("Server is running on PORT: " + PORT)
);