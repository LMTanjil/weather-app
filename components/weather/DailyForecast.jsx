import {
  ArrowUpRight,
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  MoonStar,
  SunMedium,
} from "lucide-react";
import { formatDayLabel, formatTemperature, getWeatherCodeMeta } from "@/lib/weather-utils";

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
  MoonStar: MoonStar,
};

export default function DailyForecast({ daily }) {
  if (!daily?.time?.length) {
    return null;
  }

  const items = daily.time.slice(0, 4).map((date, index) => ({
    date,
    high: daily.temperature_2m_max[index],
    low: daily.temperature_2m_min[index],
    weatherCode: daily.weather_code[index],
  }));

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Outlook</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">5-day forecast</h3>
        </div>
        <ArrowUpRight className="h-5 w-5 text-slate-400" aria-hidden="true" />
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item) => {
          const codeMeta = getWeatherCodeMeta(item.weatherCode);
          const Icon = ICON_MAP[codeMeta.icon] ?? CloudSun;

          return (
            <div key={item.date} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{formatDayLabel(`${item.date}:00`)}</p>
                  <p className="text-sm text-slate-500">{codeMeta.label}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-900">{formatTemperature(item.high)}</p>
                <p className="text-sm text-slate-500">{formatTemperature(item.low)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
