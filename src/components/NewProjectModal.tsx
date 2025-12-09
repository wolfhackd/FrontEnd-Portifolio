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
import { initialState } from '@/pages/Dashboard';

export function NewProjectModal({
  open,
  setOpen,
  handleCreate,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleCreate: (project: any) => void;
}) {
  const [newProject, setNewProject] = useState<Project>(initialState);

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

          <Button
            onClick={() => {
              handleCreate(newProject);
              setNewProject(initialState);
            }}
          >
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
