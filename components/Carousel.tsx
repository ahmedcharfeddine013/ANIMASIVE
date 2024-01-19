/* eslint-disable @next/next/no-img-element */
// Carousel.tsx
"use client";
import React, { useEffect, useState } from "react";
import products from "../data/products"; // Import your product data
import Image from "next/image";

interface itemProps {
  title: string;
  image: string;
  price: number;
  main?: boolean;
}

const Carousel: React.FC = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/new_collection");
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(items);

  // const [currentIndex, setCurrentIndex] = useState(0);

  // const nextSlide = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  // };

  // const prevSlide = () => {
  //   setCurrentIndex(
  //     (prevIndex) => (prevIndex - 1 + products.length) % items.length
  //   );
  // };

  return (
    <div className="relative flex items-center justify-center overflow-hidden">
      <button className="flex absolute justify-center items-center left-0 top-1/2 transform -translate-y-1/2 text-3xl text-white bg-gray-500 p-2 rounded-full cursor-pointer">
        &lt;
      </button>
      <div className="flex items-start justify-center transition-transform duration-500 ease-in-out transform">
        {items.map((item: itemProps, index) => (
          <div key={index}>
            {/* // eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} height={300} width={300} alt={item.title} />
            <div className="flex flex-col items-center justify-center">
              <p>{item.title}</p>
              <p>{item.price}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="absolute right-0 top-1/2 transform -translate-y-1/2 text-3xl text-white bg-gray-500 p-2 rounded-full cursor-pointer">
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
