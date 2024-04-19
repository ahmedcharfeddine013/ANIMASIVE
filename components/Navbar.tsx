"use client";
import React, { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import logo_white from "../public/logo/logo beige 1 bordered.png";
import logo_dark from "../public/logo/bordered logo beige 2.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";
import Search from "./Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

import MenuIcon from "@mui/icons-material/Menu";
import { cache } from "@/lib/cache";
import db from "@/db/db";
import { Product } from "@prisma/client";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const getProducts = cache(
    () => {
      return db.product.findMany({
        where: { isAvailableForPurchase: true },
      });
    },
    ["/", "/getProducts"],
    {
      revalidate: 60 * 60 * 24,
    }
  );

  return (
    <nav className="flex fixed w-full bg-[#D9D9D9] dark:bg-[#121212] z-50">
      <div className="flex flex-row w-full items-center justify-between mx-4  md:justify-between md:mx-20 py-6">
        <div className="flex  items-center gap-10">
          <Link href="/">
            <Image
              src={theme === "light" ? logo_white : logo_dark}
              alt="ANIMASIVE"
              height={40}
            />
          </Link>
          <ul className="hidden lg:flex space-x-5 ">
            <Link href="/">HOME</Link>
            <Link href="/shop">SHOP</Link>
            <Link href="/contact">CONTACT</Link>
          </ul>
        </div>
        <div className="hidden lg:flex flex-row space-x-8 items-center ">
          <Search />

          <ThemeToggle />
          <ShoppingCartIcon />
          <Link href="login">
            <AccountCircleIcon fontSize="large" />
          </Link>
        </div>

        {/* responsive for phones */}

        <div className="flex lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon">
                <MenuIcon />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="flex flex-col items-center bg-white dark:bg-[#121212]"
            >
              <DropdownMenuItem>
                <div className="p-6 border-b-2 focus:bg-none">
                  <AccountCircleIcon
                    fontSize="large"
                    className="cursor-pointer"
                  />
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="bg-transparent">
                <ul className="flex  items-center flex-col gap-3 border-b-2 pb-3">
                  <Link className="" href="/">
                    HOME
                  </Link>
                  <Link className="" href="/shop">
                    SHOP
                  </Link>
                  <Link className="" href="/contact">
                    CONTACT
                  </Link>
                </ul>
              </DropdownMenuItem>

              {/* theme */}
              <div className="flex items-center flex-col gap-3 pb-3">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="flex items-center justify-center cursor-pointer">
                    <span>Theme</span>
                  </DropdownMenuSubTrigger>

                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="flex flex-col mr-8 items-center dark:bg-[#121212]">
                      <DropdownMenuItem>
                        <span
                          className="w-full cursor-pointer"
                          onClick={() => setTheme("light")}
                        >
                          light
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span
                          className="w-full cursor-pointer"
                          onClick={() => setTheme("dark")}
                        >
                          dark
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span
                          className="w-full cursor-pointer"
                          onClick={() => setTheme("system")}
                        >
                          system
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <ShoppingCartIcon className="cursor-pointer" />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
