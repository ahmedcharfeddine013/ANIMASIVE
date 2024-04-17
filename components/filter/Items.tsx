/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { productProps } from "@/interfaces/types";
import { useAnimation, motion } from 'framer-motion';


const Items = () => {
  const [products, setProducts] = useState([]);
  const controls = useAnimation();

  const handleScrollAnimation = () => {
    const elements = document.querySelectorAll(".animate-scroll-items");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/top_sellers");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchData();
  });

  return (
    <div className="flex flex-col md:grid md:grid-cols-3 gap-4 items-center justify-center w-full flex-wrap">
      {products.map((product: productProps, index) => (
        <motion.div key={index} className="animate-scroll-items" initial={{opacity: 0, y: 200}} animate={controls}>
          <Card>
            <img src={product.image} alt="" />
            <div className="flex flex-row justify-center items-center gap-3 p-3">
              <p>{product.title}</p> | <p>{product.price}</p>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default Items;
