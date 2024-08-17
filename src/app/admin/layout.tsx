import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="flex flex-col items-center bg-slate-100 min-h-screen">
            <div className="flex bg-white p-4 border-b w-full">
                <div className="flex justify-between items-center m-auto w-full max-w-7xl">
                    <Link href={"/"}>
                        <Image
                            src="/images/logo.svg"
                            alt="Logo"
                            width={300}
                            height={300}
                            className="w-auto h-6"
                        />
                    </Link>
                </div>
            </div>
            <div className="mx-auto p-8 w-full">{children}</div>
        </main>
    );
}
