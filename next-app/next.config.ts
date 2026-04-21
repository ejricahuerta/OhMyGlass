import type { NextConfig } from "next";
import { vercelRedirects } from "./src/lib/vercel-redirects";

const nextConfig: NextConfig = {
  async redirects() {
    return vercelRedirects.map((r) => ({
      source: r.source,
      destination: r.destination,
      permanent: r.permanent,
    }));
  },
};

export default nextConfig;
