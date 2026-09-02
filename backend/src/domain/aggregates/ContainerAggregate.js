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

    loadOnShip({ vessel }) {
        if (!this.exists) {
            throw new Error("Container does not exist");
        }

        if (this.arrived) {
            throw new Error("Container has already arrived");
        }

        if (this.loaded) {
            throw new Error("Container is already loaded");
        }

        return {
            eventType: "LOADED_ON_SHIP",
            payload: {
                vessel,
            },
        };
    }

    recordTemperatureSpike({ temperature, unit = "C" }) {
        if (!this.exists) {
            throw new Error("Container does not exist");
        }

        if (this.arrived) {
            throw new Error("Container has already arrived");
        }

        return {
            eventType: "TEMPERATURE_SPIKE",
            payload: {
                temperature,
                unit,
            },
        };
    }

    recordSealBreach({ reason }) {
        if (!this.exists) {
            throw new Error("Container does not exist");
        }

        if (this.arrived) {
            throw new Error("Container has already arrived");
        }

        return {
            eventType: "SEAL_BREACH",
            payload: {
                reason,
            },
        };
    }

    recordCustomsInspection({ inspector }) {
        if (!this.exists) {
            throw new Error("Container does not exist");
        }

        if (!this.loaded) {
            throw new Error("Container must be loaded before customs inspection");
        }

        if (this.arrived) {
            throw new Error("Container has already arrived");
        }

        if (this.customsInspected) {
            throw new Error("Container has already been inspected");
        }

        return {
            eventType: "CUSTOMS_INSPECTED",
            payload: {
                inspector,
            },
        };
    }

    arriveAtPort({ location }) {
        if (!this.exists) {
            throw new Error("Container does not exist");
        }

        if (!this.loaded) {
            throw new Error("Container must be loaded before arrival");
        }

        if (this.arrived) {
            throw new Error("Container has already arrived");
        }

        return {
            eventType: "ARRIVED_AT_PORT",
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
                this.loaded = true;
                this.status = "LOADED";
                break;

            case "TEMPERATURE_SPIKE":
                this.status = "TEMPERATURE_ALERT";
                break;

            case "SEAL_BREACH":
                this.status = "SEAL_BREACH";
                break;

            case "CUSTOMS_INSPECTED":
                this.customsInspected = true;
                this.status = "CUSTOMS_INSPECTED";
                break;

            case "ARRIVED_AT_PORT":
                this.arrived = true;
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

