"use client";

import Link from "next/link";
import { homeHeroSub, withInternalUtm } from "@/lib/site-data";
import { getServicesByCategory } from "@/lib/service-cards";
import { Footer } from "./footer";
import { ActiveContact } from "./active-contact";

export function ServicesPageView({
  serviceAreaLocations,
}: {
  serviceAreaLocations: { name: string; slug: string }[];
}) {
  const serviceGroups = getServicesByCategory();

  return (
    <main className="min-h-screen">
      <section className="relative bg-gradient-to-b from-neutral-800 to-neutral-900 text-white pt-20 pb-16 md:pt-24 md:pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#d32f2f]/30 to-transparent" />
        </div>
        <div className="container mx-auto relative z-10 max-w-4xl">
          <p className="text-sm uppercase tracking-widest text-neutral-300 mb-3">Our services</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
            Expert Glass Repair
            <br className="hidden sm:inline" /> Toronto & GTA
          </h1>
          <p className="text-lg md:text-xl text-neutral-200 max-w-3xl">{homeHeroSub}</p>
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-start sm:items-center">
            <ActiveContact>
              {({ phone, phoneHref, afterHoursPhone, afterHoursPhoneHref }) => (
                <>
                  <a
                    href={phoneHref}
                    className="inline-flex items-center gap-2 bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-semibold px-6 py-3 rounded-2xl transition-colors"
                  >
                    <i className="fa-solid fa-phone" />
                    {phone}
                  </a>
                  <a
                    href={afterHoursPhoneHref}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-2xl border border-white/25 transition-colors"
                  >
                    <i className="fa-solid fa-moon" />
                    After hours: {afterHoursPhone}
                  </a>
                </>
              )}
            </ActiveContact>
            <Link
              href="/free-quote"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-2xl border border-white/20 transition-colors"
            >
              Get a free quote
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-[#f5f7fa]">
        <div className="container mx-auto px-4">
          {serviceGroups.map(({ key, label, cards }) => (
            <div key={key} className="mb-16 last:mb-0">
              <h2 className="text-xl font-semibold uppercase tracking-wider text-neutral-600 mb-6 pl-1">
                {label}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 list-none p-0 m-0">
                {cards.map((card) => (
                  <li key={card.title + card.href} className="flex">
                    <Link
                      href={card.href}
                      className="group flex flex-col h-full w-full bg-white rounded-2xl p-6 shadow-sm border border-neutral-200/80 hover:border-[#d32f2f]/30 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d32f2f]/50 focus:ring-offset-2"
                    >
                      <div className="flex-1 min-h-0">
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-lg ${
                              key === "emergency"
                                ? "bg-[#d32f2f]/10 text-[#d32f2f]"
                                : "bg-neutral-100 text-neutral-600 group-hover:bg-[#d32f2f]/10 group-hover:text-[#d32f2f] transition-colors"
                            }`}
                            aria-hidden="true"
                          >
                            <i className={`fa-solid ${card.icon || "fa-screwdriver-wrench"}`} />
                          </span>
                          <div className="min-w-0 flex-1 flex flex-wrap items-center gap-2">
                            {card.badge ? (
                              <span
                                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                  key === "emergency"
                                    ? "bg-[#d32f2f] text-white"
                                    : "bg-neutral-200 text-neutral-700"
                                }`}
                              >
                                {card.badge}
                              </span>
                            ) : null}
                            <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#d32f2f] transition-colors">
                              {card.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">
                          {card.description}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 mt-auto pt-4 text-sm font-semibold text-[#d32f2f] group-hover:gap-2 transition-all">
                        Learn more
                        <i className="fa-solid fa-arrow-right text-xs" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {serviceAreaLocations.length > 0 ? (
        <section className="py-14 md:py-20 bg-white border-t border-neutral-200">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-2">Services by area</h2>
            <p className="text-neutral-600 max-w-xl mx-auto mb-8">
              We serve the Greater Toronto Area. Select your area for local emergency glass repair
              and more.
            </p>
            <nav className="flex flex-wrap gap-3 justify-center" aria-label="Service areas">
              {serviceAreaLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={withInternalUtm(`/${loc.slug}`, "services")}
                  className="inline-flex items-center px-5 py-2.5 bg-neutral-100 hover:bg-[#d32f2f] hover:text-white text-neutral-800 font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#d32f2f]/50 focus:ring-offset-2"
                >
                  {loc.name}
                </Link>
              ))}
            </nav>
          </div>
        </section>
      ) : null}

      <section className="py-10 md:py-12 bg-neutral-800 text-white">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center sm:text-left">
          <p className="text-lg font-semibold m-0">
            Broken window or door glass? We&apos;re available 24/7 for urgent glass repair.
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
