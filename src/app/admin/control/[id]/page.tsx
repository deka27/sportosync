"use client";

import supabase from "@/database/supabaseClient";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Line from "../../../(components)/Line";
import { Database } from "../../../../../types/supabase";
import toast, { Toaster } from "react-hot-toast";
import { RiSwordFill } from "react-icons/ri";

type Status = Database["public"]["Tables"]["status"]["Row"];

interface Images {
  [teamName: string]: string;
}
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

export default function Event({ params }: any) {
  const router = useRouter();
  const id = params.id;

  const [statuso, setStatuso] = useState<Status[] | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [status, setStatus] = useState("");
  const [score_A, setScore_A] = useState("");
  const [score_B, setScore_B] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [info, setInfo] = useState<{
    event_name: string;
    date: string;
    sport: string;
    status: string;
    time: string;
    team_A: string;
    team_B: string;
    score_A: string;
    score_B: string;
  } | null>(null);

  useEffect(() => {
    const fetchStatuso = async () => {
      const { data, error } = await supabase.from("status").select();

      if (error) {
        setFetchError("Could not fetch the data");
        setStatuso(null);
        console.log(error);
      }

      if (data) {
        setStatuso(data as Status[]);
        setFetchError(null);
      }
    };

    fetchStatuso();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // if (!status || !score_A || !score_B) {
    //   setFormError("Please fill in all the fields correctly.");
    //   return;
    // }

    const { data, error } = await supabase
      .from("event")
      .update({ status, score_A, score_B })
      .eq("id", id)
      .select();

    if (error) {
      setFormError("An error occurred while updating data.");
    } else if (data) {
      setFormError(null);
      // Show a success toast
      toast.success("Match updated successfully");
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("event")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        router.push("/admin/control");
      }
      if (data) {
        setInfo(data);
        setStatus(data.status);
        setScore_A(data.score_A);
        setScore_B(data.score_B);
      }
    };

    fetchEvent();
  }, [id, router]);

  const incrementScoreA = () => {
    const currentScoreA = parseInt(score_A, 10) || 0;
    setScore_A((currentScoreA + 1).toString());
  };

  const decrementScoreA = () => {
    const currentScoreA = parseInt(score_A, 10) || 0;
    if (currentScoreA > 0) {
      setScore_A((currentScoreA - 1).toString());
    }
  };

  const incrementScoreB = () => {
    const currentScoreB = parseInt(score_B, 10) || 0;
    setScore_B((currentScoreB + 1).toString());
  };

  const decrementScoreB = () => {
    const currentScoreB = parseInt(score_B, 10) || 0;
    if (currentScoreB > 0) {
      setScore_B((currentScoreB - 1).toString());
    }
  };

  return (
    <div className="">
      {info && (
        <div className="mx-auto flex">
          <div className="h-auto w-4/12 hidden lg:block">
            <Image
              src="https://source.unsplash.com/Nmrxc-l86Bc"
              alt=""
              width={1500}
              height={1500}
              className="inset-0 h-full w-full object-cover"
            ></Image>
          </div>

          <div className="p-8 md:p-12 w-full lg:w-8/12 mx-auto container">
            <div className="flex flex-col gap-6">
              <div className="flex lg:justify-between items-center my-2 flex-col lg:flex-row gap-6 bg-gradient-to-br from-blue-500 to-blue-900 p-6 rounded-lg">
                <div className="text-2xl px-4 py-3 rounded-md">
                  {info.sport}
                </div>
                <div className="flex flex-col gap-6">
                  <div className="text-lg font-bold bg-gradient-to-tr from-white to-blue-400 py-3 px-5 rounded-lg text-black text-center shadow-lg">
                    {info.event_name}
                  </div>
                  <div className="text-lg font-bold bg-gradient-to-tr from-white to-blue-400 py-3 px-5 rounded-lg text-black text-center shadow-lg">
                    {info.date}
                  </div>
                </div>
              </div>
              <Line />
            </div>
            <div className="form">
              <form onSubmit={handleSubmit} className="flex flex-col my-6">
                <div className="flex w-full justify-center items-center">
                  <div className="flex flex-col justify-center items-center gap-5 w-1/3 h-full">
                    <div className="text-sm md:text-xl lg:text-4xl font-semibold my-6">
                      {info.team_A}
                    </div>
                    <div className="w-1/2 h-auto flex justify-center items-center">
                      <Image
                        src={images[info.team_A]}
                        alt={info.team_A}
                        width={200}
                        height={200}
                        className="bg-white rounded-full p-1 shadow-lg"
                      ></Image>
                    </div>
                    <input
                      type="number"
                      id="score_A"
                      value={score_A}
                      onChange={(e) => setScore_A(e.target.value)}
                      className="bg-transparent text-white text-center text-4xl lg:text-5xl max-w-full font-bold my-6 mx-auto"
                    />
                    <div className="flex gap-6 flex-col md:flex-row">
                      <button className="bg-white text-black px-4 py-2 md:px-6 md:py-3 rounded-lg" onClick={incrementScoreA}>
                        +
                      </button>
                      <button className="bg-white text-black px-4 py-2 md:px-6 md:py-3 rounded-lg" onClick={decrementScoreA}>
                        -
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 justify-center items-center p-2 text-2xl lg:text-5xl font-semibold">
                    <RiSwordFill />
                    VS
                  </div>
                  <div className="flex flex-col justify-center items-center gap-5 w-1/3 h-full">
                    <div className="text-sm md:text-xl lg:text-4xl font-semibold my-6">
                      {info.team_B}
                    </div>
                    <div className="w-1/2 h-auto flex justify-center items-center">
                      <Image
                        src={images[info.team_B]}
                        alt={info.team_B}
                        width={200}
                        height={200}
                        className="bg-white rounded-full p-1 shadow-lg"
                      ></Image>
                    </div>
                    <input
                      type="number"
                      id="score_B"
                      value={score_B}
                      onChange={(e) => setScore_B(e.target.value)}
                      className="bg-transparent text-white text-center text-4xl lg:text-5xl max-w-full font-bold my-6 mx-auto"
                    />
                    <div className="flex gap-6 flex-col md:flex-row">
                      <button className="bg-white text-black px-4 py-2 md:px-6 md:py-3 rounded-lg" onClick={incrementScoreB}>
                        +
                      </button>
                      <button className="bg-white text-black px-4 py-2 md:px-6 md:py-3 rounded-lg" onClick={decrementScoreB}>
                        -
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between my-16">
                  <div className="flex gap-3 justify-center items-center">
                    {" "}
                    Update Status
                    {statuso && (
                      <select
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="text-lg bg-white px-3 py-1 rounded-full text-black"
                        defaultValue="Select Status"
                      >
                        {statuso.map((state) => (
                          <option key={state.id} value={state.status_name}>
                            {state.status_name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  <button className="bg-gradient-to-br from-blue-500 to-blue-900 p-3 rounded-md my-8 w-1/2 mx-auto">
                    Update Match
                  </button>
                </div>
                <Toaster position="bottom-center" reverseOrder={false} />
              </form>

              {formError && <p className="error">{formError}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}