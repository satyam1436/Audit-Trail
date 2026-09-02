import eventStore from "../services/EventStore.js";
import ContainerAggregate from "../domain/aggregates/ContainerAggregate.js";

const handleRecordTemperatureSpike = async (command) => {
    const { containerId, temperature, unit } = command;

    if (!containerId || temperature === undefined) {
        throw new Error("containerId and temperature are required");
    }

    const existingEvents = await eventStore.getEvents(containerId);

    const aggregate = new ContainerAggregate();

    aggregate.rehydrate(existingEvents);

    const event = aggregate.recordTemperatureSpike({
        temperature,
        unit,
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

export default handleRecordTemperatureSpike;