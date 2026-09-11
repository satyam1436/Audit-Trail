// Offline fixture data for development
// Field names mirror the authoritative backend response contract (SRS-DEV2-FE-REVISED-2026-V1.0)

export const MOCK_SHIPMENTS = {
  "CONT-8832-B": {
    containerId: "CONT-8832-B",
    currentVersion: 4,
    currentStatus: "IN_TRANSIT",
    currentLocation: "North Sea Transit",
    sensorHealth: "NORMAL",
    temperature: 3.8,
    lastModifiedTimestamp: "2026-08-25T06:00:00Z",
    events: [
      {
        eventId: "evt-001",
        version: 1,
        eventType: "CONTAINER_CREATED",
        timestamp: "2026-08-24T08:00:00Z",
        recordedBy: "system:ingest-service",
        payload: { origin: "Hamburg Port", initialTemp: 4.1 },
      },
      {
        eventId: "evt-002",
        version: 2,
        eventType: "LOADED_ON_SHIP",
        timestamp: "2026-08-24T12:30:00Z",
        recordedBy: "operator:hamburg-dock-04",
        payload: { vessel: "Nordic Explorer", bay: "B-14" },
      },
      {
        eventId: "evt-003",
        version: 3,
        eventType: "TEMPERATURE_SPIKE",
        timestamp: "2026-08-24T19:45:00Z",
        recordedBy: "sensor:thermo-array-12",
        payload: { recordedTemp: 14.8, threshold: 8.0, severity: "CRITICAL" },
      },
      {
        eventId: "evt-004",
        version: 4,
        eventType: "ARRIVED_AT_PORT",
        timestamp: "2026-08-25T06:00:00Z",
        recordedBy: "operator:rotterdam-gate-02",
        payload: { destination: "Rotterdam Terminal", inspected: true },
      },
    ],
  },

  "CONT-4081-T": {
    containerId: "CONT-4081-T",
    currentVersion: 2,
    currentStatus: "ARRIVED",
    currentLocation: "Rotterdam Port, Berth 4",
    sensorHealth: "NORMAL",
    temperature: 5.2,
    lastModifiedTimestamp: "2026-08-26T10:00:00Z",
    events: [
      {
        eventId: "evt-101",
        version: 1,
        eventType: "CONTAINER_CREATED",
        timestamp: "2026-08-25T09:00:00Z",
        recordedBy: "system:ingest-service",
        payload: { origin: "Antwerp Port", initialTemp: 5.0 },
      },
      {
        eventId: "evt-102",
        version: 2,
        eventType: "ARRIVED_AT_PORT",
        timestamp: "2026-08-26T10:00:00Z",
        recordedBy: "operator:rotterdam-gate-01",
        payload: { destination: "Rotterdam Port", inspected: true },
      },
    ],
  },

  "CONT-1102-S": {
    containerId: "CONT-1102-S",
    currentVersion: 3,
    currentStatus: "SEAL_BROKEN",
    currentLocation: "Singapore Port, Yard 7",
    sensorHealth: "ALERT",
    temperature: 18.4,
    lastModifiedTimestamp: "2026-08-27T14:20:00Z",
    events: [
      {
        eventId: "evt-201",
        version: 1,
        eventType: "CONTAINER_CREATED",
        timestamp: "2026-08-26T07:00:00Z",
        recordedBy: "system:ingest-service",
        payload: { origin: "Shanghai Port", initialTemp: 4.5 },
      },
      {
        eventId: "evt-202",
        version: 2,
        eventType: "LOADED_ON_SHIP",
        timestamp: "2026-08-26T15:00:00Z",
        recordedBy: "operator:shanghai-dock-09",
        payload: { vessel: "Pacific Voyager", bay: "C-02" },
      },
      {
        eventId: "evt-203",
        version: 3,
        eventType: "SEAL_BREACH",
        timestamp: "2026-08-27T14:20:00Z",
        recordedBy: "sensor:seal-monitor-04",
        payload: { location: "Singapore Port, Yard 7", detectedBy: "Sensor-Array-04" },
      },
    ],
  },
};

export function findMockShipment(containerId) {
  return MOCK_SHIPMENTS[containerId] || null;
}

// Builds a point-in-time snapshot by replaying events up to a given version.
// This is fixture/mock data only, mimicking the shape of the real
// GET /api/v1/shipments/:id/at?time=t backend response.
export function buildHistoricalSnapshot(containerId, atVersion) {
  const shipment = MOCK_SHIPMENTS[containerId];
  if (!shipment) return null;

  const sortedEvents = [...shipment.events].sort((a, b) => a.version - b.version);
  const relevantEvents = sortedEvents.filter((e) => e.version <= atVersion);
  if (relevantEvents.length === 0) return null;

  let snapshot = {
    containerId: shipment.containerId,
    currentVersion: 0,
    currentStatus: "CREATED",
    currentLocation: "Unknown",
    sensorHealth: "NORMAL",
    temperature: null,
    lastModifiedTimestamp: null,
  };

  for (const event of relevantEvents) {
    snapshot.currentVersion = event.version;
    snapshot.lastModifiedTimestamp = event.timestamp;

    switch (event.eventType) {
      case "CONTAINER_CREATED":
        snapshot.currentLocation = event.payload.origin;
        snapshot.temperature = event.payload.initialTemp;
        break;
      case "LOADED_ON_SHIP":
        snapshot.currentStatus = "IN_TRANSIT";
        snapshot.currentLocation = `${event.payload.vessel}, Bay ${event.payload.bay}`;
        break;
      case "TEMPERATURE_SPIKE":
        snapshot.sensorHealth = "ALERT";
        snapshot.temperature = event.payload.recordedTemp;
        break;
      case "SEAL_BREACH":
        snapshot.currentStatus = "SEAL_BROKEN";
        snapshot.sensorHealth = "ALERT";
        snapshot.currentLocation = event.payload.location;
        break;
      case "ARRIVED_AT_PORT":
        snapshot.currentStatus = "ARRIVED";
        snapshot.currentLocation = event.payload.destination;
        break;
      default:
        break;
    }
  }

  return snapshot;
}