import { AlertTriangle } from "lucide-react";

export default function ErrorState({ title = "Something went wrong", message }) {
  return (
    <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5 text-rose-700 shadow-sm" role="alert" aria-live="polite">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <div>
          <p className="font-semibold">{title}</p>
          {message ? <p className="mt-1 text-sm text-rose-700/80">{message}</p> : null}
        </div>
      </div>
    </div>
  );
}
