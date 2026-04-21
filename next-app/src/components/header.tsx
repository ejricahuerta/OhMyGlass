"use client";

import { useState } from "react";
import Link from "next/link";
import { navLinks, withInternalUtm } from "@/lib/site-data";
import { ActiveContact } from "./active-contact";

export function Header({
  ctaLabel = "Free Quote",
  showQuote,
}: {
  ctaLabel?: string;
  showQuote: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
    document.body.classList.remove("menu-is-active");
  }

  function openMenu() {
    setMenuOpen(true);
    document.body.classList.add("menu-is-active");
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/50 font-sans shadow-none backdrop-blur-md">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href={withInternalUtm("/", "nav")}>
          <picture>
            <source srcSet="/images/logo.webp" type="image/webp" />
            <img
              src="/images/logo.png"
              alt="OhMyGlass Logo"
              className="h-16 w-auto drop-shadow"
              width={288}
              height={64}
            />
          </picture>
        </Link>
        <div className="flex items-center gap-8">
          <div
            id="navbar-menu"
            className={`gap-8 text-[#1a1a1a] font-semibold md:static top-full left-0 w-full md:w-auto bg-[#f5f7fa] md:bg-transparent shadow md:shadow-none md:flex md:flex-row items-center md:items-center transition-all duration-300 z-40 flex flex-col md:flex-row ${
              menuOpen ? "is-active" : ""
            }`}
          >
            <button
              id="close-menu-button"
              className="md:hidden self-end p-4"
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <i className="fas fa-times" />
            </button>
            <ul className="flex flex-col md:flex-row gap-0 md:gap-8 w-full md:w-auto py-4 md:py-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#d32f2f] block py-4 md:py-0"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {showQuote ? (
            <a
              href="#contact-form"
              className="inline-block bg-[#d32f2f]/90 backdrop-blur-md text-white px-4 md:px-8 py-2 md:py-3 font-bold text-sm md:text-base shadow-lg hover:bg-[#b71c1c]/90 transition-all duration-300 border border-white/20 rounded-3xl"
            >
              {ctaLabel}
            </a>
          ) : (
            <ActiveContact>
              {({ phone, phoneHref, afterHoursPhone, afterHoursPhoneHref }) => (
                <div className="flex flex-col items-end gap-0.5 text-right">
                  <a
                    href={phoneHref}
                    className="inline-block text-[#1a1a1a] font-semibold text-sm md:text-base hover:text-[#d32f2f] transition-colors duration-300"
                  >
                    {phone}
                  </a>
                  <a
                    href={afterHoursPhoneHref}
                    className="inline-block text-[#1a1a1a]/80 font-medium text-xs md:text-sm hover:text-[#d32f2f] transition-colors duration-300"
                  >
                    After hours: {afterHoursPhone}
                  </a>
                </div>
              )}
            </ActiveContact>
          )}
          <button
            id="mobile-menu-button"
            className="md:hidden text-2xl text-[#1a1a1a]"
            type="button"
            onClick={openMenu}
            aria-label="Open menu"
          >
            <i className="fas fa-bars" />
          </button>
        </div>
      </nav>
    </header>
  );
}
