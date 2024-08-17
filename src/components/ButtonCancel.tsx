"use client";

import { updateOrder } from "@/app/action";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ButtonCancel({ order }: { order: any }) {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    await updateOrder({
      id: order.id,
      status: "cancelled",
    }).then(() => {
      toast.success("Pesanan dibatalkan");
    });
    setLoading(false);
  };

  return (
    <Button isLoading={loading} className="text-white" onClick={handleCancel}>
      Batalkan
    </Button>
  );
}
