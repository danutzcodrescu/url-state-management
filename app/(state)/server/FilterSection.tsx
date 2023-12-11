import { Button } from "@/src/components/ui/Button";
import Link from "next/link";
import React from "react";
import { SearchParams } from "./page";
import { omit } from "ramda";
import { CheckIcon } from "@radix-ui/react-icons";
import { setNewSearchParams } from "@/src/toolbox";

interface Props {
  title: string;
  items: string[];
  selected: SearchParams;
}

export function FilterSection({ title, items, selected }: Props) {
  return (
    <>
      <div className="flex items-center gap-2">
        <h5 className="text-lg font-extrabold py-5">{title}</h5>
        {selected[title.toLowerCase()] ? (
          <Button
            variant="link"
            className="text-accent px-0 py-0 h-auto"
            asChild
          >
            <Link
              href={{
                pathname: "/server",
                search: setNewSearchParams([title.toLowerCase()], selected),
              }}
            >
              Clear
            </Link>
          </Button>
        ) : null}
      </div>
      <ul className="list-none flex flex-col gap-1">
        {items.map((item) => (
          <FilterCheckbox
            key={item}
            item={item}
            selected={selected}
            title={title}
          />
        ))}
      </ul>
    </>
  );
}

interface CheckboxProps {
  item: string;
  selected: SearchParams;
  title: string;
}

function FilterCheckbox({ item, selected, title }: CheckboxProps) {
  const key = title.toLowerCase();
  const params = selected[key]?.split(",") || [];
  const isSelected = params.includes(item);
  return (
    <li>
      <Link
        href={{
          pathname: "/server",
          search: new URLSearchParams(
            !isSelected
              ? { ...selected, [key]: [...params, item].join(",") }
              : {
                  ...omit([key], selected),
                  ...(params.length > 1
                    ? {
                        [key]: [...params.filter((val) => val !== item)].join(
                          ","
                        ),
                      }
                    : {}),
                }
          ).toString(),
        }}
        className="items-center flex gap-2"
      >
        <button
          aria-checked={isSelected}
          id={`${item}-${title}`}
          role="checkbox"
          className="shrink-0 rounded-sm border border-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground h-4 w-4"
        >
          {isSelected ? <CheckIcon className="h-4 w-4" /> : null}
        </button>
        <label
          htmlFor={`${item}-${title}`}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {item}
        </label>
      </Link>
    </li>
  );
}
