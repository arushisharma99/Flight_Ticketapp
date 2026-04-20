import express from "express";
import {
  getHealthStatus,
  getTestMessage,
} from "../controllers/testController.js";

const router = express.Router();

router.get("/test", getTestMessage);
router.get("/health", getHealthStatus);

export default router;
