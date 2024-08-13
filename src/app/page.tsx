"use client";

import { Badge } from "@nextui-org/badge";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Input } from "@nextui-org/input";
import { MagnifyingGlass, ShoppingCart } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const isLogin = false;

  useEffect(() => {
    getProducts();
  }, []);

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("Search");
    }
  };

  const getProducts = async () => {
    const response = await fetch("https://shopping-laravel.test/api/products");
    const data = await response.json();
    console.log(data);
  };

  return (
    <main className="flex flex-col items-center bg-slate-100 min-h-screen">
      <div className="flex bg-white p-4 border-b-2 border-b-slate-100 w-full">
        <div className="flex justify-between items-center gap-10 m-auto w-full max-w-7xl">
          <Link href={"/"}>
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={0}
              height={0}
              className="w-auto h-6"
            />
          </Link>
          <Input
            placeholder="Cari produk"
            label=""
            variant="bordered"
            startContent={
              <MagnifyingGlass
                weight="bold"
                size={16}
                className="text-neutral-400"
              />
            }
            onKeyDown={handleSearch}
          />
          {isLogin ? (
            <div className="flex gap-4">
              <Badge content="8" shape="circle" color="danger">
                <Button isIconOnly variant="light" radius="full">
                  <ShoppingCart size={24} />
                </Button>
              </Badge>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="light">Burhan Yuswantyo</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem>Pesanan Saya</DropdownItem>
                  <DropdownItem className="text-danger" color="danger">
                    Keluar
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button as={Link} href={"/login"} variant="bordered">
                Masuk
              </Button>
              <Button as={Link} href={"/register"} color="primary">
                Daftar
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center bg-white p-4 w-full">
        <div className="flex gap-8 max-w-7xl">
          <Link href={"#"}>Category 1</Link>
          <Link href={"#"}>Category 2</Link>
          <Link href={"#"}>Category 3</Link>
          <Link href={"#"}>Category 4</Link>
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 py-8 w-full max-w-7xl">
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-bold text-3xl">Welcome to Shopping</h1>
          <p className="text-lg">The best place to shop online</p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h3 className="font-bold text-2xl text-neutral-700">
            Produk Terbaru
          </h3>
          <div className="gap-6 grid grid-cols-2 lg:grid-cols-5 w-full">
            {[...Array(5)].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl">
                <Image
                  src="/images/placeholder-image.svg"
                  alt="Product 1"
                  width={0}
                  height={0}
                  className="rounded-t-xl w-full h-auto"
                />
                <div className="flex flex-col p-3">
                  <p className="font-bold text-neutral-600">Product x</p>
                  <p className="text-neutral-400 text-sm">$10.00</p>
                  <Button
                    color="primary"
                    isIconOnly
                    className="ml-auto"
                    radius="full"
                  >
                    <ShoppingCart weight="bold" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="gap-6 grid grid-cols-1 lg:grid-cols-3 w-full">
          {[...Array(3)].map((item, index) => (
            <Link
              key={index}
              href={"#"}
              className="flex bg-white hover:bg-white/80 hover:shadow-md p-4 rounded-2xl h-36 duration-300"
            >
              <p className="m-auto font-bold text-2xl text-center text-neutral-600">
                Category x
              </p>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h3 className="font-bold text-2xl text-neutral-700">
            Produk Terlaris
          </h3>
          <div className="gap-6 grid grid-cols-2 lg:grid-cols-5 w-full">
            {[...Array(5)].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl">
                <Image
                  src="/images/placeholder-image.svg"
                  alt="Product 1"
                  width={0}
                  height={0}
                  className="rounded-t-xl w-full h-auto"
                />
                <div className="flex flex-col p-3">
                  <p className="font-bold text-neutral-600">Product x</p>
                  <p className="text-neutral-400 text-sm">$10.00</p>
                  <Button
                    color="primary"
                    isIconOnly
                    className="ml-auto"
                    radius="full"
                  >
                    <ShoppingCart weight="bold" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
