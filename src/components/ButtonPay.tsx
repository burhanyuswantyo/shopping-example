"use client";

import { storePayment } from "@/app/action";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ButtonPay({ order }: { order: any }) {
  const [loading, setLoading] = useState(false);
  const paymentMethod = ["credit card", "bank transfer", "paypal"];

  const handlePay = async () => {
    setLoading(true);
    await storePayment({
      order_id: order.id,
      amount: order.total_amount,
      status: "successfull",
      payment_method:
        paymentMethod[Math.floor(Math.random() * paymentMethod.length)],
      payment_date: getDateNow(),
    }).then(() => {
      toast.success("Pembayaran berhasil");
    });
    setLoading(false);
  };

  return (
    <Button
      isLoading={loading}
      color="success"
      className="text-white"
      onClick={handlePay}
    >
      Bayar
    </Button>
  );
}

function getDateNow() {
  // YYYY-MM-DD HH:mm:ss
  const now = new Date();

  return (
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0") +
    " " +
    String(now.getHours()).padStart(2, "0") +
    ":" +
    String(now.getMinutes()).padStart(2, "0") +
    ":" +
    String(now.getSeconds()).padStart(2, "0")
  );
}
