import React from "react";
import Image from "next/image";

const ImageCard: React.FC<any> = ({ image, position, turnCard, flipped }) => {
  return (
    <>
      <div
        className="w-40 bg-[#A8DADC] px-6 pt-20 pb-12 rounded-lg flex drop-shadow-3xl items-center justify-center hover:bg-dark-blue cursor-pointer select-none"
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
