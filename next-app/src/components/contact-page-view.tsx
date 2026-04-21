"use client";

import Link from "next/link";
import { CtaFormSection } from "./cta-form-section";
import { Footer } from "./footer";
import { withInternalUtm } from "@/lib/site-data";

export function ContactPageView() {
  return (
    <>
      <CtaFormSection
        title="Contact Us"
        description="Have a question or need to get in touch? Fill out the form below and we'll get back to you quickly. You can also reach us by phone or email."
        showContactStrip
        formTitle="OhMyGlass Contact Form"
      />
      <section className="bg-[#f5f7fa] py-6 text-center">
        <p className="text-gray-600">
          Serving the Greater Toronto Area.{" "}
          <Link
            href={withInternalUtm("/service-areas", "contact")}
            className="text-[#d32f2f] font-semibold hover:underline"
          >
            View Service Areas
          </Link>
        </p>
      </section>
      <Footer serviceLinksOrder="default" />
    </>
  );
}
