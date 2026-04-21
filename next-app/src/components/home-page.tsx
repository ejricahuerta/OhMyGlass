"use client";

import Link from "next/link";
import { contact, withInternalUtm, siteUrl } from "@/lib/site-data";
import { getLocalBusinessSchema, safeJsonLdScript } from "@/lib/schema";
import { CtaFormSection } from "./cta-form-section";
import { Footer } from "./footer";
import { ActiveContact } from "./active-contact";
import { HomeReviewWidgets } from "./home-review-widgets";

const homeServiceSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Emergency Glass Repair",
    description:
      "24/7 emergency glass repair for broken or shattered windows and doors across Toronto & GTA. Fast response, board-up, and permanent replacement.",
    url: `${siteUrl}/emergency-glass-repair`,
    provider: { "@type": "LocalBusiness", name: "OhMyGlass", url: siteUrl },
    areaServed: "Greater Toronto Area",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Window Glass Replacement",
    description:
      "Window glass replacement for residential and commercial properties in Toronto & GTA. Cracked, foggy, or broken panes – repair or replace.",
    url: `${siteUrl}/window-glass-replacement`,
    provider: { "@type": "LocalBusiness", name: "OhMyGlass", url: siteUrl },
    areaServed: "Greater Toronto Area",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Residential Window Repair",
    description:
      "Residential window repair across Toronto & GTA. Save 60-80% vs full replacement. Cracked, foggy, and broken window repair.",
    url: `${siteUrl}/residential-window-repair`,
    provider: { "@type": "LocalBusiness", name: "OhMyGlass", url: siteUrl },
    areaServed: "Greater Toronto Area",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Commercial Glass Repair",
    description:
      "Commercial and storefront glass repair in Toronto & GTA. Storefronts, offices, safety glass. Fast, professional service.",
    url: `${siteUrl}/commercial-glass-repair`,
    provider: { "@type": "LocalBusiness", name: "OhMyGlass", url: siteUrl },
    areaServed: "Greater Toronto Area",
  },
];

