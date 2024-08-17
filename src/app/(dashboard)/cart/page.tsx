import { getUser } from "@/app/action";
import CartItem from "@/components/CartItem";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import Link from "next/link";
import React from "react";

async function getCart(userId: number) {
  // Mengambil data keranjang belanja
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cart?user_id=${userId}`,
    {
      next: { tags: ["cart"] },
    }
  );
  const json = await response.json();
  return json.data;
}

export default async function Cart() {
  const user = await getUser();
  const carts = await getCart(user.user.id);
  const totalAmount = carts?.reduce(
    (acc: number, cart: any) => acc + cart.product.price * cart.quantity,
    0
  );

  return (
    <div className="flex flex-col items-center gap-6 bg-white p-8 rounded-2xl w-full max-w-2xl">
      {carts ? (
        <>
          <div className="flex flex-col items-center gap-2">
            <h1 className="font-bold text-3xl">Keranjang Belanja</h1>
            <p className="text-lg">
              Lihat produk yang sudah Anda tambahkan ke keranjang belanja
            </p>
          </div>
          <div className="flex flex-col gap-6 w-full">
            {carts.map((cart: any) => (
              <CartItem key={cart.id} cart={cart} />
            ))}
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
          <Divider />
          <div className="flex justify-between w-full">
            <Button
              size="lg"
              as={Link}
              href="/"
              color="warning"
              className="text-white"
            >
              Lanjut Belanja
            </Button>
            <Button as={Link} href="/cart/checkout" size="lg" color="primary">
              Checkout
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <h1 className="font-bold text-3xl">Keranjang Belanja</h1>
          <p className="text-lg">Keranjang belanja Anda kosong</p>
        </div>
      )}
    </div>
  );
}
