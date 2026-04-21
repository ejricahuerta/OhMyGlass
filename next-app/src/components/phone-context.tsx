"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { contact } from "@/lib/site-data";

export type PhoneContextValue = {
  phone: string;
  phoneHref: string;
  afterHoursPhone: string;
  afterHoursPhoneHref: string;
};

const PhoneContext = createContext<PhoneContextValue | null>(null);

export function PhoneProvider({ children }: { children: ReactNode }) {
  const value = useMemo<PhoneContextValue>(
    () => ({
      phone: contact.phone,
      phoneHref: contact.phoneHref,
      afterHoursPhone: contact.afterHoursPhone,
      afterHoursPhoneHref: contact.afterHoursPhoneHref,
    }),
    []
  );
  return <PhoneContext.Provider value={value}>{children}</PhoneContext.Provider>;
}

export function usePhone(): PhoneContextValue {
  const ctx = useContext(PhoneContext);
  if (!ctx) {
    return {
      phone: contact.phone,
      phoneHref: contact.phoneHref,
      afterHoursPhone: contact.afterHoursPhone,
      afterHoursPhoneHref: contact.afterHoursPhoneHref,
    };
  }
  return ctx;
}
