"use client";

import { tallyFormSrc, contact } from "@/lib/site-data";
import { ActiveContact } from "./active-contact";

export function CtaFormSection({
  title = "Free Quote",
  description = "We're here to help with all your glass needs. Fill out the form below and we'll get back to you quickly.",
  showContactStrip = false,
  formTitle = "OhMyGlass Free Quote",
}: {
  title?: string;
  description?: string;
  showContactStrip?: boolean;
  formTitle?: string;
}) {
  function onIframeLoad(e: React.SyntheticEvent<HTMLIFrameElement>) {
    const iframe = e.currentTarget;
    const prev = iframe.previousElementSibling as HTMLElement | null;
    if (prev) prev.style.display = "none";
    iframe.style.display = "block";
  }

  return (
    <section id="contact-form" className="relative w-full bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/95 to-[#1a1a1a]/80" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-24 px-4">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{title}</h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl">{description}</p>
        <div className="backdrop-blur-md shadow-2xl p-4 md:p-6 border border-white/20 max-w-2xl w-full">
          <div className="tally-loader text-center p-8">
            <p className="text-gray-600 font-semibold">Loading form...</p>
          </div>
          <iframe
            data-tally-src={tallyFormSrc}
            loading="lazy"
            width="100%"
            height={720}
            title={formTitle}
            style={{ display: "none" }}
            onLoad={onIframeLoad}
            className="border-0"
          />
        </div>
        {showContactStrip ? (
          <div className="text-white text-lg mt-8">
            <p className="mb-2">
              <i className="fas fa-phone-alt mr-2" />
              <ActiveContact>
                {({ phone, phoneHref, afterHoursPhone, afterHoursPhoneHref }) => (
                  <>
                    <a href={phoneHref} className="hover:text-[#d32f2f]">
                      {phone}
                    </a>
                    <span className="block text-white/80 text-base mt-1 pl-7">
                      After hours:{" "}
                      <a href={afterHoursPhoneHref} className="hover:text-[#d32f2f]">
                        {afterHoursPhone}
                      </a>
                    </span>
                  </>
                )}
              </ActiveContact>
            </p>
            <p className="mb-2">
              <i className="fas fa-envelope mr-2" />
              <a href={contact.emailHref} className="hover:text-[#d32f2f]">
                {contact.email}
              </a>
            </p>
            <p className="mb-2">
              <i className="fas fa-map-marker-alt mr-2" />
              <span className="text-white/90">{contact.addressDisplay}</span>
            </p>
            <p>
              <a
                href={contact.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#d32f2f]"
              >
                Find us on map
              </a>
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
