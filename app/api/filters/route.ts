import { NextRequest, NextResponse } from "next/server";
import { data } from "../fixtures";

export type ResponseFilterData = {
  battery: number[];
  storage: number[];
  RAM: number[];
  processor: string[];
};

export async function GET(request: NextRequest) {
  const aggregate = data.reduce(
    (acc, item) => {
      if (!acc.battery.includes(item.Battery)) {
        acc.battery.push(item.Battery);
      }
      if (!acc.storage.includes(item.Storage)) {
        acc.storage.push(item.Storage);
      }
      if (!acc.RAM.includes(item.RAM)) {
        acc.RAM.push(item.RAM);
      }
      if (!acc.processor.includes(item.Processor)) {
        acc.processor.push(item.Processor);
      }
      return acc;
    },
    { battery: [], storage: [], RAM: [], processor: [] } as ResponseFilterData
  );
  return NextResponse.json(aggregate, { status: 200 });
}
