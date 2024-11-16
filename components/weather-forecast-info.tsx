import React from "react";
import { Card, Divider, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { format } from "date-fns";
import { WeatherResponse } from "@/types/weather";

interface WeatherForecastInfoProps {
  data: WeatherResponse;
}

const WeatherForecastInfo: React.FC<WeatherForecastInfoProps> = ({ data }) => {
  const { city, list } = data;
  const groupedByDays = list.reduce(
    (acc, forecast) => {
      const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(forecast);
      return acc;
    },
    {} as Record<string, typeof list>
  );
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Weather Forecast for {city.name}, {city.country}
        </h1>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedByDays).map(([date, forecasts]) => (
          <div key={date}>
            <h2 className="text-2xl font-semibold mb-4">
              {format(new Date(date), "eeee, MMM d")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forecasts.map((forecast, index) => (
                <Card key={index} isHoverable className="p-4 bg-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">
                        {forecast.dt_txt.split(" ")[1]}
                      </p>
                    </div>
                    <Tooltip content={forecast.weather[0].description}>
                      <Image
                        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                        alt={forecast.weather[0].description}
                        width={50}
                        height={50}
                      />
                    </Tooltip>
                  </div>
                  <Divider className="my-4" />
                  <div className="text-gray-700">
                    <p>
                      <strong>Temperature:</strong>{" "}
                      {forecast.main.temp.toFixed(1)}°C
                    </p>
                    <p>
                      <strong>Feels Like:</strong>{" "}
                      {forecast.main.feels_like.toFixed(1)}°C
                    </p>
                    <p>
                      <strong>Humidity:</strong> {forecast.main.humidity}%
                    </p>
                    <p>
                      <strong>Pressure:</strong> {forecast.main.pressure} hPa
                    </p>
                    <p>
                      <strong>Wind:</strong> {forecast.wind.speed} m/s at{" "}
                      {forecast.wind.deg}°
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecastInfo;
