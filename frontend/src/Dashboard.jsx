import { useState } from "react";

import SearchBar from "./components/search/SearchBar";
import AppHeader from "./components/common/AppHeader";
import ShipmentOverview from "./components/overview/ShipmentOverview";
import EventTimeline from "./components/timeline/EventTimeline";
import EventInspector from "./components/timeline/EventInspector";
import TemperatureChart from "./components/timeline/TemperatureChart";
import SkeletonLoader from "./components/common/SkeletonLoader";
import EmptyState from "./components/common/EmptyState";
import TimeSlider from "./components/scrubber/TimeSlider";
import HistoricalBanner from "./components/scrubber/HistoricalBanner";

import {
  getShipmentById,
  getShipmentTemperatureSeries,
  getHistoricalState,
} from "./services/shipmentService";

const CRITICAL_EVENT_TYPES = new Set([
  "TEMPERATURE_SPIKE",
  "SEAL_BREACH",
]);

function Dashboard({ onLogout }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [shipment, setShipment] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [temperatureSeries, setTemperatureSeries] = useState([]);
  const [historicalState, setHistoricalState] = useState(null);
  const [historicalIndex, setHistoricalIndex] = useState(null);
  const [isHistoricalLoading, setIsHistoricalLoading] = useState(false);

  const handleSearch = async (containerId) => {
    setIsLoading(true);
    setError("");
    setShipment(null);
    setTemperatureSeries([]);
    setHasSearched(true);

    setHistoricalState(null);
    setHistoricalIndex(null);
    setIsHistoricalLoading(false);

    try {
      const result = await getShipmentById(containerId);
      setShipment(result);

      const series = await getShipmentTemperatureSeries(containerId);
      setTemperatureSeries(series);
    } catch (err) {
      console.error("Shipment loading error:", err);

      if (err.message === "NOT_FOUND") {
        setError("Container not found.");
      } else {
        setError(
          err.message || "Failed to load container."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistoricalChange = async (index) => {
    if (!shipment || !shipment.events?.length) {
      return;
    }

    const sortedEvents = [...shipment.events].sort(
      (a, b) => a.version - b.version
    );

    const selectedEvent = sortedEvents[index];

    if (!selectedEvent) {
      return;
    }

    setHistoricalIndex(index);
    setIsHistoricalLoading(true);
    setError("");

    try {
      const result = await getHistoricalState(
        shipment.containerId,
        selectedEvent.timestamp
      );

      setHistoricalState(result);
    } catch (err) {
      console.error(
        "Historical state loading error:",
        err
      );

      setError(
        err.message ||
        "Failed to load historical container state."
      );
    } finally {
      setIsHistoricalLoading(false);
    }
  };

  const handleReturnToLive = () => {
    setHistoricalState(null);
    setHistoricalIndex(null);
    setIsHistoricalLoading(false);
    setError("");
  };

  const criticalEvents = shipment
    ? shipment.events.filter((event) =>
      CRITICAL_EVENT_TYPES.has(event.eventType)
    )
    : [];

  const displayedShipment = historicalState
    ? {
      ...shipment,
      currentStatus: historicalState.state.status,
      currentLocation: historicalState.state.location,
      currentVersion: historicalState.version,
      sensorHealth:
        historicalState.state.status ===
          "TEMPERATURE_ALERT"
          ? "ALERT"
          : "NORMAL",
      lastModifiedTimestamp:
        historicalState.timestamp,
    }
    : shipment;

  return (
    <div className="min-h-screen bg-slate-950">
      <AppHeader onLogout={onLogout} />

      <div className="p-4 sm:p-6 flex flex-col items-center gap-6">
        <div className="w-full max-w-md">
          <SearchBar
            onSearch={handleSearch}
            isLoading={isLoading}
            error={error}
          />
        </div>

        {isLoading && <SkeletonLoader />}

        {!isLoading && shipment && (
          <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-[58%_42%] gap-6">
            {historicalState && (
              <HistoricalBanner
                timestamp={historicalState.timestamp}
                version={historicalState.version}
                onReturnToLive={
                  handleReturnToLive
                }
              />
            )}

            <TimeSlider
              events={shipment.events}
              selectedIndex={
                historicalIndex ??
                shipment.events.length - 1
              }
              onChange={handleHistoricalChange}
              disabled={isHistoricalLoading}
            />

            <div className="flex flex-col gap-4">
              <ShipmentOverview
                shipment={displayedShipment}
              />

              <TemperatureChart
                temperatureSeries={
                  temperatureSeries
                }
                criticalEvents={criticalEvents}
              />
            </div>

            <div>
              <EventTimeline
                events={shipment.events}
                onInspectEvent={
                  setSelectedEvent
                }
              />
            </div>
          </div>
        )}

        {!isLoading &&
          !shipment &&
          !hasSearched && <EmptyState />}
      </div>

      {selectedEvent && (
        <EventInspector
          event={selectedEvent}
          onClose={() =>
            setSelectedEvent(null)
          }
        />
      )}
    </div>
  );
}

export default Dashboard;