class RecordTemperatureSpikeCommand {
    constructor({ containerId, temperature, unit }) {
        this.containerId = containerId;
        this.temperature = temperature;
        this.unit = unit;
    }
}

export default RecordTemperatureSpikeCommand;