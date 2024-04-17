import React from "react";

const Filter = () => {
  const animes = ["NARUTO", "BERSERK", "ONE PIECE", "DEMONS SLAYER"];
  const categories = ["HOODIE", "JACKETS", "SHORTS", "LONG SLEEVES"];
  const prices = ["0$ - 20$", "20$ - 50$", "50$ - 100$", "100$ - 200$"];

  return (
    <section className="bg-gray-500 flex flex-col w-fit lg:w-[300px] rounded dark:bg-gray-300 ">
      <div className="flex flex-col gap-3 p-4">
        <h1 className="text-2xl text-white dark:text-black">ANIME</h1>
        <div className="flex flex-wrap gap-4">
          {animes.map((anime) => (
            <label
              key={anime}
              className="px-4 py-2 w-fit h-fit bg-white text-black"
            >
              {""} {anime} {""}
            </label>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 p-4">
        <h1 className="text-2xl text-white dark:text-black">CATEGORIES</h1>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <label
              key={category}
              className="px-4 py-2 h-fit bg-white text-black"
            >
              {""} {category} {""}
            </label>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 p-4">
        <h1 className="text-2xl text-white dark:text-black">PRICE</h1>
        <div className="flex flex-wrap gap-3">
          {categories.map((price) => (
            <label key={price} className="px-4 py-2 h-fit bg-white text-black">
              {""} {price} {""}
            </label>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Filter;
