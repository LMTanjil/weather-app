import Link from "next/link";

export const metadata = {
  title: "About",
  description: "Learn how the Weather Dashboard uses real Open-Meteo data to keep weather information clear and current.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700">About</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">Weather Dashboard</h1>
        <p className="mt-5 text-lg text-slate-600">
          The Weather Dashboard is a simple, polished way to check current local conditions and plan ahead with confidence.
        </p>

        <div className="mt-8 space-y-6 text-base leading-7 text-slate-600">
          <p>
            Built with Next.js and Tailwind CSS, the app displays live weather measurements using Open-Meteo, a free and open weather API platform.
            Search for a city, confirm the correct matching location, and the dashboard updates with the most relevant data for that area.
          </p>
          <p>
            The app requests geocoding data for a search term, then uses the selected latitude and longitude to fetch current conditions, hourly outlooks,
            and short daily forecasts. Weather codes are translated into readable condition labels and matching interface icons for a consistent user experience.
          </p>
          <p>
            Open-Meteo provides the public forecast and geocoding endpoints used by this application. Their documentation is available at <a href="https://open-meteo.com/" target="_blank" rel="noreferrer" className="font-medium text-sky-700 underline-offset-4 hover:underline">open-meteo.com</a>.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-700">
            Return home
          </Link>
        </div>
      </div>
    </main>
  );
}
