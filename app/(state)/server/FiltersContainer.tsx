import { ResponseFilterData } from "@/app/api/filters/route";
import { Button } from "@/src/components/ui/Button";
import Link from "next/link";
import React from "react";
import { FilterSection } from "./FilterSection";
import { SearchParams } from "./page";
import { omit, pick } from "ramda";

interface Props {
  params: SearchParams;
}

export async function FiltersContainer({ params }: Props) {
  const data = await getData();
  return (
    <div className="w-1/3 text-secondary">
      <div className="flex gap-2 items-center ">
        <h4 className="text-xl font-bold ">Filters</h4>
        {Object.keys(omit(["searchQuery", "page"], params)).length ? (
          <Button
            variant="link"
            className="text-accent px-0 py-0 h-auto"
            asChild
          >
            <Link
              href={{
                pathname: "/server",
                search: new URLSearchParams({
                  ...pick(["searchQuery"], params),
                  page: "1",
                }).toString(),
              }}
            >
              Clear all filters
            </Link>
          </Button>
        ) : null}
      </div>
      <FilterSection
        title="Processor"
        items={data.processor.slice(0, 5)}
        selected={params}
      />
      <FilterSection
        title="Ram"
        items={data.RAM.slice(0, 5).map((item) => item + " GB")}
        selected={params}
      />
      <FilterSection
        title="Storage"
        items={data.storage.slice(0, 5).map((item) => item + " GB")}
        selected={params}
      />
      <FilterSection
        title="Battery"
        items={data.battery.slice(0, 5).map((item) => item + " mAh")}
        selected={params}
      />
    </div>
  );
}

async function getData(): Promise<ResponseFilterData> {
  const res = await fetch("http://localhost:3000/api/filters");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
