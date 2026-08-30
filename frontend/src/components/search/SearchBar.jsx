import { useState } from "react";
import { Search, X, Loader2 } from "lucide-react";

const CONTAINER_ID_PATTERN = /^CONT-\d{4}-[A-Z]$/;

function SearchBar({ onSearch, isLoading, error }) {
  const [query, setQuery] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (validationError) setValidationError("");
  };

  const validateAndSearch = () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setValidationError("Please enter a container ID.");
      return;
    }

    if (!CONTAINER_ID_PATTERN.test(trimmedQuery)) {
      setValidationError("Format should be like CONT-4081-T.");
      return;
    }

    setValidationError("");
    onSearch(trimmedQuery);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      validateAndSearch();
    }
  };

  const handleClear = () => {
    setQuery("");
    setValidationError("");
  };

  const hasError = validationError || error;

  return (
    <div className="w-full">
      <div
        className={`flex items-center gap-2 bg-slate-800 border rounded-md px-3 py-2.5 transition-colors ${
          hasError ? "border-rose-500" : "border-slate-700 focus-within:border-teal-500"
        }`}
      >
        <Search size={18} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter container ID (e.g., CONT-4081-T)"
          disabled={isLoading}
          aria-label="Container ID search"
          className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 font-mono text-sm outline-none disabled:opacity-50"
        />
        {query && !isLoading && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="text-slate-400 hover:text-slate-200 shrink-0"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {hasError && (
        <p className="mt-1.5 text-xs text-rose-500" role="alert">
          {validationError || error}
        </p>
      )}

      <button
        type="button"
        onClick={validateAndSearch}
        disabled={isLoading}
        className="mt-3 w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Investigating...
          </>
        ) : (
          "Investigate"
        )}
      </button>
    </div>
  );
}

export default SearchBar;