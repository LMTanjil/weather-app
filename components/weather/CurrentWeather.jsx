import {
  SunMedium,
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Droplets,
  Gauge,
  Wind,
  Sunrise,
} from "lucide-react";
import WeatherMetric from "@/components/weather/WeatherMetric";
import { formatTemperature, formatWindSpeed, formatHumidity, formatLocalDate, formatPrecipitation } from "@/lib/weather-utils";

const ICON_MAP = {
  Sun: SunMedium,
  Cloud: Cloud,
  CloudDrizzle: CloudDrizzle,
  CloudFog: CloudFog,
  CloudLightning: CloudLightning,
  CloudRain: CloudRain,
  CloudSnow: CloudSnow,
  CloudSun: CloudSun,
  SunMedium: SunMedium,
};

export default function CurrentWeather({ weather, location, codeMeta }) {
  const Icon = ICON_MAP[codeMeta?.icon] ?? SunMedium;

  return (
    <section className="rounded-[2rem] border border-sky-100 bg-gradient-to-br from-sky-100 via-white to-sky-50 p-6 shadow-[0_20px_45px_rgba(14,116,144,0.08)] md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700">Current weather</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{location?.name || "Selected location"}</h2>
          <p className="mt-2 text-sm text-slate-600">
            {location?.region || "Local area"}, {location?.country || "Country"}
          </p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-sm text-slate-600 ring-1 ring-slate-200">
            <Sunrise className="h-4 w-4 text-sky-600" aria-hidden="true" />
            Local time: {weather?.current?.time ? formatLocalDate(`${weather.current.time}:00`) : "--"}
          </p>
        </div>

        <div className="flex items-center gap-4 self-start rounded-2xl bg-white/80 px-4 py-3 shadow-sm ring-1 ring-slate-200">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
            <Icon className="h-8 w-8" aria-hidden="true" />
          </div>
          <div>
            <p className="text-4xl font-bold text-slate-900">{formatTemperature(weather?.current?.temperature_2m)}</p>
            <p className="text-sm font-medium text-slate-600">{codeMeta?.label || "Weather update"}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <WeatherMetric label="Humidity" value={formatHumidity(weather?.current?.relative_humidity_2m)} icon={Droplets} tone="sky" />
        <WeatherMetric label="Wind" value={formatWindSpeed(weather?.current?.wind_speed_10m)} icon={Wind} tone="amber" />
        <WeatherMetric label="Feels like" value={formatTemperature(weather?.current?.apparent_temperature)} icon={Gauge} tone="violet" />
        <WeatherMetric label="Precipitation" value={formatPrecipitation(weather?.current?.precipitation)} icon={CloudRain} tone="slate" />
      </div>
    </section>
  );
}
