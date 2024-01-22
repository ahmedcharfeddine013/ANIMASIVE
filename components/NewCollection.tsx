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

const NewCollection = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/top_sellers");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="pt-24 pb-10 bg-[#B0A695] flex flex-col items-center">
      <div className="my-3">
        <h1 className="text-3xl">NEW COLLECTION</h1>
      </div>
      
        <Carousel className="flex mx-3  items-center justify-center w-fit">
          <CarouselContent className="flex items-center w-[300px]  lg:w-[500px] border-none outline-none">
            {/* {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))} */}

            {products.map((product: productProps, index) => (
              <CarouselItem key={index}>
                <div>
                  <Card className="outline-none border-none">
                    <CardContent className="p-0">
                      <img src={product.image} alt={product.title} />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-none" />
          <CarouselNext className="border-none" />
        </Carousel>
      
    </div>
  );
};

export default NewCollection;
