// "use client";
import React from "react";
import { Button } from "../ui/button";
import { cache } from "@/lib/cache";
import db from "@/db/db";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Product } from "@prisma/client";

const getTopSeller = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: "desc" } },
      take: 3,
    });
  },
  ["/", "getTopSeller"],
  { revalidate: 60 * 60 * 24 }
);

const getNewCollection = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    });
  },
  ["/", "getNewCollection"],
  { revalidate: 60 * 60 * 24 }
);

const TopSales = () => {
  return (
    <section className="flex flex-col w-fit items-center justify-center gap-16">
      <h1 className="text-3xl">Top Sellers</h1>
      <TopSalesCarousel />
      <Button className="text-l px-6 py-2 w-fit h-fit lg:px-10 text-white lg:py-3 place-self-center lg:text-lg bg-gray-700 dark:bg-gray-500 dark:text-white">
        SHOP ALL
      </Button>
    </section>
  );
};

export default TopSales;

function TopSalesCarousel() {
  // const products = await getNewCollection();
  return (
    <Carousel className="flex mx-3  items-center justify-center w-fit">
      <CarouselContent className="flex items-center w-[300px]  lg:w-[500px]">
        <ProductsSuspense productsFetcher={getTopSeller} />
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

async function ProductsSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) {
  return (await productsFetcher()).map((product) => (
    <ProductCarousel key={product.id} {...product} />
  ));
}

type ProductCarouselProps = {
  name: string;
  imagePath: string;
};

function ProductCarousel({ name, imagePath }: ProductCarouselProps) {
  return (
    <CarouselItem className="w-fit h-fit items-center flex justify-center">
      <Card>
        <CardContent className="p-0">
          <Image src={imagePath} alt={name} height={300} width={300} />
        </CardContent>
      </Card>
    </CarouselItem>
  );
}
