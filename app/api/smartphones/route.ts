import { NextRequest, NextResponse } from "next/server";
import { data } from "../fixtures";

const resultsPerPage = 6;

export interface ResponseSmartPhoneData {
  results: typeof data;
  total: number;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const params = [
    searchParams.get("processor") ? "processor" : null,
    searchParams.get("battery") ? "battery" : null,
    searchParams.get("storage") ? "storage" : null,
    searchParams.get("ram") ? "ram" : null,
    "searchQuery",
  ].filter((item) => item) as string[];
  const response = data.filter((item) => {
    return params.every((param) => {
      if (param === "searchQuery" && searchParams.get("searchQuery") !== "*") {
        return !!(item.Brand.toLowerCase() + item.Model.toLowerCase()).includes(
          searchParams.get("searchQuery")?.toLowerCase() || ""
        );
      }
      if (param === "searchQuery" && searchParams.get(param) === "*")
        return true;

      return searchParams
        .get(param)
        ?.split(",")
        .map((item) => (param !== "processor" ? parseInt(item) : item))

        .includes(
          // @ts-expect-error
          item[
            param === "ram"
              ? "RAM"
              : param.charAt(0).toUpperCase() + param.slice(1)
          ]
        );
    });
  });
  return NextResponse.json(
    {
      results: response.slice(
        (parseInt(searchParams.get("page") || "1") - 1) * resultsPerPage,
        parseInt(searchParams.get("page") || "1") * resultsPerPage
      ),
      total: response.length,
    },
    { status: 200 }
  );
}
