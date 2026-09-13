import { useState, useEffect } from "react";
import SearchBar from "./components/search/SearchBar";
import AppHeader from "./components/common/AppHeader";
import ShipmentOverview from "./components/overview/ShipmentOverview";
import EventTimeline from "./components/timeline/EventTimeline";
import EventInspector from "./components/timeline/EventInspector";
import TemperatureChart from "./components/timeline/TemperatureChart";
import SkeletonLoader from "./components/common/SkeletonLoader";
import EmptyState from "./components/common/EmptyState";
import { getShipmentById, getShipmentTemperatureSeries } from "./services/shipmentService";

const CRITICAL_EVENT_TYPES = new Set(["TEMPERATURE_SPIKE", "SEAL_BREACH"]);

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [shipment, setShipment] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [temperatureSeries, setTemperatureSeries] = useState([]);

  const handleSearch = async (containerId) => {
    setIsLoading(true);
    setError("");
    setShipment(null);
    setTemperatureSeries([]);
    setHasSearched(true);

    try {
      const result = await getShipmentById(containerId);
      setShipment(result);

      const series = await getShipmentTemperatureSeries(containerId);
      setTemperatureSeries(series);
    } catch (err) {
      setError("Container not found. Please check the ID and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const criticalEvents = shipment
    ? shipment.events.filter((event) => CRITICAL_EVENT_TYPES.has(event.eventType))
    : [];

  return (
    <div className="min-h-screen bg-slate-950">
      <AppHeader />
      <div className="p-4 sm:p-6 flex flex-col items-center gap-6">
        <div className="w-full max-w-md">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} error={error} />
        </div>

        {isLoading && <SkeletonLoader />}

        {!isLoading && shipment && (
          <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-[58%_42%] gap-6">
            <div className="flex flex-col gap-4">
              <ShipmentOverview shipment={shipment} />
              <TemperatureChart
                temperatureSeries={temperatureSeries}
                criticalEvents={criticalEvents}
              />
            </div>
            <div>
              <EventTimeline
                events={shipment.events}
                onInspectEvent={setSelectedEvent}
              />
            </div>
          </div>
        )}

        {!isLoading && !shipment && !hasSearched && <EmptyState />}
      </div>

      {selectedEvent && (
        <EventInspector event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}

export default App;