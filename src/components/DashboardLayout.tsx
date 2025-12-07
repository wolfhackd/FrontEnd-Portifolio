import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Cpu, FolderGit2, LogOut, Settings } from 'lucide-react';

export function DashboardLayout() {
  const navigate = useNavigate();

  const handleClick = (link: string) => {
    navigate(link);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API}/logout`, {
        method: 'GET',
        credentials: 'include',
      });
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="flex h-screen bg-muted/10">
      <aside className="w-64 bg-background border-r border-border flex flex-col justify-between">
        <div>
          <div className="p-6">
            <h2 className="text-xl font-semibold tracking-tight">Painel</h2>
            <p className="text-sm text-muted-foreground">Gerencie seu portfólio</p>
          </div>
          <nav className="flex flex-col gap-1 px-3">
            <Button
              variant="ghost"
              className="justify-start gap-2"
              onClick={() => handleClick('/dashboard')}
            >
              <FolderGit2 size={18} /> Projetos
            </Button>
            <Button
              variant="ghost"
              className="justify-start gap-2"
              onClick={() => handleClick('/dashboard/technologies')}
            >
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
            onClick={handleLogout}
          >
            <LogOut size={18} /> Sair
          </Button>
        </div>
      </aside>

      <Outlet />
    </div>
  );
}
