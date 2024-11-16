import type { NextApiRequest, NextApiResponse } from "next";
import { GeoNamesResponse } from "../../types/GeoNames";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GeoNamesResponse | { error: string }>
) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    const response = await fetch(
      `http://api.geonames.org/searchJSON?q=${encodeURIComponent(
        query as string
      )}&featureClass=P&maxRows=10&username=${process.env.NEXT_PUBLIC_GEONAMES_USERNAME}`
    );

    if (!response.ok) {
      throw new Error("Error fetching data from GeoNames API");
    }

    const data: GeoNamesResponse = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
