import { getAccessToken } from "./accessTokenStorage";
import {
  CreateBoardBody,
  CreateCardBody,
  CreateColumnBody,
  LoginBody,
  SignUpBody,
  UpdateBoardBody,
  UpdateCardBody,
  UpdateColumnBody,
} from "./apiTypes";

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

const getAuthorizationHeader = () => {
  const accessToken = getAccessToken();
  return {
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : null),
  };
};

export const login = (body: LoginBody) =>
  fetch(`${AUTH_URL}/login`, {
    method: POST,
    headers: {
      ...BASE_HEADERS,
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

export const signUp = (body: SignUpBody) =>
  fetch(`${AUTH_URL}/signup`, {
    method: POST,
    headers: {
      ...BASE_HEADERS,
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

export const getBoards = () =>
  fetch(`${BOARDS_URL}`, {
    method: GET,
    headers: {
      ...BASE_HEADERS,
    },
  }).then((res) => res.json());

export const createBoard = (body: CreateBoardBody) =>
  fetch(`${BOARDS_URL}`, {
    method: POST,
    headers: {
      ...BASE_HEADERS,
      ...getAuthorizationHeader(),
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

export const patchBoard = (id: number, body: UpdateBoardBody) =>
  fetch(`${BOARDS_URL}/${id}`, {
    method: PATCH,
    headers: {
      ...BASE_HEADERS,
      ...getAuthorizationHeader(),
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

export const deleteBoard = (id: number) =>
  fetch(`${BOARDS_URL}/${id}`, {
    method: DELETE,
    headers: {
      ...BASE_HEADERS,
      ...getAuthorizationHeader(),
    },
  }).then((res) => res.json());

export const getColumns = (boardId: number) =>
  fetch(`${COLUMNS_URL}?boardId=${boardId}`, {
    method: GET,
    headers: {
      ...BASE_HEADERS,
    },
  }).then((res) => res.json());

export const createColumn = (body: CreateColumnBody) =>
  fetch(`${COLUMNS_URL}`, {
    method: POST,
    headers: {
      ...BASE_HEADERS,
      ...getAuthorizationHeader(),
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

export const patchColumn = (id: number, body: UpdateColumnBody) =>
  fetch(`${COLUMNS_URL}/${id}`, {
    method: PATCH,
    headers: {
      ...BASE_HEADERS,
      ...getAuthorizationHeader(),
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

export const deleteColumn = (id: number) =>
  fetch(`${COLUMNS_URL}/${id}`, {
    method: DELETE,
    headers: {
      ...BASE_HEADERS,
      ...getAuthorizationHeader(),
    },
  }).then((res) => res.json());

export const getCards = (columnId: number) =>
  fetch(`${CARDS_URL}?columnId=${columnId}`, {
    method: GET,
    headers: {
      ...BASE_HEADERS,
    },
  }).then((res) => res.json());

export const createCard = (body: CreateCardBody) =>
  fetch(`${CARDS_URL}`, {
    method: POST,
    headers: {
      ...BASE_HEADERS,
      ...getAuthorizationHeader(),
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

export const patchCard = (id: number, body: UpdateCardBody) =>
  fetch(`${CARDS_URL}/${id}`, {
    method: PATCH,
    headers: {
      ...BASE_HEADERS,
      ...getAuthorizationHeader(),
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

export const deleteCard = (id: number) =>
  fetch(`${CARDS_URL}/${id}`, {
    method: DELETE,
    headers: {
      ...BASE_HEADERS,
      ...getAuthorizationHeader(),
    },
  }).then((res) => res.json());
