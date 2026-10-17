import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-lg font-semibold text-white">Weather Dashboard</p>
          <p className="mt-3 max-w-sm text-sm text-slate-300">
            Real-time local weather insights for home, travel, and everyday planning.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/services" className="hover:text-white">Services</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Resources</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li><a href="https://open-meteo.com/" target="_blank" rel="noreferrer" className="hover:text-white">Open-Meteo</a></li>
            <li><span>© Weather Dashboard</span></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
