import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogHeader } from '@/components/ui/dialog';
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { NewProjectModal, type Project } from '@/components/NewProjectModal';
import axios from 'axios';
import { toast, Toaster } from 'sonner';

interface fetchProject extends Project {
  id: string;
  created: string;
  images?: string[];
  //Se der erro depois da categoria foi porque faltou adicionar aqui
}

export default function Dashboard() {
  const [projects, setProjects] = useState<fetchProject[]>([]);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  //Buscar projetos
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/projects`);
      setProjects(response.data as fetchProject[]);
    } catch {
      console.error('Erro ao buscar projetos');
    }
  };

  const dateFormater = (date: string) => {
    const createdDate = new Date(date);
    const formatedDate = createdDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    return formatedDate;
  };

  const handleCreate = async (newProject: Project) => {
    try {
      await axios.post(`${import.meta.env.VITE_API}/projects`, newProject, {
        withCredentials: true,
      });
      fetchProjects();
      setOpen(false);
      toast.success('Projeto criado com sucesso');
    } catch {
      toast.error('Erro ao criar projeto');
    }
  };

  //Depois terminar
  const deleteProject = async (id: string) => {
    try {
      await axios.post(`${import.meta.env.VITE_API}/projects-delete`, {
        id: id,
      });
      toast.success('Projeto deletado com sucesso');
      setOpenDialog(null);
      fetchProjects();
    } catch {
      toast.error('Erro ao deletar projeto');
    }
    console.log(id);
  };

  // -------------------Área de testes---------------------

  //----------------------------------------------------------

  //Inicializações
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <main className="flex-1 overflow-y-auto">
      <Toaster />
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-border bg-background/60 backdrop-blur-md sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projetos</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie e publique seus projetos pessoais
          </p>
        </div>
        <NewProjectModal open={open} setOpen={setOpen} handleCreate={handleCreate} />
      </header>

      {/* Grid de projetos */}
      <section className="p-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((p, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <h3 className="text-lg font-semibold mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{p.fastDescription}</p>

                {/* Estava dando erro pois não defini a propriedade pois não lembrava o nome */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {/* {p.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))} */}
                </div>

                <p className="text-xs text-muted-foreground">
                  Criado em: {dateFormater(p.created)}
                </p>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm">
                  Editar
                </Button>

                <Dialog
                  open={openDialog === p.id}
                  onOpenChange={(v) => setOpenDialog(v ? p.id : null)}
                >
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
                          deleteProject(p.id);
                        }}
                      >
                        Excluir
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>

        {/* Caso não tenha projetos */}
        {projects.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            Nenhum projeto cadastrado ainda.
          </div>
        )}
      </section>
    </main>
  );
}
