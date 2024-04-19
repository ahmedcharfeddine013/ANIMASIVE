"use client";
import React, { Suspense, useEffect, useState } from "react";
import NewCollection from "../../../components/NewCollection";
import { cache } from "@/lib/cache";
import db from "@/db/db";
import { Product } from "@prisma/client";
import ShopProducts from "./_components/ShopProducts";

const ShopPage = () => {
  return (
    <div>
      <NewCollection />
      <div className="flex flex-col items-center justify-center">
        <h1 className="pt-20 text-3xl">You might also like..</h1>
      </div>
      <div className="flex items-center justify-center">
        <ShopProducts />
      </div>
    </div>
  );
};

export default ShopPage;
