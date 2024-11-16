// pages/api/geonames.ts
import type { NextApiRequest, NextApiResponse } from "next";

const GEONAMES_USERNAME = "helpdev13"; // Replace with your GeoNames username

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { geonameId } = req.query;

  if (!geonameId) {
    return res.status(400).json({ error: "geonameId is required" });
  }

  try {
    const response = await fetch(
      `http://api.geonames.org/getJSON?geonameId=${geonameId}&username=${GEONAMES_USERNAME}`
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `Failed to fetch data: ${response.statusText}` });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching GeoNames data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
