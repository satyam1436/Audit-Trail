import eventStore from "../services/EventStore.js";
import ContainerAggregate from "../domain/aggregates/ContainerAggregate.js";

const getHistoricalContainerState = async (containerId, timestamp) => {
    if (!containerId) {
        throw new Error("containerId is required");
    }

    if (!timestamp) {
        throw new Error("timestamp is required");
    }

    const targetTime = new Date(timestamp);

    if (Number.isNaN(targetTime.getTime())) {
        throw new Error("Invalid timestamp");
    }

    const events = await eventStore.getEventsAt(
        containerId,
        targetTime
    );

    if (events.length === 0) {
        throw new Error(
            "No container events found at or before the requested time"
        );
    }

    const aggregate = new ContainerAggregate();

    aggregate.rehydrate(events);

    return {
        containerId,
        timestamp: targetTime.toISOString(),
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

export default getHistoricalContainerState;