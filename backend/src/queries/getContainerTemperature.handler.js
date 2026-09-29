import eventStore from "../services/EventStore.js";

const getContainerTemperature = async (containerId) => {
    if (!containerId) {
        throw new Error("containerId is required");
    }

    const events = await eventStore.getEvents(containerId);

    if (events.length === 0) {
        throw new Error("Container not found");
    }

    return events
        .filter((event) => event.eventType === "TEMPERATURE_SPIKE")
        .map((event) => ({
            timestamp: event.timestamp,
            temperature: Number(event.payload.temperature),
        }))
        .sort(
            (a, b) =>
                new Date(a.timestamp).getTime() -
                new Date(b.timestamp).getTime()
        );
};

export default getContainerTemperature;