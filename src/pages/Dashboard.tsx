import { useEffect, useState } from 'react';
import { NewProjectModal } from '@/components/NewProjectModal';
import { toast, Toaster } from 'sonner';
import { Badge } from '@/components/ui/badge';
import DeleteProjectButton from '@/components/DeleteProjectButton';
import { createProject, fetchProjects } from '@/services/Projects';
import { dateFormater } from '@/utils/dateFromater';
import { EditProjectButton } from '@/components/EditProjectButton';
import { fetchTechnologies } from '@/services/Technologies';
import type { Project, Technology } from '@/types';

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [technologies, setTechnologies] = useState<Technology[]>([]);

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
    fetchTechnologies().then(setTechnologies);
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
                      {tech.name}
                    </Badge>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground">
                  Criado em: {p.created ? dateFormater(p.created) : 'Sem data'}
                </p>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <EditProjectButton
                  project={p}
                  fetchProjects={loadProjects}
                  technologies={technologies}
                />

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
