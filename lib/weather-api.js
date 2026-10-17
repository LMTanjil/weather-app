const GEOCODING_BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_BASE_URL = "https://api.open-meteo.com/v1/forecast";

async function fetchJson(url, signal) {
  const response = await fetch(url, {
    signal,
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Weather service is unavailable right now.");
  }

  return response.json();
}

export async function searchLocations(query, signal) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const params = new URLSearchParams({
    name: trimmedQuery,
    count: "5",
    language: "en",
    format: "json",
  });

  const data = await fetchJson(`${GEOCODING_BASE_URL}?${params.toString()}`, signal);

  return (data.results ?? []).map((result) => ({
    id: `${result.latitude}-${result.longitude}-${result.name}`,
    name: result.name,
    latitude: Number(result.latitude),
    longitude: Number(result.longitude),
    country: result.country,
    region: result.admin1 || result.admin2 || result.country,
    timezone: result.timezone,
  }));
}

export async function fetchWeatherForLocation(location, signal) {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
    ].join(","),
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "precipitation_probability",
      "weather_code",
      "wind_speed_10m",
    ].join(","),
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min", "sunrise", "sunset"].join(","),
    timezone: "auto",
    forecast_days: "3",
  });

  const data = await fetchJson(`${WEATHER_BASE_URL}?${params.toString()}`, signal);

  return {
    timezone: data.timezone ?? "auto",
    current: data.current,
    hourly: data.hourly,
    daily: data.daily,
    location,
  };
}
