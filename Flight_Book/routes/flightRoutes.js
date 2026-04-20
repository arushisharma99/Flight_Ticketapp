import express from "express";
import { searchFlightsController } from "../controllers/flightController.js";

const router = express.Router();

router.get("/search", searchFlightsController);

export default router;
