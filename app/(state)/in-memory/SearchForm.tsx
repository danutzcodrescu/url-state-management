import React from "react";
import { Input } from "../../../src/components/ui/Input";
import { Button } from "../../../src/components/ui/Button";
import { useSmartPhoneState } from "@/src/store/filters";

export function SearchForm() {
  const setQuery = useSmartPhoneState((state) => state.setQuery);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query") as string;
    setQuery(query);
  }
  return (
    <form className="items-center gap-4 flex" onSubmit={handleSubmit}>
      <Input
        placeholder="Search for smartphones"
        className="flex-1 px-3 py-2 max-w-2xl"
        name="query"
      />
      <Button
        type="submit"
        size="lg"
        className="bg-background text-primary hover:bg-accent min-w-[10rem] py-[0.55rem] flex h-auto"
      >
        Search
      </Button>
    </form>
  );
}
