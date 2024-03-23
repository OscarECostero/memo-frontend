import MemoCard from "@/components/MemoCard";
import { clientMemoTest } from "@/services/client";
import { QUERY_GET_MEMO_TESTS } from "@/services/gql/MemoTests";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { MemoTest } from "../types/types";

const HomePage = () => {
  const [memotests, setMemoTests] = useState([]);
  const { data, refetch } = useQuery(QUERY_GET_MEMO_TESTS, {
    client: clientMemoTest,
  });

  useEffect(() => {
    if (data) {
      setMemoTests(data.getAllMemotests);
    }
  }, [data]);

  useEffect(() => {
    const fetchMemoTests = async () => {
      await refetch();
    };

    fetchMemoTests();
  }, [refetch]);
  
  return (
    <main className="p-14 flex flex-wrap gap-24 justify-center items-center">
      {memotests?.map((memotest: MemoTest) => (
        <MemoCard key={memotest.id} memotest={memotest} />
      ))}
    </main>
  );
};

export default HomePage;