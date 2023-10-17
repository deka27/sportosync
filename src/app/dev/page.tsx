import React from 'react'

export default function page() {
  return (
    <div className=''>
     <div className='hidden md:flex md:flex-col'>
     <div className='text-2xl font-semibold text-center p-20'>Want to know developers?</div>
     <div className='justify-center items-center flex px-20 pb-20'>
          <video
            autoPlay loop muted playsInline preload="auto"
            className="rounded-lg w-2/3"
          >
            <source src="/videos/lg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
     </div>
     </div>
     <div className='h-screen flex justify-center md:hidden'>
          <div className='absolute z-10 mt-16 p-4 text-md font-semibold text-center bg-black rounded-xl'>Want to know developers?</div>
     <video
            autoPlay loop muted playsInline preload="auto"
            className="w-full h-screen object-cover absolute"
          >
            <source src="/videos/sm.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
     </div>
    </div>
  )
}
