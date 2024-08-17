"use server";

import axios from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function setUser(user: any) {
    // Menyimpan user ke dalam cookies dengan key "user"
    cookies().set("user", JSON.stringify(user));
    return user;
}

export async function getUser() {
    // Mengambil user dari cookies dengan key "user"
    const user = await cookies().get("user");
    if (!user) {
        // Jika user tidak ditemukan, maka mengembalikan null
        return null;
    } else {
        // Jika user ditemukan, maka mengembalikan user yang telah di-parse
        return JSON.parse(user?.value);
    }
}

export async function logout() {
    // Mengambil user dari cookies dengan key "user"
    const user = await getUser();
    // Melakukan request ke API untuk logout
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/logout`, null, {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    });

    // Menghapus cookies dengan key "user"
    cookies().delete("user");
}

export async function storeCart(data: any) {
    const response = await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
            user_id: data.user_id,
            product_id: data.product_id,
            quantity: data.quantity,
        })
        .then((response: any) => {
            // Melakukan trigger revalidateTag dengan tag "cart-count" di file HeaderProfile.tsx
            revalidateTag("cart-count");
            // Mengembalikan response.data
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            // Mengembalikan error
            return Promise.reject(error);
        });

    return response;
}

export async function updateCart(data: any) {
    const response = await axios
        .put(`${process.env.NEXT_PUBLIC_API_URL}/cart/${data.id}`, data)
        .then((response: any) => {
            // Melakukan trigger revalidateTag dengan tag "cart" & "cart-count" di file HeaderProfile.tsx
            revalidateTag("cart");
            revalidateTag("cart-count");
            // Mengembalikan response.data
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            // Mengembalikan error
            return Promise.reject(error);
        });

    return response;
}

export async function deleteCart(id: number) {
    const response = await axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/cart/${id}`)
        .then((response: any) => {
            // Melakukan trigger revalidateTag dengan tag "cart" "cart-count" di file HeaderProfile.tsx
            revalidateTag("cart");
            revalidateTag("cart-count");
            // Mengembalikan response.data
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            // Mengembalikan error
            return Promise.reject(error);
        });

    return response;
}

export async function storeOrder(data: any) {
    const response = await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, data)
        .then((response: any) => {
            // Melakukan trigger revalidateTag dengan tag "cart-count" di file HeaderProfile.tsx
            revalidateTag("cart-count");
            // Mengembalikan response.data
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            // Mengembalikan error
            return Promise.reject(error);
        });
    return response;
}

export async function updateOrder(data: any) {
    const response = await axios
        .put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${data.id}`, data)
        .then((response: any) => {
            // Melakukan trigger revalidateTag dengan tag "order" di page Order
            revalidateTag("order");
            // Mengembalikan response.data
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            // Mengembalikan error
            return Promise.reject(error);
        });
    return response;
}

export async function getCart(userId: number) {
    // Mengambil data keranjang belanja
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart?user_id=${userId}`,
        {
            next: { tags: ["cart"] },
        },
    );
    const json = await response.json();
    return json.data;
}

export async function storePayment(data: any) {
    const response = await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/payments`, data)
        .then((response: any) => {
            // Melakukan trigger revalidateTag dengan tag "order" di page Order
            revalidateTag("order");
            // Mengembalikan response.data
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            // Mengembalikan error
            return Promise.reject(error);
        });
    return response;
}

export async function getProducts({
    paginate,
    page,
    name,
}: Readonly<{ paginate: number; page: number; name: string }>) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products`
        .concat(paginate ? `?paginate=${paginate}` : "")
        .concat(page ? `&page=${page}` : "")
        .concat(name ? `&name=${name}` : "");

    const response = await fetch(url, {
        next: { tags: ["product"] },
    });
    const data = await response.json();
    return data;
}

export async function storeProduct(data: any) {
    const response = await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/products`, data)
        .then((response: any) => {
            // Melakukan trigger revalidateTag dengan tag "product" di page Product
            revalidateTag("product");
            // Mengembalikan response.data
            return {
                success: true,
                message: response.data.message,
                data: response.data,
            };
        })
        .catch((error: any) => {
            // Mengembalikan error
            return {
                success: false,
                message: error.response.data.message,
                errors: error.response.data.errors,
            };
        });

    return response;
}

export async function updateProduct(data: FormData) {
    const response = await axios
        .post(
            `${process.env.NEXT_PUBLIC_API_URL}/products/${data.get("id")}`,
            data,
        )
        .then((response: any) => {
            // Melakukan trigger revalidateTag dengan tag "product" di page Product
            revalidateTag("product");
            // Mengembalikan response.data
            return {
                success: true,
                message: response.data.message,
                data: response.data,
            };
        })
        .catch((error: any) => {
            console.log(error.response.data);
            // Mengembalikan error
            return {
                success: false,
                message: error.response.data.message,
                errors: error.response.data.errors,
            };
        });

    return response;
}

export async function showProduct(id: number) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
        {
            next: { tags: ["product"] },
        },
    );
    const json = await response.json();
    return json.data;
}

export async function deleteProduct(id: number) {
    const response = await axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
        .then((response: any) => {
            // Melakukan trigger revalidateTag dengan tag "product" di page Product
            revalidateTag("product");
            // Mengembalikan response.data
            return {
                success: true,
                message: response.data.message,
            };
        })
        .catch((error: any) => {
            // Mengembalikan error
            return {
                success: false,
                message: error.response.data.message,
            };
        });

    return response;
}

export async function getCategories() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        {
            next: { tags: ["category"] },
        },
    );
    const json = await response.json();
    return json.data;
}
