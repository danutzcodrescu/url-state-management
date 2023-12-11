import { FiltersContainer } from "./FiltersContainer";
import { Search } from "./Search";

export default function Home() {
  return (
    <div className="flex gap-20 py-10 w-full bg-foreground min-h-[calc(100vh-20rem)]">
      <FiltersContainer />
      <Search />
    </div>
  );
}
