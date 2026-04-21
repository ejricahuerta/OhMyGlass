import type { Metadata } from "next";
import { NotFoundPage } from "@/components/not-found-page";

export const metadata: Metadata = {
  title: "404 Page Not Found | OhMyGlass",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: false },
};

export default function Custom404Page() {
  return <NotFoundPage status={404} />;
}
