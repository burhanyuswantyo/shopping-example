import { getCart, getUser } from "@/app/action";
import ButtonCheckout from "@/components/ButtonCheckout";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input, Textarea } from "@nextui-org/input";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { Skeleton } from "@nextui-org/skeleton";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";

export default async function Checkout() {
  const user = await getUser();
  const carts = await getCart(user.user.id);
  const totalAmount = carts.reduce(
    (acc: number, cart: any) => acc + cart.product.price * cart.quantity,
    0
  );

  return (
    <div className="flex flex-col gap-6 bg-white p-8 rounded-2xl w-full max-w-2xl">
      <Suspense>
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-bold text-3xl">Checkout</h1>
          <p className="text-lg">
            Periksa kembali pesanan Anda sebelum melanjutkan ke pembayaran
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">Detail Penerima</h2>
          <div className="flex flex-col gap-4">
            <div className="gap-4 grid grid-cols-2">
              <Input
                isReadOnly
                label="Nama Penerima"
                labelPlacement="outside"
                value={user?.user?.name}
              />
              <Input
                isReadOnly
                label="Nomor Telepon"
                labelPlacement="outside"
                value={user?.user?.phone}
              />
            </div>
            <Textarea
              isReadOnly
              label="Alamat"
              labelPlacement="outside"
              value={user?.user?.address}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="font-semibold text-lg">Barang</h2>
          <div className="flex flex-col gap-6 w-full">
            {carts.map((cart: any) => (
              <>
                <div className="flex items-center gap-4">
                  <div className="bg-neutral-200 rounded-xl w-16 h-16">
                    <Image
                      src={cart.product.image}
                      alt={cart.product.name}
                      height={300}
                      width={300}
                      className="rounded-xl max-w-none object-cover size-16"
                    />
                  </div>
                  <div className="flex justify-between items-center gap-2 w-full">
                    <div className="flex flex-col">
                      <h1 className="font-semibold">{cart.product.name}</h1>
                      <p className="text-sm">
                        {`${cart.quantity} x `}
                        {Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: 0,
                        }).format(cart.product.price)}
                      </p>
                    </div>
                    <p className="text-sm">
                      {Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                      }).format(cart.product.price * cart.quantity)}
                    </p>
                  </div>
                </div>
                <Divider />
              </>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-8 bg-neutral-100 p-4 rounded-xl w-full">
          <h1 className="font-bold text-lg">Total</h1>
          <p className="ml-auto">{`${carts.length} Barang`}</p>
          <p className="font-bold">
            {Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(totalAmount)}
          </p>
        </div>
      </Suspense>
      <div className="flex justify-end w-full">
        <ButtonCheckout user={user} carts={carts} />
      </div>
    </div>
  );
}
