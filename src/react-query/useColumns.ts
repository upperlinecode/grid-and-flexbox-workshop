import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createColumn, deleteColumn, getColumns, patchColumn } from "../utils/api";

const COLUMN_KEY = "columns";

export function useColumns(boardId?: number) {
  return useQuery({
    queryKey: [COLUMN_KEY, boardId],
    queryFn: () => getColumns(boardId || 0),
    enabled: typeof boardId === "number",
  });
}

export function useColumnCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createColumn,
    onSuccess: (data) => {
      queryClient.setQueriesData([COLUMN_KEY, data.boardId], (oldData: any) => [...oldData, data]);
    },
  });
}

export function useColumnUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchColumn,
    onSuccess: (data) => {
      queryClient.invalidateQueries([COLUMN_KEY, data.boardId]);
    },
  });
}

export function useColumnDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteColumn,
    onSuccess: (data) => {
      queryClient.invalidateQueries([COLUMN_KEY, data.boardId]);
    },
  });
}
