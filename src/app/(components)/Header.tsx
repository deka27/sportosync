"use client";

import Image from "next/image";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import icon from "../../../public/images/icon.png"

export const navLinks = [
  {
    id: "home",
    title: "Home",
    url: "/",
  },
  {
    id: "live",
    title: "Live",
    url: "/live",
  },
  {
    id: "allmatches",
    title: "All Matches",
    url: "/matches",
  },
  {
    id: "teams",
    title: "Teams",
    url: "/team",
  },
  {
    id: "league",
    title: "League",
    url: "/league",
  },
  {
    id: "fixture",
    title: "Fixture",
    url: "/fixture",
  },
  
  {
    id: "admin",
    title: "Admin",
    url: "/admin",
  },
];

export default function Header() {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      <div
        className="w-full bg-gradient-to-br from-[#000423] to-[black] flex p-2 justify-between items-center navbar shadow-xl"        
      >
        <Image src={icon} alt="Hero" className="h-16 w-auto p-3"></Image>        
        <Link href="/" className="no-underline"><div className="text-3xl text-white flex font-bold gap-2">SportoSync</div></Link>
        

        {/* Desktop Navigation */}
        <ul className="list-none md:flex hidden justify-end items-center flex-1 mr-4">
          {navLinks.map((nav, index) => (
            <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[16px] ${
                active === nav.title ? "text-white" : "text-dimWhite"
              } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`${nav.url}`} className="no-underline">
                {nav.title}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        <div className="md:hidden flex flex-1 justify-end items-center mr-4">
          <div
            className="w-[28px] h-[28px] object-contain flex justify-center items-center"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? <AiOutlineClose /> : <HiMenuAlt3 />}
          </div>

          {/* Sidebar */}
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-black absolute top-20 right-0 mx-4 my-4 min-w-[140px] rounded-xl sidebar z-50 transition-all ease-in-out border border-white`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col">
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-dimWhite"
                  } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                  onClick={() => setActive(nav.title)}
                >
                  <a href={`${nav.url}`} className="no-underline">
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-white shadow-lg"></div>
    </div>
  );
}
