"use client";

import React, { useEffect, useState } from 'react'
import Line from "../../(components)/Line";
import { AiFillControl } from "react-icons/ai";
import Link from 'next/link';
import { Database } from "../../../../types/supabase";
import supabase from "@/database/supabaseClient";
import FadeLoader from "react-spinners/FadeLoader";
import { BsPlayCircleFill } from 'react-icons/bs';
import Image from 'next/image';
import { IoMdClock } from 'react-icons/io';
import { RiSwordFill } from "react-icons/ri";

import { useRouter } from "next/navigation";

interface Images {[teamName: string]: string;}

type Status = "🟢 Live" | "🔵 Not Started";
   
type Event = Database["public"]["Tables"]["event"]["Row"];

const images: Images = {
  Anal: "/images/teams/Anal.png",
  Angami: "/images/teams/Angami.png",
  Ao: "/images/teams/Ao.png",
  Chakesang: "/images/teams/Chakesang.png",
  Chiru: "/images/teams/Chiru.png",
  Lamkang_Moyon_Monsang: "/images/teams/Lamkang.png",
  Lotha: "/images/teams/Lotha.png",
  Mao: "/images/teams/Mao.png",
  Maram: "/images/teams/Maram.png",
  Maring: "/images/teams/Maring.png",
  Poumai: "/images/teams/Poumai.png",
  Rengma: "/images/teams/Rengma.png",
  Sumi: "/images/teams/Sumi.png",
  Tangkhul: "/images/teams/Tangkhul.png",
  Zeliangrong: "/images/teams/Zeliangrong.png",
};

async function fetchEventsByStatus(
  status: Status,
  setter: React.Dispatch<React.SetStateAction<Event[] | null>>
): Promise<void> {
  const { data, error } = await supabase
    .from("event")
    .select()
    .eq("status", status);

  if (error) {
    setter(null);
    console.log(error);
  }

  if (data) {
    // Format the dates to DD-MM-YYYY
    const formattedEvents = data.map((event) => ({
      ...event,
      date: new Date(event.date).toLocaleDateString("de-DE"),
    }));

    setter(formattedEvents.reverse());
  }
}

export default function Page() {

  const router = useRouter(); 
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [liveEvents, setLiveEvents] = useState<Event[] | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[] | null>(null);

  useEffect(() => {
    fetchEventsByStatus("🟢 Live", setLiveEvents);
  }, []);
  
  useEffect(() => {
    fetchEventsByStatus("🔵 Not Started", setUpcomingEvents);
  }, []);
  
  return (
    <div>
     <div className="mt-16 px-20">
        <div className="mb-8 flex justify-between items-center">
          <div className="flex gap-4 text-3xl font-semibold">
            <AiFillControl /> Control Centre
          </div>
          <Link href="/admin">
            <button className="bg-gradient-to-br from-blue-500 to-blue-900 p-2 rounded-lg shadow-lg">
              Go Admin Panel
            </button>
          </Link>
        </div>
        <Line />
      </div>
      <div className='container my-16 px-6 mx-auto flex flex-col gap-10'>
        <div className="live_events">
          <div className="bg-white flex w-fit py-2 px-6 my-6 rounded-full gap-2">
            <div className="text-green-500 flex items-center justify-center">
              <BsPlayCircleFill />
            </div>
            <div className="text-xl text-black">Live Events</div>
          </div>
          <div>
            {fetchError && <p>{fetchError}</p>}
            {liveEvents ? (
              <div className=" grid gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white">
                {liveEvents.map((event) => (
                  <div key={event.id} className="mt-4 relative">
                    <Link href={`/admin/control/${event.id}`} className="bg-gradient-to-tr relative from-blue-300 via-blue-600 to-blue-900 p-14 flex flex-col justify-center items-center gap-2 rounded-xl shadow-lg">
                      <div className="bg-white w-[35px] h-[35px] top-0 left-0 absolute m-2 rounded-tl-lg clip-path-polygon-tl"></div>
                      <div className="bg-white w-[35px] h-[35px] top-0 right-0 absolute m-2 rounded-lg text-black flex justify-center items-center text-xs">M{event.id}</div>
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
                          <RiSwordFill/>
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
                      <div className="bg-white w-[35px] h-[35px] bottom-0 right-0 absolute m-2 rounded-br-lg clip-path-polygon-br"></div>
                    </Link>

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
        <div className="upcoming_events">
          <div className="bg-white flex w-fit py-2 px-6 my-6 rounded-full gap-2">
            <div className="text-blue-500 flex items-center justify-center">
              <IoMdClock />
            </div>
            <div className="text-xl text-black">Upcoming Events</div>
          </div>
          <div>
            {fetchError && <p>{fetchError}</p>}
            {upcomingEvents ? (
              <div className=" grid gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="mt-4">
                    <Link href={`/admin/control/${event.id}`} className="bg-gradient-to-tr from-blue-300 via-blue-600 to-blue-900 relative p-14 flex flex-col justify-center items-center gap-2 rounded-xl shadow-lg">
                    <div className="bg-white w-[35px] h-[35px] top-0 left-0 absolute m-2 rounded-tl-lg clip-path-polygon-tl"></div>
                    <div className="bg-white w-[35px] h-[35px] top-0 right-0 absolute m-2 rounded-lg text-black flex justify-center items-center text-xs">M{event.id}</div>

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
                          <RiSwordFill/>
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
                      <div className="bg-white w-[35px] h-[35px] bottom-0 right-0 absolute m-2 rounded-br-lg clip-path-polygon-br"></div>
                    </Link>
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
    </div>
  )
}
