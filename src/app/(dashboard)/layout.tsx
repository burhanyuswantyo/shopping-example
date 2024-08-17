import HeaderCategory from "@/components/HeaderCategory";
import HeaderSearch from "@/components/HeaderSearch";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import { getUser } from "../action";
import HeaderProfile from "@/components/HeaderProfile";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <main className="flex flex-col items-center bg-slate-100 min-h-screen">
      <div className="flex bg-white p-4 border-b-2 border-b-slate-100 w-full">
        <div className="flex justify-between items-center gap-10 m-auto w-full max-w-7xl">
          <Link href={"/"}>
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={300}
              height={300}
              className="w-auto h-6"
            />
          </Link>
          <HeaderSearch />
          {user ? (
            <HeaderProfile user={user} />
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
        <HeaderCategory />
      </div>
      <div className="flex justify-center p-8 w-full">{children}</div>
    </main>
  );
}
