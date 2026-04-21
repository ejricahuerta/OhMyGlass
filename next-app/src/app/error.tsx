"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof posthog?.captureException === "function") {
      posthog.captureException(error);
    } else if (typeof posthog?.capture === "function") {
      posthog.capture("$exception", {
        $exception_message: error?.message,
        $exception_type: error?.name,
      });
    }
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-neutral-800 mb-2">Something went wrong</h1>
      <p className="text-neutral-600 mb-6">{error.message}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="bg-[#d32f2f] text-white px-6 py-3 rounded-2xl font-semibold hover:bg-[#b71c1c]"
      >
        Try again
      </button>
    </div>
  );
}
