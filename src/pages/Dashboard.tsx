import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Settings, FolderGit2, Cpu, LogOut } from 'lucide-react';
import { PROJECTS } from '../../db';

export default function Dashboard() {
  const [projects] = useState(PROJECTS);

  return (
    <main className="flex-1 overflow-y-auto">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-border bg-background/60 backdrop-blur-md sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projetos</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie e publique seus projetos pessoais
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={18} /> Novo Projeto
        </Button>
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

                <div className="flex flex-wrap gap-1 mb-3">
                  {p.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground">Criado em: {p.created}</p>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm">
                  Editar
                </Button>
                <Button variant="destructive" size="sm">
                  Excluir
                </Button>
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
