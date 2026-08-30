import CreateContainerCommand from "../commands/createContainer.command.js";
import handleCreateContainer from "../commands/createContainer.handler.js";

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