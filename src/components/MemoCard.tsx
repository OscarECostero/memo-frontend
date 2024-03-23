import React from "react";
import Image from "next/image";
import { MemoTest } from "@/types/types";
import Link from "next/link";

type MemoCardProps = {
  memotest: MemoTest;
};

const MemoCard: React.FC<MemoCardProps> = ({ memotest }) => {
  return (
    <>
      <div className="lg:w-96 lg:h-96 sm:w-64 sm:h-64 xs:h-64 xs:w-64 xs:pt-12 bg-[#A8DADC] px-6 lg:pt-24 pb-12 rounded-lg flex flex-col justify-between drop-shadow-3xl text-center">
        <div>
          <h1 className="text-orange text-5xl">{memotest.name}</h1>
          <div className="flex justify-center gap-4">
            <Image src="/svg/star.svg" alt="star" width={30} height={30} />
            <p className="text-orange text-2xl">{memotest.score} Points</p>
          </div>
        </div>

        <div>
          <Link href={`/games/${memotest.id}`}>
            <button className="xs:p-2 w-3/4 text-white text-xl lg:p-5 rounded-lg bg-orange hover:bg-dark-blue">
              {memotest.gameSession === null ||
              memotest.gameSession.state === "Completed"
                ? "Start"
                : "Continue"}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MemoCard;
