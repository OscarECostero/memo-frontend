export interface GameSession {
  state: string;
}

export interface MemoImage {
  id: number;
  url: string;
  memo_test_id: number;
}

export interface MemoTest {
  id: number;
  name: string;
  score: number;
  gameSession: GameSession;
  images: MemoImage[];
}
