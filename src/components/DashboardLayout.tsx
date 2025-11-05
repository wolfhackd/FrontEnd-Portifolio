import { Outlet } from 'react-router-dom';
import { Button } from './ui/button';
import { Cpu, FolderGit2, LogOut, Plus, Settings } from 'lucide-react';

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-muted/10">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r border-border flex flex-col justify-between">
        <div>
          <div className="p-6">
            <h2 className="text-xl font-semibold tracking-tight">Painel</h2>
            <p className="text-sm text-muted-foreground">Gerencie seu portfólio</p>
          </div>
          <nav className="flex flex-col gap-1 px-3">
            <Button variant="ghost" className="justify-start gap-2">
              <FolderGit2 size={18} /> Projetos
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Cpu size={18} /> Tecnologias
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Settings size={18} /> Configurações
            </Button>
          </nav>
        </div>
        <div className="p-3">
          <Button
            variant="ghost"
            className="justify-start gap-2 text-destructive hover:text-destructive"
          >
            <LogOut size={18} /> Sair
          </Button>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-5 border-b border-border bg-background/60 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Projetos</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie e publique seus projetos pessoais
            </p>
          </div>
          {/* Botão do dialog */}
          <Button className="flex items-center gap-2">
            <Plus size={18} /> Novo Projeto
          </Button>
        </header>

        {/* Grid de projetos */}
        <section className="p-8">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
