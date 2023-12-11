import { cn } from "@/src/toolbox";
import Link from "next/link";
import React from "react";
import { SearchParams } from "./page";
import { setNewSearchParams } from "@/src/toolbox";

interface Props {
  total: number;
  itemsPerPage: number;
  params: SearchParams;
}

export function Pagination(props: Props) {
  return (
    <div className="flex justify-center items-center gap-1">
      {Array.from({ length: Math.ceil(props.total / props.itemsPerPage) }).map(
        (_, index) => (
          <Link
            className={cn(
              "w-8 h-8 rounded-md border border-primary-500 text-primary-foreground transition-all duration-300 focus:outline-none hover:bg-primary-foreground hover:text-primary flex items-center justify-center",
              props.params["page"] == (index + 1).toString()
                ? "bg-primary-foreground text-primary"
                : ""
            )}
            href={{
              pathname: "/server",
              query: setNewSearchParams(["page"], props.params, {
                page: (index + 1).toString(),
              }),
            }}
            key={index}
          >
            {index + 1}
          </Link>
        )
      )}
    </div>
  );
}
