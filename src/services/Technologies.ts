import type { Technology } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export type newTech = {
  name: string;
  icon: string;
  color: string;
};

export function useFetchTechnologies() {
  return useQuery<Technology[]>({
    queryKey: ['technologies'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API}/technologies`);
      return res.data;
    },
  });
}

export function useCreateTechnology() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tech: newTech) => {
      const response = await axios.post(`${import.meta.env.VITE_API}/technologies`, tech, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success('Tecnologia criada com sucesso');
      //testar
      queryClient.invalidateQueries(['technologies']);
    },
    onError: (error) => {
      console.error('Erro ao criar tecnologia:', error);
    },
  });
}

export function useDeleteTechnology() {
  // try {
  //   await axios.post(
  //     `${import.meta.env.VITE_API}/technologies-delete`,
  //     {
  //       id: technologyId,
  //     },
  //     {
  //       withCredentials: true,
  //     },
  //   );
  // } catch (error) {
  //   console.error('Erro ao deletar tecnologia:', error);
  // }
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (technologyId: string) => {
      await axios.post(
        `${import.meta.env.VITE_API}/technologies-delete`,
        {
          id: technologyId,
        },
        {
          withCredentials: true,
        },
      );
    },
    onSuccess: () => {
      toast.success('Tecnologia deletada com sucesso');
      //testar
      queryClient.invalidateQueries(['technologies']);
    },
  });
}
