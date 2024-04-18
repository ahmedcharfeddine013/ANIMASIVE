"use client";
import React, { useEffect } from "react";
import NewCollection from "../../../components/NewCollection";
import Filter from "@/components/filter/Filter";
import { SelectDemo } from "@/components/filter/Sort";
import Items from "@/components/filter/Items";
import { motion, useAnimation } from "framer-motion";
import { cache } from "@/lib/cache";
import db from "@/db/db";
import { Card, CardHeader } from "@/components/ui/card";
import { Product } from "@prisma/client";
import ShopProductCard from "./_components/ShopProductCard";

const getProducts = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { name: "asc" },
    });
  },
  ["/", "getProducts"],
  { revalidate: 60 * 60 * 24 }
);

const Page = () => {
  const controls = useAnimation();

  return (
    <div>
      <NewCollection />
      <div className="flex flex-col items-center justify-center">
        <h1 className="pt-20 text-3xl">SHOP</h1>
        <div className="flex flex-col lg:flex-row pt-20 gap-4 items-center lg:items-start">
          <motion.div
            className="animate-scroll mx-10"
            initial={{ opacity: 0, y: 200 }}
            animate={controls}
            data-animated="false"
          >
            <Filter />
          </motion.div>
          <div className="flex flex-col px-4 gap-4">
            <div className="flex items-center justify-end">
              <SelectDemo />
            </div>
            <div>
              <Items />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

// interface shopProductCardProps {
//   id: string;
//   name: string;
//   image: string;
//   description: string;
// }

async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) {
  return (await productsFetcher()).map((product) => (
    <ShopProductCard key={product.id} {...product} />
  ));
}
