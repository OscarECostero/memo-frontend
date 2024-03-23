import React from "react";
import Image from "next/image";

const ImageCard: React.FC<any> = ({ image, position, turnCard, flipped }) => {
  return (
    <>
      <div
        className="lg:w-40 xs:w-20 xs:w-20 bg-[#A8DADC] px-6 lg:pt-20 xs:pt-8 lg:pb-12 xs:pb-6 rounded-lg flex drop-shadow-3xl items-center justify-center hover:bg-dark-blue cursor-pointer select-none"
        onClick={() => turnCard(image.id)}
      >
        <Image
          src={image.url}
          alt={image.id}
          layout="fill"
          objectFit="cover"
          className={`rounded-lg ${flipped.completed?.includes(image.id) || flipped.selected?.includes(image.id) ? "block" : "hidden"}`}
        />
        <h1 className="text-5xl text-orange">{position + 1}</h1>
      </div>
    </>
  );
};

export default ImageCard;
