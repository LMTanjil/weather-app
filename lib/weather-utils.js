export const DEFAULT_LOCATION = {
  name: "Dhaka",
  latitude: 23.8103,
  longitude: 90.4125,
  country: "Bangladesh",
  region: "Dhaka Division",
};

export function getWeatherCodeMeta(code) {
  const normalizedCode = Number(code ?? 0);

  const weatherMap = {
    0: { label: "Clear sky", icon: "Sun", accent: "amber" },
    1: { label: "Mostly clear", icon: "SunMedium", accent: "amber" },
    2: { label: "Partly cloudy", icon: "CloudSun", accent: "sky" },
    3: { label: "Cloudy", icon: "Cloud", accent: "slate" },
    45: { label: "Foggy", icon: "CloudFog", accent: "slate" },
    48: { label: "Depositing rime fog", icon: "CloudFog", accent: "slate" },
    51: { label: "Light drizzle", icon: "CloudDrizzle", accent: "cyan" },
    53: { label: "Drizzle", icon: "CloudDrizzle", accent: "cyan" },
    55: { label: "Heavy drizzle", icon: "CloudDrizzle", accent: "cyan" },
    56: { label: "Freezing drizzle", icon: "CloudSnow", accent: "blue" },
    57: { label: "Heavy freezing drizzle", icon: "CloudSnow", accent: "blue" },
    61: { label: "Light rain", icon: "CloudRain", accent: "blue" },
    63: { label: "Rain", icon: "CloudRain", accent: "blue" },
    65: { label: "Heavy rain", icon: "CloudRain", accent: "blue" },
    66: { label: "Freezing rain", icon: "CloudRain", accent: "blue" },
    67: { label: "Heavy freezing rain", icon: "CloudRain", accent: "blue" },
    71: { label: "Light snow", icon: "CloudSnow", accent: "indigo" },
    73: { label: "Snow", icon: "CloudSnow", accent: "indigo" },
    75: { label: "Heavy snow", icon: "CloudSnow", accent: "indigo" },
    77: { label: "Snow grains", icon: "CloudSnow", accent: "indigo" },
    80: { label: "Showers", icon: "CloudRain", accent: "blue" },
    81: { label: "Heavy showers", icon: "CloudRain", accent: "blue" },
    82: { label: "Violent showers", icon: "CloudRain", accent: "blue" },
    85: { label: "Snow showers", icon: "CloudSnow", accent: "indigo" },
    86: { label: "Heavy snow showers", icon: "CloudSnow", accent: "indigo" },
    95: { label: "Thunderstorm", icon: "CloudLightning", accent: "violet" },
    96: { label: "Thunderstorm with hail", icon: "CloudLightning", accent: "violet" },
    99: { label: "Severe thunderstorm", icon: "CloudLightning", accent: "violet" },
  };

  return weatherMap[normalizedCode] ?? { label: "Weather update", icon: "CloudSun", accent: "sky" };
}

export function formatTemperature(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "--°C";
  }

  return `${Math.round(value)}°C`;
}

export function formatWindSpeed(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "-- km/h";
  }

  return `${Math.round(value)} km/h`;
}

export function formatHumidity(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "--%";
  }

  return `${Math.round(value)}%`;
}

export function formatPrecipitation(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "-- mm";
  }

  return `${value.toFixed(value >= 10 ? 0 : 1)} mm`;
}

export function formatLocalDate(dateValue) {
  if (!dateValue) {
    return "--";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("en-BD", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatHourLabel(dateValue) {
  if (!dateValue) {
    return "--";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("en-BD", {
    hour: "numeric",
  }).format(date);
}

export function formatDayLabel(dateValue) {
  if (!dateValue) {
    return "--";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("en-BD", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function getLocationLabel(location) {
  if (!location) {
    return "Select a location";
  }

  const parts = [location.name, location.region, location.country].filter(Boolean);
  return parts.join(", ");
}
