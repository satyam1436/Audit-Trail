import eventStore from "../services/EventStore.js";
import ContainerAggregate from "../domain/aggregates/ContainerAggregate.js";

const handleArriveAtPort = async (command) => {
    const { containerId, location } = command;

    if (!containerId || !location) {
        throw new Error("containerId and location are required");
    }

    const existingEvents = await eventStore.getEvents(containerId);

    const aggregate = new ContainerAggregate();

    aggregate.rehydrate(existingEvents);

    const event = aggregate.arriveAtPort({
        location,
    });

    return eventStore.appendEvent({
        aggregateId: containerId,
        eventType: event.eventType,
        payload: event.payload,
        metadata: {
            recordedBy: "system",
        },
    });
};

export default handleArriveAtPort;