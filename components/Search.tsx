import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Product } from "@prisma/client";
import { Button } from "./ui/button";
import db from "@/db/db";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const productsData = await db.product.findMany({
          where: {
            name: {
              startsWith: searchTerm.trim().toLowerCase(),
            },
          },
          take: 5,
        });
        setSuggestions(productsData);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setError("Error fetching suggestions");
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="flex items-center border-b-2 border-black dark:border-white w-fit px-2">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent py-2 outline-none w-[200px]"
          value={searchTerm}
          onChange={handleChange}
        />
        <Button type="submit">
          <SearchIcon />
        </Button>
      </div>
      {suggestions.length > 0 && (
        <ul className="bg-white border border-gray-300 rounded-b-lg w-[200px] shadow-md">
          {suggestions.map((product) => (
            <li
              key={product.id}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
