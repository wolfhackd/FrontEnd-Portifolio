import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { NewProjectModal, type Project } from '@/components/NewProjectModal';
import { toast, Toaster } from 'sonner';
import { Badge } from '@/components/ui/badge';
import DeleteProjectButton from '@/components/DeleteProjectButton';
import { createProject, fetchProjects, type fetchProject } from '@/services/Projects';
import { dateFormater } from '@/services/utils';

export default function Dashboard() {
  const [projects, setProjects] = useState<fetchProject[]>([]);
  const [open, setOpen] = useState(false);

  const loadProjects = async () => {
    const res = await fetchProjects();
    if (res) setProjects(res);
  };

  const handleCreate = async (newProject: Project) => {
    try {
      await createProject(newProject);
      loadProjects();
      setOpen(false);
      toast.success('Projeto criado com sucesso');
    } catch {
      toast.error('Erro ao criar projeto');
    }
  };

  // -------------------Área de testes---------------------(:3)

  //----------------------------------------------------------

  //Initialization of projects
  useEffect(() => {
    loadProjects();
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

      {/* Grid of projects */}
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

                {/* List of technologies of the project */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {p.technologies?.map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground">
                  Criado em: {dateFormater(p.created)}
                </p>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm">
                  Editar
                </Button>

                <DeleteProjectButton project={p} fetchProjects={loadProjects} />
              </div>
            </div>
          ))}
        </div>

        {/* Message when there are no projects */}
        {projects.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            Nenhum projeto cadastrado ainda.
          </div>
        )}
      </section>
    </main>
  );
}
