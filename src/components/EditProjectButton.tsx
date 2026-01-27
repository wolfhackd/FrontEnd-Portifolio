import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command"; // Adicionado CommandList
import type { Project, Technology } from "@/types/types";
import { useFetchTechnologies } from "@/services/Technologies";
import { useUpdateProject } from "@/services/Projects";

export const EditProjectButton = ({ project: p }: { project: Project }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Project>(p);

  const { data: allTechnologies } = useFetchTechnologies();
  const { mutate: editProject, isPending } = useUpdateProject();

  // Agrupa tecnologias por categoria (memoizado para não refazer o cálculo a cada render)
  const technologiesByCategory = useMemo(() => {
    return (
      allTechnologies?.reduce(
        (acc: Record<string, Technology[]>, tech: Technology) => {
          const categoryName = tech.category?.name || "Outros";
          if (!acc[categoryName]) acc[categoryName] = [];
          acc[categoryName].push(tech);
          return acc;
        },
        {},
      ) || {}
    );
  }, [allTechnologies]);

  // Handler para inputs de texto
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler específico para o array de tecnologias
  const handleToggleTechnology = (tech: Technology) => {
    const currentTechs = formData.technologies || [];
    // Verifica se a tecnologia já existe no array (comparando IDs)
    const isSelected =
      formData.technologies?.some((t) => t.id === tech.id) ?? false;

    const newTechs = isSelected
      ? currentTechs.filter((t) => t.id !== tech.id) // Remove
      : [...currentTechs, tech]; // Adiciona objeto completo

    setFormData((prev) => ({ ...prev, technologies: newTechs }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Editar
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edição de projeto</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-3">
          {/* Inputs de Texto - Reutilizando handleChange */}
          {[
            { label: "Título", name: "title", type: "input" },
            { label: "Descrição", name: "description", type: "textarea" },
            { label: "Link", name: "link", type: "input" },
            {
              label: "Descrição rápida",
              name: "fastDescription",
              type: "textarea",
            },
            { label: "Overview", name: "overview", type: "textarea" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col gap-1">
              <label className="text-sm font-medium">{field.label}</label>
              {field.type === "input" ? (
                <input
                  className="input border p-2 rounded-md"
                  name={field.name}
                  value={(formData as any)[field.name] || ""}
                  onChange={handleChange}
                />
              ) : (
                <textarea
                  className="textarea border p-2 rounded-md"
                  name={field.name}
                  value={(formData as any)[field.name] || ""}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}

          {/* MULTISELECT DE TECNOLOGIAS */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Tecnologias</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-between w-full">
                  {(formData.technologies ?? []).length > 0
                    ? `${formData.technologies?.length} selecionadas`
                    : "Selecione tecnologias"}
                  <ChevronDown size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0">
                <Command>
                  <CommandList className="max-h-64 overflow-y-auto">
                    {Object.keys(technologiesByCategory).map((cat) => (
                      <CommandGroup key={cat} heading={cat}>
                        {technologiesByCategory[cat].map((tech) => {
                          const isSelected = formData.technologies?.some(
                            (t) => t.id === tech.id,
                          );
                          return (
                            <CommandItem
                              key={tech.id}
                              onSelect={() => handleToggleTechnology(tech)}
                            >
                              <div className="flex items-center gap-2">
                                <Checkbox checked={isSelected} />
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ background: tech.color }}
                                />
                                {tech.name}
                              </div>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant="default"
            onClick={() =>
              editProject(formData, {
                onSuccess: () => {
                  setOpen(false);
                },
              })
            }
            disabled={isPending}
          >
            {isPending ? "Salvando..." : "Salvar alterações"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
