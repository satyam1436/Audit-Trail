import eventStore from "../services/EventStore.js";
import ContainerAggregate from "../domain/aggregates/ContainerAggregate.js";

const handleRecordSealBreach = async (command) => {
    const { containerId, reason } = command;

    if (!containerId || !reason) {
        throw new Error("containerId and reason are required");
    }

    const existingEvents = await eventStore.getEvents(containerId);

    const aggregate = new ContainerAggregate();

    aggregate.rehydrate(existingEvents);

    const event = aggregate.recordSealBreach({
        reason,
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

export default handleRecordSealBreach;