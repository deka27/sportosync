import React from "react";
import Link from "next/link";

import { BiFootball } from "react-icons/bi";
import { IoIosBasketball } from "react-icons/io";
import {
  GiVolleyballBall,
  GiMuscleUp,
  GiShuttlecock,
  GiRopeCoil,
  GiTwoCoins,
  GiChessQueen,
  GiRooster,
  GiRun,
  GiHandBandage,
} from "react-icons/gi";

export default function Page() {
  const sports = [
    { id: 1, name: "Football", icon: <BiFootball />, link: "/matches/football", color:'bg-blue-700'},
    { id: 2, name: "Basketball", icon: <IoIosBasketball/>, link: "/matches/basketball", color:'bg-blue-700' },
    { id: 3, name: "Volleyball", icon: <GiVolleyballBall/>, link: "/matches/volleyball", color:'bg-blue-700' },
    { id: 4, name: "Badminton", icon: <GiShuttlecock/>, link: "/matches/badminton", color:'bg-blue-700' },
    { id: 5, name: "Arm Wrestling", icon: <GiMuscleUp/>, link: "/matches/armwrestling", color:'bg-blue-700' },
    { id: 9, name: "Cock Fighting", icon: <GiRooster/>, link: "/matches/cockfightings", color:'bg-red-700' },
    { id: 6, name: "Tug of War", icon: <GiRopeCoil/>, link: "/matches/tugofwar", color:'bg-blue-700' },
    { id: 7, name: "Chess", icon: <GiChessQueen/>, link: "/matches/chess", color:'bg-blue-700' },
    { id: 8, name: "Carrom", icon: <GiTwoCoins/>, link: "/matches/carrom", color:'bg-blue-700' },    
    { id: 10, name: "Races", icon: <GiRun/>, link: "/matches/races", color:'bg-red-700' },
    { id: 11, name: "Push Up", icon: <GiHandBandage/>, link: "/matches/races", color:'bg-red-700' },
    
  ];

  return (
    <div className="container my-16 px-6 mx-auto flex flex-col gap-10">
      <div className="text-center">
        <div className="text-4xl font-bold mb-4">Events Panel</div>
        <div>click on the sports to check events</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sports.map((sport) => (
          <div className={`rounded-md ${sport.color}`} key={sport.id}>
            <Link href={sport.link} className="flex gap-2 items-center text-xl p-6">
              <div>{sport.icon}</div>
              <div>{sport.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
