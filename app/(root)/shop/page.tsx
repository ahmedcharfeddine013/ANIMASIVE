import React from "react";
import NewCollection from "../../../components/NewCollection";
import Filter from "@/components/filter/Filter";
import { SelectDemo } from "@/components/filter/Sort";
import Items from "@/components/filter/Items";

const page = () => {
  return (
    <div>
      <NewCollection />
      <div className="flex flex-col items-center justify-center">
        <h1 className="pt-20 text-3xl">SHOP</h1>
        <div className="flex flex-col lg:flex-row pt-20 gap-4 items-center lg:items-start">
          <div className="mx-10">
            <Filter />
          </div>
          <div className="flex flex-col px-4 gap-4">
            <div className="flex items-center justify-end">
              <SelectDemo />
            </div>
            <Items />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
