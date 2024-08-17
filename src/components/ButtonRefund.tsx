"use client";

import { updateOrder } from "@/app/action";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ButtonRefund({ order }: { order: any }) {
  const [loading, setLoading] = useState(false);

  const handleRefund = async () => {
    setLoading(true);
    await updateOrder({
      id: order.id,
      status: "completed",
      payment_status: "refunded",
    }).then(() => {
      toast.success("Pesanan dibatalkan");
    });
    setLoading(false);
  };

  return (
    <Button
      color="danger"
      isLoading={loading}
      className="text-white"
      onClick={handleRefund}
    >
      Refund
    </Button>
  );
}
