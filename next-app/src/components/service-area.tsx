import { serviceAreaCitiesList } from "@/lib/site-data";

export function ServiceArea({
  showHeading = true,
  embed = false,
}: {
  showHeading?: boolean;
  embed?: boolean;
}) {
  return (
    <section
      id="service-area"
      className={`px-0 ${!embed ? "container mx-auto py-10 px-4" : ""}`}
    >
      {showHeading ? (
        <div className="flex items-center justify-center mb-6">
          <hr className="flex-grow border-gray-300 mr-4" />
          <h2 className="uppercase tracking-widest text-gray-600 text-sm font-semibold text-center px-2">
            Service area in GTA
          </h2>
          <hr className="flex-grow border-gray-300 ml-4" />
        </div>
      ) : null}
      <div className="flex flex-wrap gap-2 justify-center items-center" role="list">
        {serviceAreaCitiesList.map((city) => (
          <span key={city} className="area-badge" role="listitem">
            {city}
          </span>
        ))}
      </div>
    </section>
  );
}
