import eventStore from "../services/EventStore.js";
import ContainerAggregate from "../domain/aggregates/ContainerAggregate.js";

const getContainerState = async (containerId) => {
    if (!containerId) {
        throw new Error("containerId is required");
    }

    const events = await eventStore.getEvents(containerId);

    if (events.length === 0) {
        throw new Error("Container not found");
    }
    

    const aggregate = new ContainerAggregate();

    aggregate.rehydrate(events);

    return {
        containerId,
        state: {
            exists: aggregate.exists,
            location: aggregate.location,
            status: aggregate.status,
            loaded: aggregate.loaded,
            customsInspected: aggregate.customsInspected,
            arrived: aggregate.arrived,
        },
        version: events[events.length - 1].version,
    };
};

export default getContainerState;

