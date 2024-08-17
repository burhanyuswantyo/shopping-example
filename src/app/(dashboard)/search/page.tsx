import ProductCardLoading from "@/components/loading/ProductCardLoading";
import ProductCard from "@/components/ProductCard";
import React, { Suspense } from "react";

async function getProducts(query: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?name=${query}`,
    {
      cache: "force-cache",
      next: { revalidate: 5 },
    }
  );
  const json = await response.json();
  return json.data;
}

export default async function Search({ searchParams }: { searchParams: any }) {
  const products = await getProducts(searchParams.query);

  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="font-bold text-2xl text-neutral-700">
        {`Pencarian untuk "${searchParams.query}" ${
          products ? "" : "tidak ditemukan."
        }`}
      </h3>
      {products && (
        <div className="gap-6 grid grid-cols-2 lg:grid-cols-5 w-full">
          <Suspense fallback={<ProductCardLoading count={5} />}>
            {products.map((item: any) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </Suspense>
        </div>
      )}
    </div>
  );
}
