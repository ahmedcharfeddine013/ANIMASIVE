/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { productProps } from "@/interfaces/types";
import { Card, CardContent } from "./ui/card";
import { cache } from "@/lib/cache";
import db from "@/db/db";
import { Product } from "@prisma/client";
import Image from "next/image";

const getNewCollection = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    });
  },
  ["/", "/getNewCollection"],
  { revalidate: 60 * 60 * 24 }
);

const NewCollection = () => {
  return (
    <div className="pt-24 pb-10 bg-[#B0A695] flex flex-col items-center">
      <div className="my-3">
        <h1 className="text-3xl">NEW COLLECTION</h1>
      </div>

      <Carousel className="flex mx-3  items-center justify-center w-fit">
        <CarouselContent className="flex items-center w-[300px]  lg:w-[500px]">
          <NewCollectionCarousel productsFetcher={getNewCollection} />
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default NewCollection;

async function NewCollectionCarousel({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) {
  return (await productsFetcher()).map((product) => (
    <NewCollectionProductCard key={product.id} {...product} />
  ));
}

type NewCollectionProductCardProps = {
  name: string;
  imagePath: string;
};

function NewCollectionProductCard({
  name,
  imagePath,
}: NewCollectionProductCardProps) {
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
