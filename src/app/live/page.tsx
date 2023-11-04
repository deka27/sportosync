"use client";
import Image from "next/image";
import supabase from "@/database/supabaseClient";
import { useEffect, useState } from "react";
import { Database } from "../../../types/supabase";
import { BsPlayCircleFill } from "react-icons/bs";
import { IoMdClock } from "react-icons/io";
import FadeLoader from "react-spinners/FadeLoader";
import { RiSwordFill } from "react-icons/ri";

interface Images {
  [teamName: string]: string; // Maps a team name (string) to an image source (string)
}

const images: Images = {
  Anal: "/images/teams/Anal.png",
  Angami: "/images/teams/Angami.png",
  Ao: "/images/teams/Ao.png",
  Chakesang: "/images/teams/Chakesang.png",
  Chiru: "/images/teams/Chiru.png",
  LMM: "/images/teams/Lamkang.png",
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


type Event = Database["public"]["Tables"]["event"]["Row"];

export default function Page() {
  
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [liveEvents, setLiveEvents] = useState<Event[] | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[] | null>(null);

  useEffect(() => {
    const fetchLiveEvents = async () => {
      const { data, error } = await supabase
        .from("event")
        .select()
        .eq("status", "🟢 Live");

      if (error) {
        setFetchError("Could not fetch the data");
        setLiveEvents(null);
        console.log(error);
      }

      if (data) {
        // Format the dates to DD-MM-YYYY
        const formattedLiveEvents = data.map((event) => ({
          ...event,
          date: new Date(event.date).toLocaleDateString("de-DE"),
        }));

        setLiveEvents(formattedLiveEvents.reverse() as Event[]);
        setFetchError(null);
      }
    };

    fetchLiveEvents();
  }, []);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      const { data, error } = await supabase
        .from("event")
        .select()
        .eq("status", "🔵 Not Started");
      if (error) {
        setFetchError("Could not fetch the data");
        setUpcomingEvents(null);
        console.log(error);
      }
      if (data) {
        // Format the dates to DD-MM-YYYY
        const formattedUpcomingEvents = data.map((event) => ({
          ...event,
          date: new Date(event.date).toLocaleDateString("de-DE"),
        }));

        setUpcomingEvents(formattedUpcomingEvents.reverse() as Event[]);
        setFetchError(null);
      }
    };
    fetchUpcomingEvents();
  }, []);

  return (
    <div className="container my-16 px-6 mx-auto flex flex-col gap-10">
      <div className="text-4xl font-bold">Live & Upcoming Matches</div>
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
                  <div className="bg-gradient-to-tr relative from-blue-300 via-blue-600 to-blue-900 p-14 flex flex-col justify-center items-center gap-2 rounded-xl shadow-lg">
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
                  <div className="bg-gradient-to-tr from-blue-300 via-blue-600 to-blue-900 relative p-14 flex flex-col justify-center items-center gap-2 rounded-xl shadow-lg">
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
