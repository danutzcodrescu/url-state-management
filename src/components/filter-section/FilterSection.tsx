import React from "react";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";

interface Props {
  title: string;
  items: string[];
  selected: string[];
  setSelection: (item: string, type: "add" | "remove" | "clear") => void;
}

export function FilterSection({ title, items, selected, setSelection }: Props) {
  return (
    <>
      <div className="flex items-center gap-2">
        <h5 className="text-lg font-extrabold py-5">{title}</h5>
        {selected.length ? (
          <Button
            onClick={() => setSelection("", "clear")}
            variant="link"
            className="text-accent px-0 py-0 h-auto"
          >
            Clear
          </Button>
        ) : null}
      </div>
      <ul className="list-none flex flex-col gap-1">
        {items.map((item) => (
          <li key={item} className="items-center flex gap-2">
            <Checkbox
              id={`processor-${item}`}
              className="border-background"
              checked={selected.includes(item)}
              onCheckedChange={(checked) =>
                setSelection(item, checked ? "add" : "remove")
              }
            />
            <label
              htmlFor={`processor-${item}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}
