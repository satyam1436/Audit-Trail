import eventStore from "../services/EventStore.js";

const getContainerEvents = async (containerId) => {
    if (!containerId) {
        throw new Error("containerId is required");
    }

    const events = await eventStore.getEvents(containerId);

    if (events.length === 0) {
        throw new Error("Container not found");
    }

    return {
        containerId,
        count: events.length,
        events,
    };
};

export default getContainerEvents;