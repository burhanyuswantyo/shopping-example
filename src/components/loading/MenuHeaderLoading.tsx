import { Skeleton } from "@nextui-org/skeleton";
import React from "react";

export default function MenuHeaderLoading() {
  return [...Array(5)].map((item: any, index: number) => (
    <Skeleton key={index} className="rounded-2xl w-56 h-64" />
  ));
}
