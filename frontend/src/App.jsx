import { useState } from "react";

import SearchBar from "./components/search/SearchBar";
import AppHeader from "./components/common/AppHeader";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = (containerId) => {
    console.log("Searching for:", containerId);

    setIsLoading(true);
    setError("");

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setError("Container not found. Please check the ID and try again.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <AppHeader />

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <SearchBar
            onSearch={handleSearch}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
