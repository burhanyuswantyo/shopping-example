import ProductCardLoading from "@/components/loading/ProductCardLoading";
import ProductList from "@/components/ProductList";
import ProductPagination from "@/components/ProductPagination";
import React, { Suspense } from "react";

async function getProducts(query: { paginate: number; page: number }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?paginate=${"10"}&page=${
      query.page
    }`,
    { cache: "force-cache", next: { revalidate: 5 } }
  );
  const json = await response.json();
  return json.data;
}

export default async function Product({
  searchParams,
}: Readonly<{ searchParams: any }>) {
  const products = await getProducts(searchParams);

  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="font-bold text-2xl text-neutral-700">Semua Produk</h3>
      <Suspense
        fallback={
          <div className="gap-6 grid grid-cols-2 lg:grid-cols-5 w-full">
            <ProductCardLoading count={5} />
          </div>
        }
      >
        <ProductList products={products?.data} />
        <ProductPagination
          total={products.last_page}
          initialPage={products.current_page}
        />
      </Suspense>
    </div>
  );
}
