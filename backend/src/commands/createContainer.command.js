class CreateContainerCommand {
    constructor({ containerId, location }) {
        this.containerId = containerId;
        this.location = location;
    }
}

export default CreateContainerCommand;