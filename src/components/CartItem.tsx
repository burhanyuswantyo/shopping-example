"use client";

import { deleteCart, updateCart } from "@/app/action";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Divider } from "@nextui-org/divider";
import { Minus, Plus, Trash } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import React from "react";

export default function CartItem({ cart }: Readonly<{ cart: any }>) {
  const handleDelete = async (id: number) => {
    await deleteCart(id);
  };

  const handleMinus = async (id: number) => {
    if (cart.quantity === 1) {
      return handleDelete(cart.id);
    } else {
      await updateCart({
        id: id,
        quantity: cart.quantity - 1,
      });
    }
  };

  const handlePlus = async (id: number) => {
    await updateCart({
      id: id,
      quantity: cart.quantity + 1,
    });
  };

  return (
    <div className="flex justify-between items-center bg-neutral-100 p-4 rounded-xl w-full">
      <div className="flex gap-4">
        <div className="bg-neutral-200 rounded-xl w-16 h-16">
          <Image
            src={cart.product.image}
            alt={cart.product.name}
            height={300}
            width={300}
            className="rounded-xl object-cover size-16"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold">{cart.product.name}</h1>
          <p className="text-sm">
            {Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(cart.product.price * cart.quantity)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 h-full">
        <Button
          isIconOnly
          className="flex bg-neutral-200"
          onClick={() => handleDelete(cart.id)}
        >
          <Trash weight="bold" size={16} className="m-auto text-red-500" />
        </Button>
        <Button
          isIconOnly
          className="flex bg-neutral-200"
          onClick={() => handleMinus(cart.id)}
        >
          <Minus weight="bold" size={16} className="m-auto" />
        </Button>
        <p className="font-medium text-lg">{cart.quantity}</p>
        <Button
          isIconOnly
          className="flex bg-neutral-200"
          onClick={() => handlePlus(cart.id)}
        >
          <Plus weight="bold" size={16} className="m-auto" />
        </Button>
      </div>
    </div>
  );
}
