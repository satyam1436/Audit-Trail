import eventStore from "../services/EventStore.js";

export const appendTestEvent = async (req, res) => {
    try {
        const { aggregateId, eventType, payload, metadata } = req.body;

        const event = await eventStore.appendEvent({
            aggregateId,
            eventType,
            payload,
            metadata,
        });

        res.status(201).json({
            success: true,
            event,
        });
    } catch (error) {
        console.error("Append event error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to append event",
        });
    }
};

export const getTestEvents = async (req, res) => {
    try {
        const { aggregateId } = req.params;

        const events = await eventStore.getEvents(aggregateId);

        res.status(200).json({
            success: true,
            count: events.length,
            events,
        });
    } catch (error) {
        console.error("Get events error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve events",
        });
    }
};

