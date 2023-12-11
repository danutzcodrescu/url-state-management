import { ResponseFilterData } from "@/app/api/filters/route";
import React from "react";
import { Filters } from "./Filters";

interface Props {}

export async function FiltersContainer(props: Props) {
  const data = await getData();
  return <Filters data={data} />;
}

async function getData(): Promise<ResponseFilterData> {
  const res = await fetch("http://localhost:3000/api/filters");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
