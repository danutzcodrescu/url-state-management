import React from "react";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { SearchParams } from "./page";
import { redirect } from "next/navigation";
import { setNewSearchParams } from "@/src/toolbox";

interface Props {
  params: SearchParams;
}

export function SearchForm({ params }: Props) {
  async function handleSubmit(formData: FormData) {
    "use server";
    redirect(
      `/server?${setNewSearchParams(["query", "page"], params, {
        searchQuery: formData.get("query") as string,
        page: "1",
      })}`
    );
  }

  return (
    <form className="items-center gap-4 flex" action={handleSubmit}>
      <Input
        placeholder="Search for smartphones"
        className="flex-1 px-3 py-2 max-w-2xl"
        name="query"
        {...(params["searchQuery"] && { defaultValue: params["searchQuery"] })}
      />
      <Button
        type="submit"
        size="sm"
        className="bg-background text-primary hover:bg-accent min-w-[10rem] py-[0.55rem] flex h-auto"
      >
        Search
      </Button>
    </form>
  );
}
