import type { Project } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export function useFetchProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API}/project`);
      return response.data;
    },
  });
}

export function useFetchProjectsById(id: string) {
  return useQuery<Project | null>({
    queryKey: ["projects", id],
    retry: false,
    enabled: !!id,
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API}/project/${id}`,
        );
        return res.data as Project;
      } catch (err: any) {
        if (err.response?.status === 404) {
          return null;
        }
        throw err;
      }
    },
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (project: Project) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/project`,
        project,
        {
          withCredentials: true,
        },
      );
      return response.data as Project;
    },
    onSuccess: () => {
      toast.success("Projeto criado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${import.meta.env.VITE_API}/project-delete/${id}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      toast.success("Projeto deletado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (project: Project) => {
      const response = await axios.put(
        `${import.meta.env.VITE_API}/project/${project.id}`,
        project,
        {
          withCredentials: true,
        },
      );
      return response.data as Project;
    },
    onSuccess: () => {
      toast.success("Projeto modificado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      toast.error("Erro ao modificar projeto");
    },
  });
}
