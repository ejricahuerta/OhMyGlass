"use client";

import { ActiveContact } from "./active-contact";

export function FloatingCallButton({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <ActiveContact>
      {({ phoneHref }) => (
        <a
          id="floating-call-button"
          href={phoneHref}
          aria-label="Call Us"
          className="fixed bottom-5 right-5 bg-[#d32f2f] text-white w-16 h-16 rounded-full shadow-lg hover:bg-[#b71c1c] transition z-40 flex items-center justify-center"
        >
          <i className="fas fa-phone-alt text-2xl" />
        </a>
      )}
    </ActiveContact>
  );
}
