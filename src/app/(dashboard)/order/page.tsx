import { getUser } from "@/app/action";
import ButtonCancel from "@/components/ButtonCancel";
import ButtonPay from "@/components/ButtonPay";
import ButtonRefund from "@/components/ButtonRefund";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import React from "react";

async function getOrders(userId: number) {
  // Mengambil data pesanan
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders?user_id=${userId}`,
    {
      next: { tags: ["order"] },
    }
  );
  const json = await response.json();
  return json.data;
}

export default async function Order() {
  const user = await getUser();
  const orders = await getOrders(user.user.id);

  return (
    <div className="flex flex-col gap-6 bg-white p-8 rounded-2xl w-full max-w-2xl">
      {orders ? (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col items-center gap-2">
            <h1 className="font-bold text-3xl">Pesanan Saya</h1>
            <p className="text-lg">Lihat pesanan Anda</p>
          </div>
          <div className="flex flex-col gap-6 w-full">
            {orders.map((order: any) => (
              <div className="flex flex-col justify-between gap-6 bg-neutral-100 p-4 rounded-xl w-full">
                <div className="flex justify-between items-center gap-2 w-full">
                  <h1 className="font-semibold text-lg">{`Pesanan #${order.id}`}</h1>
                  <OrderStatus
                    status={order.status}
                    paymentStatus={order.payment_status}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  {order.order_items.map((orderItems: any, index: number) => (
                    <>
                      <div className="flex items-end gap-6 w-full">
                        <div className="flex flex-col">
                          <h2 className="font-semibold">
                            {orderItems.product.name}
                          </h2>
                          <p className="text-sm">
                            {`${orderItems.quantity} x `}
                            {Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0,
                            }).format(orderItems.price)}
                          </p>
                        </div>
                        <p className="ml-auto font-semibold text-sm">
                          {Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            maximumFractionDigits: 0,
                          }).format(orderItems.price * orderItems.quantity)}
                        </p>
                      </div>
                      <Divider />
                    </>
                  ))}
                  <div className="flex justify-end items-center gap-8 w-full">
                    <h1 className="font-bold text-lg">Total</h1>
                    <p className="font-bold">
                      {Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                      }).format(
                        order.order_items.reduce(
                          (acc: number, orderItems: any) =>
                            acc + orderItems.price * orderItems.quantity,
                          0
                        )
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-sm">
                      <span className="font-semibold">Tanggal pembelian: </span>
                      <br />
                      {Intl.DateTimeFormat("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZoneName: "short",
                      }).format(new Date(order.created_at))}
                    </p>
                    {order.status === "pending" && (
                      <div className="flex gap-2">
                        <ButtonCancel order={order} />
                        <ButtonPay order={order} />
                      </div>
                    )}
                    {order.status === "completed" &&
                      order.payment_status !== "refunded" && (
                        <ButtonRefund order={order} />
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <h1 className="font-bold text-3xl">Pesanan Saya</h1>
          <p className="text-lg">Anda tidak mempunyai pesanan apapun</p>
        </div>
      )}
    </div>
  );
}

function OrderStatus({
  status,
  paymentStatus,
}: Readonly<{ status: string; paymentStatus: string }>) {
  // status : "pending" | "completed" | "cancelled"
  // paymentStatus : "unpaid" | "paid" | "refunded"

  if (status === "pending") {
    if (paymentStatus === "unpaid") {
      return (
        <Chip color="warning" className="text-white">
          Belum Dibayar
        </Chip>
      );
    } else if (paymentStatus === "paid") {
      return <Chip color="primary">Sudah Dibayar</Chip>;
    }
  } else if (status === "completed") {
    if (paymentStatus === "refunded") {
      return (
        <Chip color="warning" className="text-white">
          Dikembalikan
        </Chip>
      );
    } else if (paymentStatus === "paid") {
      return (
        <Chip color="success" className="text-white">
          Selesai
        </Chip>
      );
    }
  } else if (status === "cancelled") {
    return <Chip color="danger">Dibatalkan</Chip>;
  }
}
