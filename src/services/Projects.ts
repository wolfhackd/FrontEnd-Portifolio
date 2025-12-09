import type { Project } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { use } from 'react';
import { toast } from 'sonner';

export function useFetchProjects() {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API}/projects`);
      return response.data;
    },
  });
}
export const fetchProjectsById = async (id: string) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API}/projects/${id}`);
    return response.data as Project;
  } catch {
    console.error('Erro ao buscar projeto');
  }
};

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (project: Project) => {
      const response = await axios.post(`${import.meta.env.VITE_API}/projects`, project, {
        withCredentials: true,
      });
      return response.data as Project;
    },
    onSuccess: () => {
      toast.success('Projeto criado com sucesso');
      //testar
      queryClient.invalidateQueries(['projects']);
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.post(
        `${import.meta.env.VITE_API}/projects-delete`,
        { id },
        { withCredentials: true },
      );
    },
    onSuccess: () => {
      toast.success('Projeto deletado com sucesso');
      //testar
      queryClient.invalidateQueries(['projects']);
    },
  });
}
