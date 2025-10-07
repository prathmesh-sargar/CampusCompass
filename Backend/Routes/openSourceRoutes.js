import express from "express";
import { getOpenSourceIssues } from "../Controller/getOpenSourceIssues.js";

const router = express.Router();

router.get("/opensource", getOpenSourceIssues);

export default router;
