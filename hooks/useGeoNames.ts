import { useState, useEffect } from "react";
import { GeoNamesResponse } from "../types/geonames-index";

export const useGeoNames = (geonameId: string | undefined) => {
  const [data, setData] = useState<GeoNamesResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!geonameId) return;

    const fetchGeoNamesData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/geonames?geonameId=${geonameId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result: GeoNamesResponse = await response.json();
        setData(result);
      } catch (err: unknown) {
        setError((err as Error).message || "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchGeoNamesData();
  }, [geonameId]);

  return { data, loading, error };
};
