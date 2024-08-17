"use client";

import { Input } from "@nextui-org/input";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function HeaderSearch() {
  const { push } = useRouter();
  const [query, setQuery] = React.useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const query = e.currentTarget.value;
      query === "" ? push(`/product`) : push(`/search?query=${query}`);
      setQuery("");
    }
  };

  return (
    <Input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Cari produk"
      label=""
      variant="bordered"
      startContent={
        <MagnifyingGlass weight="bold" size={16} className="text-neutral-400" />
      }
      onKeyDown={handleSearch}
    />
  );
}
