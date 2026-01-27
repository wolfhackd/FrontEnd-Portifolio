import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { Button } from "./ui/button";
import { toast } from "sonner";
import { Checkbox } from "./ui/checkbox";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Command, CommandGroup, CommandItem } from "./ui/command";
import axios from "axios";
import type { Challenge, Project, Technology } from "@/types/types";
import { TagInput } from "./TagInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFetchTechnologies } from "@/services/Technologies";

export const EditProjectButton = ({ project: p }: { project: Project }) => {
  // Projects states
  const [title, setTitle] = useState(p.title);
  const [description, setDescription] = useState(p.description);
  const [link, setLink] = useState(p.link);
  const [fastDescription, setFastDesc] = useState(p.fastDescription);
  const [overview, setOverview] = useState(p.overview);
  const { data: Technology } = useFetchTechnologies();
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    p.technologies?.map((t: any) => t.id) || [],
  );
  

  const technologiesByCategory = Technology?.reduce((acc: Record<string, Technology[]>, tech: Technology) => {
    const categoryName = tech.category?.name || "Outros"; 
    
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push(tech);
    return acc;
  }, {}) || {};


  const [images, setImages] = useState<string[]>(p.images || []);
  // if (p.images) setImages(p.images);
  const [challenges, setChallenges] = useState<Challenge[]>(p.challenges || []);

  // Popover
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: editProject, isPending } = useMutation({
    mutationFn: async () => {
      const body = {
        id: p.id,
        title,
        description,
        link,
        fastDescription,
        overview,
        technologies: selectedTechnologies,
        images,
        challenges,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API}/projects-edit/${p.id}`,
        body,
        {
          withCredentials: true,
        },
      );

      return res.data;
    },
    onSuccess: async () => {
      toast.success("Projeto modificado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setOpen(false);
    },
    onError: () => {
      toast.error("Erro ao modificar projeto");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Editar
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edição de projeto</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-3">
          {/* Título */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Título</label>
            <input
              className="input border"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Descrição */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Descrição</label>
            <textarea
              className="textarea border"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Link */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Link</label>
            <input
              className="input border"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          {/* Fast Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Descrição rápida</label>
            <textarea
              className="textarea border"
              value={fastDescription}
              onChange={(e) => setFastDesc(e.target.value)}
            />
          </div>

          {/* Overview */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Overview</label>
            <textarea
              className="textarea border"
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
            />
          </div>
          </div>

          {/* MULTISELECT DE TECNOLOGIAS */}
          <div className="flex flex-col gap-1">
  <label className="text-sm font-medium">Tecnologias</label>

  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" className="justify-between w-full">
        {selectedTechnologies.length > 0
          ? `${selectedTechnologies.length} selecionadas`
          : "Selecione tecnologias"}
        <ChevronDown size={16} />
      </Button>
    </PopoverTrigger>

    <PopoverContent className="w-72 p-0 max-h-64 overflow-y-auto">
      <Command>
        {/* O CommandList é obrigatório em versões recentes do shadcn para evitar erros */}
        <div className="max-h-64 overflow-y-auto"> 
          {Object.keys(technologiesByCategory).length > 0 ? (
            Object.keys(technologiesByCategory).map((cat) => (
              <CommandGroup key={cat} heading={cat}>
                {technologiesByCategory[cat].map((tech) => {
                  const isSelected = selectedTechnologies.includes(tech.id);
                  return (
                    <CommandItem
                      key={tech.id}
                      onSelect={() => {
                        if (isSelected) {
                          setSelectedTechnologies(
                            selectedTechnologies.filter((id) => id !== tech.id)
                          );
                        } else {
                          setSelectedTechnologies([...selectedTechnologies, tech.id]);
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox checked={isSelected} />
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ background: tech.color }}
                        />
                        {tech.name}
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ))
          ) : (
            <div className="p-4 text-sm text-center">Nenhuma tecnologia encontrada.</div>
          )}
        </div>
      </Command>
    </PopoverContent>
  </Popover>
</div>

        {/* AÇÕES */}
        <div className="flex justify-end gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => {
              document.dispatchEvent(
                new KeyboardEvent("keydown", { key: "Escape" }),
              );
            }}
          >
            Cancelar
          </Button>

          <Button
            variant="default"
            onClick={() => editProject()}
            disabled={isPending}
          >
            {isPending ? "Salvando..." : "Salvar alterações"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
