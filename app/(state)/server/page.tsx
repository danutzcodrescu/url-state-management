import { FiltersContainer } from "./FiltersContainer";
import { Search } from "./Search";

export type SearchParams = { [key: string]: string };

interface Props {
  searchParams: SearchParams;
}

export default function Home({ searchParams }: Props) {
  return (
    <div className="flex gap-20 py-10 w-full bg-foreground min-h-[calc(100vh-20rem)]">
      <FiltersContainer params={searchParams} />
      <Search params={searchParams} />
    </div>
  );
}
