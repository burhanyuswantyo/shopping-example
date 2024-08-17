import React from "react";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { getProducts } from "@/app/action";
import ProductPagination from "./ProductPagination";
import SearchProduct from "./SearchProduct";
import ProductTableActions from "./ProductTableActions";

export default async function ProductTable({
    paginate,
    page,
    name,
}: Readonly<{ paginate: number; page: number; name: string }>) {
    const products = await getProducts({
        paginate,
        page,
        name,
    });

    return (
        <div className="col-span-8 flex flex-col gap-4 rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-lg font-bold">Data Produk</h1>
                <SearchProduct />
            </div>
            <table className="table-auto">
                <thead className="rounded-lg bg-neutral-200">
                    <tr className="">
                        <th className="rounded-l-xl px-4 py-2 text-left">
                            Produk
                        </th>
                        <th className="px-4 py-2 text-left">Kategori</th>
                        <th className="px-4 py-2 text-left">Harga</th>
                        <th className="px-4 py-2 text-left">Stok</th>
                        <th className="rounded-r-xl px-4 py-2 text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    {products?.data?.data.length > 0 ? (
                        products?.data?.data.map(
                            (product: any, index: number) => (
                                <tr
                                    key={product.id}
                                    className={
                                        index !== products.data.per_page - 1
                                            ? "border-b"
                                            : ""
                                    }
                                >
                                    <td className="px-4 py-2">
                                        <div className="flex items-center gap-4">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                width={300}
                                                height={300}
                                                className="size-12 rounded-lg object-contain"
                                            />
                                            <div className="flex w-64 flex-col overflow-hidden">
                                                <p className="truncate font-medium">
                                                    {product.name}
                                                </p>
                                                <p className="truncate text-xs">
                                                    {product.description}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        {product.category.name}
                                    </td>
                                    <td className="px-4 py-2">
                                        {Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                            maximumFractionDigits: 0,
                                        }).format(product.price)}
                                    </td>
                                    <td className="px-4 py-2">
                                        {product.quantity}
                                    </td>
                                    <td className="px-4 py-2">
                                        <ProductTableActions id={product.id} />
                                    </td>
                                </tr>
                            ),
                        )
                    ) : (
                        <tr>
                            <td
                                colSpan={5}
                                className="pt-8 text-center font-medium text-neutral-400"
                            >
                                Data tidak ditemukan
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ProductPagination
                total={products?.data?.last_page}
                initialPage={products?.data?.current_page}
            />
        </div>
    );
}
