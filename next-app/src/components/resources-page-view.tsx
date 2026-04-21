"use client";

import Link from "next/link";
import type { PageRecord } from "@/lib/pages-schema";
import { withInternalUtm } from "@/lib/site-data";
import { Footer } from "./footer";
import { ActiveContact } from "./active-contact";

function cleanTitle(title: string) {
  return title
    .replace(/\s*[-–|]\s*OhMyGlass\.ca$/i, "")
    .replace(/\s*[-–|]\s*OhMyGlass$/i, "")
    .trim();
}

export function ResourcesPageView({
  resources,
}: {
  resources: PageRecord[];
}) {
  return (
    <main className="min-h-screen">
      <section className="relative bg-gradient-to-b from-neutral-800 to-neutral-900 text-white pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#d32f2f]/30 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl">
            <p className="text-sm uppercase tracking-widest text-neutral-300 mb-3">Learn</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Resources
            </h1>
            <p className="text-lg md:text-xl text-neutral-200 max-w-2xl">
              Helpful guides and information for glass repair and replacement in the Greater Toronto
              Area.
            </p>
            <div className="mt-8">
              <Link
                href="/#contact-form"
                className="inline-flex items-center gap-2 bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-semibold px-6 py-3 rounded-2xl transition-colors"
              >
                Get a free quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-[#f5f7fa]">
        <div className="container mx-auto px-4">
          {resources.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 list-none p-0 m-0 w-full items-stretch">
              {resources.map((resource) => (
                <li key={resource.url} className="flex h-full">
                  <Link
                    href={withInternalUtm(`/${resource.url}`, "resources")}
                    className="group flex flex-col h-full w-full bg-white rounded-2xl p-6 shadow-sm border border-neutral-200/80 hover:border-[#d32f2f]/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d32f2f]/50 focus:ring-offset-2"
                  >
                    <div className="flex-1 min-h-0">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-lg bg-neutral-100 text-neutral-600 group-hover:bg-[#d32f2f]/10 group-hover:text-[#d32f2f] transition-colors"
                          aria-hidden="true"
                        >
                          <i className="fa-solid fa-file-lines" />
                        </span>
                        <h2 className="text-lg font-bold text-neutral-900 group-hover:text-[#d32f2f] transition-colors min-w-0 flex-1">
                          {cleanTitle(resource.title)}
                        </h2>
                      </div>
                      <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">
                        {resource.seo?.meta_description ?? resource.title}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 mt-auto pt-4 text-sm font-semibold text-[#d32f2f] group-hover:gap-2 transition-all">
                      Read more
                      <i className="fa-solid fa-arrow-right text-xs" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="max-w-xl mx-auto text-center py-12">
              <span className="inline-flex w-14 h-14 rounded-2xl bg-neutral-200 text-neutral-500 items-center justify-center mb-4">
                <i className="fa-solid fa-folder-open text-xl" />
              </span>
              <p className="text-neutral-600 text-lg">
                More guides and articles will be added here soon.
              </p>
              <Link
                href="/#contact-form"
                className="inline-flex items-center gap-2 mt-6 text-[#d32f2f] font-semibold hover:underline"
              >
                Get a free quote
                <i className="fa-solid fa-arrow-right text-xs" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-10 md:py-12 bg-neutral-800 text-white">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center sm:text-left">
          <p className="text-lg font-semibold m-0">
            Need glass repair or replacement? We serve the GTA with 24/7 emergency service.
          </p>
          <ActiveContact>
            {({ phone, phoneHref, afterHoursPhone, afterHoursPhoneHref }) => (
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center sm:justify-start">
                <a
                  href={phoneHref}
                  className="inline-flex items-center gap-2 bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-bold px-6 py-3 rounded-2xl transition-colors whitespace-nowrap"
                >
                  <i className="fa-solid fa-phone" />
                  {phone}
                </a>
                <a
                  href={afterHoursPhoneHref}
                  className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold px-6 py-3 rounded-2xl border border-white/30 transition-colors whitespace-nowrap"
                >
                  After hours: {afterHoursPhone}
                </a>
              </div>
            )}
          </ActiveContact>
        </div>
      </section>

      <Footer serviceLinksOrder="index" />
    </main>
  );
}
