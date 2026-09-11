import api from "./api";
import { findMockShipment } from "./mockData";

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
export async function getShipmentById(shipmentId) {
  if (USE_MOCK_DATA) {
    await delay(SIMULATED_DELAY_MS);
    const shipment = findMockShipment(shipmentId);

    if (!shipment) {
      throw new Error("NOT_FOUND");
    }

    return shipment;
  }

  const response = await api.get(`/shipments/${shipmentId}`);
  return response.data;
}

/**
 * Fetches only the event stream for a shipment (used when refreshing
 * the timeline independently of the overview panel).
 */
export async function getShipmentEvents(shipmentId) {
  if (USE_MOCK_DATA) {
    await delay(SIMULATED_DELAY_MS);
    const shipment = findMockShipment(shipmentId);

    if (!shipment) {
      throw new Error("NOT_FOUND");
    }

    return shipment.events;
  }

  const response = await api.get(`/shipments/${shipmentId}/events`);
  return response.data;
}