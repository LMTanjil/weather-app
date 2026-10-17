import { Activity, CloudMoon, Droplets, MapPinned, Search, Smartphone } from "lucide-react";

const services = [
  {
    title: "Current Weather Monitoring",
    description: "View live temperature, humidity, wind, and precipitation readings for the selected location.",
    icon: Activity,
  },
  {
    title: "Location-Based Weather Search",
    description: "Search cities and regions, review matching results, and select the right place before fetching weather.",
    icon: Search,
  },
  {
    title: "Hourly Weather Forecast",
    description: "Track nearby conditions across the next several hours with clear temperature and rain-probability updates.",
    icon: CloudMoon,
  },
  {
    title: "Temperature and Weather Conditions",
    description: "Understand current conditions with mapped weather codes and easy-to-read state labels.",
    icon: MapPinned,
  },
  {
    title: "Humidity and Wind Information",
    description: "Monitor relative moisture and air movement to make quick travel and planning decisions.",
    icon: Droplets,
  },
  {
    title: "Responsive Weather Dashboard",
    description: "Browse the dashboard smoothly across mobile, tablet, and desktop screens without layout breakage.",
    icon: Smartphone,
  },
];

export const metadata = {
  title: "Services",
  description: "View the core features included in the Weather Dashboard.",
};

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700">Services</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">Weather features designed for daily clarity</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map(({ icon: Icon, title, description }) => (
          <article key={title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-slate-900">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
