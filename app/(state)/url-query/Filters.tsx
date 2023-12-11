"use client";

import { ResponseFilterData } from "@/app/api/filters/route";
import { FilterSection } from "@/src/components/filter-section/FilterSection";
import { Button } from "@/src/components/ui/Button";
import { useNavigation } from "@/src/toolbox/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  data: ResponseFilterData;
}

export function Filters({ data }: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const navigate = useNavigation();
  return (
    <div className="w-1/3 text-secondary">
      <div className="flex gap-2 items-center ">
        <h4 className="text-xl font-bold ">Filters</h4>
        {[...searchParams.keys()].filter((key) => key !== "searchQuery")
          .length ? (
          <Button
            variant="link"
            className="text-accent px-0 py-0 h-auto"
            onClick={() => router.push(pathName)}
          >
            Clear all filters
          </Button>
        ) : null}
      </div>
      <FilterSection
        title="Processor"
        items={data.processor.slice(0, 5)}
        selected={searchParams.get("processor")?.split(",") || []}
        setSelection={(item, type) => navigate("processor", item, type)}
      />
      <FilterSection
        title="Memory"
        items={data.RAM.slice(0, 5).map((item) => item + " GB")}
        setSelection={(item, type) =>
          navigate("ram", item.replace(" GB", ""), type)
        }
        selected={(searchParams.get("ram")?.split(",") || []).map(
          (item) => item + " GB"
        )}
      />
      <FilterSection
        title="Storage"
        items={data.storage.slice(0, 5).map((item) => item + " GB")}
        selected={(searchParams.get("storage")?.split(",") || []).map(
          (item) => item + " GB"
        )}
        setSelection={(item, type) =>
          navigate("storage", item.replace(" GB", ""), type)
        }
      />
      <FilterSection
        title="Battery"
        items={data.battery.slice(0, 5).map((item) => item + " mAh")}
        selected={(searchParams.get("battery")?.split(",") || []).map(
          (item) => item + " mAh"
        )}
        setSelection={(item, type) =>
          navigate("battery", item.replace(" mAh", ""), type)
        }
      />
    </div>
  );
}
