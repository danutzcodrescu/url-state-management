import { type ClassValue, clsx } from "clsx";
import { omit } from "ramda";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function setNewSearchParams(
  keys: string[],
  values: Record<string, string>,
  newValues: Record<string, string> = {}
) {
  return new URLSearchParams({
    ...omit(keys, values),
    ...newValues,
  }).toString();
}
