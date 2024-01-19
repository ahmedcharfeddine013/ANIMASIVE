"use client";
import React, { useEffect, useState } from "react";
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
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Mail,
  MessageSquare,
  Moon,
  PlusCircle,
  Sun,
  UserPlus,
} from "lucide-react";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  //   const [scrolled, setScrolled] = useState(false);

  //     const handleScroll = () => {
  //       const isScrolled = window.scrollY > 0;
  //       setScrolled(isScrolled);
  //     };
  //     window.addEventListener("scroll", handleScroll);

  return (
    <nav className="flex fixed w-screen">
      <div className="flex flex-row w-screen items-center justify-between mx-4  md:justify-between md:mx-20 py-6">
        <div className="flex  items-center gap-10">
          <Link href='/'>
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
          <AccountCircleIcon fontSize="large" />
        </div>

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
              className="flex flex-col items-center"
            >
              <DropdownMenuItem>
                <div className="p-6 border-b-2 focus:bg-none">
                  <AccountCircleIcon fontSize="large" className="cursor-pointer" />
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
                    <DropdownMenuSubContent className="flex flex-col mr-8 items-center">
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
