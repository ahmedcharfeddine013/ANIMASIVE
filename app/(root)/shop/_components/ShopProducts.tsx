import db from "@/db/db";
import { cache } from "@/lib/cache";
import React, { Suspense } from "react";
import ShopProductCard, { ProductCardSkeleton } from "./ShopProductCard";

// const getProducts = cache(
//   () => {
//     return db.product.findMany({
//       where: { isAvailableForPurchase: true },
//       orderBy: { name: "asc" },
//     });
//   },
//   ["/", "getproducts"],
//   { revalidate: 60 * 60 * 24 }
// );

function getProducts() {
  return  db.product.findMany({
    where: { isAvailableForPurchase: true },
  })
}

export default function ShopProducts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-20">
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductsSuspense />
      </Suspense>
    </div>
  );
}

async function ProductsSuspense() {
  const products = await getProducts();
  if (products == null) return <p>Azeby</p>
  return products.map((product) => (
    <ShopProductCard key={product.id} {...product} />
  ));
}
