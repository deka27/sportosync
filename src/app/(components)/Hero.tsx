import Image from "next/image";
import heroimage from "../../../public/images/hero.png";
import icon from "../../../public/images/icon.png"

export default function Hero() {
  return (
    <div className="max-h-full flex flex-1 flex-col-reverse lg:flex-row mx-4">
      <div className="flex flex-col justify-end items-center mb-16 md:mb-64 mx-6 md:mx-16 md:w-5/6">
        <div className="">
        <Image src={icon} alt="Hero" className="h-16 lg:h-24 w-auto my-4"></Image>
        </div>
        <div className="text-3xl text-center 2xl:text-5xl font-bold mb-10 p-4">
          SportoSync
        </div>
        <div className="text-xl text-center p-4">Welcome to your Ultimate Sports Hub!</div>
        <div className="text-sm 2xl:text-lg text-center p-4 md:w-2/3 tracking-tighter">
          Your All-in-One Sports Hub. We&apos;re your dedicated sports  
          companion, delivering real-time scores, comprehensive team statistics,
          and a vibrant community for passionate fans.
        </div>
      </div>
      <div className="h-full">
        <Image src={heroimage} alt="Hero" className="h-min"></Image>
      </div>
    </div>
  );
}
