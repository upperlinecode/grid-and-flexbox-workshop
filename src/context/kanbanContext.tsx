import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import * as api from "../utils/api";
import { CreateCardBody, CreateColumnBody } from "../utils/apiTypes";
import produce from "immer";
import { noop } from "../utils/noop";

const BOARD_TITLE = "GM Tasks";

interface Card {
  id: number;
  title: string;
  description?: string;
  columnId: number;
}

interface Column {
  id: number;
  title: string;
  boardId: number;
  cards: Card[];
}

interface Store {
  id: number;
  title: string;
  columns: {
    ids: Column["id"][];
    byId: {
      [key: Column["id"]]: Column;
    };
  };
  cards: {
    idsByColumnId: {
      [key: Column["id"]]: Card["id"][];
    };
    byId: {
      [key: Card["id"]]: Card;
    };
  };
}

interface Kanban {
  id: number;
  title: string;
  columns: Column[];
}

interface Context {
  kanbanState: Kanban | null;
  createColumn: (column: CreateColumnBody) => Promise<void>;
  createCard: (card: CreateCardBody) => Promise<void>;
  deleteCard: (columnId: number, id: number) => Promise<void>;
  deleteColumn: (id: number) => Promise<void>;
  moveCard: (
    cardId: number,
    columnId: number,
    previousCardId: number | null,
    nextCardId: number | null
  ) => Promise<void>;
  moveColumn: (
    columnId: number,
    previousColumnId: number | null,
    nextColumnId: number | null
  ) => Promise<void>;
}

const KanbanContext = createContext<Context>({
  kanbanState: null,
  createCard: noop,
  createColumn: noop,
  deleteCard: noop,
  deleteColumn: noop,
  moveCard: noop,
  moveColumn: noop,
});

