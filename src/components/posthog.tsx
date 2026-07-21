"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import type { SiteContent } from "@/lib/content-schema";
import { localizedPath } from "@/lib/i18n";

const STORAGE_KEY = "portfolio-analytics-consent";

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, string>) => void;
      opt_out_capturing?: () => void;
    };
  }
}

export function PostHog({
  apiKey,
  apiHost,
  content,
}: {
  apiKey: string;
  apiHost: string;
  content: SiteContent;
}) {
  const pathname = usePathname();
  const [choice, setChoice] = useState<"accepted" | "declined" | null>(null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [dnt, setDnt] = useState(false);
  const [analyticsReady, setAnalyticsReady] = useState(false);

  useEffect(() => {
    const hasDnt = navigator.doNotTrack === "1";
    setDnt(hasDnt);
    const stored = localStorage.getItem(STORAGE_KEY);
    setChoice(stored === "accepted" || stored === "declined" ? stored : null);

    const open = () => setPreferencesOpen(true);
    window.addEventListener("open-analytics-preferences", open);
    return () => window.removeEventListener("open-analytics-preferences", open);
  }, []);

  useEffect(() => {
    if (choice !== "accepted" || dnt) return;
    const handleClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-analytics]");
      if (!target) return;
      window.posthog?.capture(target.dataset.analytics ?? "deliberate_navigation", {
        path: window.location.pathname,
      });
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [choice, dnt]);

  useEffect(() => {
    if (!analyticsReady || choice !== "accepted" || dnt) return;
    window.posthog?.capture("$pageview", { path: pathname });
  }, [analyticsReady, choice, dnt, pathname]);

  function store(next: "accepted" | "declined") {
    localStorage.setItem(STORAGE_KEY, next);
    setChoice(next);
    setPreferencesOpen(false);
    if (next === "declined") window.posthog?.opt_out_capturing?.();
  }

  const showBanner = !dnt && (choice === null || preferencesOpen);

  return (
    <>
      {choice === "accepted" && !dnt ? (
        <Script
          id="posthog-consented"
          strategy="afterInteractive"
          onReady={() => setAnalyticsReady(true)}
        >
          {`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},o="init capture opt_out_capturing".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);posthog.init(${JSON.stringify(apiKey)},{api_host:${JSON.stringify(apiHost)},autocapture:false,capture_pageview:false,capture_pageleave:false,disable_session_recording:true,person_profiles:"never",persistence:"localStorage"});`}
        </Script>
      ) : null}

      {dnt && preferencesOpen ? (
        <div className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-lg rounded-lg border border-zinc-700 bg-zinc-950 p-4 shadow-2xl" role="status">
          <p className="text-sm leading-6 text-zinc-300">{content.consent.dnt}</p>
          <button type="button" onClick={() => setPreferencesOpen(false)} className="mt-3 min-h-11 text-sm text-zinc-300 underline underline-offset-4">
            {content.consent.close}
          </button>
        </div>
      ) : null}

      {showBanner ? (
        <section
          aria-labelledby="analytics-consent-title"
          className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-2xl rounded-lg border border-zinc-700 bg-zinc-950 p-5 shadow-2xl"
        >
          <h2 id="analytics-consent-title" className="font-semibold text-zinc-100">{content.consent.title}</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{content.consent.body}</p>
          <Link
            href={localizedPath(content.locale, "/privacy")}
            className="mt-2 inline-flex min-h-11 items-center text-sm text-zinc-300 underline decoration-zinc-600 underline-offset-4"
          >
            {content.common.links.privacy}
          </Link>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={() => store("accepted")} className="min-h-11 rounded-md bg-zinc-100 px-4 text-sm font-medium text-zinc-950">
              {content.consent.accept}
            </button>
            <button type="button" onClick={() => store("declined")} className="min-h-11 rounded-md border border-zinc-700 px-4 text-sm font-medium text-zinc-200">
              {content.consent.decline}
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}
