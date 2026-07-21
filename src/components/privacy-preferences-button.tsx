"use client";

export function PrivacyPreferencesButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-analytics-preferences"))}
      className="min-h-11 text-xs text-zinc-500 underline decoration-zinc-700 underline-offset-4 hover:text-zinc-200"
    >
      {label}
    </button>
  );
}
