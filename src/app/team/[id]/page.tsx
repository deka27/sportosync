"use client";
import Image from "next/image";
import supabase from "@/database/supabaseClient";
import { useEffect, useState } from "react";
import { Database } from "../../../../types/supabase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  LabelList,
} from "recharts";

interface Images {
  [teamName: string]: string;
}

type Player = Database["public"]["Tables"]["player"]["Row"];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#4CAF50",
  "#f44336",
  "#FF5733",
];

const images: Images = {
  Referee: "/images/img5.png",
  Admin: "/images/img6.gif",
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

export default function Team({ params }: any) {
  // Check if params.id is 'Kapamodz%C3%BC' and set id accordingly
  const id = params.id === "Kapamodz%C3%BC" ? "Kapamodzü" : params.id;

  const [players, setPlayers] = useState<Player[] | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [captains, setCaptains] = useState<Player[] | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase
        .from("player")
        .select()
        .eq("team", id);

      if (error) {
        setFetchError("Could not fetch the data");
        setPlayers(null);
        console.log(error);
      }

      if (data) {
        setPlayers(data);
        console.log(data);
        setFetchError(null);
      }
    };

    fetchPlayers();
  }, [id]);

  useEffect(() => {
    const fetchCaptains = async () => {
      const { data, error } = await supabase
        .from("player")
        .select()
        .eq("team", id)
        .eq("role", "Captain");

      if (error) {
        setFetchError("Could not fetch the data");
        setCaptains(null); // Change this line to setCaptains
        console.log(error);
      }

      if (data) {
        setCaptains(data); // Change this line to setCaptains
        setFetchError(null);
      }
    };

    fetchCaptains();
  }, [id]);

  const countPlayersByVillage = () => {
     const villageCounts = {} as { [key: string]: number };
   
     if (players) {
       players.forEach((player) => {
         const { village } = player;
         if (typeof village === 'string') {
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

const village: { village: string; count: number }[] = countPlayersByVillage();


  return (
    <div className="flex justify-center items-center">
      {players && (
        <div className="flex flex-col w-full mx-auto">
          <div className="flex justify-center items-center mt-16">
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="text-xl lg:text-4xl font-semibold my-6">{id}</div>
              <div className="flex justify-center items-center">
                <Image
                  src={images[id]}
                  alt={id}
                  width={150}
                  height={150}
                  className="bg-white rounded-full p-1 shadow-lg"
                ></Image>
              </div>
              {captains && (
                <div>
                  <div className="text-2xl font-semibold text-center my-6">
                    Captains
                  </div>
                  {captains.map((captain) => (
                    <div
                      key={captain.id}
                      className="flex flex-col gap-10 text-center"
                    >
                      <div className="text-lg p-1">{captain.player_name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="p-8 lg:p-20 flex flex-col gap-6 h-[1600px] lg:h-screen">
            <div className="px-3 py-2 text-lg text-white bg-gray-800 rounded-md">
              {players.length} members total
            </div>
            <div className="mt-16 mx-auto hidden justify-center items-center lg:flex">
              <BarChart width={1200} height={600} data={village}>
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
                    position: "insideLeft",
                    
                  }}
                  tickCount={7}
                />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" fill="" fillOpacity={0.6} vertical={false}/>

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
            <div className="mt-16  flex justify-center items-center max-w-screen-sm origin-bottom-left rotate-90 lg:hidden">
              <BarChart width={1300} height={300} data={village}>
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
                  tickCount={7}
                />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" fill="" fillOpacity={0.6} vertical={false}/>

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
          </div>
        </div>
      )}
    </div>
  );
}
