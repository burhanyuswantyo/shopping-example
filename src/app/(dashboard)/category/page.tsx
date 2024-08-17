import ProductCardLoading from "@/components/loading/ProductCardLoading";
import ProductCard from "@/components/ProductCard";
import { Button } from "@nextui-org/button";
import { ShoppingCart } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";

async function getCategoryWithProducts(id: number) {
  const response = await fetch(
    `https://shopping-laravel.test/api/categories/${id}`,
    {
      cache: "force-cache",
      next: { revalidate: 5 },
    }
  );
  const json = await response.json();
  return json.data;
}

export default async function Category({
  searchParams,
}: Readonly<{
  searchParams: any;
}>) {
  const category = await getCategoryWithProducts(searchParams.cat);
  const products = category.products;

  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="font-bold text-2xl text-neutral-700">{category.name}</h3>
      <div className="gap-6 grid grid-cols-2 lg:grid-cols-5 w-full">
        <Suspense fallback={<ProductCardLoading count={5} />}>
          {products.map((item: any) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
