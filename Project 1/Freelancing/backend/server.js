import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import dotenv, { config } from "dotenv"
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import freelancerRoutes from "./routes/freelancerRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import SocketHandler from "./utils/SocketHandler.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config()
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Connect DB
connectDB();

// Routes
app.use("/", authRoutes);
app.use("/", freelancerRoutes);
app.use("/", projectRoutes);
app.use("/", applicationRoutes);
app.use("/", chatRoutes);
app.use("/", userRoutes);

// Socket
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

io.on("connection", (socket) =>{
    console.log("User connected");

    SocketHandler(socket);
})

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
