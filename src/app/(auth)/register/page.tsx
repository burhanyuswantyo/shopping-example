import { metadata } from "@/app/layout";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import {
  CaretLeft,
  EnvelopeSimple,
  LockSimple,
  Mailbox,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
  metadata.title = "Daftar";

  return (
    <main className="flex flex-col items-center bg-slate-100 min-h-screen">
      <div className="flex bg-white p-4 border-b w-full">
        <div className="flex justify-between items-center m-auto w-full max-w-7xl">
          <Link href={"/"}>
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={0}
              height={0}
              className="w-auto h-6"
            />
          </Link>
        </div>
      </div>
      <div className="m-auto w-full max-w-sm">
        <Link
          href={"/"}
          className="flex items-center gap-1 mb-4 text-blue-500 text-sm"
        >
          <CaretLeft size={16} /> Kembali
        </Link>
        <div className="flex flex-col gap-4 bg-white shadow-sm p-10 rounded-2xl">
          <div className="space-y-4">
            <h1 className="font-bold text-2xl text-center text-neutral-500">
              Selamat datang di Shopping
            </h1>
            <p className="font-medium text-center text-neutral-300 text-sm">
              Silahkan daftar akun baru
            </p>
          </div>
          <form className="flex flex-col gap-6">
            <Input
              labelPlacement="outside"
              type="text"
              label="Nama"
              placeholder=" "
            />
            <Input
              labelPlacement="outside"
              type="email"
              label="Email"
              placeholder=" "
            />
            <Input
              labelPlacement="outside"
              type="text"
              label="Nomor Handphone"
              placeholder=" "
              startContent={
                <span className="text-neutral-400 text-sm">+62</span>
              }
            />
            <Textarea labelPlacement="outside" label="Alamat" />
            <Input
              labelPlacement="outside"
              type="password"
              label="Password"
              placeholder=" "
            />
            <Button color="primary" size="lg">
              Daftar
            </Button>
          </form>
          <p className="text-center text-neutral-400 text-sm">
            Sudah punya akun?
            <Link className="ml-1 font-medium text-blue-500" href={"/login"}>
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
