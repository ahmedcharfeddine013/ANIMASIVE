"use client";
import React, { useEffect } from "react";
import NewCollection from "../../../components/NewCollection";
import Filter from "@/components/filter/Filter";
import { SelectDemo } from "@/components/filter/Sort";
import Items from "@/components/filter/Items";
import { motion, useAnimation } from "framer-motion";

const Page = () => {
  const controls = useAnimation();

  const handleScrollAnimation = () => {
    const elements = document.querySelectorAll(".animate-scroll");

    elements.forEach((element) => {
      const elementOffset = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (
        elementOffset < windowHeight * 0.75 &&
        element.dataset.animated !== "true"
      ) {
        controls.start({ opacity: 1, y: 0 });
        element.dataset.animated = "true";
      } else if (elementOffset > windowHeight * 0.75) {
        element.dataset.animated = "false"; // Reset the animation flag
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollAnimation);
    return () => {
      window.removeEventListener("scroll", handleScrollAnimation);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls]);

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
