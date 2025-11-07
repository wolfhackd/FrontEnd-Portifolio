import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Palette } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Category {
  id: string;
  name: string;
}

export function NewTechnologyModal({
  open,
  setOpen,
  handleCreate,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleCreate: (tech: any) => void;
}) {
  const [newTech, setNewTech] = useState({
    name: '',
    category: '',
    color: '#4f46e5',
    icon: '',
  });

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const category = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API}/category`);
      setCategories(res.data);
    };
    category();
  }, []);

  return (
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
          {/* Nome */}
          <div className="flex flex-col gap-1.5">
            <Label>Nome</Label>
            <Input
              placeholder="Ex: React, Node.js, Prisma..."
              value={newTech.name}
              onChange={(e) => setNewTech({ ...newTech, name: e.target.value })}
            />
          </div>

          {/* Categoria */}
          <div className="flex flex-col gap-1.5">
            <Label>Categoria</Label>
            <Select
              value={newTech.category}
              onValueChange={(value) => setNewTech({ ...newTech, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cor */}
          <div className="flex flex-col gap-1.5">
            <Label>Cor</Label>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={newTech.color}
                onChange={(e) => setNewTech({ ...newTech, color: e.target.value })}
                className="w-10 h-10 p-1 rounded-md cursor-pointer border"
              />
              <div className="flex items-center gap-2">
                <Palette size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{newTech.color}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Ícone (opcional)</Label>
            <Input
              placeholder="Ex: react, node, docker..."
              value={newTech.icon}
              onChange={(e) => setNewTech({ ...newTech, icon: e.target.value })}
            />
            <a href="https://simpleicons.org/" target="_blank">
              https://simpleicons.org/
            </a>
          </div>

          <Button onClick={() => handleCreate(newTech)}>Salvar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
