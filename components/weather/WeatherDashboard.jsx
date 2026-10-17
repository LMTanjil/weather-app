"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Search, RefreshCw } from "lucide-react";
import CurrentWeather from "@/components/weather/CurrentWeather";
import DailyForecast from "@/components/weather/DailyForecast";
import HourlyForecast from "@/components/weather/HourlyForecast";
import LocationSearch from "@/components/weather/LocationSearch";
import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import { DEFAULT_LOCATION, getWeatherCodeMeta, getLocationLabel } from "@/lib/weather-utils";
import { fetchWeatherForLocation, searchLocations } from "@/lib/weather-api";

export default function WeatherDashboard() {
  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION);
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");

  const weatherRequestRef = useRef(0);
  const weatherAbortRef = useRef(null);

  const loadWeather = async (location, shouldRefresh = false) => {
    if (weatherAbortRef.current) {
      weatherAbortRef.current.abort();
    }

    const controller = new AbortController();
    weatherAbortRef.current = controller;
    const requestId = ++weatherRequestRef.current;

    if (!shouldRefresh) {
      setIsLoading(true);
    } else {
      setIsRefreshing(true);
    }

    setError("");

    try {
      const data = await fetchWeatherForLocation(location, controller.signal);
      if (requestId !== weatherRequestRef.current || controller.signal.aborted) {
        return;
      }

      setWeather(data);
      setSelectedLocation(location);
      setInputValue(getLocationLabel(location));
    } catch (loadError) {
      if (controller.signal.aborted || requestId !== weatherRequestRef.current) {
        return;
      }

      setError(loadError.message || "Failed to load the weather forecast.");
    } finally {
      if (requestId === weatherRequestRef.current && !controller.signal.aborted) {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadWeather(DEFAULT_LOCATION);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      if (weatherAbortRef.current) {
        weatherAbortRef.current.abort();
      }
    };
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    const trimmedQuery = inputValue.trim();

    if (!trimmedQuery) {
      setSearchMessage("Please enter a city or region to search.");
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setSearchMessage("");
    setError("");

    try {
      const matches = await searchLocations(trimmedQuery, AbortSignal.timeout ? AbortSignal.timeout(10000) : undefined);
      if (!matches.length) {
        setSearchResults([]);
        setSearchMessage("No matching locations were found. Try another city or region.");
        return;
      }

      setSearchResults(matches);
      setSearchMessage("Choose the location that matches your search.");
    } catch (searchError) {
      setSearchResults([]);
      setSearchMessage(searchError.message || "Search is currently unavailable.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectLocation = (location) => {
    setSearchResults([]);
    setSearchMessage("");
    setInputValue(getLocationLabel(location));
    loadWeather(location, true);
  };

  const currentCode = weather?.current?.weather_code;
  const codeMeta = getWeatherCodeMeta(currentCode);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-sky-100 bg-white/80 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-sm md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">Live weather</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">Your local weather dashboard</h1>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Explore current conditions, hourly outlooks, and simple location search for cities around the world.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => loadWeather(selectedLocation, true)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} aria-hidden="true" />
              Refresh
            </button>
          </div>
        </div>

        <div className="mt-8">
          <LocationSearch
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSearch}
            isSearching={isSearching}
            searchResults={searchResults}
            onSelect={handleSelectLocation}
            selectedLocation={selectedLocation}
            helperText={searchMessage}
          />
        </div>
      </section>

      {error ? <ErrorState title="Weather unavailable" message={error} /> : null}
      {isLoading && !weather ? <LoadingState message="Loading the latest weather for Dhaka..." /> : null}

      {weather ? (
        <>
          <CurrentWeather weather={weather} location={selectedLocation} codeMeta={codeMeta} />
          <div className="grid gap-8 xl:grid-cols-[1.5fr_0.9fr]">
            <HourlyForecast hourly={weather.hourly} timezone={weather.timezone} />
            <DailyForecast daily={weather.daily} />
          </div>
        </>
      ) : null}

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex items-center gap-3 text-slate-800">
          <Search className="h-5 w-5 text-sky-600" aria-hidden="true" />
          <h2 className="text-2xl font-bold">Why this dashboard works</h2>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Accurate</p>
            <p className="mt-3 text-sm text-slate-600">Open-Meteo weather and geocoding data are fetched live for the selected location.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Responsive</p>
            <p className="mt-3 text-sm text-slate-600">The layout adapts smoothly from small mobile screens to larger desktop displays.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Accessible</p>
            <p className="mt-3 text-sm text-slate-600">Buttons, labels, and states remain keyboard-friendly and readable.</p>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-sky-100 bg-sky-50/70 p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">About the app</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Clean weather insights, designed for daily decisions.</h2>
          </div>
          <a href="/about" className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200">
            Learn more
          </a>
        </div>
      </section>
    </div>
  );
}
