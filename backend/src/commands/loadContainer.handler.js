uimport eventStore from "../services/EventStore.js";
import ContainerAggregate from "../domain/aggregates/ContainerAggregate.js";

const handleLoadContainer = async (command) => {
    const { containerId, vessel } = command;

    if (!containerId || !vessel) {
        throw new Error("containerId and vessel are required");
    }

    
    
    const existingEvents = await eventStore.getEvents(containerId);

    const aggregate = new ContainerAggregate();

    aggregate.rehydrate(existingEvents);

    const event = aggregate.loadOnShip({
        vessel,
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

export default handleLoadContainer;


