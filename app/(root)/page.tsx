import Hero from "@/components/hero/Hero";
import React from "react";
import TopSales from "../../components/top sales/TopSales";



const Home = () => {
  return (
    <div className="h-full flex flex-1 flex-col items-center justify-center gap-20">
      <Hero />
      <TopSales />
    </div>
  );
};

export default Home;
