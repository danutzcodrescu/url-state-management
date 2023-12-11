"use client";

import { ResponseSmartPhoneData } from "@/app/api/smartphones/route";
import { Pagination } from "@/src/components/pagination/Pagination";
import { SearchCard } from "@/src/components/search";
import { SearchForm } from "@/app/(state)/url-query/SearchForm";
import { Skeleton } from "@/src/components/ui/Skeleton";
import { useSetSearchParamValue } from "@/src/toolbox/hooks";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";

export function Search() {
  const searchParams = useSearchParams();
  const navigate = useSetSearchParamValue();
  const { data, isFetching } = useQuery({
    queryKey: [
      "smartphones",
      searchParams.get("battery"),
      searchParams.get("memory"),
      searchParams.get("storage"),
      searchParams.get("processor"),
      searchParams.get("searchQuery"),
      searchParams.get("page"),
    ],
    queryFn: async (): Promise<ResponseSmartPhoneData> => {
      const searchQuery = Object.entries({
        battery: searchParams.get("battery"),
        ram: searchParams.get("ram"),
        storage: searchParams.get("storage"),
        processor: searchParams.get("processor"),
        searchQuery: searchParams.get("searchQuery"),
        page: searchParams.get("page"),
      })
        .filter((entry) => entry[1])
        .map((entry) => `${entry[0]}=${entry[1]}`)
        .join("&");
      const resp = await fetch(
        `http://localhost:3000/api/smartphones?${searchQuery}`
      );
      return resp.json();
    },
    enabled: !!searchParams.get("searchQuery"),
  });
  return (
    <div className="w-2/3 min-h-full">
      <SearchForm></SearchForm>
      {isFetching ? <Skeleton /> : null}
      <div className="grid grid-cols-3 mt-8 gap-2">
        {data?.results?.map((smartphone) => (
          <SearchCard
            data={smartphone}
            key={smartphone.Brand + smartphone.Model}
          />
        ))}
      </div>
      <div className="mt-5 flex flex-row-reverse">
        <Pagination
          total={data?.total || 0}
          itemsPerPage={6}
          page={parseInt(searchParams.get("page") || "1")}
          setPage={(page) => navigate("page", page.toString())}
        />
      </div>
    </div>
  );
}
