import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import connectDB from "./Config/Connection.js";

import UserRouter from "./Routes/User.js";
import SheetRouter from "./Routes/Sheet.js";
import NoteRouter from "./Routes/Note.js";
import ProfileRouter from "./Routes/Profile.js";

import AIInterview from "./Routes/interviewRoutes.js";
import AnalyzeResume from "./Routes/ResumeAnalyze.js";
import CreateRoadmap from "./Routes/roadmapRoute.js";
import openSourceRoutes from "./Routes/openSourceRoutes.js";
// import { checkAndSendEmails } from "./Controller/Mail.js";
import { authenticateToken } from "./Middlewares/Auth.js";
import { generateAIResponse } from "./Controller/Aiagent.js";
import { FetchInternships } from "./Controller/InternshipController.js";
import leaderboardRoutes from "./Routes/leaderboardRoutes.js";
import { getDbStatus } from "./Config/Connection.js";


// import { checkAndSendEmails } from "./Controller/Mail.js";
// dotenv.config();
const PORT = 4000;
const URI = process.env.MONGODB_URI;
const app = express();
connectDB(URI);
//Middlerwares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Liveness probe
 * - Checks if server process is running
 */
app.get("/health/live", (req, res) => {
  res.status(200).json({
    status: "UP",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

/**
 * Readiness probe
 * - Checks if server is ready to serve traffic
 */
app.get("/health/ready", (req, res) => {
  const dbConnected = getDbStatus();

  if (!dbConnected) {
    return res.status(503).json({
      status: "DOWN",
      database: "DISCONNECTED",
    });
  }
  res.status(200).json({
    status: "UP",
    database: "CONNECTED",
  });
});


// Routes
app.use("/api/user", UserRouter);
app.use("/api/sheets", SheetRouter);
app.use("/api/notes", NoteRouter);
app.use("/api/profile", ProfileRouter);
app.post("/api/aiagent", authenticateToken, generateAIResponse);
app.use("/api/aiinterview", AIInterview);
app.use("/api/resume", AnalyzeResume);
app.use("/api/create", CreateRoadmap);
app.get("/api/jobs", FetchInternships);
app.use("/api/contribute", openSourceRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// checkAndSendEmails()
app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});

