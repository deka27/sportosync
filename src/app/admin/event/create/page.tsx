"use client";

import supabase from "@/database/supabaseClient";
import React, { useEffect, useState } from "react";
import { Database } from '../../../../../types/supabase'

type Sport = Database['public']['Tables']['sport']['Row']
type Team = Database['public']['Tables']['team']['Row']
type Status = Database['public']['Tables']['status']['Row']

export default function Page() {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [sports, setSports] = useState<Sport[] | null>(null);
  const [teams, setTeams] = useState<Team[] | null>(null);
  const [status, setStatus] = useState<Status[] | null>(null);

  useEffect(() => {
    const fetchSports = async () => {
      const { data, error } = await supabase.from("sport").select();

      if (error) {
        setFetchError("Could not fetch the data");
        setSports(null);
        console.log(error);
      }

      if (data) {
        setSports(data as Sport[]);
        setFetchError(null);
      }
    };

    fetchSports();
  }, []);

  useEffect(() => {
     const fetchTeams = async () => {
       const { data, error } = await supabase.from("team").select();
 
       if (error) {
         setFetchError("Could not fetch the data");
         setTeams(null);
         console.log(error);
       }
 
       if (data) {
         setTeams(data as Team[]);
         setFetchError(null);
       }
     };
 
     fetchTeams();
   }, []);

   useEffect(() => {
     const fetchStatus = async () => {
       const { data, error } = await supabase.from("status").select();
 
       if (error) {
         setFetchError("Could not fetch the data");
         setStatus(null);
         console.log(error);
       }
 
       if (data) {
         setStatus(data as Status[]);
         setFetchError(null);
       }
     };
 
     fetchStatus();
   }, []);

  return (
    <div className="container p-20 mx-auto w-2/3">
      <div className="text-3xl font-medium mx-auto text-center">
        Create an Event
      </div>
      <div className="container my-8 mx-auto">
        <form action="" method="post" className="flex justify-around">
          <div className="w-full px-10">
            <div className="flex flex-col gap-2 my-4">
              <label htmlFor="event_name" className="text-lg">
                Event Name
              </label>
              <input
                type="text"
                name="event_name"
                placeholder="Event Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="flex flex-col gap-2 my-4">
              <label htmlFor="" className="text-lg">
                Sport
              </label>
          {sports && (
               <select className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" defaultValue="Select Sport">
               {sports.map((sport) => (<option key={sport.id} value={sport.id}>{sport.sport_name}</option>))}
               </select>
               )}

            </div>
            <div className="flex flex-col gap-2 my-4">
              <label htmlFor="" className="text-lg">
                Status
              </label>
              {status && (
               <select className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" defaultValue="Select Sport">
               {status.map((state) => (<option key={state.id} value={state.id}>{state.status_name}</option>))}
               </select>
               )}
            </div>
            <div className="flex flex-col gap-2 my-4">
              <label htmlFor="" className="text-lg">
                Date
              </label>
              <input
                type="date"
                name=""
                placeholder=""
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div className="w-full px-10">
            <div className="flex flex-col gap-2 my-4">
              <label htmlFor="" className="text-lg">
                Time
              </label>
              <input
                type="time"
                name=""
                placeholder=""
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="flex flex-col gap-2 my-4">
              <label htmlFor="" className="text-lg">
                Team 1
              </label>
              {teams && (
               <select className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" defaultValue="Select Sport">
               {teams.map((team) => (<option key={team.id} value={team.id}>{team.team_name}</option>))}
               </select>
               )}
            </div>
            <div className="flex flex-col gap-2 my-4">
              <label htmlFor="" className="text-lg">
                Team 2
              </label>
              {teams && (
               <select className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" defaultValue="Select Sport">
               {teams.map((team) => (<option key={team.id} value={team.id}>{team.team_name}</option>))}
               </select>
               )}
            </div>
            <div className="flex flex-col gap-2 my-4">
              <label htmlFor="" className="text-lg">
                Location
              </label>
              <input
                type="text"
                name=""
                placeholder="Enter a location"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
        </form>
        <div className="flex justify-end items-center p-10">
          <button className="bg-gradient-to-br from-blue-500 to-blue-900 p-3 rounded-lg shadow-lg">
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
}
