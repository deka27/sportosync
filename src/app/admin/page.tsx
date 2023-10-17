import React from "react";
import Link from "next/link";
import { MdSportsBasketball } from "react-icons/md";
import { AiOutlineTeam, AiFillControl } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
import { SiPremierleague } from "react-icons/si";
import { MdAdminPanelSettings } from "react-icons/md";
import { PiPowerFill } from "react-icons/pi"
import Line from "../(components)/Line";

const links = [
  { href: "/admin/control", icon: <AiFillControl />, text: "Control Centre" },
  { href: "/admin/event", icon: <MdSportsBasketball />, text: "Events" },
  { href: "/admin/team", icon: <AiOutlineTeam />, text: "Teams" },
  { href: "/admin/player", icon: <BiSolidUser />, text: "Players" },
  { href: "/league", icon: <SiPremierleague />, text: "League" },  
];

export default function Page() {
  return (
    <div className="w-full">
      <div className="mt-16 px-20 text-3xl font-semibold">
        <div className="mb-8 flex gap-4">
          <MdAdminPanelSettings />
          Admin Panel
        </div>
        <Line />
      </div>

      <div className="flex mb-16 mx-auto gap-16 p-20 flex-col lg:flex-row">
        {links.map((link, index) => (
          <div
            key={index}
            className="w-full bg-gradient-to-br from-[#000423] to-[#54576C] h-80 rounded-xl shadow-xl"
          >
            <Link
              href={link.href}
              className="w-full h-full  flex justify-center items-center"
            >
              <div className="flex flex-col justify-center items-center w-full">
                <div className="text-4xl my-4">{link.icon}</div>
                <div className="text-2xl my-4">{link.text}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-end p-20 flex-col lg:flex-row lg:items-center tracking-tighter">
        <Link href="/admin/control" className="m-6 bg-green-600 p-4 rounded-xl">Live Matches</Link>
        <Link href="/admin/control" className="m-6 bg-blue-600 p-4 rounded-xl">Upcoming Matches</Link>
        <Link href="/admin/event" className="m-6 bg-slate-500 p-4 rounded-xl">All Matches</Link>
        <form action="/auth/logout" method="post"><button className="m-6 bg-red-600 p-4 rounded-xl flex justify-center items-center gap-2"><PiPowerFill/>Logout</button></form>
      </div>
    </div>
  );
}
