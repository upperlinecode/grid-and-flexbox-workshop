import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createCard, deleteCard, getCards, patchCard } from "../utils/api";
import { Card } from "../utils/apiTypes";

const CARD_KEY = "cards";

export function useCards(columnId?: number) {
  return useQuery({
    queryKey: [CARD_KEY, columnId],
    queryFn: () => getCards(columnId || 0),
    enabled: typeof columnId === "number",
  });
}

export function useCardCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCard,
    onSuccess: (data) => {
      queryClient.setQueriesData([CARD_KEY, data.columnId], (oldData?: Card[]) => [
        ...(oldData || []),
        data,
      ]);
    },
  });
}

export function useCardUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: Parameters<typeof patchCard>[0] & { currentColumnId: number }) => {
      return patchCard({ id, data });
    },
    onSuccess(data, variables) {
      queryClient.invalidateQueries({ queryKey: [CARD_KEY, variables.currentColumnId] });
      queryClient.invalidateQueries({ queryKey: [CARD_KEY, data.columnId] });
    },
  });
}

export function useCardDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCard,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [CARD_KEY, data.columnId],
      });
    },
  });
}
