"use client";
import Image from "next/image";
import supabase from "@/database/supabaseClient";
import { useEffect, useState } from "react";
import { Database } from "../../../types/supabase";
import {
  GiBasketballBall,
  GiChessQueen,
  GiMuscleUp,
  GiRopeCoil,
  GiTwoCoins,
  GiVolleyballBall,
} from "react-icons/gi";
import { IoMdFootball } from "react-icons/io";
import FadeLoader from "react-spinners/FadeLoader";
import { RiSwordFill } from "react-icons/ri";
import { FaCrown } from "react-icons/fa";

interface Images {
  [teamName: string]: string; // Maps a team name (string) to an image source (string)
}

type Event = Database["public"]["Tables"]["event"]["Row"];

async function fetchEventsBySport(setter: any, sport: string) {
  const { data, error } = await supabase
    .from("event")
    .select()
    .eq("sport", sport);

  if (error) {
    setter(null);
    console.log(error);
  }

  if (data) {
    // Format the dates to DD-MM-YYYY
    const formattedLiveEvents = data.map((event) => ({
      ...event,
      date: new Date(event.date).toLocaleDateString("de-DE"),
    }));

    setter(formattedLiveEvents.reverse());
  }
}

export default function Page() {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [basketball, setBasketball] = useState<Event[] | null>(null);
  const [volleyball, setVolleyball] = useState<Event[] | null>(null);
  const [football, setFootball] = useState<Event[] | null>(null);
  const [arm, setArm] = useState<Event[] | null>(null);
  const [tug, setTug] = useState<Event[] | null>(null);
  const [chess, setChess] = useState<Event[] | null>(null);
  const [carrom, setCarom] = useState<Event[] | null>(null);

  useEffect(() => {
    fetchEventsBySport(setBasketball, "🏀 Basketball");
  }, []);

  useEffect(() => {
    fetchEventsBySport(setVolleyball, "🏐 Volleyball");
  }, []);

  useEffect(() => {
    fetchEventsBySport(setFootball, "⚽ Football");
  }, []);

  useEffect(() => {
    fetchEventsBySport(setArm, "💪 Arm Wrestling");
  }, []);

  useEffect(() => {
    fetchEventsBySport(setTug, "🪢 Tug of War");
  }, []);

  useEffect(() => {
    fetchEventsBySport(setChess, "♟️ Chess");
  }, []);

  useEffect(() => {
    fetchEventsBySport(setCarom, "⭕ Carrom");
  }, []);

  const images: Images = {
    Houdu: "/images/img1.png",
    Ngapu: "/images/img2.png",
    Khouchi: "/images/img3.png",
    Kapamodzü: "/images/img4.png",
  };

  return (
    <div className="container my-16 px-6 mx-auto flex flex-col gap-10">
      <div className="text-4xl font-bold">All Matches</div>

      <div className="Football">
        <div className="bg-white flex w-fit py-2 px-6 my-6 rounded-full gap-2">
          <div className="text-black flex items-center justify-center">
            <IoMdFootball />
          </div>
          <div className="text-xl text-black">Football</div>
        </div>
        <div>
          {fetchError && <p>{fetchError}</p>}
          {football ? (
            <div className=" grid gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white">
              {football.map((event) => (
                <div key={event.id} className="mt-4">
                  <div className="bg-gradient-to-tr relative from-blue-300 via-blue-600 to-blue-900 p-14 flex flex-col justify-center items-center gap-2 rounded-xl shadow-lg">
                    <div className="bg-white w-[35px] h-[35px] top-0 left-0 absolute m-2 rounded-tl-lg clip-path-polygon-tl"></div>
                    <div className="bg-white w-[35px] h-[35px] top-0 right-0 absolute m-2 rounded-lg text-black flex justify-center items-center text-xs">
                      M{event.id}
                    </div>
                    <div className="text-xl">{event.sport}</div>
                    <div className="bg-white text-black py-1 px-3 my-2 rounded-full">
                      {event.event_name}
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-white text-black py-1 px-3 my-2 rounded-full text-sm flex justify-center items-center shadow-lg">
                        {event.date}
                      </div>
                      <div className="bg-white text-black py-1 px-3 my-2 rounded-full text-sm flex justify-center items-center shadow-lg">
                        {event.time}
                      </div>
                    </div>
                    {/* <div>{event.location}</div> */}
                    <div className="flex">
                      <div className="flex flex-col justify-center items-center gap-2 mt-3">
                        <div className="text-sm md:text-md lg:text-lg font-semibold">
                          {event.team_A}
                        </div>
                        <div className="w-1/2 h-auto">
                          <Image
                            src={images[event.team_A]}
                            alt={event.team_A}
                            width={120}
                            height={120}
                            className="bg-white rounded-full p-1 shadow-lg"
                          ></Image>
                        </div>
                        <div className="text-5xl font-bold my-2">
                          {event.score_A}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 justify-center items-center p-2 text-3xl font-semibold">
                        <RiSwordFill />
                        VS
                      </div>
                      <div className="flex flex-col  justify-center items-center gap-2 mt-3">
                        <div className="text-sm md:text-md lg:text-lg font-semibold">
                          {event.team_B}
                        </div>
                        <div className="w-1/2 h-auto">
                          <Image
                            src={images[event.team_B]}
                            alt={event.team_B}
                            width={120}
                            height={120}
                            className="bg-white rounded-full p-1 shadow-lg"
                          ></Image>
                        </div>
                        <div className="text-5xl font-bold my-2">
                          {event.score_B}
                        </div>
                      </div>
                    </div>
                    {event.winner && (
                      <div className="flex flex-col justify-center items-center gap-2">
                        <div>Winner</div>
                        <div className="flex flex-row justify-center items-center gap-2 bg-white rounded-lg px-3 py-1">
                          <div className="text-amber-400"><FaCrown /></div>
                          <div className="text-black">{event.winner}</div>
                          <div className="text-amber-400"><FaCrown /></div>                          
                        </div>
                      </div>
                    )}

                    <div className="bg-white w-[35px] h-[35px] bottom-0 right-0 absolute m-2 rounded-br-lg clip-path-polygon-br"></div>
                  </div>
                  <div className="py-4">{event.status}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="container mx-auto py-8 text-center flex flex-col gap-8 my-16">
              <div className="flex justify-center items-center">
                <FadeLoader color="#3689d6" />
              </div>
              <div>Loading...</div>
            </div>
          )}
        </div>
      </div>
      <div className="Basketball">
        <div className="bg-white flex w-fit py-2 px-6 my-6 rounded-full gap-2">
          <div className="text-amber-500 flex items-center justify-center">
            <GiBasketballBall />
          </div>
          <div className="text-xl text-black">Basketball</div>
        </div>
        <div>
          {fetchError && <p>{fetchError}</p>}
          {basketball ? (
            <div className=" grid gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white">
              {basketball.map((event) => (
                <div key={event.id} className="mt-4">
                  <div className="bg-gradient-to-tr from-blue-300 via-blue-600 to-blue-900 relative p-14 flex flex-col justify-center items-center gap-2 rounded-xl shadow-lg">
                    <div className="bg-white w-[35px] h-[35px] top-0 left-0 absolute m-2 rounded-tl-lg clip-path-polygon-tl"></div>
                    <div className="bg-white w-[35px] h-[35px] top-0 right-0 absolute m-2 rounded-lg text-black flex justify-center items-center text-xs">
                      M{event.id}
                    </div>
                    <div className="text-xl">{event.sport}</div>
                    <div className="bg-white text-black py-1 px-3 my-2 rounded-full">
                      {event.event_name}
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-white text-black py-1 px-3 my-2 rounded-full text-sm flex justify-center items-center shadow-lg">
                        {event.date}
                      </div>
                      <div className="bg-white text-black py-1 px-3 my-2 rounded-full text-sm flex justify-center items-center shadow-lg">
                        {event.time}
                      </div>
                    </div>
                    {/* <div>{event.location}</div> */}
                    <div className="flex">
                      <div className="flex flex-col justify-center items-center gap-2 mt-3">
                        <div className="text-sm md:text-md lg:text-lg font-semibold">
                          {event.team_A}
                        </div>
                        <div className="w-1/2 h-auto">
                          <Image
                            src={images[event.team_A]}
                            alt={event.team_A}
                            width={120}
                            height={120}
                            className="bg-white rounded-full p-1 shadow-lg"
                          ></Image>
                        </div>
                        <div className="text-5xl font-bold my-2">
                          {event.score_A}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 justify-center items-center p-2 text-3xl font-semibold">
                        <RiSwordFill />
                        VS
                      </div>
                      <div className="flex flex-col  justify-center items-center gap-2 mt-3">
                        <div className="text-sm md:text-md lg:text-lg font-semibold">
                          {event.team_B}
                        </div>
                        <div className="w-1/2 h-auto">
                          <Image
                            src={images[event.team_B]}
                            alt={event.team_B}
                            width={120}
                            height={120}
                            className="bg-white rounded-full p-1 shadow-lg"
                          ></Image>
                        </div>
                        <div className="text-5xl font-bold my-2">
                          {event.score_B}
                        </div>
                      </div>
                    </div>
                    {event.winner && (
                      <div className="flex flex-col justify-center items-center gap-2">
                        <div>Winner</div>
                        <div className="flex flex-row justify-center items-center gap-2 bg-white rounded-lg px-3 py-1">
                          <div className="text-amber-400"><FaCrown /></div>
                          <div className="text-black">{event.winner}</div>
                          <div className="text-amber-400"><FaCrown /></div>                          
                        </div>
                      </div>
                    )}
                    <div className="bg-white w-[35px] h-[35px] bottom-0 right-0 absolute m-2 rounded-br-lg clip-path-polygon-br"></div>
                  </div>
                  <div className="py-4">{event.status}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="container mx-auto py-8 text-center flex flex-col gap-8 my-16">
              <div className="flex justify-center items-center">
                <FadeLoader color="#3689d6" />
              </div>
              <div>Loading...</div>
            </div>
          )}
        </div>
      </div>
      <div className="Volleyball">
        <div className="bg-white flex w-fit py-2 px-6 my-6 rounded-full gap-2">
          <div className="text-blue-500 flex items-center justify-center">
            <GiVolleyballBall />
          </div>
          <div className="text-xl text-black">Volleyball</div>
        </div>
        <div>
          {fetchError && <p>{fetchError}</p>}
          {volleyball ? (
            <div className=" grid gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white">
              {volleyball.map((event) => (
                <div key={event.id} className="mt-4">
                  <div className="bg-gradient-to-tr from-blue-300 via-blue-600 to-blue-900 relative p-14 flex flex-col justify-center items-center gap-2 rounded-xl shadow-lg">
                    <div className="bg-white w-[35px] h-[35px] top-0 left-0 absolute m-2 rounded-tl-lg clip-path-polygon-tl"></div>
                    <div className="bg-white w-[35px] h-[35px] top-0 right-0 absolute m-2 rounded-lg text-black flex justify-center items-center text-xs">
                      M{event.id}
                    </div>
                    <div className="text-xl">{event.sport}</div>
                    <div className="bg-white text-black py-1 px-3 my-2 rounded-full">
                      {event.event_name}
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-white text-black py-1 px-3 my-2 rounded-full text-sm flex justify-center items-center shadow-lg">
                        {event.date}
                      </div>
                      <div className="bg-white text-black py-1 px-3 my-2 rounded-full text-sm flex justify-center items-center shadow-lg">
                        {event.time}
                      </div>
                    </div>
                    {/* <div>{event.location}</div> */}
                    <div className="flex">
                      <div className="flex flex-col justify-center items-center gap-2 mt-3">
                        <div className="text-sm md:text-md lg:text-lg font-semibold">
                          {event.team_A}
                        </div>
                        <div className="w-1/2 h-auto">
                          <Image
                            src={images[event.team_A]}
                            alt={event.team_A}
                            width={120}
                            height={120}
                            className="bg-white rounded-full p-1 shadow-lg"
                          ></Image>
                        </div>
                        <div className="text-5xl font-bold my-2">
                          {event.score_A}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 justify-center items-center p-2 text-3xl font-semibold">
                        <RiSwordFill />
                        VS
                      </div>
                      <div className="flex flex-col  justify-center items-center gap-2 mt-3">
                        <div className="text-sm md:text-md lg:text-lg font-semibold">
                          {event.team_B}
                        </div>
                        <div className="w-1/2 h-auto">
                          <Image
                            src={images[event.team_B]}
                            alt={event.team_B}
                            width={120}
                            height={120}
                            className="bg-white rounded-full p-1 shadow-lg"
                          ></Image>
                        </div>
                        <div className="text-5xl font-bold my-2">
                          {event.score_B}
                        </div>
                      </div>
                    </div>
                    {event.winner && (
                      <div className="flex flex-col justify-center items-center gap-2">
                        <div>Winner</div>
                        <div className="flex flex-row justify-center items-center gap-2 bg-white rounded-lg px-3 py-1">
                          <div className="text-amber-400"><FaCrown /></div>
                          <div className="text-black">{event.winner}</div>
                          <div className="text-amber-400"><FaCrown /></div>                          
                        </div>
                      </div>
                    )}
                    <div className="bg-white w-[35px] h-[35px] bottom-0 right-0 absolute m-2 rounded-br-lg clip-path-polygon-br"></div>
                  </div>
                  <div className="py-4">{event.status}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="container mx-auto py-8 text-center flex flex-col gap-8 my-16">
              <div className="flex justify-center items-center">
                <FadeLoader color="#3689d6" />
              </div>
              <div>Loading...</div>
            </div>
          )}
        </div>
      </div>
      <div className="Tug_war">
        <div className="bg-white flex w-fit py-2 px-6 my-6 rounded-full gap-2">
          <div className="text-violet-700 flex items-center justify-center">
            <GiRopeCoil />
          </div>
          <div className="text-xl text-black">Tug of War</div>
        </div>
        <div>
          {fetchError && <p>{fetchError}</p>}
          {tug ? (
            <div className=" grid gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white">
              {tug.map((event) => (
                <div key={event.id} className="mt-4">
                  <div className="bg-gradient-to-tr from-blue-300 via-blue-600 to-blue-900 relative p-14 flex flex-col justify-center items-center gap-2 rounded-xl shadow-lg">
                    <div className="bg-white w-[35px] h-[35px] top-0 left-0 absolute m-2 rounded-tl-lg clip-path-polygon-tl"></div>
                    <div className="bg-white w-[35px] h-[35px] top-0 right-0 absolute m-2 rounded-lg text-black flex justify-center items-center text-xs">
                      M{event.id}
                    </div>
                    <div className="text-xl">{event.sport}</div>
                    <div className="bg-white text-black py-1 px-3 my-2 rounded-full">
                      {event.event_name}
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-white text-black py-1 px-3 my-2 rounded-full text-sm flex justify-center items-center shadow-lg">
                        {event.date}
                      </div>
                      <div className="bg-white text-black py-1 px-3 my-2 rounded-full text-sm flex justify-center items-center shadow-lg">
                        {event.time}
                      </div>
                    </div>
                    {/* <div>{event.location}</div> */}
                    <div className="flex">
                      <div className="flex flex-col justify-center items-center gap-2 mt-3">
                        <div className="text-sm md:text-md lg:text-lg font-semibold">
                          {event.team_A}
                        </div>
                        <div className="w-1/2 h-auto">
                          <Image
                            src={images[event.team_A]}
                            alt={event.team_A}
                            width={120}
                            height={120}
                            className="bg-white rounded-full p-1 shadow-lg"
                          ></Image>
                        </div>
                        <div className="text-5xl font-bold my-2">
                          {event.score_A}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 justify-center items-center p-2 text-3xl font-semibold">
                        <RiSwordFill />
                        VS
                      </div>
                      <div className="flex flex-col  justify-center items-center gap-2 mt-3">
                        <div className="text-sm md:text-md lg:text-lg font-semibold">
                          {event.team_B}
                        </div>
                        <div className="w-1/2 h-auto">
                          <Image
                            src={images[event.team_B]}
                            alt={event.team_B}
                            width={120}
                            height={120}
                            className="bg-white rounded-full p-1 shadow-lg"
                          ></Image>
                        </div>
                        <div className="text-5xl font-bold my-2">
                          {event.score_B}
                        </div>
                      </div>
                    </div>
                    {event.winner && (
                      <div className="flex flex-col justify-center items-center gap-2">
                        <div>Winner</div>
                        <div className="flex flex-row justify-center items-center gap-2 bg-white rounded-lg px-3 py-1">
                          <div className="text-amber-400"><FaCrown /></div>
                          <div className="text-black">{event.winner}</div>
                          <div className="text-amber-400"><FaCrown /></div>                          
                        </div>
                      </div>
                    )}
                    <div className="bg-white w-[35px] h-[35px] bottom-0 right-0 absolute m-2 rounded-br-lg clip-path-polygon-br"></div>
                  </div>
                  <div className="py-4">{event.status}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="container mx-auto py-8 text-center flex flex-col gap-8 my-16">
              <div className="flex justify-center items-center">
                <FadeLoader color="#3689d6" />
              </div>
              <div>Loading...</div>
            </div>
          )}
        </div>
      </div>
      <div className="Arm_wrestling">
        <div className="bg-white flex w-fit py-2 px-6 my-6 rounded-full gap-2">
          <div className="text-amber-700 flex items-center justify-center">
            <GiMuscleUp />
          </div>
          <div className="text-xl text-black">Arm Wrestling</div>
        </div>
        <div>
          {fetchError && <p>{fetchError}</p>}
          {arm ? (
            <div className=" grid gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white">
              {arm.map((event) => (
                <div key={event.id} className="mt-4">
                  <div className="bg-gradient-to-tr from-blue-300 via-blue-600 to-blue-900 relative p-14 flex flex-col justify-center items-center gap-2 rounded-xl shadow-lg">
                    <div className="bg-white w-[35px] h-[35px] top-0 left-0 absolute m-2 rounded-tl-lg clip-path-polygon-tl"></div>
                    <div className="bg-white w-[35px] h-[35px] top-0 right-0 absolute m-2 rounded-lg text-black flex justify-center items-center text-xs">
                      M{event.id}
                    </div>
                    <div className="text-xl">{event.sport}</div>
                    <div className="bg-white text-black py-1 px-3 my-2 rounded-full">
                      {event.event_name}
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-white text-black py-1 px-3 my-2 rounded-full text-sm flex justify-center items-center shadow-lg">
                        {event.date}
                      </div>
                      <div className="bg-white text-black py-1 px-3 my-2 rounded-full text-sm flex justify-center items-center shadow-lg">
                        {event.time}
                      </div>
                    </div>
                    {/* <div>{event.location}</div> */}
                    <div className="flex">
                      <div className="flex flex-col justify-center items-center gap-2 mt-3">
                        <div className="text-sm md:text-md lg:text-lg font-semibold">
                          {event.team_A}
                        </div>
                        <div className="w-1/2 h-auto">
                          <Image
                            src={images[event.team_A]}
                            alt={event.team_A}
                            width={120}
                            height={120}
                            className="bg-white rounded-full p-1 shadow-lg"
                          ></Image>
                        </div>
                        <div className="text-5xl font-bold my-2">
                          {event.score_A}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 justify-center items-center p-2 text-3xl font-semibold">
                        <RiSwordFill />
                        VS
                      </div>
                      <div className="flex flex-col  justify-center items-center gap-2 mt-3">
                        <div className="text-sm md:text-md lg:text-lg font-semibold">
                          {event.team_B}
                        </div>
                        <div className="w-1/2 h-auto">
                          <Image
                            src={images[event.team_B]}
                            alt={event.team_B}
                            width={120}
                            height={120}
                            className="bg-white rounded-full p-1 shadow-lg"
                          ></Image>
                        </div>
                        <div className="text-5xl font-bold my-2">
                          {event.score_B}
                        </div>
                      </div>
                    </div>
                    {event.winner && (
                      <div className="flex flex-col justify-center items-center gap-2">
                        <div>Winner</div>
                        <div className="flex flex-row justify-center items-center gap-2 bg-white rounded-lg px-3 py-1">
                          <div className="text-amber-400"><FaCrown /></div>
                          <div className="text-black">{event.winner}</div>
                          <div className="text-amber-400"><FaCrown /></div>                          
                        </div>
                      </div>
                    )}
                    <div className="bg-white w-[35px] h-[35px] bottom-0 right-0 absolute m-2 rounded-br-lg clip-path-polygon-br"></div>
                  </div>
                  <div className="py-4">{event.status}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="container mx-auto py-8 text-center flex flex-col gap-8 my-16">
              <div className="flex justify-center items-center">
                <FadeLoader color="#3689d6" />
              </div>
              <div>Loading...</div>
            </div>
          )}
        </div>
      </div>
      <div className="Chess">
        <div className="bg-white flex w-fit py-2 px-6 my-6 rounded-full gap-2">
          <div className="text-slate-950 flex items-center justify-center">
            <GiChessQueen />
          </div>
          <div className="text-xl text-black">Chess</div>
        </div>
        <div>
          {fetchError && <p>{fetchError}</p>}
          {chess ? (
            <div className=" grid gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white">
              {chess.map((event) => (
                <div key={event.id} className="mt-4">
                  <div className="bg-gradient-to-tr from-blue-300 via-blue-600 to-blue-900 relative p-14 flex flex-col justify-center items-center gap-2 rounded-xl shadow-lg">
                    <div className="bg-white w-[35px] h-[35px] top-0 left-0 absolute m-2 rounded-tl-lg clip-path-polygon-tl"></div>
                    <div className="bg-white w-[35px] h-[35px] top-0 right-0 absolute m-2 rounded-lg text-black flex justify-center items-center text-xs">
                      M{event.id}
                    </div>
                    <div className="text-xl">{event.sport}</div>
                    <div className="bg-white text-black py-1 px-3 my-2 rounded-full">
                      {event.event_name}
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-white text-black py-1 px-3 my-2 rounded-full text-sm flex justify-center items-center shadow-lg">
                        {event.date}
                      </div>
                      <div className="bg-white text-black py-1 px-3 my-2 rounded-full text-sm flex justify-center items-center shadow-lg">
                        {event.time}
                      </div>
                    </div>
                    {/* <div>{event.location}</div> */}
                    <div className="flex">
                      <div className="flex flex-col justify-center items-center gap-2 mt-3">
                        <div className="text-sm md:text-md lg:text-lg font-semibold">
                          {event.team_A}
                        </div>
                        <div className="w-1/2 h-auto">
                          <Image
                            src={images[event.team_A]}
                            alt={event.team_A}
                            width={120}
                            height={120}
                            className="bg-white rounded-full p-1 shadow-lg"
                          ></Image>
                        </div>
                        <div className="text-5xl font-bold my-2">
                          {event.score_A}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 justify-center items-center p-2 text-3xl font-semibold">
                        <RiSwordFill />
                        VS
                      </div>
                      <div className="flex flex-col  justify-center items-center gap-2 mt-3">
                        <div className="text-sm md:text-md lg:text-lg font-semibold">
                          {event.team_B}
                        </div>
                        <div className="w-1/2 h-auto">
                          <Image
                            src={images[event.team_B]}
                            alt={event.team_B}
                            width={120}
                            height={120}
                            className="bg-white rounded-full p-1 shadow-lg"
                          ></Image>
                        </div>
                        <div className="text-5xl font-bold my-2">
                          {event.score_B}
                        </div>
                      </div>
                    </div>
                    {event.winner && (
                      <div className="flex flex-col justify-center items-center gap-2">
                        <div>Winner</div>
                        <div className="flex flex-row justify-center items-center gap-2 bg-white rounded-lg px-3 py-1">
                          <div className="text-amber-400"><FaCrown /></div>
                          <div className="text-black">{event.winner}</div>
                          <div className="text-amber-400"><FaCrown /></div>                          
                        </div>
                      </div>
                    )}
                    <div className="bg-white w-[35px] h-[35px] bottom-0 right-0 absolute m-2 rounded-br-lg clip-path-polygon-br"></div>
                  </div>
                  <div className="py-4">{event.status}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="container mx-auto py-8 text-center flex flex-col gap-8 my-16">
              <div className="flex justify-center items-center">
                <FadeLoader color="#3689d6" />
              </div>
              <div>Loading...</div>
            </div>
          )}
        </div>
      </div>
      <div className="Carrom">
        <div className="bg-white flex w-fit py-2 px-6 my-6 rounded-full gap-2">
          <div className="text-rose-500 flex items-center justify-center">
            <GiTwoCoins />
          </div>
          <div className="text-xl text-black">Carrom</div>
        </div>
        <div>
          {fetchError && <p>{fetchError}</p>}
          {carrom ? (
            <div className=" grid gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white">
              {carrom.map((event) => (
                <div key={event.id} className="mt-4">
                  <div className="bg-gradient-to-tr from-blue-300 via-blue-600 to-blue-900 relative p-14 flex flex-col justify-center items-center gap-2 rounded-xl shadow-lg">
                    <div className="bg-white w-[35px] h-[35px] top-0 left-0 absolute m-2 rounded-tl-lg clip-path-polygon-tl"></div>
                    <div className="bg-white w-[35px] h-[35px] top-0 right-0 absolute m-2 rounded-lg text-black flex justify-center items-center text-xs">
                      M{event.id}
                    </div>
                    <div className="text-xl">{event.sport}</div>
                    <div className="bg-white text-black py-1 px-3 my-2 rounded-full">
                      {event.event_name}
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-white text-black py-1 px-3 my-2 rounded-full text-sm flex justify-center items-center shadow-lg">
                        {event.date}
                      </div>
                      <div className="bg-white text-black py-1 px-3 my-2 rounded-full text-sm flex justify-center items-center shadow-lg">
                        {event.time}
                      </div>
                    </div>
                    {/* <div>{event.location}</div> */}
                    <div className="flex">
                      <div className="flex flex-col justify-center items-center gap-2 mt-3">
                        <div className="text-sm md:text-md lg:text-lg font-semibold">
                          {event.team_A}
                        </div>
                        <div className="w-1/2 h-auto">
                          <Image
                            src={images[event.team_A]}
                            alt={event.team_A}
                            width={120}
                            height={120}
                            className="bg-white rounded-full p-1 shadow-lg"
                          ></Image>
                        </div>
                        <div className="text-5xl font-bold my-2">
                          {event.score_A}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 justify-center items-center p-2 text-3xl font-semibold">
                        <RiSwordFill />
                        VS
                      </div>
                      <div className="flex flex-col  justify-center items-center gap-2 mt-3">
                        <div className="text-sm md:text-md lg:text-lg font-semibold">
                          {event.team_B}
                        </div>
                        <div className="w-1/2 h-auto">
                          <Image
                            src={images[event.team_B]}
                            alt={event.team_B}
                            width={120}
                            height={120}
                            className="bg-white rounded-full p-1 shadow-lg"
                          ></Image>
                        </div>
                        <div className="text-5xl font-bold my-2">
                          {event.score_B}
                        </div>
                      </div>
                    </div>
                    {event.winner && (
                      <div className="flex flex-col justify-center items-center gap-2">
                        <div>Winner</div>
                        <div className="flex flex-row justify-center items-center gap-2 bg-white rounded-lg px-3 py-1">
                          <div className="text-amber-400"><FaCrown /></div>
                          <div className="text-black">{event.winner}</div>
                          <div className="text-amber-400"><FaCrown /></div>                          
                        </div>
                      </div>
                    )}
                    <div className="bg-white w-[35px] h-[35px] bottom-0 right-0 absolute m-2 rounded-br-lg clip-path-polygon-br"></div>
                  </div>
                  <div className="py-4">{event.status}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="container mx-auto py-8 text-center flex flex-col gap-8 my-16">
              <div className="flex justify-center items-center">
                <FadeLoader color="#3689d6" />
              </div>
              <div>Loading...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
