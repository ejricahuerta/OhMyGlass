"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import Script from "next/script";
import { Header } from "./header";
import { FloatingCallButton } from "./floating-call-button";
import { loadTallyEmbeds } from "@/lib/tally";
import { PosthogProvider } from "./posthog-provider";

const FONT_AWESOME_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [showQuoteInNav, setShowQuoteInNav] = useState(true);
  const [showFloatingCallButton, setShowFloatingCallButton] = useState(false);
  const ctaLabel = isHome ? "Free Quote" : "Get a Free Quote";

  const shellClass = isHome
    ? "relative min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#f5f7fa] overflow-x-hidden"
    : "relative min-h-screen bg-[#f5f7fa] overflow-x-hidden";

  useEffect(() => {
    const faLink = document.createElement("link");
    faLink.rel = "stylesheet";
    faLink.href = FONT_AWESOME_URL;
    faLink.media = "all";
    document.head.appendChild(faLink);

    const gtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;
    if (gtmId) {
      try {
        const w = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
        w.dataLayer = w.dataLayer || [];
        function gtag(...args: unknown[]) {
          w.dataLayer!.push(args);
        }
        w.gtag = gtag;
        gtag("js", new Date());
        gtag("config", gtmId);
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gtmId}`;
        document.head.appendChild(script);
      } catch {
        /* ignore */
      }
    }

    return () => {
      faLink.remove();
    };
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      loadTallyEmbeds();
    });
    const retry = setTimeout(() => loadTallyEmbeds(), 500);
    return () => clearTimeout(retry);
  }, [pathname]);

  useEffect(() => {
    if (!isHome) {
      setShowQuoteInNav(true);
      setShowFloatingCallButton(true);
      return;
    }

    const heroSection = document.getElementById("hero");
    function isMobile() {
      return typeof window !== "undefined" && window.innerWidth < 768;
    }
    function isHeroVisible() {
      if (!heroSection) return false;
      const rect = heroSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      return rect.top < windowHeight && rect.bottom > 0;
    }
    function updateNav() {
      const heroVisible = isHeroVisible();
      if (isMobile()) {
        setShowQuoteInNav(heroVisible);
        setShowFloatingCallButton(!heroVisible);
      } else {
        setShowQuoteInNav(true);
        setShowFloatingCallButton(true);
      }
    }
    updateNav();
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateNav();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", updateNav);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateNav);
    };
  }, [isHome, pathname]);

  return (
    <div className={shellClass}>
      <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" />
      <PosthogProvider />
      <Header ctaLabel={ctaLabel} showQuote={showQuoteInNav} />
      {children}
      <FloatingCallButton visible={showFloatingCallButton} />
    </div>
  );
}
