import api from "./api";
import { findMockShipment, buildHistoricalSnapshot } from "./mockData";

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
  if (USE_MOCK_DATA) {
    await delay(SIMULATED_DELAY_MS);
    const shipment = findMockShipment(containerId);

    if (!shipment) {
      throw new Error("NOT_FOUND");
    }

    return shipment;
  }

  const response = await api.get(`/shipments/${containerId}`);
  return response.data;
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
 * Fetches the authoritative reconstructed state of a shipment at a specific
 * point in time (identified here by event version, used as the scrubber's
 * step value). The backend performs the actual replay/reconstruction -
 * this function only consumes that result (or a mock equivalent).
 */
export async function getShipmentAtTime(containerId, atVersion) {
  if (USE_MOCK_DATA) {
    await delay(400);
    const snapshot = buildHistoricalSnapshot(containerId, atVersion);

    if (!snapshot) {
      throw new Error("NOT_FOUND");
    }

    return snapshot;
  }

  const response = await api.get(`/shipments/${containerId}/at`, {
    params: { time: atVersion },
  });
  return response.data;
}