import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

import { Button } from './ui/button';
import { toast } from 'sonner';
import { Checkbox } from './ui/checkbox';
import { ChevronDown } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Command, CommandGroup, CommandItem } from './ui/command';
import axios from 'axios';
import type { Technology } from '@/types';

// export interface Category {
//   id: string;
//   name: string;
// }

export const EditProjectButton = ({
  project: p,
  fetchProjects,
  technologies,
}: {
  project: any;
  fetchProjects: () => Promise<void>;
  technologies: Technology[];
}) => {
  // ----------------------
  // Estados do projeto
  // ----------------------
  const [title, setTitle] = useState(p.title);
  const [description, setDescription] = useState(p.description);
  const [link, setLink] = useState(p.link);
  const [fastDescription, setFastDesc] = useState(p.fastDescription);
  const [overview, setOverview] = useState(p.overview);

  const [open, setOpen] = useState(false);

  // Tecnologias selecionadas (vem do projeto)
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    p.technologies?.map((t: any) => t.id) || [],
  );

  // -----------------------
  // MultiSelect agrupado por categoria
  // -----------------------
  const technologiesByCategory = technologies.reduce((acc: Record<string, Technology[]>, tech) => {
    if (!acc[tech.category.name]) acc[tech.category.name] = [];
    acc[tech.category.name].push(tech);
    return acc;
  }, {});

  // -----------------------
  // Função de edição
  // -----------------------
  const editProject = async () => {
    try {
      const body = {
        id: p.id,
        title,
        description,
        link,
        fastDescription,
        overview,
        technologies: selectedTechnologies, // IDs das techs
      };

      const res = await axios.post(`${import.meta.env.VITE_API}/project-edit/${p.id}`, body, {
        withCredentials: true,
      });

      toast.success('Projeto modificado com sucesso!');

      console.log(res.data);
      await fetchProjects();
      setOpen(false);
    } catch (err) {
      toast.error('Erro ao modificar projeto');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Editar
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Edição de projeto</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-3">
          {/* Título */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Título</label>
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          {/* Descrição */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Descrição</label>
            <textarea
              className="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Link */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Link</label>
            <input className="input" value={link} onChange={(e) => setLink(e.target.value)} />
          </div>

          {/* Fast Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Descrição rápida</label>
            <textarea
              className="textarea"
              value={fastDescription}
              onChange={(e) => setFastDesc(e.target.value)}
            />
          </div>

          {/* Overview */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Overview</label>
            <textarea
              className="textarea"
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
            />
          </div>

          {/* MULTISELECT DE TECNOLOGIAS */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Tecnologias</label>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-between">
                  {selectedTechnologies.length > 0
                    ? `${selectedTechnologies.length} selecionadas`
                    : 'Selecione tecnologias'}
                  <ChevronDown size={16} />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-72 p-0 max-h-64 overflow-y-auto">
                <Command>
                  {Object.keys(technologiesByCategory).map((cat) => (
                    <CommandGroup key={cat} heading={cat}>
                      {technologiesByCategory[cat].map((tech) => {
                        const isSelected = selectedTechnologies.includes(tech.id);

                        return (
                          <CommandItem
                            key={tech.id}
                            onSelect={() => {
                              if (isSelected) {
                                setSelectedTechnologies(
                                  selectedTechnologies.filter((id) => id !== tech.id),
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
                  ))}
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* AÇÕES */}
        <div className="flex justify-end gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => {
              document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
            }}
          >
            Cancelar
          </Button>

          <Button variant="default" onClick={editProject}>
            Salvar alterações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
