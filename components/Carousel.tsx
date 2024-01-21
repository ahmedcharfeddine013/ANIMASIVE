/* eslint-disable @next/next/no-img-element */
"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface productProps {
  title: string;
  price: number;
  image: string;
}

export function CarouselDemo() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/new_collection");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(products);

  return (
    <Carousel className="flex mx-3  items-center justify-center">
      <CarouselContent className="flex items-center w-[300px]  lg:w-[500px]">
        {products.map((product: productProps, index) => (
          <CarouselItem key={index}>
            <div >
              <Card >
                <img src={product.image} alt="" />
                <div className="py-3 space-y-2 flex flex-col items-center justify-center">
                  <p>{product.title}</p>
                  <p>{product.price}</p>
                </div>
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
