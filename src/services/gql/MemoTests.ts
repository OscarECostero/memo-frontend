import { gql } from "@apollo/client";

export const QUERY_GET_MEMO_TESTS = gql`
  query GetAllMemoTests {
    getAllMemotests {
      id
      name
      score
      gameSession {
        state
      }
    }
  }
`;

export const QUERY_GET_MEMO_TEST = gql`
  query GetSingleMemoTest($id: ID!) {
    memotest(id: $id) {
      id
      name
      score
      images {
        id
        url
        memo_test_id
      }
      gameSession {
        state
      }
    }
  }
`;
