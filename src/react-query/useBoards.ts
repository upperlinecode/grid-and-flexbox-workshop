import { useQuery } from "@tanstack/react-query";
import { getBoards } from "../utils/api";

const BOARDS_KEY = "boards";
const BOARD_ID = 7;

export default function useBoards() {
  return useQuery({
    queryKey: [BOARDS_KEY],
    queryFn: () => getBoards().then((boards) => boards.find((board) => board.id === BOARD_ID)),
  });
}
