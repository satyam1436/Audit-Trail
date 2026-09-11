import { useState } from "react";
import SearchBar from "./components/search/SearchBar";
import AppHeader from "./components/common/AppHeader";
import ShipmentOverview from "./components/overview/ShipmentOverview";
import EventTimeline from "./components/timeline/EventTimeline";
import EventInspector from "./components/timeline/EventInspector";
import HistoricalScrubber from "./components/timeline/HistoricalScrubber";
import SkeletonLoader from "./components/common/SkeletonLoader";
import EmptyState from "./components/common/EmptyState";
import { getShipmentById, getShipmentAtTime } from "./services/shipmentService";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [shipment, setShipment] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Historical mode state
  const [isHistorical, setIsHistorical] = useState(false);
  const [historicalVersion, setHistoricalVersion] = useState(null);
  const [historicalSnapshot, setHistoricalSnapshot] = useState(null);

  const handleSearch = async (containerId) => {
    setIsLoading(true);
    setError("");
    setShipment(null);
    setHasSearched(true);
    setIsHistorical(false);

    try {
      const result = await getShipmentById(containerId);
      setShipment(result);
    } catch (err) {
      setError("Container not found. Please check the ID and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleScrub = async (version) => {
    setHistoricalVersion(version);
    setIsHistorical(true);

    try {
      const snapshot = await getShipmentAtTime(shipment.containerId, version);
      setHistoricalSnapshot(snapshot);
    } catch (err) {
      setHistoricalSnapshot(null);
    }
  };

  const handleReturnToLive = () => {
    setIsHistorical(false);
    setHistoricalSnapshot(null);
    setHistoricalVersion(null);
  };

  const displayedShipment = isHistorical && historicalSnapshot ? historicalSnapshot : shipment;

  return (
    <div className="min-h-screen bg-slate-950">
      <AppHeader />
      <div className="p-4 sm:p-6 flex flex-col items-center gap-4">
        <div className="w-full max-w-md">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} error={error} />
        </div>

        {isLoading && <SkeletonLoader />}

        {!isLoading && shipment && (
          <div className="w-full max-w-4xl flex flex-col gap-4">
            {isHistorical && (
              <div className="flex items-center justify-between gap-3 bg-amber-500/10 border border-amber-500/40 rounded-lg px-4 py-2.5 flex-wrap">
                <span className="text-xs sm:text-sm font-semibold text-amber-400">
                  ⚠ Viewing Historical Reconstruction — this is not the live current state
                </span>
                <button
                  type="button"
                  onClick={handleReturnToLive}
                  className="text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-slate-950 px-3 py-1.5 rounded-md shrink-0"
                >
                  Return to Live State
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] gap-6">
              <div className="flex flex-col gap-4">
                <ShipmentOverview shipment={displayedShipment} />
                <HistoricalScrubber
                  events={shipment.events}
                  selectedVersion={historicalVersion ?? shipment.currentVersion}
                  onChange={handleScrub}
                />
              </div>
              <div>
                <EventTimeline
                  events={shipment.events}
                  onInspectEvent={setSelectedEvent}
                  highlightedVersion={isHistorical ? historicalVersion : null}
                />
              </div>
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