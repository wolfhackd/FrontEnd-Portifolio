import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Cpu } from 'lucide-react';

interface Technology {
  id: number;
  name: string;
  category: string;
}

export default function Technologies() {
  // Mock temporário
  const [technologies, setTechnologies] = useState<Technology[]>([
    { id: 1, name: 'React', category: 'Frontend' },
    { id: 2, name: 'Node.js', category: 'Backend' },
    { id: 3, name: 'Prisma', category: 'ORM' },
  ]);

  const [open, setOpen] = useState(false);
  const [newTech, setNewTech] = useState({ name: '', category: '' });

  // tu vai implementar essas funções dps
  const handleCreate = () => {
    console.log('Criar tecnologia:', newTech);
    setNewTech({ name: '', category: '' });
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    console.log('Excluir tecnologia:', id);
  };

  return (
    <main className="flex-1 overflow-y-auto">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-border bg-background/60 backdrop-blur-md sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Tecnologias</h1>
          <p className="text-sm text-muted-foreground">
            Adicione, edite ou remova suas tecnologias
          </p>
        </div>

        {/* Botão de nova tecnologia */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={18} /> Nova tecnologia
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar nova tecnologia</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-2">
              <Input
                placeholder="Nome da tecnologia"
                value={newTech.name}
                onChange={(e) => setNewTech({ ...newTech, name: e.target.value })}
              />
              <Input
                placeholder="Categoria (ex: Frontend, Backend)"
                value={newTech.category}
                onChange={(e) => setNewTech({ ...newTech, category: e.target.value })}
              />
              <Button onClick={handleCreate}>Salvar</Button>
            </div>
          </DialogContent>
        </Dialog>
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
                    {tech.category}
                  </Badge>
                </div>
                <Button size="icon" variant="ghost" onClick={() => handleDelete(tech.id)}>
                  <Trash2 size={18} className="text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
