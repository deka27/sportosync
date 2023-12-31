"use client";

import supabase from "@/database/supabaseClient";
import { useEffect, useState } from "react";
import { Database } from '../../../../types/supabase'
import FadeLoader from "react-spinners/FadeLoader";

import { MdSportsMartialArts } from "react-icons/md";
import Line from "../../(components)/Line";
import Link from "next/link";

type Player = Database['public']['Tables']['player']['Row']

// EventRow component for rendering each employee row
function PlayerRow({id,player_name,village,team}: Player) {
  return (
    <tr>

      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
        {id}
      </td>
      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
        {player_name}
      </td>
      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
        {village}
      </td>
      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
        {team}
      </td>
     
      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center justify-end  gap-x-6">
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

function PlayerTable({ players }: { players: Player[] }) {

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const playersToDisplay = players.slice(startIndex, endIndex);

  const totalPages = Math.ceil(players.length / itemsPerPage);

  const handlePageChange = (page:any) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const visiblePages = 5; // Adjust this number to control how many pages you want to display
  const pageNumbers = [];

  for (let i = Math.max(1, currentPage - Math.floor(visiblePages / 2)); i <= Math.min(totalPages, currentPage + Math.floor(visiblePages / 2)); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
    <div className="overflow-x-auto bg-gray-800 shadow sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-4 py-3 bg-gray-700 text-left text-xs text-gray-300 uppercase tracking-wider">
              ID
            </th>
            <th className="px-4 py-3 bg-gray-700 text-left text-xs text-gray-300 uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 py-3 bg-gray-700 text-left text-xs text-gray-300 uppercase tracking-wider">
              Village
            </th>
            <th className="px-4 py-3 bg-gray-700 text-left text-xs text-gray-300 uppercase tracking-wider">
              Team
            </th>           
            
            <th className="px-4 py-3 bg-gray-700"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {playersToDisplay.map((player) => (
            <PlayerRow key={player.id} {...player} />
          ))}
        </tbody>
      </table>
    </div>
    {/* Pagination controls */}
    <div className="flex justify-between my-4">

    <div className="flex items-center text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
   
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage <= 1}
      className="flex flex-row gap-2 w-full px-5 py-2"
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
      Previous
    </button>
    </div>

    <div className="items-center hidden lg:flex gap-x-3">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={currentPage === pageNumber ? 'px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60' : 'px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100'}
            >
              {pageNumber}
            </button>
          ))}
      </div>

    <div className="flex items-center  text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"> 
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={endIndex >= players.length}
      className="flex flex-row gap-2 w-full px-5 py-2"
    >
      Next
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
    </button>
    
    </div>
  </div>
  </div>
  );
}

export default function Page(){
  const [fetchError, setFetchError] = useState<string | null>(null);;
  const [players, setPlayers] = useState<Player[] | null>(null);;

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase.from("player").select();

      if (error) {
        setFetchError("Could not fetch the data");
        setPlayers(null);
        console.log(error);
      }

      if (data) {
        setPlayers(data as Player[]); // Type assertion for data as an array of Event
        setFetchError(null);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div>
      <div className="mt-16 px-20">
        <div className="mb-8 flex justify-between items-center">
          <div className="flex gap-4 text-3xl font-semibold">
          <MdSportsMartialArts /> Players Panel
          </div>
          <Link href='/admin'><button className="bg-gradient-to-br from-blue-500 to-blue-900 p-2 rounded-lg">Go Admin Panel</button></Link>
        </div>
        <Line />
      </div>
    {fetchError && <p>{fetchError}</p>}

    {players ? (
      <div className="container mx-auto py-8 mb-16">
        <div className="flex items-center gap-x-3 my-6">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Players
          </h2>

          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {players.length} players total
          </span>
        </div>
        <PlayerTable players={players} />
      </div>
      
    ):(
      <div className="container mx-auto py-8 text-center flex flex-col gap-8 my-16">
          
          <div className="flex justify-center items-center"><FadeLoader color="#3689d6" /></div> 
          <div>Loading...</div>        
        </div>
    )}


  </div>
    );
}
