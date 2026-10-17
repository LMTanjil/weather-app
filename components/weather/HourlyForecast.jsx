import {
  ArrowRight,
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  SunMedium,
} from "lucide-react";
import { formatHourLabel, formatTemperature, getWeatherCodeMeta } from "@/lib/weather-utils";

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

export default function HourlyForecast({ hourly, timezone }) {
  if (!hourly?.time?.length) {
    return null;
  }

  const nextHours = hourly.time.slice(0, 8).map((time, index) => ({
    time,
    temperature: hourly.temperature_2m[index],
    weatherCode: hourly.weather_code[index],
    precipitationProbability: hourly.precipitation_probability[index],
  }));

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Forecast</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">Next 8 hours</h3>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-700">
          <span>{timezone}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {nextHours.map((item) => {
          const codeMeta = getWeatherCodeMeta(item.weatherCode);
          const Icon = ICON_MAP[codeMeta.icon] ?? CloudSun;

          return (
            <div key={item.time} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-slate-500">{formatHourLabel(`${item.time}:00`)}</span>
                <Icon className="h-5 w-5 text-sky-600" aria-hidden="true" />
              </div>
              <p className="mt-4 text-2xl font-bold text-slate-900">{formatTemperature(item.temperature)}</p>
              <p className="mt-2 text-sm text-slate-600">{codeMeta.label}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-500">
                {typeof item.precipitationProbability === "number" ? `${Math.round(item.precipitationProbability)}% rain` : "Rain chance —"}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
