import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

import { Button } from './ui/button';
import { toast } from 'sonner';
import { Checkbox } from './ui/checkbox';
import { ChevronDown } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Command, CommandGroup, CommandItem } from './ui/command';
import axios from 'axios';
import type { Challenge, Project, Technology } from '@/types';
import { TagInput } from './TagInput';
import { useMutation } from '@tanstack/react-query';

export const EditProjectButton = ({
  project: p,
  fetchProjects,
  technologies,
}: {
  project: Project;
  fetchProjects: () => Promise<void>;
  technologies: Technology[];
}) => {
  // Projects states
  const [title, setTitle] = useState(p.title);
  const [description, setDescription] = useState(p.description);
  const [link, setLink] = useState(p.link);
  const [fastDescription, setFastDesc] = useState(p.fastDescription);
  const [overview, setOverview] = useState(p.overview);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    p.technologies?.map((t: any) => t.id) || [],
  );
  const technologiesByCategory = technologies.reduce((acc: Record<string, Technology[]>, tech) => {
    if (!acc[tech.category.name]) acc[tech.category.name] = [];
    acc[tech.category.name].push(tech);
    return acc;
  }, {});
  const [images, setImages] = useState<string[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>(p.challenges || []);

  // Popover
  const [open, setOpen] = useState(false);

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

      const res = await axios.post(`${import.meta.env.VITE_API}/projects-edit/${p.id}`, body, {
        withCredentials: true,
      });

      return res.data;
    },
    onSuccess: async () => {
      toast.success('Projeto modificado com sucesso!');
      await fetchProjects();
      setOpen(false);
    },
    onError: () => {
      toast.error('Erro ao modificar projeto');
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

          {/* IMAGENS */}
          <label className="text-sm font-medium">Imagens</label>
          <TagInput value={images} onChange={setImages} />

          {/* CHALLENGES */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium">Desafios do projeto</label>

            {challenges.length === 0 && (
              <p className="text-sm text-muted-foreground">Nenhum desafio adicionado</p>
            )}

            {challenges.map((challenge, index) => (
              <div key={challenge.id} className="border rounded-md p-3 flex flex-col gap-2">
                <input
                  className="input border"
                  placeholder="Título do desafio"
                  value={challenge.title}
                  onChange={(e) => {
                    const updated = [...challenges];
                    updated[index].title = e.target.value;
                    setChallenges(updated);
                  }}
                />

                <textarea
                  className="textarea border"
                  placeholder="Descrição do desafio"
                  value={challenge.text}
                  onChange={(e) => {
                    const updated = [...challenges];
                    updated[index].text = e.target.value;
                    setChallenges(updated);
                  }}
                />

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setChallenges(challenges.filter((_, i) => i !== index));
                  }}
                >
                  Remover
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setChallenges([...challenges, { title: '', text: '' }])}
            >
              + Adicionar desafio
            </Button>
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

          <Button variant="default" onClick={() => editProject()} disabled={isPending}>
            {isPending ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