export function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdScript(getLocalBusinessSchema()) }}
      />
      {homeServiceSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLdScript(schema) }}
        />
      ))}

      <section id="hero" className="relative h-screen min-h-[600px] w-full">
        <picture>
          <source srcSet="/images/hero.webp" type="image/webp" />
          <img
            src="/images/hero.jpg"
            alt="A modern storefront with large glass windows, repaired by OhMyGlass"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg leading-tight">
            Expert Glass Repair Services
          </h1>
          <p className="text-lg md:text-xl text-white font-normal drop-shadow-lg max-w-3xl mb-8">
            Professional glass repair and replacement windows in Toronto, North York, Vaughan,
            Richmond Hill, Markham, Mississauga & GTA. We repair cracked, broken, and foggy glass –
            saving you 60-80% vs full replacement. 24/7 emergency glass repair available.
          </p>
          <a
            href="#contact-form"
            className="inline-block bg-white backdrop-blur-md text-[#d32f2f] border-2 border-[#d32f2f]/80 px-8 md:px-12 py-4 md:py-5 font-bold text-lg md:text-xl shadow-lg hover:bg-[#d32f2f]/90 hover:text-white transition-all duration-300 transform hover:scale-105 rounded-3xl mb-2"
          >
            Free Quote
          </a>
        </div>
      </section>

      <section className="relative bg-[#f5f7fa] pt-24 pb-32 text-center overflow-hidden min-h-screen flex items-center justify-center">
        <div className="relative container mx-auto px-4 z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-gray-800 mb-6">
            Why Choose Our Glass Repair Services?
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-24 max-w-2xl mx-auto">
            We are expert glass repair specialists with over 10 years of experience. Our
            repair-first approach saves you 60-80% compared to replacement. Available 24/7 for
            emergency glass repair situations. We are proud to have a 5-star rating on{" "}
            <a
              href="https://www.google.com/search?q=oh+my+glass"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d32f2f]"
            >
              Google
            </a>{" "}
            and{" "}
            <a
              href="https://www.facebook.com/ohmy.glass.to/reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d32f2f]"
            >
              Facebook
            </a>
            . We repair when possible, replace only when necessary.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-5xl mx-auto mb-12">
            <div>
              <div className="text-6xl md:text-7xl font-light text-gray-900 mb-2">
                1k<span className="align-super text-2xl font-normal">+</span>
              </div>
              <div className="uppercase tracking-widest text-gray-700 text-lg font-semibold mb-4">
                Happy Customers
              </div>
              <div className="text-gray-600 text-base md:text-lg max-w-xs mx-auto">
                We have served thousands of customers across the GTA
              </div>
            </div>
            <div>
              <div className="text-6xl md:text-7xl font-light text-gray-900 mb-2">
                10<span className="align-super text-2xl font-normal">+</span>
              </div>
              <div className="uppercase tracking-widest text-gray-700 text-lg font-semibold mb-4">
                Years of Experience
              </div>
              <div className="text-gray-600 text-base md:text-lg max-w-xs mx-auto">
                We have been in the business for over 10 years
              </div>
            </div>
            <div>
              <div className="text-6xl md:text-7xl font-light text-gray-900 mb-2">
                5k<span className="align-super text-2xl font-normal">+</span>
              </div>
              <div className="uppercase tracking-widest text-gray-700 text-lg font-semibold mb-4">
                Glass Repairs
              </div>
              <div className="text-gray-600 text-base md:text-lg max-w-xs mx-auto">
                We have completed thousands of successful glass repairs across the GTA, saving
                customers 60-80% vs replacement
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaFormSection />

      <section id="services" className="relative bg-[#f5f7fa] py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-center text-lg md:text-xl font-semibold uppercase tracking-widest text-gray-800 mb-12">
            Expert glass repair services with 24/7 emergency availability.
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <Link
              href="/emergency-glass-repair"
              className="group relative h-72 flex flex-col items-center justify-end overflow-hidden shadow hover:scale-105 transition-transform duration-300"
            >
              <picture>
                <source srcSet="/images/window-repairs.webp" type="image/webp" />
                <img
                  src="/images/window-repairs.jpg"
                  alt="Residential window repair and glass replacement service in Toronto and GTA"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
              </picture>
              <div className="relative z-10 p-6 w-full flex items-center justify-center">
                <div className="bg-[#f5f7fa]/10 backdrop-blur-md rounded-lg px-4 py-2">
                  <div className="text-xl font-bold text-white text-shadow">Window Repairs</div>
                </div>
              </div>
            </Link>
            <Link
              href={withInternalUtm("/storefront-glass-repair", "home")}
              className="group relative h-72 flex flex-col items-center justify-end overflow-hidden shadow hover:scale-105 transition-transform duration-300"
            >
              <picture>
                <source srcSet="/images/aluminum-storefront.webp" type="image/webp" />
                <img
                  src="/images/aluminum-storefront.jpg"
                  alt="Commercial aluminum storefront glass repair and installation"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
              </picture>
              <div className="relative z-10 p-6 w-full flex items-center justify-center">
                <div className="bg-[#f5f7fa]/10 backdrop-blur-md rounded-lg px-4 py-2">
                  <div className="text-xl font-bold text-white text-shadow">Aluminum Storefront</div>
                </div>
              </div>
            </Link>
            <Link
              href={withInternalUtm("/door-repairs", "home")}
              className="group relative h-72 flex flex-col items-center justify-end overflow-hidden shadow hover:scale-105 transition-transform duration-300"
            >
              <picture>
                <source srcSet="/images/door-repairs.webp" type="image/webp" />
                <img
                  src="/images/door-repairs.jpg"
                  alt="Door glass repair and patio door repair in Toronto and GTA"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
              </picture>
              <div className="relative z-10 p-6 w-full flex items-center justify-center">
                <div className="bg-[#f5f7fa]/10 backdrop-blur-md rounded-lg px-4 py-2">
                  <div className="text-xl font-bold text-white text-shadow">Door Repairs</div>
                </div>
              </div>
            </Link>
            <Link
              href={withInternalUtm("/custom-mirror", "home")}
              className="group relative h-72 flex flex-col items-center justify-end overflow-hidden shadow hover:scale-105 transition-transform duration-300"
            >
              <picture>
                <source srcSet="/images/custom-mirror.webp" type="image/webp" />
                <img
                  src="/images/custom-mirror.jpg"
                  alt="Custom mirror installation and repair for homes and businesses"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
              </picture>
              <div className="relative z-10 p-6 w-full flex items-center justify-center">
                <div className="bg-[#f5f7fa]/10 backdrop-blur-md rounded-lg px-4 py-2">
                  <div className="text-xl font-bold text-white text-shadow">Custom Mirror</div>
                </div>
              </div>
            </Link>
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-block bg-[#d32f2f]/90 backdrop-blur-md text-white font-bold text-lg px-8 py-4 shadow-lg hover:bg-[#b71c1c]/90 transition-all duration-300 transform hover:scale-105 border border-white/20 rounded-3xl"
            >
              See All Services <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative bg-[#f5f7fa] py-10">
        <div className="container mx-auto px-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="text-center text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              Popular Toronto Area Pages
            </h3>
            <p className="text-center text-gray-600 mb-6">
              Explore our highest-priority service pages for Toronto and North York.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <Link
                href={withInternalUtm("/window-repair-toronto", "home")}
                className="inline-flex items-center px-5 py-2.5 bg-neutral-100 hover:bg-[#d32f2f] hover:text-white text-neutral-800 font-medium rounded-xl transition-colors"
              >
                Window Repair Toronto
              </Link>
              <Link
                href={withInternalUtm("/window-repair-north-york", "home")}
                className="inline-flex items-center px-5 py-2.5 bg-neutral-100 hover:bg-[#d32f2f] hover:text-white text-neutral-800 font-medium rounded-xl transition-colors"
              >
                Window Repair North York
              </Link>
              <Link
                href={withInternalUtm("/glass-replacement-toronto", "home")}
                className="inline-flex items-center px-5 py-2.5 bg-neutral-100 hover:bg-[#d32f2f] hover:text-white text-neutral-800 font-medium rounded-xl transition-colors"
              >
                Glass Replacement Toronto
              </Link>
              <Link
                href={withInternalUtm("/window-repair-cost", "home")}
                className="inline-flex items-center px-5 py-2.5 bg-neutral-100 hover:bg-[#d32f2f] hover:text-white text-neutral-800 font-medium rounded-xl transition-colors"
              >
                Window Repair Cost Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#f5f7fa] py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <hr className="flex-grow border-gray-300 mr-4" />
            <div className="uppercase tracking-widest text-gray-600 text-sm font-semibold text-center px-4">
              Our Work
            </div>
            <hr className="flex-grow border-gray-300 ml-4" />
          </div>
        </div>
      </section>

      <section id="our-works" className="bg-[#f5f7fa] py-24">
        <div className="container mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="flex flex-col items-center">
              <div className="relative w-full aspect-[9/16] max-h-[640px] mb-6 rounded-md overflow-hidden">
                <video
                  src="/videos/ali-babas.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  title="Ali Baba's Storefront Glass Replacement"
                  aria-label="Video showcasing storefront glass replacement at Ali Baba's"
                  preload="auto"
                />
              </div>
              <div className="uppercase text-[#1a1a1a] text-xs font-bold tracking-widest mb-2">
                Ali Baba&apos;s
              </div>
              <div className="text-2xl font-serif font-semibold text-[#1a1a1a] mb-3 text-center">
                Storefront Glass Replacement
              </div>
              <div className="text-gray-700 text-base text-center">
                Replacing glass in a commercial space.
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative w-full aspect-[9/16] max-h-[640px] mb-6 rounded-md overflow-hidden">
                <video
                  src="/videos/car-aid-auto collision.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  title="Car Aid Auto Collision Glass Installation"
                  aria-label="Video showcasing glass installation at Car Aid Auto Collision"
                  preload="auto"
                />
              </div>
              <div className="uppercase text-[#1a1a1a] text-xs font-bold tracking-widest mb-2">
                Car Aid Auto Collision
              </div>
              <div className="text-2xl font-serif font-semibold text-[#1a1a1a] mb-3 text-center">
                Commercial Glass Installation
              </div>
              <div className="text-gray-700 text-base text-center">
                Professional storefront glass installation and repair services.
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative w-full aspect-[9/16] max-h-[640px] mb-6 rounded-md overflow-hidden">
                <video
                  src="/videos/gracious-living.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  title="Gracious Living Commercial Glass Replacement"
                  aria-label="Video showcasing commercial glass replacement at Gracious Living"
                  preload="auto"
                />
              </div>
              <div className="uppercase text-[#2c3a43] text-xs font-bold tracking-widest mb-2">
                Gracious Living
              </div>
              <div className="text-2xl font-serif font-semibold text-[#2c3a43] mb-3 text-center">
                Commercial Glass Replacement
              </div>
              <div className="text-gray-700 text-base text-center">
                Replacing glass in a commercial space.
              </div>
            </div>
          </div>
          <div className="mt-16 text-center">
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl gap-2 text-gray-700"
            >
              View all work on <br />
              <span className="text-[#d32f2f] font-bold">
                Instagram <i className="fa-solid fa-arrow-right" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section id="reviews" className="relative w-full mx-auto py-20 px-4 md:px-0">
        <div className="p-14 mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#2c3a43] mb-8">What Our Customers Say</h2>
          <HomeReviewWidgets />
        </div>
      </section>

      <section className="bg-[#f5f7fa] py-6 text-center">
        <p className="text-gray-600">
          Serving the Greater Toronto Area.{" "}
          <Link
            href={withInternalUtm("/service-areas", "home")}
            className="text-[#d32f2f] font-semibold hover:underline"
          >
            View Service Areas
          </Link>
        </p>
      </section>

      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#252525] to-[#2c3a43] py-20 md:py-28 px-4 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(211,47,47,0.12)_0%,_transparent_55%)] pointer-events-none" />
        <div className="relative container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 md:mb-5 leading-tight">
            Ready to repair or replace your glass?
          </h2>
          <p className="text-lg md:text-xl text-white/85 mb-10 max-w-2xl mx-auto">
            Request a free quote or call us for 24/7 emergency glass repair across Toronto and the
            GTA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <a
              href="#contact-form"
              className="inline-flex justify-center items-center bg-white text-[#d32f2f] border-2 border-white px-8 md:px-10 py-4 font-bold text-lg rounded-3xl shadow-lg hover:bg-[#d32f2f] hover:text-white hover:border-[#d32f2f] transition-all duration-300 transform hover:scale-[1.02]"
            >
              Free Quote
            </a>
            <ActiveContact>
              {({ phone, phoneHref }) => (
                <a
                  href={phoneHref}
                  className="inline-flex justify-center items-center border-2 border-white/50 text-white px-8 md:px-10 py-4 font-bold text-lg rounded-3xl hover:bg-white/10 hover:border-white transition-all duration-300"
                >
                  <i className="fas fa-phone-alt mr-2 opacity-90" />
                  {phone}
                </a>
              )}
            </ActiveContact>
          </div>
        </div>
      </section>

      <Footer serviceLinksOrder="index" />
    </>
  );
}
