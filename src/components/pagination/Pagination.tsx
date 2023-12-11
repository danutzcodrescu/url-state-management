import { cn } from "@/src/toolbox";
import React from "react";

interface Props {
  total: number;
  page: number;
  itemsPerPage: number;
  setPage: (page: number) => void;
}

export function Pagination(props: Props) {
  return (
    <div className="flex justify-center items-center gap-1">
      {Array.from({ length: Math.ceil(props.total / props.itemsPerPage) }).map(
        (_, index) => (
          <button
            className={cn(
              "w-8 h-8 rounded-md border border-primary-500 text-primary-foreground transition-all duration-300 focus:outline-none hover:bg-primary-foreground hover:text-primary",
              props.page === index + 1
                ? "bg-primary-foreground text-primary"
                : ""
            )}
            onClick={() => props.setPage(index + 1)}
            key={index}
          >
            {index + 1}
          </button>
        )
      )}
    </div>
  );
}
