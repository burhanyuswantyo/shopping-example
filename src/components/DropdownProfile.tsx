"use client";

import { logout } from "@/app/action";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import React from "react";

export default function DropdownProfile({ user }: Readonly<{ user: any }>) {
  const { refresh, push } = useRouter();

  const handleLogout = async () => {
    await logout();
    refresh();
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light">{user?.user?.name}</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={() => push("/order")}>Pesanan Saya</DropdownItem>
        <DropdownItem
          className="text-danger"
          color="danger"
          onClick={handleLogout}
        >
          Keluar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
