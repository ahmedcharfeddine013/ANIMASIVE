"use client";
import React, { ReactNode, createContext, useState } from "react";

interface childrenProps {
  children: ReactNode;
}

const FilterContext = createContext({});

const FilterContextProvider = ({ children }: childrenProps) => {
  const [filter, setFilter] = useState(false);

  const addFilter = () => {
    setFilter(!filter);
  };

  const contextValue = { filter, addFilter };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
