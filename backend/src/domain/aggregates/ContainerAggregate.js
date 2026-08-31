class ContainerAggregate {
    constructor() {
        this.exists = false;
        this.location = null;
        this.status = null;
    }

    create({ location }) {
        if (this.exists) {
            throw new Error("Container already exists");
        }

        if (!location) {
            throw new Error("Container location is required");
        }

        return {
            eventType: "CONTAINER_CREATED",
            payload: {
                location,
            },
        };
    }
    

    apply(event) {
        switch (event.eventType) {
            case "CONTAINER_CREATED":
                this.exists = true;
                this.location = event.payload.location;
                this.status = "CREATED";
                break;

            case "LOADED_ON_SHIP":
                this.status = "LOADED";
                break;

            case "TEMPERATURE_SPIKE":
                this.status = "TEMPERATURE_ALERT";
                break;

            case "SEAL_BREACH":
                this.status = "SEAL_BREACH";
                break;

            case "CUSTOMS_INSPECTED":
                this.status = "CUSTOMS_INSPECTED";
                break;

            case "ARRIVED_AT_PORT":
                this.status = "ARRIVED";
                break;

            default:
                throw new Error(`Unknown event type: ${event.eventType}`);
        }
    }

    rehydrate(events) {
        for (const event of events) {
            this.apply(event);
        }

        return this;
    }
}

export default ContainerAggregate;

