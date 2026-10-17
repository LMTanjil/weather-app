export default function WeatherMetric({ label, value, icon: Icon, unit, tone = "sky" }) {
  const toneClasses = {
    sky: "bg-sky-100 text-sky-700",
    slate: "bg-slate-100 text-slate-700",
    amber: "bg-amber-100 text-amber-700",
    violet: "bg-violet-100 text-violet-700",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{label}</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {value}
            {unit ? <span className="ml-1 text-sm font-medium text-slate-500">{unit}</span> : null}
          </p>
        </div>
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${toneClasses[tone] ?? toneClasses.sky}`}>
          {Icon ? <Icon className="h-5 w-5" aria-hidden="true" /> : null}
        </span>
      </div>
    </div>
  );
}
