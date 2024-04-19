"use client";
import React from "react";
import NewCollection from "./_components/NewCollection";
import ShopProducts from "./_components/ShopProducts";

const ShopPage = () => {
  return (
    <div>
      <NewCollection />
      <div className="flex flex-col items-center justify-center">
        <h1 className="pt-20 text-3xl">Shop</h1>
      </div>
      <div className="flex items-center justify-center">
        <ShopProducts />
      </div>
    </div>
  );
};

export default ShopPage;
