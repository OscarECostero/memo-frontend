import { useRouter } from "next/router";
import Image from "next/image";
import Modal from "@/components/Modal";
import Link from "next/link";
import { QUERY_GET_MEMO_TEST } from "@/services/gql/MemoTests";
import { clientMemoTest } from "@/services/client";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  MUTATION_CREATE_GAME_SESSION,
  MUTATION_INCREMENT_GAME_SESSION_RETRIES,
} from "@/services/gql/GameSession";
import { MemoImage, MemoTest } from "@/types/types";
import ImageList from "@/components/ImageList";

const GamePage = () => {
  const {
    query: { id },
  } = useRouter();

  const [gameData, setGameData] = useState<MemoTest>();

  const { data } = useQuery(QUERY_GET_MEMO_TEST, {
    client: clientMemoTest,
    variables: {
      id: parseInt(id as string),
    },
  });

  const [createGameSession] = useMutation(MUTATION_CREATE_GAME_SESSION, {
    client: clientMemoTest,
  });

  const [incrementGameSessionRetries] = useMutation(
    MUTATION_INCREMENT_GAME_SESSION_RETRIES,
    {
      client: clientMemoTest,
    }
  );

  const mutationCreateGameSession = async () => {
    try {
      await createGameSession({
        variables: {
          memo_test_id: id,
          numberOfPairs: 4,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const mutationIncrementRetries = async () => {
    try {
      await incrementGameSessionRetries({
        variables: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      setGameData(data.memotest);

      if (!data.memotest.gameSession) {
        mutationCreateGameSession();
      }
    }
  }, [data]);

  const [gameSessionData, setGameSessionData] = useState<any>(null);

  useEffect(() => {
    const handleCreateGameSessionResult = async () => {
      if (gameData) {
        try {
          const { data } = await createGameSession({
            variables: {
              memo_test_id: id,
              numberOfPairs: 4,
            },
          });

          setGameSessionData(data.createGameSession);
        } catch (error) {
          console.log(error);
        }
      }
    };

    handleCreateGameSessionResult();
  }, [gameData]);

  const [sortedImages, setSortedImages] = useState<MemoImage[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [flipped, setFlipped] = useState<any>({
    completed: [],
    selected: [],
  });
  const [currentFlipped, setCurrentFlipped] = useState<number[]>([]);

  useEffect(() => {
    if (gameData) {
      const pairsOfImages = gameData.images.reduce(function (
        array: any,
        current: any
      ) {
        const duplicateValue = {
          ...current,
          id: `${current.id}_2`,
        };

        return array.concat([current, duplicateValue]);
      },
      []);

      setSortedImages(pairsOfImages.sort(() => 0.5 - Math.random()));
    }
  }, [gameData]);

  const turnCard = (id: number) => {
    if (currentFlipped.length === 0) {
      setCurrentFlipped([id]);
      setFlipped({
        ...flipped,
        selected: [id],
      });
    } else if (!currentFlipped.includes(id)) {
      const firstFlippedImage = sortedImages.find(
        (image: MemoImage) => image.id === currentFlipped[0]
      );
      const currentImage = sortedImages.find(
        (image: MemoImage) => image.id === id
      );

      if (firstFlippedImage && currentImage) {
        const match = firstFlippedImage.url === currentImage.url;

        setFlipped({
          ...flipped,
          selected: [...flipped.selected, id],
        });

        if (match) {
          setFlipped({
            completed: [...flipped.completed, ...currentFlipped, id],
            selected: [],
          });
          setCurrentFlipped([]);

          mutationIncrementRetries();
          const images = [...flipped.completed, ...currentFlipped, id];

          const game = {
            gameId: id,
            images,
          };

          localStorage.setItem("game", JSON.stringify(game));

          if (images.length / 2 === (gameData?.images?.length || 0)) {
            setShowModal(true);
            localStorage.removeItem("game");
          }
        } else {
          mutationIncrementRetries();
          setTimeout(() => {
            setFlipped({
              ...flipped,
              selected: [],
            });
            setCurrentFlipped([]);
          }, 300);
        }
      }
    }
  };

  useEffect(() => {
    const storedGame = localStorage.getItem("game");

    if (storedGame !== null) {
      setFlipped({
        completed: JSON.parse(storedGame).images || [],
        selected: [],
      });
    }
  }, []);

  return (
    <div>
      {gameData && (
        <>
          <div className="flex items-center gap-3 text-white mb-16 select-none">
            <Link href={`/`}>
              <button type="button">
                <Image src="/svg/arrow.svg" alt="star" width={30} height={30} />
              </button>
            </Link>
            <div>
              <h1 className="text-4xl">{gameData.name}</h1>
            </div>
          </div>
          <div className="flex justify-center lg:w-4/6 xs:w-full flex-wrap lg:gap-12 xs:gap-4 md:row-gap-6 bg-black bg-opacity-20 backdrop-blur-8 lg:p-10 xs:p-4 rounded-lg mx-auto">
            <ImageList
              images={sortedImages}
              turnCard={turnCard}
              flipped={flipped}
            />
          </div>
          {showModal && <Modal gameSessionData={gameSessionData} />}
        </>
      )}
    </div>
  );
};

export default GamePage;
