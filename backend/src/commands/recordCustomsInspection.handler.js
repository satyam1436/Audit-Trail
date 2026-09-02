import eventStore from "../services/EventStore.js";
import ContainerAggregate from "../domain/aggregates/ContainerAggregate.js";

const handleRecordCustomsInspection = async (command) => {
    const { containerId, inspector } = command;

    if (!containerId || !inspector) {
        throw new Error("containerId and inspector are required");
    }

    const existingEvents = await eventStore.getEvents(containerId);

    const aggregate = new ContainerAggregate();

    aggregate.rehydrate(existingEvents);

    const event = aggregate.recordCustomsInspection({
        inspector,
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

export default handleRecordCustomsInspection;