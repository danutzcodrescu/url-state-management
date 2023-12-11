import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

export function useNavigation() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  return useCallback(
    (param: string, item: string, type: "add" | "remove" | "clear") => {
      const params = new URLSearchParams(searchParams);
      let paramData = searchParams.get(param)?.split(",") || [];
      if (type === "add") {
        paramData.push(item);
        params.set(param, paramData.join(","));
      }
      if (type === "remove") {
        paramData = paramData.filter((val) => val !== item);
        if (!paramData.length) {
          params.delete(param);
        } else {
          params.set(param, paramData.join(","));
        }
      }
      if (type === "clear") {
        params.delete(param);
      }
      params.delete("page");
      router.push(`${pathName}?${params.toString()}`);
    },
    [pathName, searchParams, router]
  );
}

export function useSetSearchParamValue() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  return useCallback(
    (param: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(param, value);
      router.push(`${pathName}?${params.toString()}`);
    },
    [pathName, searchParams, router]
  );
}
