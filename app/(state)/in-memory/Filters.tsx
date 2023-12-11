"use client";

import { ResponseFilterData } from "@/app/api/filters/route";
import { FilterSection } from "@/src/components/filter-section/FilterSection";
import { Button } from "@/src/components/ui/Button";
import { useSmartPhoneState } from "@/src/store/filters";

interface Props {
  data: ResponseFilterData;
}

export function Filters({ data }: Props) {
  const state = useSmartPhoneState();
  return (
    <div className="w-1/3 text-secondary">
      <div className="flex gap-2 items-center ">
        <h4 className="text-xl font-bold ">Filters</h4>
        {state.battery.length ||
        state.processor.length ||
        state.memory.length ||
        state.storage.length ? (
          <Button
            variant="link"
            className="text-accent px-0 py-0 h-auto"
            onClick={() => state.reset()}
          >
            Clear all filters
          </Button>
        ) : null}
      </div>
      <FilterSection
        title="Processor"
        items={data.processor.slice(0, 5)}
        selected={state.processor}
        setSelection={state.setProcessor}
      />
      <FilterSection
        title="Memory"
        items={data.RAM.slice(0, 5).map((item) => item + " GB")}
        setSelection={(item, type) =>
          state.setMemory(parseInt(item.replace(" GB", "")), type)
        }
        selected={state.memory.map((item) => item + " GB")}
      />
      <FilterSection
        title="Storage"
        items={data.storage.slice(0, 5).map((item) => item + " GB")}
        selected={state.storage.map((item) => item + " GB")}
        setSelection={(item, type) =>
          state.setStorage(parseInt(item.replace(" GB", "")), type)
        }
      />
      <FilterSection
        title="Battery"
        items={data.battery.slice(0, 5).map((item) => item + " mAh")}
        selected={state.battery.map((item) => item + " mAh")}
        setSelection={(item, type) =>
          state.setBattery(parseInt(item.replace(" mAh", "")), type)
        }
      />
    </div>
  );
}
