"use client";
import Image from "next/image";
import supabase from "@/database/supabaseClient";
import { useEffect, useState } from "react";
import { Database } from "../../../types/supabase";
import { SiRiotgames } from "react-icons/si";
import { RiSwordFill } from "react-icons/ri";
import FadeLoader from "react-spinners/FadeLoader";
import Link from "next/link";
import graph from "../../../public/images/graph.jpg"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  LabelList,
  Legend,
} from "recharts";

interface Images {
  [teamName: string]: string; // Maps a team name (string) to an image source (string)
}

const images: Images = {
  Houdu: "/images/img1.png",
  Ngapu: "/images/img2.png",
  Khouchi: "/images/img3.png",
  Kapamodzü: "/images/img4.png",
  Referee: "/images/img5.png",
  Admin: "/images/img6.gif",
};

type Team = Database["public"]["Tables"]["team"]["Row"];

type Player = Database["public"]["Tables"]["player"]["Row"];

export default function Page() {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [team, setTeam] = useState<Team[] | null>(null);
  const [curator, setCurator] = useState<Team[] | null>(null);
  const [players, setPlayers] = useState<Player[] | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      const teamNamesToFilter = ["Houdu", "Ngapu", "Khouchi", "Kapamodzü"]; // Add the team names you want to filter here

      const { data, error } = await supabase
        .from("team")
        .select()
        .in("team_name", teamNamesToFilter); // Use .in to filter by multiple team names

      if (error) {
        setFetchError("Could not fetch the data");
        setTeam(null);
        console.log(error);
      }

      if (data) {
        setTeam(data); // Reverse if needed
        setFetchError(null);
      }
    };

    fetchTeam();
  }, []);

  useEffect(() => {
    const fetchTeam = async () => {
      const teamNamesToFilter = ["Admin", "Referee"]; // Add the team names you want to filter here

      const { data, error } = await supabase
        .from("team")
        .select()
        .in("team_name", teamNamesToFilter); // Use .in to filter by multiple team names

      if (error) {
        setFetchError("Could not fetch the data");
        setCurator(null);
        console.log(error);
      }

      if (data) {
        setCurator(data); // Reverse if needed
        setFetchError(null);
      }
    };

    fetchTeam();
  }, []);

  useEffect(() => {
    const fetchPlayers = async () => {
      const teamNamesToFilter = ["Houdu", "Ngapu", "Khouchi", "Kapamodzü"];
      const { data, error } = await supabase
        .from("player")
        .select()
        .in("team", teamNamesToFilter);

      if (error) {
        setFetchError("Could not fetch the data");
        setPlayers(null);
        console.log(error);
      }

      if (data) {
        setPlayers(data as Player[]); // Type assertion for data as an array of Event
        setFetchError(null);
        console.log(data);
      }
    };

    fetchPlayers();
  }, []);

  const countPlayersByVillage = () => {
    const villageCounts = {} as { [key: string]: number };

    if (players) {
      players.forEach((player) => {
        const { village } = player;
        if (typeof village === "string") {
          if (villageCounts[village]) {
            villageCounts[village]++;
          } else {
            villageCounts[village] = 1;
          }
        }
      });
    }

    const data = Object.keys(villageCounts).map((village) => ({
      village,
      count: villageCounts[village],
    }));

    return data;
  };

  const villageData = countPlayersByVillage();

  return (
    <div className="container my-16 px-6 mx-auto flex flex-col gap-10">
      <div className="text-4xl font-bold text-center">Teams Panel</div>

      <div className="player_teams">
        <div className="bg-white flex mx-auto w-fit py-2 px-6 my-6 rounded-full gap-2">
          <div className="text-blue-700 flex items-center justify-center">
            <RiSwordFill />
          </div>
          <div className="text-xl text-black">Player Teams</div>
        </div>
        <div className="mt-16">
          {fetchError && <p>{fetchError}</p>}
          {team ? (
            <div className="gap-16 md:gap-32 flex flex-col lg:flex-row text-white mt-8 justify-center items-center">
              {team.map((team) => (
                <div
                  key={team.id}
                  className="mt-4 relative flex justify-center items-center"
                >
                  <Link href={`/team/${team.team_name}`}>
                    <div className="">
                      {team && team.team_name && images[team.team_name] && (
                        <Image
                          src={images[team.team_name]}
                          alt={team.team_name}
                          width={120}
                          height={120}
                          className="bg-white rounded-full p-1 shadow-lg"
                        ></Image>
                      )}
                      <div className="py-4 text-center">{team.team_name}</div>
                    </div>
                  </Link>
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
      <div className="curator_teams">
        <div className="bg-white flex mx-auto  w-fit py-2 px-6 my-6 rounded-full gap-2">
          <div className="text-red-700 flex items-center justify-center">
            <SiRiotgames />
          </div>
          <div className="text-xl text-black">Curators</div>
        </div>
        <div className="mt-16">
          {fetchError && <p>{fetchError}</p>}
          {curator ? (
            <div className="gap-16 md:gap-32 flex flex-col lg:flex-row text-white mt-8 justify-center items-center">
              {curator.map((team) => (
                <div
                  key={team.id}
                  className="mt-4 relative flex justify-center items-center"
                >
                  <Link href={`/team/${team.team_name}`}>
                    <div className="">
                      {team && team.team_name && images[team.team_name] && (
                        <Image
                          src={images[team.team_name]}
                          alt={team.team_name}
                          width={120}
                          height={120}
                          className="bg-white rounded-full p-1 shadow-lg"
                        ></Image>
                      )}
                      <div className="py-4 text-center">{team.team_name}</div>
                    </div>
                  </Link>
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
      {villageData ? (
        <div className="p-2 lg:p-20 flex flex-col gap-6 h-[2000px] lg:h-fit">
          <div className="text-3xl font-semibold text-center my-6">
            Analytics
          </div>
          <div className="text-center">
            This is a graph to show distribution of members by village
          </div>
          <div className="">
            <div className="mt-16 mx-auto hidden justify-center items-center lg:flex">
              <BarChart width={1300} height={500} data={villageData}>
                <XAxis dataKey="village" tick={{ display: "none" }}>
                  <Label
                    value="village names"
                    offset={-1}
                    position="insideBottom"
                    fill="#FFFFFF"
                  />
                </XAxis>
                <YAxis
                  label={{
                    value: "count of members",
                    angle: -90,
                    position: "insideBottomLeft",
                  }}
                  tickCount={15}
                />
                <Tooltip />
                <CartesianGrid
                  strokeDasharray="3 3"
                  fill=""
                  fillOpacity={0.6}
                  vertical={false}
                />

                <Bar dataKey="count" fill="#337CCF" barSize={30}>
                  <LabelList
                    dataKey="village"
                    position="top"
                    className="text-md"
                    fill="#FFFFFF"
                    angle={-45}
                    offset={30}
                  />
                  <LabelList
                    dataKey="count"
                    position="center"
                    className="text-md"
                    fill="#FFFFFF"
                  />
                </Bar>
              </BarChart>
            </div>
            <div className="pt-20 pr-20 mt-40">
            <div className="mt-16 flex justify-center items-center max-w-screen-sm origin-bottom-left rotate-90 lg:hidden">
              <BarChart width={1300} height={300} data={villageData}>
                <XAxis dataKey="village" tick={{ display: "none" }}>
                  <Label
                    value="village names"
                    offset={-1}
                    position="insideBottom"
                    fill="#FFFFFF"
                  />
                </XAxis>
                <YAxis
                  label={{
                    value: "count of members",
                    angle: -90,
                    position: "insideBottomLeft",
                  }}
                  tickCount={15}
                />
                <Tooltip />
                <CartesianGrid
                  strokeDasharray="3 3"
                  fill=""
                  fillOpacity={0.6}
                  vertical={false}
                />

                <Bar dataKey="count" fill="#337CCF" barSize={30}>
                  <LabelList
                    dataKey="village"
                    position="top"
                    className="text-md"
                    fill="#FFFFFF"
                    angle={-45}
                    offset={30}
                  />
                  <LabelList
                    dataKey="count"
                    position="center"
                    className="text-md"
                    fill="#FFFFFF"
                  />
                </Bar>
              </BarChart>
            </div>
            </div>
            <div className="p-2 rounded-lg hidden lg:flex ">
              <Image
              src={graph}
              alt="graph"
              className="rounded-lg">
              </Image>
            </div>
          </div>
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
  );
}
