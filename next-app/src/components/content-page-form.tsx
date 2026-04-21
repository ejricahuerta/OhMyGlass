"use client";

import { tallyFormSrc } from "@/lib/site-data";

export function ContentPageForm({ formTitle = "OhMyGlass Free Quote" }: { formTitle?: string }) {
  function onIframeLoad(e: React.SyntheticEvent<HTMLIFrameElement>) {
    const iframe = e.currentTarget;
    const prev = iframe.previousElementSibling as HTMLElement | null;
    if (prev) prev.style.display = "none";
    iframe.style.display = "block";
  }

  return (
    <div id="contact-form" className="p-4 md:p-6 max-w-2xl w-full">
      <h2 className="text-3xl font-bold font-serif mb-6 text-gray-800 text-center">Free Quote</h2>
      <div className="tally-loader text-center p-8">
        <p className="text-gray-600 font-semibold">Loading form...</p>
      </div>
      <iframe
        data-tally-src={tallyFormSrc}
        loading="lazy"
        width="100%"
        height={720}
        title={formTitle}
        style={{
          display: "none",
          border: "1px solid #e5e7eb",
          borderRadius: "0.5rem",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        }}
        onLoad={onIframeLoad}
        className="border-0"
      />
    </div>
  );
}
