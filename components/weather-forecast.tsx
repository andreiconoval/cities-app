import React from "react";
import { useWeather } from "../hooks/useWeather";
import WeatherForecastInfo from "./weather-forecast-info";
import { Card, Spinner } from "@nextui-org/react";

interface WeatherForecastProps {
  lat: number;
  lon: number;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ lat, lon }) => {
  const { data, loading, error } = useWeather({ lat, lon });

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

  return <WeatherForecastInfo data={data} />;
};

export default WeatherForecast;
