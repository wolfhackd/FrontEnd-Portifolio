import type { Project } from '@/types';
import axios from 'axios';

export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API}/projects`);
    return response.data as Project[];
  } catch {
    console.error('Erro ao buscar projetos');
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
