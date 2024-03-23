import React from "react";
import Image from "next/image";
import Link from "next/link";
import Confetti from "react-confetti";
import { Howl } from "howler";
import { MUTATION_END_GAME_SESSION } from "@/services/gql/GameSession";
import { useMutation } from "@apollo/client";
import { clientMemoTest } from "@/services/client";
import { useEffect, useState } from "react";

interface ModalProps {
  gameSessionData: any;
}

const Modal: React.FC<ModalProps> = (props) => {
  const [mutationResult, setMutationResult] = useState<any>(null);
  const [gameSessionId, setGameSessionId] = useState<number | null>(null);
  const [endGameSession] = useMutation(MUTATION_END_GAME_SESSION, {
    client: clientMemoTest,
  });

  const { gameSessionData } = props;

  useEffect(() => {
    if (gameSessionData) {
      setGameSessionId(gameSessionData.id);
    }
  }, [gameSessionData]);

  useEffect(() => {
    const mutationEndGameSession = async () => {
      try {
        const { data } = await endGameSession({
          variables: {
            id: gameSessionData.id,
          },
        });
        setMutationResult(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (mutationResult === null) {
      mutationEndGameSession();
    }
  }, [endGameSession, mutationResult]);
  const score = mutationResult?.endGameSession?.score;

  const stars = (score: number) => {
    return Math.ceil(score / 20);
  };

  const playCelebrationSound = () => {
    const sound = new Howl({
      src: ["/celebration.mp3"],
      loop: false,
    });
    sound.play();
    return sound;
  };
  playCelebrationSound();

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="flex flex-col gap-8">
          <div className="flex justify-center gap-x-4">
            {(() => {
              const numStars = stars(score);
              const starElements = [];

              for (let i = 0; i < numStars; i++) {
                starElements.push(
                  <Image
                    key={i}
                    src="/svg/star.svg"
                    alt="star"
                    width={60}
                    height={60}
                  />
                );
              }

              return starElements;
            })()}
          </div>
          <h2 className="text-9xl font-bold text-white text-center">
            CONGRATS
          </h2>
          <p className="text-5xl font-bold text-white text-center">
            {mutationResult?.endGameSession?.score} POINTS
          </p>
          <div className="flex justify-center">
            <button className="w-1/4 text-white text-xl p-5 rounded-lg bg-orange hover:bg-dark-blue">
              <Link href={`/`}>HOME</Link>
            </button>
          </div>
          &&{" "}
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={true}
          />
        </div>
      </div>
    </>
  );
};

export default Modal;
