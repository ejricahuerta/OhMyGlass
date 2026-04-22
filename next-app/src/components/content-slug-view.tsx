"use client";

import Link from "next/link";
import type { PageRecord } from "@/lib/pages-schema";
import { isResourcePage } from "@/lib/pages-data";
import { contact, withInternalUtm, siteUrl } from "@/lib/site-data";
import {
  getBreadcrumbSchema,
  getFAQPageSchema,
  getJsonLdGraphInner,
  getServiceSchema,
} from "@/lib/schema";
import {
  CUSTOM_RESOURCE_FAQ_QUESTIONS,
  LOCATION_DISPLAY_NAMES,
  LOCATION_SUFFIXES,
  RELATED_PAGE_LINKS,
  RESOURCE_SERVICE_LINKS,
  SERVICE_AREA_SECTION_SLUGS,
  SERVICE_BASES,
  SERVICE_LABELS,
} from "@/lib/slug-config";
import { Footer } from "./footer";
import { ActiveContact } from "./active-contact";
import { ContentPageForm } from "./content-page-form";
import { ServiceArea } from "./service-area";

function stripTitleSuffix(title: string): string {
  return title
    .replace(/\s*[-–|]\s*OhMyGlass\.ca$/i, "")
    .replace(/\s*[-–|]\s*OhMyGlass$/i, "")
    .replace(/\s*[-–|]\s*OhMyGlass[^]*$/i, "")
    .trim();
}

