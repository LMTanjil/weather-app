import { Search, MapPin, LoaderCircle } from "lucide-react";

export default function LocationSearch({
  value,
  onChange,
  onSubmit,
  isSearching,
  searchResults,
  onSelect,
  selectedLocation,
  helperText,
}) {
  return (
    <div className="w-full">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="location-search" className="sr-only">
          Search for a location
        </label>
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            id="location-search"
            type="search"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-11 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            placeholder="Search city, region, or country"
            aria-label="Search location"
          />
        </div>
        <button
          type="submit"
          disabled={isSearching}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 font-medium text-white transition hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 disabled:cursor-not-allowed disabled:bg-sky-400"
        >
          {isSearching ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Search className="h-4 w-4" aria-hidden="true" />}
          Search
        </button>
      </form>

      {selectedLocation ? (
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-700">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          <span>{selectedLocation.name}</span>
        </div>
      ) : null}

      {helperText ? <p className="mt-3 text-sm text-slate-600">{helperText}</p> : null}

      {searchResults.length > 0 ? (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Matching locations</p>
          <div className="flex flex-wrap gap-2">
            {searchResults.map((location) => (
              <button
                key={location.id}
                type="button"
                onClick={() => onSelect(location)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100"
              >
                {location.name}
                {location.region ? `, ${location.region}` : ""}
                {location.country ? `, ${location.country}` : ""}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
