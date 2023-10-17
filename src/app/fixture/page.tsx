"use client";

import supabase from "@/database/supabaseClient";
import React, { useEffect, useState } from "react";
import { Database } from "../../../types/supabase";
import Image from "next/image";
import Line from "../(components)/Line";

type Fixture = Database["public"]["Tables"]["fix"]["Row"];

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

function FixtureRow({ id, sort, team_A, team_B }: Fixture) {
  // Check if team_name is not null, and if it's a valid key in images
  const teamImageSrcA = team_A && images[team_A] ? images[team_A] : "";
  const teamImageSrcB = team_B && images[team_B] ? images[team_B] : "";

  const altTextA = team_A || "Default Alt Text";
  const altTextB = team_B || "Default Alt Text";

  return (
    <tr>
      <td className="px-1 md:px-4 py-4 text-sm text-gray-300 whitespace-nowrap text-center">
        {team_A}
      </td>
      <td className="px-1 md:px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
        <Image
          src={teamImageSrcA}
          alt={altTextA}
          width={60}
          height={60}
          className="rounded-full bg-white p-1"
        ></Image>
      </td>
      <td className="px-1 md:px-4 py-4 text-sm text-gray-300 whitespace-nowrap text-center">VS</td>
      <td className="px-1 md:px-4 py-4 text-sm text-gray-300 whitespace-nowrap text-center">
        <Image
          src={teamImageSrcB}
          alt={altTextB}
          width={60}
          height={60}
          className="rounded-full bg-white p-1"
        ></Image>
      </td>
      <td className="px-1 md:px-4 py-4 text-sm text-gray-300 whitespace-nowrap text-center">
        {team_B}
      </td>
    </tr>
  );
}

function FixtureTable({ fix }: { fix: Fixture[] }) {
  return (
    <div className="overflow-x-auto bg-gray-800 shadow sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-4 py-3 bg-gray-700 text-center text-xs text-gray-300 uppercase tracking-wider">
              Team 1
            </th>
            <th className="px-4 py-3 bg-gray-700 text-center text-xs text-gray-300 uppercase tracking-wider">
            Image
            </th>
            <th className="px-4 py-3 bg-gray-700 text-center text-xs text-gray-300 uppercase tracking-wider">
              -
            </th>
            <th className="px-4 py-3 bg-gray-700 text-center text-xs text-gray-300 uppercase tracking-wider">
              Image
            </th>
            <th className="px-4 py-3 bg-gray-700 text-center text-xs text-gray-300 uppercase tracking-wider">
              Team 2
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {fix.map((fix) => (
            <FixtureRow key={fix.id} {...fix} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Page() {
  const [foot, setFoot] = useState<Fixture[] | null>(null);
  const [mvolley, setMvolley] = useState<Fixture[] | null>(null);
  const [fvolley, setFvolley] = useState<Fixture[] | null>(null);
  const [mbasket, setMbasket] = useState<Fixture[] | null>(null);
  const [fbasket, setFbasket] = useState<Fixture[] | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoot = async () => {
      const { data, error } = await supabase
        .from("fix")
        .select()
        .eq("sport", "⚽ Football");
      if (error) {
        setFetchError("could not fetch the data");
        setFoot(null);
        console.log(error);
      }
      if (data) {
        setFoot(data);
        setFetchError(null);
      }
    };
    fetchFoot();
  }, []);
  useEffect(() => {
    const fetchMvolley = async () => {
      const { data, error } = await supabase
        .from("fix")
        .select()
        .eq("sport", "🏐 Volleyball")
        .eq("gender", "Men");
      if (error) {
        setFetchError("could not fetch the data");
        setMvolley(null);
        console.log(error);
      }
      if (data) {
        setMvolley(data);
        setFetchError(null);
      }
    };
    fetchMvolley();
  }, []);
  useEffect(() => {
    const fetchFvolley = async () => {
      const { data, error } = await supabase
        .from("fix")
        .select()
        .eq("sport", "🏐 Volleyball")
        .eq("gender", "Women");
      if (error) {
        setFetchError("could not fetch the data");
        setFvolley(null);
        console.log(error);
      }
      if (data) {
        setFvolley(data);
        setFetchError(null);
      }
    };
    fetchFvolley();
  }, []);
  useEffect(() => {
    const fetchMbasket = async () => {
      const { data, error } = await supabase
        .from("fix")
        .select()
        .eq("sport", "🏀 Basketball")
        .eq("gender", "Men");
      if (error) {
        setFetchError("could not fetch the data");
        setMbasket(null);
        console.log(error);
      }
      if (data) {
        setMbasket(data);
        setFetchError(null);
      }
    };
    fetchMbasket();
  }, []);
  useEffect(() => {
    const fetchFbasket = async () => {
      const { data, error } = await supabase
        .from("fix")
        .select()
        .eq("sport", "🏀 Basketball")
        .eq("gender", "Women");
      if (error) {
        setFetchError("could not fetch the data");
        setFbasket(null);
        console.log(error);
      }
      if (data) {
        setFbasket(data);
        setFetchError(null);
      }
    };
    fetchFbasket();
  }, []);

  return (
    <div className="flex flex-col gap-16">
      <div className="text-center w-full pt-16 text-3xl font-semibold">
        <div>Fixture</div>
        <div className="text-sm font-normal mt-3">Get to know who is against who</div>
      </div>
      <div className="w-4/5 mx-auto"><Line /></div>
     <div>
          {foot && mvolley && fvolley && mbasket && fbasket && (
               <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-20 mb-20 px-10">
                    <div className="flex flex-col justify-center items-center gap-6">
                         <div className="bg-white rounded-full text-black w-fit py-2 px-6">Men&apos;s Football</div>
                         <div><FixtureTable fix={foot}/></div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-6">
                         <div className="bg-white rounded-full text-black w-fit py-2 px-6">Men&apos;s Volleyball</div>
                         <div><FixtureTable fix={mvolley}/></div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-6">
                         <div className="bg-white rounded-full text-black w-fit py-2 px-6">Women&apos;s Volleyball</div>
                         <div><FixtureTable fix={fvolley}/></div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-6">
                         <div className="bg-white rounded-full text-black w-fit py-2 px-6">Men&apos;s Basketball</div>
                         <div><FixtureTable fix={mbasket}/></div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-6">
                         <div className="bg-white rounded-full text-black w-fit py-2 px-6">Women&apos;s Basketball</div>
                         <div><FixtureTable fix={fbasket}/></div>
                    </div>
               </div>
          )}
     </div>
    </div>
  );
}
