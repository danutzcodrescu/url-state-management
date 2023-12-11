"use client";

import { ResponseSmartPhoneData } from "@/app/api/smartphones/route";
import { Pagination } from "@/src/components/pagination/Pagination";
import { SearchCard } from "@/src/components/search";
import { Skeleton } from "@/src/components/ui/Skeleton";
import { useSmartPhoneState } from "@/src/store/filters";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { SearchForm } from "./SearchForm";

interface Props {}

export function Search(props: Props) {
  const state = useSmartPhoneState();
  const { data, isFetching } = useQuery({
    queryKey: [
      "smartphones",
      state.battery,
      state.memory,
      state.storage,
      state.processor,
      state.searchQuery,
      state.page,
    ],
    queryFn: async (): Promise<ResponseSmartPhoneData> => {
      const searchQuery = Object.entries({
        battery: state.battery,
        ram: state.memory,
        storage: state.storage,
        processor: state.processor,
        searchQuery: state.searchQuery,
        page: state.page,
      })
        .filter((entry) => entry[1])
        .map((entry) => `${entry[0]}=${entry[1]}`)
        .join("&");
      const resp = await fetch(
        `http://localhost:3000/api/smartphones?${searchQuery}`
      );
      return resp.json();
    },
    enabled: !!state.searchQuery,
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
          page={state.page}
          setPage={state.setPage}
        />
      </div>
    </div>
  );
}
