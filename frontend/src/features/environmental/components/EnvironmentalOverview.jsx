import {
  SiteInformationCard,
  WeatherCard,
  SolarResourceCard,
  GISSummaryCard,
} from ".";

export default function EnvironmentalOverview({
  data,
}) {
  if (!data) return null;

  return (
    <div className="space-y-6">
      <SiteInformationCard
        site={data.site}
      />

      <WeatherCard
        weather={data.weather}
      />

      <SolarResourceCard
        solar={data.solar}
      />

      <GISSummaryCard
        gis={data.gis}
      />
    </div>
  );
}