"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import posthog from "posthog-js";

function PosthogPageviewInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const initialized = useRef(false);

  useEffect(() => {
    if (!key || typeof window === "undefined") return;
    const w = window as Window & { __POSTHOG_INIT__?: boolean };
    if (w.__POSTHOG_INIT__) return;
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      person_profiles: "identified_only",
      capture_pageview: false,
    });
    w.__POSTHOG_INIT__ = true;
    initialized.current = true;
  }, [key]);

  useEffect(() => {
    if (!key) return;
    const url = window.location.href;
    if (typeof posthog.capture === "function") {
      posthog.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams, key]);

  return null;
}

export function PosthogProvider() {
  return (
    <Suspense fallback={null}>
      <PosthogPageviewInner />
    </Suspense>
  );
}
