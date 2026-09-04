import CreateContainerCommand from "../commands/createContainer.command.js";
import handleCreateContainer from "../commands/createContainer.handler.js";
import LoadContainerCommand from "../commands/loadContainer.command.js";
import handleLoadContainer from "../commands/loadContainer.handler.js";
import RecordTemperatureSpikeCommand from "../commands/recordTemperatureSpike.command.js";
import handleRecordTemperatureSpike from "../commands/recordTemperatureSpike.handler.js";
import RecordSealBreachCommand from "../commands/recordSealBreach.command.js";
import handleRecordSealBreach from "../commands/recordSealBreach.handler.js";
import RecordCustomsInspectionCommand from "../commands/recordCustomsInspection.command.js";
import handleRecordCustomsInspection from "../commands/recordCustomsInspection.handler.js";
import ArriveAtPortCommand from "../commands/arriveAtPort.command.js";
import handleArriveAtPort from "../commands/arriveAtPort.handler.js";
import getContainerState from "../queries/getContainerState.handler.js";


export const createContainer = async (req, res) => {
    try {
        const { containerId, location } = req.body;

        const command = new CreateContainerCommand({
            containerId,
            location,
        });

        const event = await handleCreateContainer(command);

        res.status(201).json({
            success: true,
            message: "Container created successfully",
            event,
        });
    } catch (error) {
        console.error("Create container error:", error.message);

        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const loadContainer = async (req, res) => {
    try {
        const { containerId, vessel } = req.body;

        const command = new LoadContainerCommand({
            containerId,
            vessel,
        });

        const event = await handleLoadContainer(command);

        res.status(201).json({
            success: true,
            message: "Container loaded successfully",
            event,
        });
    } catch (error) {
        console.error("Load container error:", error.message);

        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const recordTemperatureSpike = async (req, res) => {
    try {
        const { containerId, temperature, unit } = req.body;

        const command = new RecordTemperatureSpikeCommand({
            containerId,
            temperature,
            unit,
        });

        const event = await handleRecordTemperatureSpike(command);

        res.status(201).json({
            success: true,
            message: "Temperature spike recorded successfully",
            event,
        });
    } catch (error) {
        console.error("Temperature spike error:", error.message);

        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const recordSealBreach = async (req, res) => {
    try {
        const { containerId, reason } = req.body;

        const command = new RecordSealBreachCommand({
            containerId,
            reason,
        });

        const event = await handleRecordSealBreach(command);

        res.status(201).json({
            success: true,
            message: "Seal breach recorded successfully",
            event,
        });
    } catch (error) {
        console.error("Seal breach error:", error.message);

        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const recordCustomsInspection = async (req, res) => {
    try {
        const { containerId, inspector } = req.body;

        const command = new RecordCustomsInspectionCommand({
            containerId,
            inspector,
        });

        const event = await handleRecordCustomsInspection(command);

        res.status(201).json({
            success: true,
            message: "Customs inspection recorded successfully",
            event,
        });
    } catch (error) {
        console.error("Customs inspection error:", error.message);

        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const arriveAtPort = async (req, res) => {
    try {
        const { containerId, location } = req.body;

        const command = new ArriveAtPortCommand({
            containerId,
            location,
        });

        const event = await handleArriveAtPort(command);

        res.status(201).json({
            success: true,
            message: "Container arrival recorded successfully",
            event,
        });
    } catch (error) {
        console.error("Container arrival error:", error.message);

        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getContainer = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await getContainerState(id);

        res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error) {
        console.error("Get container error:", error.message);

        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};



