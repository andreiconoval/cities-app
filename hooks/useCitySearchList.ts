// useCitySearchList.ts
import { useAsyncList } from "react-stately";
import { GeoName, GeoNamesResponse } from "../types/GeoNames";

export function useCitySearchList() {
  return useAsyncList<GeoName, string>({
    async load({ signal, filterText }) {
      if (filterText) {
        let res = await fetch(`/api/searchCities?query=${filterText}`, {
          signal,
        });
        const data: GeoNamesResponse = await res.json();

        return {
          items: data.geonames,
        };
      } else
        return {
          items: [],
        };
    },
  });
}
