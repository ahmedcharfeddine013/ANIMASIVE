"use client";
import React, { Suspense, useEffect, useState } from "react";
import NewCollection from "../../../components/NewCollection";
import { cache } from "@/lib/cache";
import db from "@/db/db";
import { Product } from "@prisma/client";
import ShopProducts from "./_components/ShopProducts";

// const getProducts = cache(() => {
//   return db.product.findMany({
//     where: { isAvailableForPurchase: true },
//     orderBy: { name: "asc" },
//   });
// }, ["/products", "getProducts"]);



const ShopPage = () => {
  return (
    <div>
      <NewCollection />
      <div className="flex flex-col items-center justify-center">
        <h1 className="pt-20 text-3xl">SHOP</h1>
      </div>
      <ShopProducts />
    </div>
  );
};

export default ShopPage;

// async function ProductsSuspense() {
//   const products = await getProducts();
//   return products.map((product) => (
//     <ShopProductCard key={product.id} {...product} />
//   ));
// }
