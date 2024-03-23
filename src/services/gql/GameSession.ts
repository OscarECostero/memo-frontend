import { gql } from "@apollo/client";

export const MUTATION_CREATE_GAME_SESSION = gql`
  mutation CreateGameSession($memo_test_id: ID!, $numberOfPairs: Int!) {
    createGameSession(
      input: { memo_test_id: $memo_test_id, numberOfPairs: $numberOfPairs }
    ) {
      id
      memo_test_id
      retries
      number_of_pairs
      state
    }
  }
`;

export const MUTATION_INCREMENT_GAME_SESSION_RETRIES = gql`
  mutation IncrementGameSessionRetries ($id: ID!) {
    incrementGameSessionRetries(id: $id) {
      id
      retries
    }
  }
`;

export const MUTATION_END_GAME_SESSION = gql`
  mutation EndGameSession($id: ID!) {
    endGameSession(id: $id) {
      id
      state
      score
    }
  }
`;
