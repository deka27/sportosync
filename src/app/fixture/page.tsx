'use client'

import supabase from '@/database/supabaseClient';
import React, { useEffect, useState } from 'react'
import { Database } from '../../../types/supabase';

type Fixture = Database["public"]["Tables"]["fixture"]["Row"];

export default function Page() {

     const [foot, setFoot] = useState<Fixture[] | null>(null);
     const [mvolley, setMvolley] = useState<Fixture[] | null>(null);
     const [fvolley, setFvolley] = useState<Fixture[] | null>(null);
     const [mbasket, setMbasket] = useState<Fixture[] | null>(null);
     const [fbasket, setFbasket] = useState<Fixture[] | null>(null);
     const [fetchError, setFetchError] = useState<string | null>(null);

     useEffect(()=>{
          const fetchFoot =async () => {
          const{data, error} = await supabase.from("fixture").select().eq("sport", '⚽ Football')
          if(error) {
               setFetchError("could not fetch the data");
               setFoot(null);
               console.log(error)
          }
           if(data) {
               setFoot(data)
               setFetchError(null)
           }    
          }
          fetchFoot();
     }, [])

  return (
    <div className='flex flex-col'>
     <div className='text-center w-full p-16 text-3xl font-semibold'>Fixture</div>
     <div>
          {foot && (
          <div className='Football'>
          {
               foot.map((foot)=>(
                    <div key={foot.id} className='flex gap-6'>
                         <div>{foot.team_A}</div>
                         <div>vs</div>
                         <div>{foot.team_B}</div>
                    </div>
               ))
          }
          </div>)}
          <div className='Basketball'>
               <div className='Men'></div>
               <div className='Women'></div>
          </div>
          <div className='Volleyball'>
               <div className='Men'></div>
               <div className='Women'></div>
          </div>
     </div>
    </div>
  )
}
