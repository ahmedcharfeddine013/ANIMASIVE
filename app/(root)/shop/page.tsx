"use client";
import React, { Suspense, useEffect, useState } from "react";
import NewCollection from "../../../components/NewCollection";
import { cache } from "@/lib/cache";
import db from "@/db/db";
import { Product } from "@prisma/client";
import ShopProductCard, {
  ProductCardSkeleton,
} from "./_components/ShopProductCard";

const getProducts = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "asc" },
  });
}, ["/products", "getProducts"]);

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <NewCollection />
      <div className="flex flex-col items-center justify-center">
        <h1 className="pt-20 text-3xl">SHOP</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-20">
        {isLoading ? (
          <>
            {/* <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton /> */}
            <p>Loading...</p>
          </>
        ) : (
          products.map((product) => (
            <ShopProductCard key={product.id} {...product} />
          ))
        )}
      </div>
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
