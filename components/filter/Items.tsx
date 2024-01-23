/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { productProps } from "@/interfaces/types";

const Items = () => {
  const [products, setProducts] = useState([]);

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
        <div key={index}>
          <Card >
            <img src={product.image} alt="" />
            <div className="flex flex-row justify-center items-center gap-3 p-3">
              <p>{product.title}</p> | <p>{product.price}</p>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Items;
