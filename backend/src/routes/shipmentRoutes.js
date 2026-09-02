import express from "express";
import {
    createContainer,
    loadContainer,
    recordTemperatureSpike,
    recordSealBreach,
    recordCustomsInspection,
    arriveAtPort,
    getContainer,
} from "../controllers/shipmentController.js";


const router = express.Router();

router.post("/", createContainer);
router.post("/load", loadContainer);
router.post("/temperature", recordTemperatureSpike);
router.post("/seal-breach", recordSealBreach);
router.post("/customs-inspection", recordCustomsInspection);
router.post("/arrive", arriveAtPort);
router.get("/:id", getContainer);

export default router;

