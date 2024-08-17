"use client";

import { deleteProduct } from "@/app/action";
import { Button } from "@nextui-org/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ProductTableActions({ id }: Readonly<{ id: number }>) {
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleEdit = () => {
        const params = new URLSearchParams(searchParams);
        params.set("edit", id.toString());
        replace(`${pathname}?${params.toString()}`);
    };

    const handleDelete = async () => {
        setLoading(true);
        await deleteProduct(id)
            .then((response: any) => {
                toast.success(response?.message || "Berhasil menghapus produk");
            })
            .catch((error: any) => {
                toast.error(
                    error?.response?.data.message || "Gagal menghapus produk",
                );
            });
        setLoading(false);
    };

    return (
        <div className="flex justify-end gap-1">
            <Button
                isLoading={loading}
                size="sm"
                color="primary"
                onClick={handleEdit}
            >
                Edit
            </Button>
            <Button
                isLoading={loading}
                size="sm"
                color="danger"
                onClick={handleDelete}
            >
                Hapus
            </Button>
        </div>
    );
}
