import { title } from "@/components/primitives";
import { useGeoNames } from "@/hooks/useGeoNames";
import DefaultLayout from "@/layouts/default";
import { useRouter } from "next/router";
import { Card, Spinner, Divider, Link } from "@nextui-org/react";
import WeatherForecast from "@/components/weather-forecast";

export default function CityPage() {
  const router = useRouter();
  const { cityId } = router.query;
  const { data, loading, error } = useGeoNames(cityId as string | undefined);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="max-w-md p-6">
          <h3 className="text-red-500 text-lg font-bold">Error</h3>
          <p className="text-gray-700">{error}</p>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="max-w-md p-6">
          <h3 className="text-lg font-bold">No Data Found</h3>
        </Card>
      </div>
    );
  }

  return (
    <DefaultLayout>
      <div className="p-8">
        <div className="flex flex-wrap gap-6">
          {/* Main Information */}
          <Card isHoverable className="flex-1 p-6">
            <h2 className="text-2xl font-bold">
              {data.toponymName}{" "}
              <span className="text-gray-600">({data.asciiName})</span>
            </h2>
            <Divider className="my-4" />
            <p className="text-lg">
              <strong>Country:</strong> {data.countryName}
            </p>
            <p className="text-lg">
              <strong>Population:</strong> {data.population.toLocaleString()}
            </p>
            <p className="text-lg">
              <strong>Timezone:</strong> {data.timezone.timeZoneId}
            </p>
            <p className="text-lg">
              <strong>Coordinates:</strong> {data.lat}, {data.lng}
            </p>
            <p className="text-lg">
              <strong>Wikipedia:</strong>{" "}
              <Link
                href={data.wikipediaURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.wikipediaURL}
              </Link>
            </p>
          </Card>
        </div>
        <WeatherForecast lat={Number(data.lat)} lon={Number(data.lng)} />
      </div>
    </DefaultLayout>
  );
}
