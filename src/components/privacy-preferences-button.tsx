"use client";

export function PrivacyPreferencesButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-analytics-preferences"))}
      className="editorial-link min-h-11 text-xs text-muted"
    >
      {label}
    </button>
  );
}
