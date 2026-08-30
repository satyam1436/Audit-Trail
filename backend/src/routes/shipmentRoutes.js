import express from "express";
import { createContainer } from "../controllers/shipmentController.js";

const router = express.Router();

router.post("/", createContainer);

export default router;