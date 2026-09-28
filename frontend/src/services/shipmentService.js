import api from "./api";
import { findMockShipment, findMockTemperatureSeries } from "./mockData";

// Toggle this to false once the backend API is ready for integration
const USE_MOCK_DATA = true;
const SIMULATED_DELAY_MS = 1200;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetches a shipment's current state and full event history by its container ID.
 * Falls back to mock data during frontend-only development phases.
 */
export async function getShipmentById(containerId) {
  const [stateResponse, eventsResponse] = await Promise.all([
    api.get(`/shipments/${containerId}`),
    api.get(`/shipments/${containerId}/events`),
  ]);

  const stateData = stateResponse.data;
  const eventsData = eventsResponse.data;

  return {
    containerId: stateData.containerId,
    currentVersion: stateData.version,
    currentStatus: stateData.state.status,
    currentLocation: stateData.state.location,
    sensorHealth: stateData.state.sensorHealth,
    temperature: stateData.state.temperature,
    lastModifiedTimestamp: stateData.lastModifiedTimestamp,
    events: eventsData.events,
  };
}

/**
 * Fetches only the event stream for a shipment (used when refreshing
 * the timeline independently of the overview panel).
 */
export async function getShipmentEvents(containerId) {
  if (USE_MOCK_DATA) {
    await delay(SIMULATED_DELAY_MS);
    const shipment = findMockShipment(containerId);

    if (!shipment) {
      throw new Error("NOT_FOUND");
    }

    return shipment.events;
  }

  const response = await api.get(`/shipments/${containerId}/events`);
  return response.data;
}

/**
 * Fetches the reconstructed container state at a specific point in time.
 * This is used by the historical state time-travel/scrubber feature.
 */
export async function getHistoricalState(containerId, timestamp) {
  if (!containerId) {
    throw new Error("containerId is required");
  }

  if (!timestamp) {
    throw new Error("timestamp is required");
  }

  const response = await api.get(
    `/shipments/${containerId}/at`,
    {
      params: {
        time: timestamp,
      },
    }
  );

  return response.data;
}

/**
 * Fetches the continuous temperature sensor readings for a shipment,
 * used to plot the telemetry chart. Falls back to mock series data
 * during frontend-only development.
 */
export async function getShipmentTemperatureSeries(containerId) {
  if (USE_MOCK_DATA) {
    await delay(600);
    return findMockTemperatureSeries(containerId);
  }

  const response = await api.get(`/shipments/${containerId}/telemetry`);
  return response.data;
}
