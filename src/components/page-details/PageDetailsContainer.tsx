import React from "react";

interface Props {
  title: string;
  subtitle: string;
}

export function PageDetailsContainer({ title, subtitle }: Props) {
  return (
    <div className="py-10">
      <h2 className="text-4xl font-bold tracking-tight mb-3">{title}</h2>
      <p className="text-lg tracking-tighter">{subtitle}</p>
    </div>
  );
}
