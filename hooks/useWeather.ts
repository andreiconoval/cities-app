import { useState, useEffect } from "react";
import { WeatherResponse } from "../types/weather";

interface UseWeatherProps {
  lat: number;
  lon: number;
}

export const useWeather = ({ lat, lon }: UseWeatherProps) => {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lat || !lon) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const weatherData: WeatherResponse = await response.json();
        setData(weatherData);
      } catch (err: unknown) {
        setError((err as Error).message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  return { data, loading, error };
};
