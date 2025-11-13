import type { Project } from '@/components/NewProjectModal';
import axios from 'axios';

export interface fetchProject extends Project {
  id: string;
  created: string;
  images?: string[];
  //Falta os dois relacionamentos o technologies e challenges
  technologies?: string[];
  challenges?: string[];
}

export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API}/projects`);
    return response.data as fetchProject[];
  } catch {
    console.error('Erro ao buscar projetos');
  }
};

export const createProject = async (project: Project) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API}/projects`, project, {
      withCredentials: true,
    });
    return response.data as fetchProject;
  } catch {
    console.error('Erro ao criar projeto');
  }
};
