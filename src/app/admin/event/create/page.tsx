"use client";

import supabase from "@/database/supabaseClient";
import React, { useEffect, useState } from "react";
import { Database } from "../../../../../types/supabase";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

type Sport = Database["public"]["Tables"]["sport"]["Row"];
type Team = Database["public"]["Tables"]["team"]["Row"];
type Status = Database["public"]["Tables"]["status"]["Row"];

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

const fetchTableData = async (tableName: string, setData: Function, setError: Function) => {
  try {
    const { data, error } = await supabase.from(tableName).select();

    if (error) {
      setError(`Could not fetch the data for ${tableName}`);
      setData(null);
      console.log(error);
    }

    if (data) {
      setData(data);
      setError(null);
    }
  } catch (error) {
    setError(`Could not fetch the data for ${tableName}`);
    setData(null);
    console.error(error);
  }
};

export default function Page() {

  const router = useRouter();
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [sports, setSports] = useState<Sport[] | null>(null);
  const [teams, setTeams] = useState<Team[] | null>(null);
  const [statuso, setStatuso] = useState<Status[] | null>(null);

  useEffect(() => {
    fetchTableData('sport', setSports, setFetchError);
  }, []);

  useEffect(() => {
    fetchTableData('team', setTeams, setFetchError);
  }, []);

  useEffect(() => {
    fetchTableData('status', setStatuso, setFetchError);
  }, []);

  
  const [event_name, setEvent_name] = useState<string | undefined>('');
  const [sport, setSport] = useState<string | undefined>('');
  const [status, setStatus] = useState<string | undefined>('');
  const [location, setLocation] = useState<string | undefined>('');
  const [date, setDate] = useState<string | undefined>('');
  const [time, setTime] = useState<string | undefined>('');
  const [team_A, setTeam_A] = useState<string | undefined>('');
  const [team_B, setTeam_B] = useState<string | undefined>('');
  const [formError, setFormError] = useState<string | null>(null); // Specify the type as string | null


  const handleSubmit = async (e:any) => {
    e.preventDefault()

    if (!event_name) {
      setFormError('Please fill in the event name.');
    } else if (!sport) {
      setFormError('Please fill in the sport.');
    } else if (!status) {
      setFormError('Please select a state.');
    } else if (!location) {
      setFormError('Please provide a location.');
    } else if (!date) {
      setFormError('Please select a date.');
    } else if (!time) {
      setFormError('Please provide a time.');
    } else if (!team_A) {
      setFormError('Please fill in Team A.');
    } else if (!team_B) {
      setFormError('Please fill in Team B.');
    } else {

      const info = [event_name, sport, status, location, date, time, team_A, team_B];

      const { data, error } = await supabase
      .from('event')
      .insert([{ event_name, date, time, location, status, sport, team_A, team_B }])
      .select()

    if (error) {
      console.log(info);
      console.log(error);
      setFormError('You have made some mistake');
    }
    if (data) {
      console.log(data);
      setFormError(null);
      toast.success("Event Created Successfully");
      router.push('/admin/event');
    }
      // Your code to handle the form data when all fields are filled correctly.
    } 
    
  }

  return (
    <div className="grid xl:grid-cols-6">
      <motion.div
      initial={{ opacity: 0, x: -200 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={transition}
      viewport={{ once: true }}
      className="h-auto col-start-1 col-end-3 hidden xl:block">
        <Image
          src="https://source.unsplash.com/iuJl2sKXoE4"
          alt=""
          width={1500}
          height={1500}
          className="inset-0 h-full w-full object-cover"
        ></Image>
      </motion.div>
      <motion.div 
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={transition}
      viewport={{ once: true }}
      className="container p-20 xl:w-9/12 mx-auto col-start-3 col-end-7">
        {fetchError && <p>{fetchError}</p>}
        <div className="text-3xl font-medium mx-auto text-center">
          Create an Event
        </div>
        <div className="container my-8 mx-auto">
          <form
            onSubmit={handleSubmit}
            method="post"
            className="flex justify-around flex-col lg:flex-row flex-wrap"
          >
            <div className="w-full px-10">
              <div className="flex flex-col gap-2 my-4">
                <label htmlFor="event_name" className="text-lg">
                  Event Name
                </label>
                <input
                  type="text"
                  name="event_name"
                  placeholder="Event Name"
                  value={event_name}
                  onChange={(e) => setEvent_name(e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="flex flex-col gap-2 my-4">
                <label htmlFor="sport" className="text-lg">
                  Sport
                </label>
                {sports && (
                  <div className="relative">
                    <select
                      name="sport"
                      value={sport}
                      onChange={(e) => setSport(e.target.value)}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md appearance-none"
                      defaultValue=""
                    >
                      <option value="Default">Select Sport</option>
                      {sports.map((sport) => (
                        <option key={sport.id} value={sport.sport_name}>
                          {sport.sport_name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#6B7280]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 my-4">
                <label htmlFor="status" className="text-lg">
                  Status
                </label>
                {statuso && (
                  <div className="relative">
                    <select
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      defaultValue="Select Status"
                    >
                      <option value="Default">Select Status</option>
                      {statuso.map((state) => (
                        <option key={state.id} value={state.status_name}>
                          {state.status_name}
                        </option>
                      ))}
                      👇
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#6B7280]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 my-4">
                <label htmlFor="location" className="text-lg">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter a location"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>

            <div className="w-full px-10">
              <div className="flex flex-col gap-2 my-4">
                <label htmlFor="date" className="text-lg">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="flex flex-col gap-2 my-4">
                <label htmlFor="time" className="text-lg">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={time}
                      onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="flex flex-col gap-2 my-4">
                <label htmlFor="team_A" className="text-lg">
                  Team 1
                </label>
                {teams && (
                  <div className="relative">
                    <select
                      name="team_A"
                      value={team_A}
                      onChange={(e) => setTeam_A(e.target.value)}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      defaultValue="Select Sport"
                    >
                      <option value="Default">Select Team</option>
                      {teams.map((team) => (
                        <option key={team.id} value={team.team_name || ''}>
                          {team.team_name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#6B7280]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 my-4">
                <label htmlFor="team_B" className="text-lg">
                  Team 2
                </label>
                {teams && (
                  <div className="relative">
                    <select
                      name="team_B"
                      value={team_B}
                      onChange={(e) => setTeam_B(e.target.value)}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      defaultValue="Select Sport"
                    >
                      <option value="Default">Select Team</option>
                      {teams.map((team) => (
                        <option key={team.id} value={team.team_name || ''}>
                          {team.team_name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#6B7280]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-end items-center py-10">
                <button className="bg-gradient-to-br from-blue-500 to-blue-900 p-3 rounded-lg shadow-lg">
                  Create Event
                </button>
              </div>
            </div>
            <Toaster position="bottom-center" reverseOrder={false} />
          </form>
          {formError && <p className="error">{formError}</p>}
        </div>
      </motion.div>
    </div>
  );
}
