import React from "react";
import FormProduct from "@/components/FormProduct";
import ProductTable from "@/components/ProductTable";

export default async function Admin({
    searchParams,
}: Readonly<{
    searchParams: any;
}>) {
    return (
        <div className="gap-6 grid grid-cols-12">
            <FormProduct edit={searchParams.edit} />
            <ProductTable
                paginate={8}
                page={searchParams.page}
                name={searchParams.name}
            />
        </div>
    );
}
