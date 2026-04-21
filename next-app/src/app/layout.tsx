import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { PhoneProvider } from "@/components/phone-context";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ohmyglass.ca"),
  title: {
    default: "OhMyGlass | Glass Repair Toronto & GTA",
    template: "%s | OhMyGlass",
  },
  description:
    "Glass repair and window replacement in Toronto and the GTA. 24/7 emergency service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Same Google Fonts URLs as svelte-app/src/routes/+layout.svelte (pixel parity) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <PhoneProvider>
          <SiteShell>{children}</SiteShell>
        </PhoneProvider>
        <Analytics />
      </body>
    </html>
  );
}
