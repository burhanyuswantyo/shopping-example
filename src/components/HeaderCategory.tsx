import Link from "next/link";
import React, { Suspense } from "react";
import MenuHeaderLoading from "./loading/MenuHeaderLoading";

async function getHeaderCategories() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories?limit=3`,
    {
      cache: "force-cache",
    }
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();
  return json.data;
}

export default async function HeaderCategory() {
  const headerCategories = await getHeaderCategories();

  return (
    <Suspense fallback={<MenuHeaderLoading />}>
      <div className="flex gap-8 max-w-7xl">
        <Link href={`/product`} className="font-semibold">
          Semua Produk
        </Link>
        {headerCategories.map((item: any) => (
          <Link key={item.id} href={`/category?cat=${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </Suspense>
  );
}
