import { useState } from "react";
import SearchBar from "./components/search/SearchBar";
import AppHeader from "./components/common/AppHeader";
import ShipmentOverview from "./components/overview/ShipmentOverview";
import EventTimeline from "./components/timeline/EventTimeline";
import EventInspector from "./components/timeline/EventInspector";
import SkeletonLoader from "./components/common/SkeletonLoader";
import EmptyState from "./components/common/EmptyState";
import { getShipmentById } from "./services/shipmentService";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [shipment, setShipment] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (containerId) => {
    setIsLoading(true);
    setError("");
    setShipment(null);
    setHasSearched(true);

    try {
      const result = await getShipmentById(containerId);
      setShipment(result);
    } catch (err) {
      setError("Container not found. Please check the ID and try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
            <div>
              <ShipmentOverview shipment={shipment} />
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