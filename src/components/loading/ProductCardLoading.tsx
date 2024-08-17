import { Skeleton } from "@nextui-org/skeleton";
import React from "react";

export default function ProductCardLoading({ count = 1 }: { count?: number }) {
  return [...Array(count)].map((item: any, index: number) => (
    <Skeleton key={index} className="rounded-2xl w-full h-64" />
  ));
}
