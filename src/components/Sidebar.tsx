import { Button } from './ui/button';
import { FolderGit2, Cpu, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
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
  );
};

export default Sidebar;
