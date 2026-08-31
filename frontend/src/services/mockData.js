// Provisional contract fixture data for offline development
// Mirrors the authoritative CQRS read models (per SRS Section 8.2)

export const MOCK_SHIPMENTS = {
  "CONT-8832-B": {
    shipmentId: "CONT-8832-B",
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
        payload: { origin: "Hamburg Port", initialTemp: 4.1 },
      },
      {
        eventId: "evt-002",
        version: 2,
        eventType: "LOADED_ON_SHIP",
        timestamp: "2026-08-24T12:30:00Z",
        payload: { vessel: "Nordic Explorer", bay: "B-14" },
      },
      {
        eventId: "evt-003",
        version: 3,
        eventType: "TEMPERATURE_SPIKE",
        timestamp: "2026-08-24T19:45:00Z",
        payload: { recordedTemp: 14.8, threshold: 8.0, severity: "CRITICAL" },
      },
      {
        eventId: "evt-004",
        version: 4,
        eventType: "ARRIVED_AT_PORT",
        timestamp: "2026-08-25T06:00:00Z",
        payload: { destination: "Rotterdam Terminal", inspected: true },
      },
    ],
  },

  "CONT-4081-T": {
    shipmentId: "CONT-4081-T",
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
        payload: { origin: "Antwerp Port", initialTemp: 5.0 },
      },
      {
        eventId: "evt-102",
        version: 2,
        eventType: "ARRIVED_AT_PORT",
        timestamp: "2026-08-26T10:00:00Z",
        payload: { destination: "Rotterdam Port", inspected: true },
      },
    ],
  },

  "CONT-1102-S": {
    shipmentId: "CONT-1102-S",
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
        payload: { origin: "Shanghai Port", initialTemp: 4.5 },
      },
      {
        eventId: "evt-202",
        version: 2,
        eventType: "LOADED_ON_SHIP",
        timestamp: "2026-08-26T15:00:00Z",
        payload: { vessel: "Pacific Voyager", bay: "C-02" },
      },
      {
        eventId: "evt-203",
        version: 3,
        eventType: "SEAL_BREACH",
        timestamp: "2026-08-27T14:20:00Z",
        payload: { location: "Singapore Port, Yard 7", detectedBy: "Sensor-Array-04" },
      },
    ],
  },
};

export function findMockShipment(shipmentId) {
  return MOCK_SHIPMENTS[shipmentId] || null;
}