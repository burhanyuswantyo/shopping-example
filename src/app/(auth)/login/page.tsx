"use client";

import { setUser } from "@/app/action";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [errors, setErrors] = useState(null);
  const { push } = useRouter();
  const handleSubmit = async (formData: FormData) => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(async (response: any) => {
        console.log(response);
        // await setUser(response?.data);
        // push("/");
        toast.success(response?.message || "Berhasil login");
      })
      .catch((error: any) => {
        toast.error(error?.response?.data.message || "Gagal login");
        setErrors(error?.response?.data.errors);
      });
  };

  return (
    <div className="flex flex-col gap-4 bg-white shadow-sm p-10 rounded-2xl">
      <div className="space-y-4">
        <h1 className="font-bold text-2xl text-center text-neutral-500">
          Selamat datang di Shopping
        </h1>
        <p className="font-medium text-center text-neutral-300 text-sm">
          Silahkan masuk untuk melanjutkan
        </p>
      </div>
      <form className="flex flex-col gap-6" action={handleSubmit}>
        <Input
          labelPlacement="outside"
          placeholder=" "
          type="email"
          label="Email"
          name="email"
          isInvalid={errors?.email ? true : false}
          errorMessage={errors?.email?.[0]}
        />
        <Input
          labelPlacement="outside"
          placeholder=" "
          type="password"
          label="Password"
          name="password"
          isInvalid={errors?.password ? true : false}
          errorMessage={errors?.password?.[0]}
        />
        <ButtonLogin />
      </form>
      <p className="text-center text-neutral-400 text-sm">
        Belum punya akun?
        <Link className="ml-1 font-medium text-blue-500" href={"/register"}>
          Daftar
        </Link>
      </p>
    </div>
  );
}

function ButtonLogin() {
  const { pending } = useFormStatus();
  return (
    <Button color="primary" size="lg" isLoading={pending} type="submit">
      Masuk
    </Button>
  );
}
