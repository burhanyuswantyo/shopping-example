"use client";

import { Pagination } from "@nextui-org/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProductPagination({
    total,
    initialPage,
}: Readonly<{
    total: number;
    initialPage: number;
}>) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (page: string) => {
        const params = new URLSearchParams(searchParams);
        if (page) {
            params.set("page", page);
        } else {
            params.delete("page");
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Pagination
            className="mx-auto mt-2"
            size="lg"
            isCompact
            showControls
            total={total}
            initialPage={initialPage}
            classNames={{
                item: "bg-white",
                next: "bg-white",
                prev: "bg-white",
            }}
            onChange={(page) => handleSearch(page.toString())}
        />
    );
}
