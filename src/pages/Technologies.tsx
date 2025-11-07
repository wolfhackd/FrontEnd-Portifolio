import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Cpu } from 'lucide-react';
import { NewTechnologyModal } from '@/components/NewTechnologieModal';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Technology {
  id: string;
  name: string;
  categoryID: string;
  category: {
    id: string;
    name: string;
  };
}

type newTech = {
  name: string;
  icon: string;
  color: string;
};

export default function Technologies() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [open, setOpen] = useState(false);

  // 🔹 Buscar tecnologias ao carregar a página
  const fetchTechnologies = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/technologies`, {
        withCredentials: true,
      });
      setTechnologies(response.data);
    } catch (error) {
      console.error('Erro ao buscar tecnologias:', error);
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const handleCreate = async (tech: newTech) => {
    try {
      await axios.post(`${import.meta.env.VITE_API}/technologies`, tech, {
        withCredentials: true,
      });
      fetchTechnologies();
      setOpen(false);
      toast.success('Tecnologia criada com sucesso');
    } catch (error) {
      console.error('Erro ao criar tecnologia:', error);
    }
  };

  // 🔹 Deletar tecnologia
  const deleteTechnology = async (technologyId: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/technologies-delete`,
        {
          id: technologyId,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response.data);
      // Atualiza a lista depois de excluir
      fetchTechnologies();
      toast.success('Tecnologia deletada com sucesso');
    } catch (error) {
      console.error('Erro ao deletar tecnologia:', error);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto">
      <Toaster />

      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-border bg-background/60 backdrop-blur-md sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Tecnologias</h1>
          <p className="text-sm text-muted-foreground">
            Adicione, edite ou remova suas tecnologias
          </p>
        </div>

        <NewTechnologyModal open={open} setOpen={setOpen} handleCreate={handleCreate} />
      </header>

      {/* Lista de tecnologias */}
      <section className="p-8">
        {technologies.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">Nenhuma tecnologia cadastrada.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {technologies.map((tech) => (
              <div
                key={tech.id}
                className="bg-card border border-border rounded-xl p-5 shadow-sm flex justify-between items-center hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Cpu size={16} className="text-primary" />
                    <h3 className="font-semibold">{tech.name}</h3>
                  </div>
                  <Badge variant="secondary" className="mt-2">
                    {tech.category.name}
                  </Badge>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <Trash2 size={18} className="text-destructive" />
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Você realmente deseja excluir?</DialogTitle>
                      <DialogDescription>
                        Essa ação apagará a tecnologia <strong>{tech.name}</strong> permanentemente.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          // Fecha o diálogo sem excluir
                          document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                        }}
                      >
                        Cancelar
                      </Button>

                      <Button variant="destructive" onClick={() => deleteTechnology(tech.id)}>
                        Excluir
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
