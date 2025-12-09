import type { Project } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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

export const createProject = async (project: Project) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API}/projects`, project, {
      withCredentials: true,
    });
    return response.data as Project;
  } catch {
    console.error('Erro ao criar projeto');
  }
};

export const deleteProject = async (id: string) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API}/projects-delete`,
      { id },
      { withCredentials: true },
    );
  } catch {
    console.error('Erro ao deletar projeto');
  }
};
