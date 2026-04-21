"use client";

import Link from "next/link";
import {
  footerServicesIndexOrder,
  footerServicesDefaultOrder,
  contact,
} from "@/lib/site-data";
import { ActiveContact } from "./active-contact";

const linkClass =
  "transition-colors duration-200 hover:text-[#d32f2f] focus-visible:text-[#d32f2f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 rounded";
const headingClass =
  "font-bold text-sm uppercase tracking-wide mb-4 text-center text-white/90";

export function Footer({ serviceLinksOrder = "index" }: { serviceLinksOrder?: "index" | "default" }) {
  const year = new Date().getFullYear();
  const footerLinks =
    serviceLinksOrder === "index" ? footerServicesIndexOrder : footerServicesDefaultOrder;

  return (
    <footer className="bg-gradient-to-r from-[#3a3a3a] to-[#1a1a1a] text-white pt-16 pb-12">
      <div className="container mx-auto px-4 grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
        <div className="flex flex-col items-center text-center md:items-center">
          <picture>
            <source srcSet="/images/logo.webp" type="image/webp" />
            <img
              src="/images/logo.png"
              alt="OhMyGlass"
              className="h-24 w-auto mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              width={432}
              height={96}
            />
          </picture>
          <p className="text-sm text-white/80">
            &copy; {year} OhMyGlass. All rights reserved.
          </p>
        </div>

        <nav className="text-center" aria-label="Footer services">
          <h3 className={headingClass}>Our Services</h3>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-center">
          <h3 className={headingClass}>Contact Us</h3>
          <ul className="space-y-2">
            <li>
              <ActiveContact>
                {({ phone, phoneHref, afterHoursPhone, afterHoursPhoneHref }) => (
                  <>
                    <Link href={phoneHref} className={linkClass}>
                      {phone}
                    </Link>
                    <span className="block text-white/60 text-xs mt-1">After hours</span>
                    <Link href={afterHoursPhoneHref} className={`${linkClass} text-sm`}>
                      {afterHoursPhone}
                    </Link>
                  </>
                )}
              </ActiveContact>
            </li>
            <li>
              <Link href={contact.emailHref} className={linkClass}>
                {contact.email}
              </Link>
            </li>
            <li>
              <Link
                href={contact.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Find Us on Map
              </Link>
            </li>
            <li>
              <Link href={contact.serviceAreasHref} className={linkClass}>
                Service Areas
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-center">
          <h3 className={headingClass}>Connect With Us</h3>
          <ul className="flex gap-4 justify-center" role="list">
            <li>
              <Link
                href={contact.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} inline-flex items-center justify-center w-10 h-10`}
                aria-label="Google Maps"
              >
                <i className="fab fa-google" aria-hidden="true" />
              </Link>
            </li>
            <li>
              <Link
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} inline-flex items-center justify-center w-10 h-10`}
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f" aria-hidden="true" />
              </Link>
            </li>
            <li>
              <Link
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} inline-flex items-center justify-center w-10 h-10`}
                aria-label="Instagram"
              >
                <i className="fab fa-instagram" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
