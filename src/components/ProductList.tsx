import { Suspense } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { ShoppingCart } from "@phosphor-icons/react/dist/ssr";
import ProductCard from "./ProductCard";

export default function ProductList({
  products = [],
}: Readonly<{
  products: any;
}>) {
  return (
    <div className="gap-6 grid grid-cols-2 lg:grid-cols-5 w-full">
      {products.map((item: any) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
}
