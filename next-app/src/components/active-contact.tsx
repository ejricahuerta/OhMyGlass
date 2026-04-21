"use client";

import type { ReactNode } from "react";
import { usePhone, type PhoneContextValue } from "./phone-context";

export function ActiveContact({
  children,
}: {
  children: (p: PhoneContextValue) => ReactNode;
}) {
  const p = usePhone();
  return <>{children(p)}</>;
}
