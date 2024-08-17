import React, { Suspense } from "react";
import ProductCardLoading from "./loading/ProductCardLoading";
import { Button } from "@nextui-org/button";
import { ShoppingCart } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import ProductCard from "./ProductCard";

async function getLatestProducts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?limit=5`,
    { cache: "force-cache", next: { revalidate: 5 } }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();
  return json.data;
}

export default async function LatestProducts() {
  const latestProducts = await getLatestProducts();

  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="font-bold text-2xl text-neutral-700">Produk Terbaru</h3>
      <div className="gap-6 grid grid-cols-2 lg:grid-cols-5 w-full">
        <Suspense fallback={<ProductCardLoading count={5} />}>
          {latestProducts.map((item: any) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
