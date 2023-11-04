import React from "react";
import Image from "next/image";
import Line from "../../../(components)/Line";
import { HiTrophy } from "react-icons/hi2";

import wd from "../../../../../public/images/wd.jpg";
import ws from "../../../../../public/images/ws.jpg";
import md from "../../../../../public/images/md.jpg";
import ms from "../../../../../public/images/ms.jpg";

export default function page() {

  const images = [wd, ws, md, ms];

  return (
    <div>
      <div className="mt-16 px-12">
        <div className="mb-8 flex justify-between items-center">
          <div className="flex gap-4 text-3xl font-semibold">
             Bracket
          </div>
        </div>
        <Line />
      </div>
      <div className="mt-10 flex flex-col gap-4 justify-center items-center p-2">
      {images.map((image, index) => (
        <div key={index}>
          <Image
          src={image}
          alt="image"
          className="rounded-md"
          ></Image>
        </div>
      ))}
      </div>
    </div>
  );
}