export function ContentSlugView({ page, slug }: { page: PageRecord; slug: string }) {
  const isServiceAreasPage = slug === "service-areas";
  const isResource = isResourcePage(page);
  const hasSections = Array.isArray(page.sections) && page.sections.length > 0;

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: stripTitleSuffix(page.title), url: `/${slug}` },
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);

  const articleSchema =
    slug === "glass-repair-vs-replacement"
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: page.title
            .replace(/ - OhMyGlass\.ca$| – OhMyGlass\.ca$| - OhMyGlass$| – OhMyGlass$| \| OhMyGlass$/i, "")
            .trim(),
          description: page.seo?.meta_description ?? page.title,
          url: `${siteUrl}/${slug}`,
          author: {
            "@type": "Organization",
            name: "OhMyGlass",
            url: siteUrl,
            telephone: "+16478032730",
            areaServed: "Greater Toronto Area",
          },
          datePublished: "2025-02-24",
          dateModified: "2025-02-24",
          publisher: { "@type": "Organization", name: "OhMyGlass", url: siteUrl },
        }
      : null;

  const serviceSchema =
    page.type === "service"
      ? getServiceSchema({
          name: page.title,
          description: page.seo?.meta_description ?? page.title,
          url: `/${slug}`,
        })
      : null;

  const faqFromCustom = CUSTOM_RESOURCE_FAQ_QUESTIONS[slug];
  const faqQuestions =
    faqFromCustom ??
    (page.sections || [])
      .filter(
        (s) =>
          s.heading &&
          (s.heading.trim().endsWith("?") ||
            s.heading.trim().startsWith("What ") ||
            s.heading.trim().startsWith("How ") ||
            s.heading.trim().startsWith("Why ") ||
            s.heading.trim().startsWith("When ") ||
            s.heading.trim().startsWith("Which "))
      )
      .slice(0, 10)
      .map((s) => ({
        "@type": "Question" as const,
        name: s.heading!,
        acceptedAnswer: {
          "@type": "Answer" as const,
          text: [s.content, s.list?.join(" ")].filter(Boolean).join(" ") || s.heading!,
        },
      }));
  const faqSchema = getFAQPageSchema(faqQuestions);

  const jsonLdGraph = [
    breadcrumbSchema,
    slug === "glass-repair-vs-replacement" ? articleSchema : null,
    page.type === "service" ? serviceSchema : null,
    faqSchema.mainEntity.length > 0 ? faqSchema : null,
  ].filter(Boolean) as Record<string, unknown>[];

  const jsonLdInner = getJsonLdGraphInner(jsonLdGraph);

  const resourceServiceLink = isResource ? RESOURCE_SERVICE_LINKS[slug] || null : null;

  let locationPageInfo: {
    cityName: string;
    otherLinks: { slug: string; label: string }[];
  } | null = null;
  for (const base of SERVICE_BASES) {
    const prefix = base + "-";
    if (slug.startsWith(prefix)) {
      const locationSuffix = slug.slice(prefix.length);
      if (LOCATION_SUFFIXES.includes(locationSuffix)) {
        const otherBases = SERVICE_BASES.filter((b) => b !== base);
        locationPageInfo = {
          cityName: LOCATION_DISPLAY_NAMES[locationSuffix] || locationSuffix,
          otherLinks: otherBases.map((b) => ({
            slug: b + "-" + locationSuffix,
            label: SERVICE_LABELS[b],
          })),
        };
        break;
      }
    }
  }
  const isLocationPage = locationPageInfo !== null;

  const isGenericServiceWithAreas = SERVICE_BASES.includes(slug);
  const genericServiceAreaLinks = isGenericServiceWithAreas
    ? LOCATION_SUFFIXES.map((suffix) => ({
        name: LOCATION_DISPLAY_NAMES[suffix] || suffix,
        slug: slug + "-" + suffix,
      }))
    : [];

  const paragraphs = isServiceAreasPage
    ? []
    : page.pagecontent
      ? page.pagecontent.split(/\n\n+/).filter((p) => p.trim())
      : [];

  const serviceAreasIntro =
    "We provide expert glass repair and replacement across the Greater Toronto Area.";
  const serviceAreaLocations = page.service_area_locations ?? [];
  const hasExplicitAreasSection = (page.sections || []).some((section) =>
    /areas?\s+we\s+serve|service\s+areas?/i.test(section.heading || "")
  );
  const shouldShowServiceAreaAboveForm =
    page.type === "service" &&
    SERVICE_AREA_SECTION_SLUGS.has(slug) &&
    !isGenericServiceWithAreas &&
    !hasExplicitAreasSection;

  const relatedPageLinks = RELATED_PAGE_LINKS[slug] ?? [];

  const h1Display = page.title
    .replace(" - OhMyGlass.ca", "")
    .replace(" – OhMyGlass.ca", "")
    .replace(" - OhMyGlass", "")
    .replace(" – OhMyGlass", "")
    .replace(" | OhMyGlass", "");

  return (
    <>
      {jsonLdInner ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdInner }}
        />
      ) : null}

      <main className={isServiceAreasPage ? "min-h-screen" : "py-16"}>
        {isServiceAreasPage ? (
          <section className="relative bg-gradient-to-b from-neutral-800 to-neutral-900 text-white pt-20 pb-16 md:pt-24 md:pb-20 px-4 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#d32f2f]/30 to-transparent" />
            </div>
            <div className="container mx-auto relative z-10 max-w-4xl">
              <p className="text-sm uppercase tracking-widest text-neutral-300 mb-3">Coverage</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
                Service areas
              </h1>
              <p className="text-lg md:text-xl text-neutral-200 max-w-2xl">
                {serviceAreasIntro} Select your area for local emergency glass repair, window
                replacement, and more.
              </p>
            </div>
          </section>
        ) : null}

        <div className={`container mx-auto px-4 ${isServiceAreasPage ? "py-14 md:py-20" : ""}`}>
          <div className={`grid grid-cols-1 gap-12 ${isResource ? "" : "lg:grid-cols-2"}`}>
            <div className="max-w-none text-lg text-gray-800 space-y-4">
              {isResource ? (
                <Link
                  href={withInternalUtm("/resources", "content")}
                  className="inline-block text-[#d32f2f] font-semibold hover:underline mb-6"
                >
                  ← Resources
                </Link>
              ) : null}
              {!isServiceAreasPage ? (
                <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
                  <Link href={withInternalUtm("/", "content")} className="text-[#d32f2f] font-semibold hover:underline">
                    Home
                  </Link>
                  <span className="mx-2">/</span>
                  {isLocationPage ? (
                    <>
                      <Link
                        href={withInternalUtm("/services", "content")}
                        className="text-[#d32f2f] font-semibold hover:underline"
                      >
                        Services
                      </Link>
                      <span className="mx-2">/</span>
                      <Link
                        href={withInternalUtm("/service-areas", "content")}
                        className="text-[#d32f2f] font-semibold hover:underline"
                      >
                        Service areas
                      </Link>
                      <span className="mx-2">/</span>
                    </>
                  ) : null}
                  {isResource ? (
                    <>
                      <Link
                        href={withInternalUtm("/resources", "content")}
                        className="text-[#d32f2f] font-semibold hover:underline"
                      >
                        Resources
                      </Link>
                      <span className="mx-2">/</span>
                    </>
                  ) : null}
                  <span className="text-gray-800">{stripTitleSuffix(page.title)}</span>
                </nav>
              ) : null}
              {!isServiceAreasPage ? (
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">{h1Display}</h1>
              ) : null}

              {isServiceAreasPage ? (
                <>
                  <div className="mb-12">
                    <h2 className="text-xl font-semibold text-neutral-800 mb-3">Browse by area</h2>
                    <p className="text-neutral-600 mb-6">
                      We serve the GTA. Choose your area for local glass repair and replacement
                      services.
                    </p>
                    {serviceAreaLocations.length > 0 ? (
                      <nav className="flex flex-wrap gap-3" aria-label="Service areas">
                        {serviceAreaLocations.map((loc) => (
                          <Link
                            key={loc.slug}
                            href={withInternalUtm(`/${loc.slug}`, "content")}
                            className="inline-flex items-center px-5 py-2.5 bg-white border border-neutral-200 rounded-xl text-neutral-800 font-medium shadow-sm hover:bg-[#d32f2f] hover:text-white hover:border-[#d32f2f] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d32f2f]/50 focus:ring-offset-2"
                          >
                            {loc.name}
                          </Link>
                        ))}
                      </nav>
                    ) : (
                      <ServiceArea showHeading={false} embed />
                    )}
                  </div>
                  <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                    <div className="p-6 pb-4">
                      <h2 className="text-xl font-semibold text-neutral-800 mb-2">
                        Our location & the GTA
                      </h2>
                      <p className="text-neutral-600 text-sm">
                        OhMyGlass is based in North York and serves the Greater Toronto Area.
                      </p>
                    </div>
                    <div className="aspect-[4/3] min-h-[300px]">
                      <iframe
                        title="OhMyGlass location and Greater Toronto Area"
                        src={contact.googleMapsEmbedGtaSrc}
                        width="100%"
                        height="100%"
                        className="w-full h-full min-h-[300px] border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                    <p className="p-4 pt-3 text-sm text-neutral-500 border-t border-neutral-100">
                      <Link
                        href={contact.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#d32f2f] font-medium hover:underline"
                      >
                        Open in Google Maps
                      </Link>
                    </p>
                  </div>
                  <section className="mt-12 py-8 px-6 bg-neutral-800 text-white rounded-2xl">
                    <p className="text-lg font-semibold mb-4 m-0">
                      Need glass repair in your area? We&apos;re available 24/7.
                    </p>
                    <ActiveContact>
                      {({ phone, phoneHref, afterHoursPhone, afterHoursPhoneHref }) => (
                        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                          <a
                            href={phoneHref}
                            className="inline-flex items-center gap-2 bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-bold px-6 py-3 rounded-2xl transition-colors"
                          >
                            <i className="fa-solid fa-phone" />
                            {phone}
                          </a>
                          <a
                            href={afterHoursPhoneHref}
                            className="inline-flex items-center gap-2 bg-white hover:bg-neutral-100 text-neutral-900 font-bold px-6 py-3 rounded-2xl border border-white transition-colors"
                          >
                            After hours: {afterHoursPhone}
                          </a>
                        </div>
                      )}
                    </ActiveContact>
                  </section>
                  <section className="mt-8 py-8 px-6 bg-white border border-neutral-200 rounded-2xl">
                    <h2 className="text-xl font-semibold text-neutral-800 mb-2">
                      Popular Toronto area pages
                    </h2>
                    <p className="text-neutral-600 mb-4">
                      Quick links to our highest-priority local service pages.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={withInternalUtm("/window-repair-toronto", "content")}
                        className="inline-flex items-center px-4 py-2 rounded-xl bg-neutral-100 hover:bg-[#d32f2f] hover:text-white text-neutral-800 font-medium transition-colors"
                      >
                        Window Repair Toronto
                      </Link>
                      <Link
                        href={withInternalUtm("/window-repair-north-york", "content")}
                        className="inline-flex items-center px-4 py-2 rounded-xl bg-neutral-100 hover:bg-[#d32f2f] hover:text-white text-neutral-800 font-medium transition-colors"
                      >
                        Window Repair North York
                      </Link>
                      <Link
                        href={withInternalUtm("/glass-replacement-toronto", "content")}
                        className="inline-flex items-center px-4 py-2 rounded-xl bg-neutral-100 hover:bg-[#d32f2f] hover:text-white text-neutral-800 font-medium transition-colors"
                      >
                        Glass Replacement Toronto
                      </Link>
                    </div>
                  </section>
                </>
              ) : hasSections ? (
                <div className="text-gray-700 space-y-6">
                  {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {page.sections!.map((section, idx) => (
                    <div key={idx}>
                      {section.heading ? (
                        section.level === 3 ? (
                          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-2">
                            {section.heading}
                          </h3>
                        ) : (
                          <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-2">
                            {section.heading}
                          </h2>
                        )
                      ) : null}
                      {section.content ? <p>{section.content}</p> : null}
                      {section.list && section.list.length > 0 ? (
                        <ul className="list-disc pl-6 space-y-2">
                          {section.list.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-700 space-y-6">
                  {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}

              {genericServiceAreaLinks.length > 0 ? (
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">Areas we serve</h2>
                  <p className="text-gray-600 mb-3">This service is available in:</p>
                  <ul className="flex flex-wrap gap-2">
                    {genericServiceAreaLinks.map((link) => (
                      <li key={link.slug}>
                        <Link
                          href={withInternalUtm(`/${link.slug}`, "content")}
                          className="text-[#d32f2f] font-semibold hover:underline"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {isResource ? (
                <p className="mt-10 pt-8 border-t border-gray-200">
                  {resourceServiceLink ? (
                    <>
                      <Link
                        href={resourceServiceLink.href}
                        className="text-[#d32f2f] font-semibold hover:underline"
                      >
                        {resourceServiceLink.label}
                      </Link>
                      <span className="text-gray-600"> · </span>
                    </>
                  ) : null}
                  <Link
                    href={withInternalUtm("/#contact-form", "content")}
                    className="text-[#d32f2f] font-semibold hover:underline"
                  >
                    Get a free quote
                  </Link>
                  <span className="text-gray-600"> · </span>
                  <Link
                    href={withInternalUtm("/resources", "content")}
                    className="text-[#d32f2f] font-semibold hover:underline"
                  >
                    Back to Resources
                  </Link>
                </p>
              ) : null}
              {relatedPageLinks.length > 0 ? (
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">See also</h2>
                  <div className="flex flex-wrap gap-3">
                    {relatedPageLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={withInternalUtm(link.href, "content")}
                        className="inline-flex items-center px-4 py-2 rounded-xl bg-neutral-100 hover:bg-[#d32f2f] hover:text-white text-neutral-800 font-medium transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
              {isLocationPage && locationPageInfo ? (
                <p className="mt-10 pt-8 border-t border-gray-200 text-gray-700">
                  Other services in {locationPageInfo.cityName}:{" "}
                  {locationPageInfo.otherLinks.map((link, i) => (
                    <span key={link.slug}>
                      <Link
                        href={withInternalUtm(`/${link.slug}`, "content")}
                        className="text-[#d32f2f] font-semibold hover:underline"
                      >
                        {link.label}
                      </Link>
                      {i < locationPageInfo.otherLinks.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
            {!isResource ? (
              <div>
                {shouldShowServiceAreaAboveForm ? <ServiceArea showHeading embed /> : null}
                <ContentPageForm formTitle="OhMyGlass Free Quote" />
              </div>
            ) : null}
          </div>
        </div>
      </main>

      {!isServiceAreasPage && !isResource ? (
        <section className="bg-[#f5f7fa] py-6 text-center">
          <p className="text-gray-600">
            Serving the Greater Toronto Area.{" "}
            <Link
              href={withInternalUtm("/service-areas", "content")}
              className="text-[#d32f2f] font-semibold hover:underline"
            >
              View Service Areas
            </Link>
          </p>
        </section>
      ) : null}
      <Footer serviceLinksOrder="default" />
    </>
  );
}
