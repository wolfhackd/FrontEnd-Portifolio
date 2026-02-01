import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export type newTech = {
  name: string;
  icon: string;
  color: string;
};

export function useFetchTechnologies() {
  return useQuery({
    queryKey: ["technologies"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API}/technology`);
      return res.data;
    },
  });
}

export function useCreateTechnology() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tech: newTech) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/technology`,
        tech,
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Tecnologia criada com sucesso");
      //testar
      queryClient.invalidateQueries(["technologies"]);
    },
    onError: (error) => {
      console.error("Erro ao criar tecnologia:", error);
    },
  });
}

export function useDeleteTechnology() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (technologyId: string) => {
      await axios.post(
        `${import.meta.env.VITE_API}/technology-delete`,
        {
          id: technologyId,
        },
        {
          withCredentials: true,
        },
      );
    },
    onSuccess: () => {
      toast.success("Tecnologia deletada com sucesso");
      //testar
      queryClient.invalidateQueries(["technologies"]);
    },
  });
}
