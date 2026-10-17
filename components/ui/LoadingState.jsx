import { LoaderCircle } from "lucide-react";

export default function LoadingState({ message = "Loading weather data..." }) {
  return (
    <div className="flex min-h-48 items-center justify-center rounded-3xl border border-sky-200 bg-white/80 p-8 text-slate-600 shadow-sm">
      <div className="flex items-center gap-3 text-sm font-medium">
        <LoaderCircle className="h-5 w-5 animate-spin text-sky-600" aria-hidden="true" />
        <span>{message}</span>
      </div>
    </div>
  );
}
