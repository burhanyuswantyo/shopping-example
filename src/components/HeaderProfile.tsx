import { Badge } from "@nextui-org/badge";
import { Button } from "@nextui-org/button";
import { ShoppingCart } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import DropdownProfile from "./DropdownProfile";
import Link from "next/link";

async function getCartCount(user: any) {
  // Mengambil jumlah produk di keranjang, dengan user_id yang diambil dari user.id
  // Tags "cart-count" digunakan untuk trigger revalidatePath di file action.ts agar data dapat di-revalidate
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cart/get-count/${user.user.id}`,
    {
      next: { tags: ["cart-count"] },
    }
  );
  const json = await response.json();
  return json.data;
}

export default async function HeaderProfile({ user }: Readonly<{ user: any }>) {
  const cartCount = getCartCount(user);

  return (
    <div className="flex gap-4">
      <Badge content={cartCount} shape="circle" color="danger">
        <Button isIconOnly variant="light" radius="full" as={Link} href="/cart">
          <ShoppingCart size={24} />
        </Button>
      </Badge>
      <DropdownProfile user={user} />
    </div>
  );
}
