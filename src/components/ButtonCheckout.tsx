"use client";

import { storeOrder } from "@/app/action";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function ButtonCheckout({
  user,
  carts,
}: {
  user: any;
  carts: any;
}) {
  const { push } = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    let totalAmount = carts.reduce(
      (acc: number, cart: any) => acc + cart.product.price * cart.quantity,
      0
    );

    await storeOrder({
      user_id: user.user.id,
      total_amount: totalAmount,
      shipping_address: user.user.address,
      status: "pending",
      payment_status: "unpaid",
    }).then(() => {
      push("/order");
    });
    setLoading(false);
  };

  return (
    <Button
      size="lg"
      color="primary"
      isLoading={loading}
      onClick={handleCheckout}
    >
      Checkout
    </Button>
  );
}
