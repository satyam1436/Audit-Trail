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

// Simulated continuous temperature readings for the telemetry chart.
// In production this would come from a dedicated sensor-readings endpoint.
export const MOCK_TEMPERATURE_SERIES = {
  "CONT-8832-B": [
    { timestamp: "2026-08-24T08:00:00Z", temperature: 4.1 },
    { timestamp: "2026-08-24T11:00:00Z", temperature: 4.3 },
    { timestamp: "2026-08-24T14:00:00Z", temperature: 4.5 },
    { timestamp: "2026-08-24T17:00:00Z", temperature: 6.2 },
    { timestamp: "2026-08-24T19:45:00Z", temperature: 14.8 },
    { timestamp: "2026-08-24T22:00:00Z", temperature: 9.1 },
    { timestamp: "2026-08-25T01:00:00Z", temperature: 5.6 },
    { timestamp: "2026-08-25T04:00:00Z", temperature: 4.0 },
    { timestamp: "2026-08-25T06:00:00Z", temperature: 3.8 },
  ],
  "CONT-4081-T": [
    { timestamp: "2026-08-25T09:00:00Z", temperature: 5.0 },
    { timestamp: "2026-08-25T15:00:00Z", temperature: 5.1 },
    { timestamp: "2026-08-25T21:00:00Z", temperature: 4.9 },
    { timestamp: "2026-08-26T03:00:00Z", temperature: 5.0 },
    { timestamp: "2026-08-26T10:00:00Z", temperature: 5.2 },
  ],
  "CONT-1102-S": [
    { timestamp: "2026-08-26T07:00:00Z", temperature: 4.5 },
    { timestamp: "2026-08-26T12:00:00Z", temperature: 4.8 },
    { timestamp: "2026-08-26T18:00:00Z", temperature: 5.0 },
    { timestamp: "2026-08-27T06:00:00Z", temperature: 5.3 },
    { timestamp: "2026-08-27T12:00:00Z", temperature: 6.1 },
    { timestamp: "2026-08-27T14:20:00Z", temperature: 6.4 },
    { timestamp: "2026-08-27T16:00:00Z", temperature: 18.4 },
  ],
};

export function findMockTemperatureSeries(containerId) {
  return MOCK_TEMPERATURE_SERIES[containerId] || [];
}