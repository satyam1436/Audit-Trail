import crypto from "crypto";
import Event from "../models/Event.js";

class EventStore {
    async appendEvent({
        aggregateId,
        eventType,
        payload,
        metadata = {},
    }) {
        const lastEvent = await Event.findOne({ aggregateId })
            .sort({ version: -1 })
            .lean();

        const nextVersion = lastEvent ? lastEvent.version + 1 : 1;

        const event = await Event.create({
            eventId: crypto.randomUUID(),
            aggregateId,
            eventType,
            timestamp: new Date(),
            version: nextVersion,
            payload,
            metadata,
        });

        return event;
    }

    async getEvents(aggregateId) {
        return Event.find({ aggregateId })
            .sort({ version: 1 })
            .lean();
    }
}

export default new EventStore();