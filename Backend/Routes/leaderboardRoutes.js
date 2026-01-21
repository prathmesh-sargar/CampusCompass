import express from "express";
import { handleGetLeaderboard } from "../Controller/leaderboardController.js";

const router = express.Router();

router.get("/", handleGetLeaderboard);

export default router;
