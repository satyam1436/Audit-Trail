import express from "express";
import {
    appendTestEvent,
    getTestEvents,
} from "../controllers/eventTestController.js";


const router = express.Router();

router.post("/events", appendTestEvent);
router.get("/events/:aggregateId", getTestEvents);

export default router;


