import CitySearchAutocomplete from "@/components/city-search-autocomplete";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function SearchPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Search</h1>
          <CitySearchAutocomplete />
        </div>
      </section>
    </DefaultLayout>
  );
}
