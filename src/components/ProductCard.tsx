"use client";

import { getUser, storeCart } from "@/app/action";
import { Button } from "@nextui-org/button";
import { ShoppingCart } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function ProductCard({ item }: Readonly<{ item: any }>) {
  const { push } = useRouter();

  const handleAddToCart = async (id: number) => {
    // Mengambil user dari cookies dengan key "user"
    const user = await getUser();
    if (!user) {
      // Jika user tidak ditemukan, maka menampilkan toast "Silahkan login terlebih dahulu"
      toast("Silahkan login terlebih dahulu");
      push("/login");
    } else {
      // Jika user ditemukan, maka menambahkan produk ke keranjang
      await storeCart({
        user_id: user.user.id,
        product_id: id,
        quantity: 1,
      })
        .then(() => {
          toast.success("Berhasil menambahkan ke keranjang");
        })
        .catch(() => {
          toast.error("Gagal menambahkan ke keranjang");
        });
    }
  };

  return (
    <div className="bg-white rounded-2xl">
      <Image
        src={item.image}
        alt="image"
        width={300}
        height={300}
        className="rounded-t-xl w-full h-auto"
      />
      <div className="flex flex-col p-3">
        <p className="font-bold text-neutral-600">{item.name}</p>
        <p className="text-neutral-400 text-sm">
          {Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          }).format(item.price)}
        </p>
        <Button
          color="primary"
          isIconOnly
          className="ml-auto"
          radius="full"
          onClick={() => handleAddToCart(item.id)}
        >
          <ShoppingCart weight="bold" size={16} />
        </Button>
      </div>
    </div>
  );
}
