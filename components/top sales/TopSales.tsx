"use client";
import React, { useEffect, useState } from "react";
import { CarouselSpacing } from "./CarouselItem";
import { Button } from "../ui/button";
// import { CarouselSize } from "./CarouselItem";

const TopSales = () => {
  return (
    <section className="flex flex-col w-fit items-center justify-center gap-16">
      <h1 className="text-3xl">Top Sellers</h1>
      <CarouselSpacing />
      <Button className="text-l px-6 py-2 w-fit h-fit lg:px-10 text-white lg:py-3 place-self-center lg:text-lg bg-gray-700 dark:bg-gray-500 dark:text-white">
        SHOP ALL
      </Button>
    </section>
  );
};

export default TopSales;