const reducer = produce((draft: Store | null, { type, payload }: any) => {
  if (type === "SET_KANBAN") {
    const { id, title, columns } = payload as Kanban;
    const store: Store = {
      id,
      title,
      columns: { ids: [], byId: {} },
      cards: { idsByColumnId: {}, byId: {} },
    };
    const normalizedColumns = columns.reduce(
      (acc: Omit<Store, "id" | "title">, next: Column) => {
        acc.columns.ids.push(next.id);
        acc.columns.byId[next.id] = next;

        acc.cards = next.cards.reduce((acc, next) => {
          acc.byId[next.id] = next;
          const cardsByColumnId = acc.idsByColumnId[next.columnId] ?? [];
          acc.idsByColumnId[next.columnId] = [...cardsByColumnId, next.id];
          return acc;
        }, acc.cards);

        return acc;
      },
      {
        columns: {
          ids: [],
          byId: {},
        },
        cards: {
          idsByColumnId: [],
          byId: {},
        },
      } as Omit<Store, "id" | "title">
    );

    return { ...store, ...normalizedColumns };
  }

  if (!draft) {
    throw new Error("Board not initialized");
  }

  switch (type) {
    case "CREATE_COLUMN": {
      draft.columns.byId[payload.id] = payload;
      draft.columns.ids.push(payload.id);
      break;
    }
    case "CREATE_CARD": {
      const { columnId, id } = payload;
      draft.cards.idsByColumnId[columnId] = draft.cards.idsByColumnId[columnId] || [];
      draft.cards.idsByColumnId[columnId].push(id);
      draft.cards.byId[id] = payload;
      break;
    }
    case "DELETE_COLUMN": {
      const { id } = payload;
      // delete column
      const columnIndex = draft.columns.ids.findIndex((columnId) => columnId === id);
      draft.columns.ids.splice(columnIndex, 1);
      delete draft.columns.byId[id];
      // delete cards associated with column
      const cardIds = draft.cards.idsByColumnId[id];
      if (cardIds) {
        cardIds.forEach((cardId) => {
          delete draft.cards.byId[cardId];
        });
        delete draft.cards.idsByColumnId[id];
      }
      break;
    }
    case "DELETE_CARD": {
      const { columnId, id } = payload;
      const cardIndex = draft.cards.idsByColumnId[columnId].findIndex((cardId) => cardId === id);
      draft.cards.idsByColumnId[columnId].splice(cardIndex, 1);
      delete draft.cards.byId[id];
      break;
    }
    case "MOVE_COLUMN": {
      const { columnId, previousColumnId, nextColumnId } = payload;
      const columnIndex = draft.columns.ids.findIndex((id) => id === columnId);
      draft.columns.ids.splice(columnIndex, 1);

      if (previousColumnId === null) {
        draft.columns.ids.unshift(columnId);
      } else if (nextColumnId === null) {
        draft.columns.ids.push(columnId);
      } else {
        const previousIndex = draft.columns.ids.findIndex((id) => id === previousColumnId);
        draft.columns.ids.splice(previousIndex + 1, 0, columnId);
      }
      break;
    }
    case "MOVE_CARD": {
      const { cardId, columnId, previousCardId, nextCardId } = payload;
      const card = draft.cards.byId[cardId];
      const cardIndex = draft.cards.idsByColumnId[card.columnId].findIndex((id) => id === cardId);
      draft.cards.idsByColumnId[card.columnId].splice(cardIndex, 1);
      draft.cards.idsByColumnId[columnId] = draft.cards.idsByColumnId[columnId] || [];

      if (card.columnId !== columnId || nextCardId === null) {
        draft.cards.idsByColumnId[columnId].push(cardId);
      } else if (previousCardId === null) {
        draft.cards.idsByColumnId[columnId].unshift(cardId);
      } else {
        const previousCardIndex = draft.cards.idsByColumnId[columnId].findIndex(
          (id) => id === previousCardId
        );
        draft.cards.idsByColumnId[columnId].splice(previousCardIndex + 1, 0, cardId);
      }

      draft.cards.byId[cardId].columnId = columnId;
      break;
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
});

function KanbanProvider(props: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, null);
  useEffect(() => {
    api.getBoards().then(async (boards) => {
      let board = boards.find((b) => b.title === BOARD_TITLE);
      if (!board) {
        board = await api.createBoard({ title: BOARD_TITLE });
      }
      const columns = await api.getColumns(board.id);
      const cardsByColumn = await Promise.all(columns.map((column) => api.getCards(column.id)));
      const columnsWithCards = columns.map((column, index: number) => ({
        ...column,
        cards: cardsByColumn[index],
      }));
      const kanban = {
        id: board.id,
        title: board.title,
        columns: columnsWithCards,
      };
      dispatch({ type: "SET_KANBAN", payload: kanban });
    });
  }, []);
  const kanbanState = useMemo(() => {
    if (!state) {
      return null;
    }
    const { cards, columns, ...rest } = state;
    return {
      ...rest,
      columns: columns.ids.map((id) => {
        const column = columns.byId[id];
        return {
          ...column,
          cards: (cards.idsByColumnId[id] || []).map((cardId) => cards.byId[cardId]),
        };
      }),
    };
  }, [state]);

  const createColumn = async (columnRequest: CreateColumnBody) => {
    if (!state) {
      throw new Error("Board not initialized");
    }
    const column = await api.createColumn({ ...columnRequest, boardId: state.id });
    dispatch({ type: "CREATE_COLUMN", payload: column });
  };

  const createCard = async (cardRequest: CreateCardBody) => {
    const card = await api.createCard(cardRequest);
    dispatch({ type: "CREATE_CARD", payload: card });
  };

  const deleteCard = async (columnId: number, id: number) => {
    await api.deleteCard(id);
    dispatch({ type: "DELETE_CARD", payload: { columnId, id } });
  };

  const deleteColumn = async (id: number) => {
    await api.deleteColumn(id);
    dispatch({ type: "DELETE_COLUMN", payload: { id } });
  };

  const moveColumn = async (
    columnId: number,
    previousColumnId: number | null,
    nextColumnId: number | null
  ) => {
    await api.patchColumn({ id: columnId, data: { previousColumnId, nextColumnId } });
    dispatch({ type: "MOVE_COLUMN", payload: { columnId, previousColumnId, nextColumnId } });
  };

  const moveCard = async (
    cardId: number,
    columnId: number,
    previousCardId: number | null,
    nextCardId: number | null
  ) => {
    await api.patchCard({ id: cardId, data: { columnId, previousCardId, nextCardId } });
    dispatch({
      type: "MOVE_CARD",
      payload: { columnId, cardId, previousCardId, nextCardId },
    });
  };

  return (
    <KanbanContext.Provider
      value={{
        kanbanState,
        createColumn,
        createCard,
        deleteCard,
        deleteColumn,
        moveCard,
        moveColumn,
      }}
    >
      {props.children}
    </KanbanContext.Provider>
  );
}

function useKanban() {
  const context = useContext(KanbanContext);
  if (context === undefined) {
    throw new Error("useKanban must be used within a KanbanContext");
  }
  return context;
}

export { KanbanProvider, useKanban };
