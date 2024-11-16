// pages/api/weather.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { WeatherResponse } from "../../types/weather";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherResponse | { error: string }>
) {
  const { lat, lon } = req.query;

  // Validate query parameters
  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }

  try {
    // Fetch weather data
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric`
    );

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data: WeatherResponse = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
