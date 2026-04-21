"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const reviewWidgetIds = [
  "4b4d3af7-795e-4314-825d-10a0237c35be",
  "377d5892-86fd-4760-96cb-f660a82102ed",
];

function isReviewWidgetLoaded(container: HTMLDivElement | null) {
  if (!container) return false;
  return Boolean(
    container.querySelector("iframe") ||
      container.querySelector('[class*="eapps"]')
  );
}

export function HomeReviewWidgets() {
  const [activeIndex, setActiveIndex] = useState(0);
  const primaryRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const maxWaitMs = 8000;
    const pollMs = 500;
    const startTime = Date.now();
    const intervalId = setInterval(() => {
      if (isReviewWidgetLoaded(primaryRef.current)) {
        setActiveIndex(0);
        clearInterval(intervalId);
        return;
      }
      const hasTimedOut = Date.now() - startTime >= maxWaitMs;
      if (isReviewWidgetLoaded(fallbackRef.current) || hasTimedOut) {
        setActiveIndex(1);
        clearInterval(intervalId);
      }
    }, pollMs);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
      <div
        ref={primaryRef}
        className={activeIndex === 0 ? "block" : "hidden"}
      >
        <div className={`elfsight-app-${reviewWidgetIds[0]}`} data-elfsight-app-lazy />
      </div>
      <div
        ref={fallbackRef}
        className={activeIndex === 1 ? "block" : "hidden"}
      >
        <div className={`elfsight-app-${reviewWidgetIds[1]}`} data-elfsight-app-lazy />
      </div>
    </>
  );
}
