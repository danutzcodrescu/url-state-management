import { SearchCard } from "@/src/components/search";
import { ResponseSmartPhoneData } from "@/app/api/smartphones/route";
import { Pagination } from "./Pagination";
import { SearchParams } from "./page";
import { SearchForm } from "./SearchForm";

interface Props {
  params: SearchParams;
}
export async function Search({ params }: Props) {
  const data = await getData(new URLSearchParams(params));
  return (
    <div className="w-2/3 min-h-full">
      <SearchForm params={params}></SearchForm>
      <div className="grid grid-cols-3 mt-8 gap-2">
        {data?.results?.map((smartphone) => (
          <SearchCard
            data={smartphone}
            key={smartphone.Brand + smartphone.Model}
          />
        ))}
      </div>
      {params["searchQuery"] ? (
        <div className="mt-5 flex flex-row-reverse">
          <Pagination
            total={data.total || 0}
            itemsPerPage={6}
            params={params}
          />
        </div>
      ) : null}
    </div>
  );
}

async function getData(
  params: URLSearchParams
): Promise<ResponseSmartPhoneData> {
  if (!params.get("searchQuery")) {
    return { total: 0, results: [] };
  }
  const res = await fetch(
    `http://localhost:3000/api/smartphones?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
