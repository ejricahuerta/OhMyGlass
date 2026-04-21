import Link from "next/link";
import { Footer } from "./footer";
import { withInternalUtm } from "@/lib/site-data";

export function NotFoundPage({ status = 404 }: { status?: number }) {
  return (
    <>
      <main className="flex items-center justify-center min-h-[60vh] text-center px-4">
        <div>
          <h1 className="text-9xl font-black text-gray-200">{status}</h1>
          <h2 className="text-4xl font-bold text-gray-800">Page Not Found</h2>
          <p className="text-lg text-gray-600 mt-4">
            Sorry, the page you are looking for could not be found.
          </p>
          <Link
            href={withInternalUtm("/", "error")}
            className="mt-8 inline-block bg-[#d32f2f]/90 backdrop-blur-md text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold hover:bg-[#b71c1c]/90 transition text-center"
          >
            Go back to Homepage
          </Link>
        </div>
      </main>
      <Footer serviceLinksOrder="default" />
    </>
  );
}
