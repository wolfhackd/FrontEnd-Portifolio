import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { deleteProject } from '@/services/Projects';

const DeleteProjectButton = ({
  project: p,
  fetchProjects,
}: {
  project: any;
  fetchProjects: () => Promise<void>;
}) => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const excludeProject = async (id: string) => {
    try {
      deleteProject(id);
      toast.success('Projeto deletado com sucesso');
      setOpenDialog(null);
      fetchProjects();
    } catch {
      toast.error('Erro ao deletar projeto');
    }
    console.log(id);
  };

  return (
    <Dialog open={openDialog === p.id} onOpenChange={(v) => setOpenDialog(v ? p.id : null)}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Excluir
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Você realmente deseja excluir?</DialogTitle>
          <DialogDescription>
            Essa ação apagará a tecnologia <strong>{p.title}</strong> permanentemente.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => {
              document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              excludeProject(p.id);
            }}
          >
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProjectButton;
