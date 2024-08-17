"use client";

import { createUser } from "@/app/action";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export default function Register() {
  const [errors, setErrors] = useState();
  const { push } = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response: any) => {
        toast.success(response?.message || "Berhasil mendaftar");
        push("/login");
      })
      .catch((error: any) => {
        setErrors(error?.response?.data?.errors);
      });
  };

  return (
    <div className="flex flex-col gap-4 bg-white shadow-sm p-10 rounded-2xl">
      <div className="space-y-4">
        <h1 className="font-bold text-2xl text-center text-neutral-500">
          Selamat datang di Shopping
        </h1>
        <p className="font-medium text-center text-neutral-300 text-sm">
          Silahkan daftar akun baru
        </p>
      </div>
      <form className="flex flex-col gap-6" action={handleSubmit}>
        <Input
          labelPlacement="outside"
          type="text"
          label="Nama"
          placeholder=" "
          name="name"
          isInvalid={errors?.name ? true : false}
          errorMessage={errors?.name?.[0]}
        />
        <Input
          labelPlacement="outside"
          type="email"
          label="Email"
          placeholder=" "
          name="email"
          isInvalid={errors?.email ? true : false}
          errorMessage={errors?.email?.[0]}
        />
        <Input
          labelPlacement="outside"
          type="text"
          label="Nomor Handphone"
          placeholder=" "
          startContent={<span className="text-neutral-400 text-sm">+62</span>}
          name="phone"
          isInvalid={errors?.phone ? true : false}
          errorMessage={errors?.phone?.[0]}
        />
        <Textarea
          labelPlacement="outside"
          label="Alamat"
          name="address"
          isInvalid={errors?.address ? true : false}
          errorMessage={errors?.address?.[0]}
        />
        <Input
          labelPlacement="outside"
          type="password"
          label="Password"
          placeholder=" "
          name="password"
          isInvalid={errors?.password ? true : false}
          errorMessage={errors?.password?.[0]}
        />
        <ButtonRegister />
      </form>
      <p className="text-center text-neutral-400 text-sm">
        Sudah punya akun?
        <Link className="ml-1 font-medium text-blue-500" href={"/login"}>
          Masuk
        </Link>
      </p>
    </div>
  );
}

function ButtonRegister() {
  const { pending } = useFormStatus();
  return (
    <Button color="primary" size="lg" isLoading={pending} type="submit">
      Daftar
    </Button>
  );
}
