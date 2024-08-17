"use client";

import {
    getCategories,
    showProduct,
    storeProduct,
    updateProduct,
} from "@/app/action";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export default function FormProduct({ edit = null }: Readonly<{ edit: any }>) {
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();
    const { replace } = useRouter();
    const [categories, setCategories] = React.useState<any>([]);
    const [errors, setErrors] = React.useState<any>(null);
    const [form, setForm] = React.useState<any>({
        name: null,
        description: null,
        category_id: null,
        price: null,
        quantity: null,
        image: null,
    });

    useEffect(() => {
        fetchData();
    }, [edit]);

    const fetchData = async () => {
        // Ambil data kategori
        await getCategories().then((response: any) => {
            setCategories(response);
        });
        // Ambil data produk jika mempunyai parameter edit
        if (edit) {
            await showProduct(edit).then((response: any) => {
                setForm({
                    name: response.name,
                    description: response.description,
                    category_id: response.category_id.toString(),
                    price: response.price,
                    quantity: response.quantity,
                });
            });
        }
    };
    const handleSubmit = async () => {
        setLoading(true);
        const formData = new FormData();

        for (const key in form) {
            if (form[key]) {
                formData.append(key, form[key]);
            }
        }

        console.log(Object.fromEntries(formData.entries()));

        if (edit) {
            formData.append("id", edit);
            formData.append("_method", "PUT");
            await updateProduct(formData).then((response: any) => {
                if (!response.success) {
                    setErrors(response.errors);
                    return;
                }
                toast.success(response?.message || "Berhasil mengubah produk");
                const params = new URLSearchParams();
                params.delete("edit");
                replace(`${pathname}?${params.toString()}`);
                setErrors(null);
                resetForm();
            });
        } else {
            await storeProduct(formData).then((response: any) => {
                if (!response.success) {
                    setErrors(response.errors);
                    return;
                }
                toast.success(
                    response?.message || "Berhasil menambahkan produk",
                );
                setErrors(null);
                resetForm();
            });
        }
        setLoading(false);
    };

    const handleCancel = () => {
        const params = new URLSearchParams();
        resetForm();
        params.delete("edit");
        replace(`${pathname}?${params.toString()}`);
    };

    const resetForm = () => {
        formRef?.current?.reset();
        setForm({
            name: "",
            description: "",
            category_id: "",
            price: "",
            quantity: "",
            image: "",
        });
    };

    return (
        <div className="col-span-4 bg-white p-6 rounded-2xl h-fit">
            <div className="flex justify-between items-center mb-6">
                <h1 className="font-bold text-lg">{`${edit ? "Edit Produk" : "Tambah Produk"}`}</h1>
                {edit && (
                    <Button size="sm" onClick={handleCancel}>
                        Batal
                    </Button>
                )}
            </div>
            <form className="flex flex-col gap-4" ref={formRef}>
                <Input
                    value={form?.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    type="text"
                    labelPlacement="outside"
                    label="Nama Produk"
                    placeholder=" "
                    variant="bordered"
                    name="name"
                    isInvalid={errors?.name ? true : false}
                    errorMessage={errors?.name?.[0]}
                />
                <Textarea
                    value={form?.description}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                    variant="bordered"
                    label="Deskripsi"
                    name="description"
                    labelPlacement="outside"
                    isInvalid={errors?.description ? true : false}
                    errorMessage={errors?.description?.[0]}
                />
                <Select
                    selectedKeys={edit && new Set([form?.category_id])}
                    onChange={(e) =>
                        setForm({ ...form, category_id: e.target.value })
                    }
                    label="Pilih Kategori"
                    labelPlacement="outside"
                    variant="bordered"
                    placeholder=" "
                    name="category_id"
                    isInvalid={errors?.category_id ? true : false}
                    errorMessage={errors?.category_id?.[0]}
                >
                    {categories.map((category: any) => (
                        <SelectItem key={category.id}>
                            {category.name}
                        </SelectItem>
                    ))}
                </Select>
                <Input
                    value={form?.price}
                    onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                    }
                    type="text"
                    labelPlacement="outside"
                    label="Harga"
                    placeholder=" "
                    variant="bordered"
                    name="price"
                    isInvalid={errors?.price ? true : false}
                    errorMessage={errors?.price?.[0]}
                />
                <Input
                    value={form?.quantity}
                    onChange={(e) =>
                        setForm({ ...form, quantity: e.target.value })
                    }
                    type="text"
                    labelPlacement="outside"
                    label="Stok"
                    placeholder=" "
                    variant="bordered"
                    name="quantity"
                    isInvalid={errors?.quantity ? true : false}
                    errorMessage={errors?.quantity?.[0]}
                />
                <Input
                    onChange={(e) =>
                        setForm({ ...form, image: e?.target?.files?.[0] })
                    }
                    type="file"
                    labelPlacement="outside"
                    label="Gambar"
                    placeholder=" "
                    variant="bordered"
                    name="image"
                    isInvalid={errors?.image ? true : false}
                    errorMessage={errors?.image?.[0]}
                />
                <Button
                    color="success"
                    className="text-white"
                    isLoading={loading}
                    type="button"
                    onClick={handleSubmit}
                >
                    Simpan
                </Button>
            </form>
        </div>
    );
}
