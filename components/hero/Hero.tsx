import React from "react";
import { CarouselDemo } from "../Carousel";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className=" pt-24 md:pt-28 flex flex-col gap-8  md:grid md:grid-cols-2 items-center lg:place-items-center h-fit  w-screen mx-12 lg:mx-20  lg:gap-6">
      <div className="flex flex-col h-full items-center justify-center gap-4 ">
        <h1 className="text-[3rem] md:text-[3.5rem] text-center lg:text-[5rem]">
          New Collection{" "}
        </h1>
        <h2 className="text-[2rem]">Lorem Ipsum</h2>
        <p className="text-lg w-[300px] md:text-xl text-center ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Button className="text-l px-6 py-2 w-fit h-fit lg:px-10 text-white lg:py-3 place-self-center lg:text-lg bg-gray-700 dark:bg-gray-500 dark:text-white">
          EXPLORE MORE
        </Button>
      </div>
      <div>
        <CarouselDemo />
      </div>
    </div>
  );
};

export default Hero;
