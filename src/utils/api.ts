import { getAccessToken } from "./accessTokenStorage";
import {
  Board,
  Card,
  Column,
  CreateBoardBody,
  CreateCardBody,
  CreateColumnBody,
  LoginBody,
  LoginResponse,
  SignUpBody,
  SignUpResponse,
  UpdateBoardBody,
  UpdateCardBody,
  UpdateColumnBody,
} from "./apiTypes";

export const DEFAULT_BOARD_ID = 1;

const BASE_URL = "http://localhost:4000";
const AUTH_URL = `${BASE_URL}/auth`;
const BOARDS_URL = `${BASE_URL}/boards`;
const COLUMNS_URL = `${BASE_URL}/columns`;
const CARDS_URL = `${BASE_URL}/cards`;
const BASE_HEADERS = {
  ["Content-Type"]: "application/json",
};
const GET = "GET";
const POST = "POST";
const PATCH = "PATCH";
const DELETE = "DELETE";

const getAuthorizationHeader = (): { Authorization?: string } => {
  const accessToken = getAccessToken();
  return {
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : null),
  };
};

export const login = async (body: LoginBody): Promise<LoginResponse> => {};

export const signUp = async (body: SignUpBody): Promise<SignUpResponse> => {};

export const getBoards = async (): Promise<Board[]> => {
  return [];
};

export const createBoard = async (body: CreateBoardBody): Promise<Board> => {};

export const patchBoard = async ({
  id,
  board,
}: {
  id: number;
  board: UpdateBoardBody;
}): Promise<Board> => {};

export const deleteBoard = async (id: number): Promise<Board> => {};

export const getColumns = async (boardId: number): Promise<Column[]> => {
  return [];
};

export const createColumn = async (body: CreateColumnBody): Promise<Column> => {};

export const patchColumn = async ({
  id,
  data,
}: {
  id: number;
  data: UpdateColumnBody;
}): Promise<Column> => {};

export const deleteColumn = async (id: number): Promise<Column> => {};

export const getCards = async (columnId: number): Promise<Card[]> => {
  return [];
};

export const createCard = async (body: CreateCardBody): Promise<Card> => {};

export const patchCard = async ({
  id,
  data,
}: {
  id: number;
  data: UpdateCardBody;
}): Promise<Card> => {};

export const deleteCard = async (id: number): Promise<Card> => {};
