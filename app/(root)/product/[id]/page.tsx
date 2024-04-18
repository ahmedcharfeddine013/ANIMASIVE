import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import db from "@/db/db";
import { formatCurrency } from "@/lib/formatters";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({
    where: { id },
  });

  if (product == null) return <p>Product not found</p>;

  return (
    <div className="px-20 py-[150px] w-full space-y-20">
      <div className="grid space-y-4 lg:grid-cols-2 place-content-center w-full">
        {/* Image  */}
        <div className="w-full flex items-center justify-center">
          <Image
            src={product.imagePath}
            height={400}
            width={400}
            alt={product.name}
          ></Image>
        </div>
        {/* content  */}
        <div className="bg-secondary p-6 rounded space-y-6 h-fit">
          <h1 className="text-2xl md:text-3xl">{product.name}</h1>
          <p className="text-red-400 text-xl">
            {formatCurrency(product.priceInCents)}
          </p>
          <p>{product.description}</p>
          <div className="flex flex-col items-center w-full space-y-3">
            <Button className="w-full bg-transparent dark:text-white border-2 dark:border-white dark:hover:bg-gray-500/80 border-gray-500 text-gray-500 hover:bg-gray-400/20">
              Add to Favorite
            </Button>
            <Button className="w-full">Add To Cart</Button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center flex-col gap-20">
        <h2 className="text-2xl md:text-4xl text-center">
          You might also like...
        </h2>
        <YouMightAlsoLikeCarousel />
      </div>
    </div>
  );
}

async function YouMightAlsoLikeCarousel() {
  const products = await db.product.findMany({
    where: { isAvailableForPurchase: true },
  });
  return (
    <Carousel>
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="md:basis-1/2 lg:basis-1/3  "
          >
            <div>
              <Card className="p-0 w-fit h-fit">
                <Link href={`/product/${product.id}`}>
                  <CardContent className="flex items-center justify-center w-fit h-fit p-0 flex-col relative ">
                    <Image
                      src={product.imagePath}
                      alt={product.name}
                      height={300}
                      width={300}
                    />
                    <div className="absolute bg-gray-500/80 bottom-0 h-1/4 p-3 w-full space-y-2 rounded-t">
                      <p>{product.name}</p>
                      <p className="text-red-400">
                        {formatCurrency(product.priceInCents)}
                      </p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

type productFetcherProps = {
  productFetcher: () => Promise<Product[]>;
};
