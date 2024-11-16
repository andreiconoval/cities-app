import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useCitySearchList } from "../hooks/useCitySearchList"; // Adjust the path as necessary
import { SearchIcon } from "./icons";
import { useRouter } from "next/router";

function CitySearchAutocomplete() {
  const router = useRouter();

  let list = useCitySearchList();
  const handleSelectionChange = (selected: string | null) => {
    if (selected) {
      // Navigate to the page with the geonameId
      router.push(`/geoname/${selected}`);
    }
  };
  return (
    <Autocomplete
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      className="max-w-xs"
      inputValue={list.filterText}
      isLoading={list.isLoading}
      items={list.items}
      isClearable={false}
      placeholder="Type city ..."
      onInputChange={list.setFilterText}
      onSelectionChange={(selected) => {
        if (selected) {
          router.push(`/cities/${selected}`);
        }
      }}
    >
      {(item) => (
        <AutocompleteItem key={item.geonameId} className="capitalize">
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}

export default CitySearchAutocomplete;
