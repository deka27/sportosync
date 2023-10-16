"use client";

import supabase from "@/database/supabaseClient";
import { useEffect, useState } from "react";
import { Database } from "../../../types/supabase";
import FadeLoader from "react-spinners/FadeLoader";
import Image from "next/image";

import { SiPremierleague } from "react-icons/si";
import Line from "../(components)/Line";
import { BsArrowRightSquareFill } from "react-icons/bs";

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

type Team = Database["public"]["Tables"]["league"]["Row"];

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

// EventRow component for rendering each employee row
function TeamRow({ id, team, games, win, loss, draw, points }: Team) {
  // Check if team_name is not null, and if it's a valid key in images
  const teamImageSrc = team && images[team] ? images[team] : "";

  const altText = team || "Default Alt Text";

  return (
    <tr>
      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
        {id}
      </td>
      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
        <Image
          src={teamImageSrc}
          alt={altText}
          width={60}
          height={60}
          className="rounded-full bg-white p-1"
        ></Image>
      </td>
      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
        {team}
      </td>
      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
        {games}
      </td>
      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
        {win}
      </td>
      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
        {draw}
      </td>
      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
        {loss}
      </td>
      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
        {points}
      </td>
    </tr>
  );
}

function TeamTable({ teams }: { teams: Team[] }) {
  // Sort the teams array by points in descending order
  const sortedTeams = [...teams].sort((a, b) => b.points - a.points);

  return (
    <div className="overflow-x-auto bg-gray-800 shadow sm:rounded-lg rounded-lg">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-4 py-3 bg-gray-700 text-left text-xs text-gray-300 uppercase tracking-wider">
              ID
            </th>
            <th className="px-4 py-3 bg-gray-700 text-left text-xs text-gray-300 uppercase tracking-wider">
              Image
            </th>
            <th className="px-4 py-3 bg-gray-700 text-left text-xs text-gray-300 uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 py-3 bg-gray-700 text-left text-xs text-gray-300 uppercase tracking-wider">
              Matches
            </th>
            <th className="px-4 py-3 bg-gray-700 text-left text-xs text-gray-300 uppercase tracking-wider">
              Wins
            </th>
            <th className="px-4 py-3 bg-gray-700 text-left text-xs text-gray-300 uppercase tracking-wider">
              Draws
            </th>
            <th className="px-4 py-3 bg-gray-700 text-left text-xs text-gray-300 uppercase tracking-wider">
              Losses
            </th>
            <th className="px-4 py-3 bg-gray-700 text-left text-xs text-gray-300 uppercase tracking-wider">
              Points
            </th>

            <th className="px-4 py-3 bg-gray-700"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {sortedTeams.map((team) => (
            <TeamRow key={team.id} {...team} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Page() {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [league, setLeague] = useState<Team[] | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      const { data, error } = await supabase.from("league").select();

      if (error) {
        setFetchError("Could not fetch the data");
        setLeague(null);
        console.log(error);
      }

      if (data) {
        setLeague(data as Team[]); // Type assertion for data as an array of Event
        setFetchError(null);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div>
      <div className="mt-16 px-12">
        <div className="mb-8 flex justify-between items-center">
          <div className="flex gap-4 text-3xl font-semibold">
            <SiPremierleague /> League Panel
          </div>
        </div>
        <Line />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="text-2xl mt-20 mb-10">League Table</div>
        {fetchError && <p>{fetchError}</p>}
        {league ? (
          <div className="container mx-auto mb-16 w-4/5">
            <div className="flex items-center gap-x-3 my-6">
              <h2 className="text-lg font-medium text-white">Team</h2>

              <span className="px-3 py-1 text-xs  rounded-full bg-gray-800 text-blue-400">
                {league.length} teams total
              </span>
            </div>
            <TeamTable teams={league} />
            <div className="mt-4 flex justify-center items-center gap-4 md:hidden">
              <BsArrowRightSquareFill />
              Scorll or Swipe to see points
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

      <div className="my-16">
        {league && (
          <div className="w-full flex justify-center items-center flex-col">
            <div className="text-2xl mt-10 mb-20">Analytics</div>
            <div className="flex gap-x-20 gap-y-20 flex-col md:flex-row">
              <div className="flex flex-col gap-6">
                <BarChart width={350} height={300} data={league}>
                  <XAxis dataKey="team" tick={{ display: "none" }}>
                    <Label
                      value="team"
                      offset={-1}
                      position="insideBottom"
                      fill="#FFFFFF"
                    />
                  </XAxis>
                  <YAxis
                    label={{
                      value: "point",
                      angle: -90,
                      position: "insideBottom"
                    }}
                    tickCount={6}
                  />
                  <CartesianGrid
                    strokeDasharray="3 3"
                    fill=""
                    fillOpacity={0.6}
                    vertical={false}
                  />

                  <Bar dataKey="points" fill="#337CCF" barSize={30}>
                    <LabelList
                      dataKey="points"
                      position="top"
                      className="text-md"
                      fill="#FFFFFF"
                      angle={-45}
                      offset={30}
                    />
                    <LabelList
                      dataKey="team"
                      position="center"
                      angle={-90}
                      className="text-md"
                      fill="#FFFFFF"
                    />
                  </Bar>
                </BarChart>
                <div className="mx-auto bg-white text-black rounded-full px-4 py-1 w-fit">Team vs Score</div>
              </div>
              <div className="flex flex-col gap-6">
                <BarChart width={350} height={300} data={league}>
                  <XAxis dataKey="team" tick={{ display: "none" }}>
                    <Label
                      value="team"
                      offset={-1}
                      position="insideBottom"
                      fill="#FFFFFF"
                    />
                  </XAxis>
                  <YAxis
                    label={{
                      value: "match",
                      angle: -90,
                      position: "insideBottom"
                    }}
                    tickCount={6}
                  />
                  <CartesianGrid
                    strokeDasharray="3 3"
                    fill=""
                    fillOpacity={0.6}
                    vertical={false}
                  />

                  <Bar dataKey="games" fill="#337CCF" barSize={30}>
                    <LabelList
                      dataKey="games"
                      position="top"
                      className="text-md"
                      fill="#FFFFFF"
                      angle={-45}
                      offset={30}
                    />
                    <LabelList
                      dataKey="team"
                      position="center"
                      angle={-90}
                      className="text-md"
                      fill="#FFFFFF"
                    />
                  </Bar>
                </BarChart>
                <div className="mx-auto bg-white text-black rounded-full px-4 py-1 w-fit">Team vs Match</div>
              </div>
              <div className="flex flex-col gap-6">
                <BarChart width={350} height={300} data={league}>
                  <XAxis dataKey="team" tick={{ display: "none" }}>
                    <Label
                      value="team"
                      offset={-1}
                      position="insideBottom"
                      fill="#FFFFFF"
                    />
                  </XAxis>
                  <YAxis
                    label={{
                      value: "match",
                      angle: -90,
                      position: "insideBottom"
                    }}
                    tickCount={6}
                  />
                  <CartesianGrid
                    strokeDasharray="3 3"
                    fill=""
                    fillOpacity={0.6}
                    vertical={false}
                  />

                  <Bar dataKey="win" fill="#337CCF" barSize={30}>
                    <LabelList
                      dataKey="win"
                      position="top"
                      className="text-md"
                      fill="#FFFFFF"
                      angle={-45}
                      offset={30}
                    />
                    <LabelList
                      dataKey="team"
                      position="center"
                      angle={-90}
                      className="text-md"
                      fill="#FFFFFF"
                    />
                  </Bar>
                </BarChart>
                <div className="mx-auto bg-white text-black rounded-full px-4 py-1 w-fit">Team vs Win</div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
