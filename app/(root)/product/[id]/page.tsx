import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
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
            <Button className="w-full bg-transparent text-white border-2 border-white hover:bg-gray-500/80">
              Add to Favorite
            </Button>
            <Button className="w-full">Add To Cart</Button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <h2 className="text-2xl md:text-4xl text-center">You might also like...</h2>
      </div>
    </div>
  );
}

function YouMightAlsoLikeCarousel () {
    
}
