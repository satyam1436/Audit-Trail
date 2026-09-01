import { useState } from "react";
import SearchBar from "./components/search/SearchBar";
import AppHeader from "./components/common/AppHeader";
import ShipmentOverview from "./components/overview/ShipmentOverview";
import { getShipmentById } from "./services/shipmentService";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [shipment, setShipment] = useState(null);

  const handleSearch = async (containerId) => {
    setIsLoading(true);
    setError("");
    setShipment(null);

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

        {shipment && (
          <div className="w-full max-w-2xl">
            <ShipmentOverview shipment={shipment} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;