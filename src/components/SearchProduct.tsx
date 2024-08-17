"use client";

import { Input } from "@nextui-org/input";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

export default function SearchProduct() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((name: string) => {
        const params = new URLSearchParams(searchParams);
        if (name) {
            params.set("name", name);
        } else {
            params.delete("name");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 500);

    return (
        <Input
            onClear={() => {
                handleSearch("");
            }}
            className="w-1/3"
            defaultValue={searchParams.name}
            onChange={(e: any) => handleSearch(e.target.value)}
            isClearable
            placeholder="Cari produk"
            label=""
            variant="bordered"
            startContent={
                <MagnifyingGlass
                    weight="bold"
                    size={16}
                    className="text-neutral-400"
                />
            }
        />
    );
}
