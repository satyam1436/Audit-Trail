import mongoose from "mongoose";


const EventSchema = new mongoose.Schema(
    {
        eventId: {
            type: String,
            required: true,
            unique: true,
        },

        aggregateId: {
            type: String,
            required: true,
            index: true,
        },

        eventType: {
            type: String,
            required: true,
            enum: [
                "CONTAINER_CREATED",
                "LOADED_ON_SHIP",
                "TEMPERATURE_SPIKE",
                "SEAL_BREACH",
                "CUSTOMS_INSPECTED",
                "ARRIVED_AT_PORT",
            ],
        },

        timestamp: {
            type: Date,
            required: true,
            default: Date.now,
        },

        version: {
            type: Number,
            required: true,
        },

        payload: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },

        metadata: {
            correlationId: {
                type: String,
            },

            recordedBy: {
                type: String,
            },
        },
    },
    {
        timestamps: false,
        versionKey: false,
    }
);


EventSchema.index(
    { aggregateId: 1, version: 1 },
    { unique: true }
);

const Event = mongoose.model("Event", EventSchema);

export default Event;

