"use client";

import supabase from "@/database/supabaseClient";
import { useEffect, useState } from "react";
import { Database } from '../../../../types/supabase'
import FadeLoader from "react-spinners/FadeLoader";

import { FaClock } from "react-icons/fa";
import Line from "../../(components)/Line";
import Link from "next/link";

type Event = Database['public']['Tables']['event']['Row']

// EventRow component for rendering each employee row
function EventRow({id,event_name,sport,status,time,date,team_A,team_B,refree}: Event) {
  return (
    <tr>

      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        {id}
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        {event_name}
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        {sport}
      </td>
      <td className={`px-4 py-4 text-sm whitespace-nowrap ${status === "Live" ? 'text-green-500': status === "Not Started" ? 'text-blue-500' : status === "Cancelled" ? 'text-red-500' : 'text-gray-300'}`}>
        {status}
      </td>           
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        {time}
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        {date}
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        {team_A}
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        {team_B}
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        {refree}
      </td>
      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center justify-end gap-x-6">
          <button className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
          <button className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

function EventTable({ events }: { events: Event[] }) {
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr>
            <th className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              ID
            </th>
            <th className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Sport
            </th>
            <th className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Time
            </th>
            <th className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Date
            </th>
            <th className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Team A
            </th>
            <th className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Team B
            </th>
            <th className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Refree
            </th>
            
            <th className="px-4 py-3 bg-gray-50 dark:bg-gray-700"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {events.map((event) => (
            <EventRow key={event.id} {...event} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Page(){
  const [fetchError, setFetchError] = useState<string | null>(null);;
  const [events, setEvents] = useState<Event[] | null>(null);;

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("event").select();

      if (error) {
        setFetchError("Could not fetch the data");
        setEvents(null);
        console.log(error);
      }

      if (data) {
        setEvents(data as Event[]); // Type assertion for data as an array of Event
        setFetchError(null);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <div className="mt-16 px-20">
        <div className="mb-8 flex justify-between items-center">
          <div className="flex gap-4 text-3xl font-semibold">
          <FaClock /> Events Panel
          </div>
          <Link href='/admin'><button className="bg-blue-500 p-2 rounded-lg">Go Admin Panel</button></Link>
        </div>
        <Line />
      </div>
    {fetchError && <p>{fetchError}</p>}

    {events ? (
      <div className="container mx-auto py-8 mb-16">
        <div className="flex items-center gap-x-3 my-6">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Events
          </h2>

          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {events.length} events total
          </span>
        </div>
        <EventTable events={events} />
        <div className="flex items-center justify-between mt-6">
          <a
            href="#"
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-5 h-5 rtl:-scale-x-100"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>

            <span>previous</span>
          </a>

          <div className="items-center hidden lg:flex gap-x-3">
            <a
              href="#"
              className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
            >
              1
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              2
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              3
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              ...
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              12
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              13
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              14
            </a>
          </div>

          <a
            href="#"
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <span>Next</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-5 h-5 rtl:-scale-x-100"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </a>
        </div>
      </div>
      
    ): (
      <div className="container mx-auto py-8 text-center flex flex-col gap-8 my-16">
          
          <div className="flex justify-center items-center"><FadeLoader color="#3689d6" /></div> 
          <div>Loading...</div>        
        </div>
    )}

  </div>
    );
}