import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Character } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllCharacters() {
  const { actor, isFetching } = useActor();
  return useQuery<Character[]>({
    queryKey: ["characters"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCharacters();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateCharacter() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      name: string;
      gameSystem: string;
      race: string;
      gender: string;
      archetype: string;
      avatarId: bigint;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createCharacter(
        params.name,
        params.gameSystem,
        params.race,
        params.gender,
        params.archetype,
        params.avatarId,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
    },
  });
}

export function useDeleteCharacter() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteCharacter(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
    },
  });
}
