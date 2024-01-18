import React from "react";
import SearchIcon from "@mui/icons-material/Search";
const Search = () => {
  return (
    <div className="md:flex flex-row items-center border-b-2 border-b-black dark:border-b-white w-fit px-2 hidden">
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent py-2 outline-none w-[200px]"
      />
      <SearchIcon />
    </div>
  );
};

export default Search;
