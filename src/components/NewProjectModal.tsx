import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import type { Project } from '@/types';

// interface Technology {
//   id: string;
//   name: string;
// }

// export interface Project {
//   title: string;
//   description: string;
//   fastDescription: string;
//   link: string;
//   overview: string;
// }

export function NewProjectModal({
  open,
  setOpen,
  handleCreate,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleCreate: (project: any) => void;
}) {
  const [newProject, setNewProject] = useState<Project>({
    title: '',
    description: '',
    fastDescription: '',
    link: '',
    overview: '',
  });

  // const [technologies, setTechnologies] = useState<Technology[]>([]);

  // useEffect(() => {
  //   const fetchTechnologies = async () => {
  //     const res = await axios.get(`${import.meta.env.VITE_API}/technologies`);
  //     setTechnologies(res.data);
  //   };
  //   fetchTechnologies();
  // }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus size={18} /> Novo projeto
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar novo projeto</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          {/* Nome, title */}
          <div className="flex flex-col gap-1.5">
            <Label>Nome</Label>
            <Input
              placeholder="Ex: Portfólio, API de Clima, Dashboard..."
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            />
          </div>

          {/* FastDescription */}
          <div className="flex flex-col gap-1.5">
            <Label>Descrição Rápida</Label>
            <Textarea
              placeholder="Descreva um resumo do projeto..."
              value={newProject.fastDescription}
              onChange={(e) => setNewProject({ ...newProject, fastDescription: e.target.value })}
            />
          </div>

          {/* Descrição , description*/}
          <div className="flex flex-col gap-1.5">
            <Label>Descrição</Label>
            <Textarea
              placeholder="Descreva brevemente o projeto..."
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
          </div>

          {/* Overview */}
          <div className="flex flex-col gap-1.5">
            <Label>Overview</Label>
            <Textarea
              placeholder="Descreva brevemente o projeto..."
              value={newProject.overview}
              onChange={(e) => setNewProject({ ...newProject, overview: e.target.value })}
            />
          </div>

          {/* Link */}
          <div className="flex flex-col gap-1.5">
            <Label>Link (opcional)</Label>
            <Input
              placeholder="https://github.com/usuario/projeto"
              value={newProject.link}
              onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
            />
          </div>

          {/* Tecnologias */}
          {/* <div className="flex flex-col gap-1.5">
            <Label>Tecnologias</Label>
            <Select
              onValueChange={(value) =>
                setNewProject((prev) => ({
                  ...prev,
                  technologies: prev.technologies.includes(value)
                    ? prev.technologies.filter((t) => t !== value)
                    : [...prev.technologies, value],
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione tecnologias" />
              </SelectTrigger>
              <SelectContent>
                {technologies.map((tech) => (
                  <SelectItem key={tech.id} value={tech.id}>
                    {tech.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}

          {/* Mostrar selecionadas */}
          {/* {newProject.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {newProject.technologies.map((id) => {
                  const tech = technologies.find((t) => t.id === id);
                  return (
                    <span
                      key={id}
                      className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                    >
                      {tech?.name}
                    </span>
                  );
                })}
              </div>
            )}
          </div> */}

          <Button onClick={() => handleCreate(newProject)}>Salvar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
