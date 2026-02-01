import { useEffect, useState } from "react";
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
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import { useUpdateProject } from "@/services/Projects";
import { useFetchCategoriesWithTech } from "@/services/Category";
import type { Project, ProjectUpdate } from "@/types/types";

type FormState = Omit<ProjectUpdate, "technologyIds"> & {
  technologyIds: string[];
  images: string[];
};

type ExistingProject = Project & { id: string };

export const EditProjectButton = ({
  project: p,
}: {
  project: ExistingProject;
}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    ...p,
    technologyIds: [],
    images: p.images ?? [],
  });

  const { data: categories } = useFetchCategoriesWithTech();
  const { mutate: editProject, isPending } = useUpdateProject();

  useEffect(() => {
    if (open) {
      setFormData({
        ...p,
        technologyIds: (p as any).technologies?.map((t: any) => t.id) ?? [],
        images: p.images ?? [],
      });
    }
  }, [open, p]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleTechnology = (techId: string) => {
    setFormData((prev) => {
      const isSelected = prev.technologyIds.includes(techId);

      return {
        ...prev,
        technologyIds: isSelected
          ? prev.technologyIds.filter((id) => id !== techId)
          : [...prev.technologyIds, techId],
      };
    });
  };

  const handleSubmit = () => {
    editProject(formData, {
      onSuccess: () => setOpen(false),
    });
  };

  const handleAddImage = (publicId: string) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, publicId],
    }));
  };

  const handleRemoveImage = (publicId: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== publicId),
    }));
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
                  className="border p-2 rounded-md"
                  name={field.name}
                  value={(formData as any)[field.name] || ""}
                  onChange={handleChange}
                />
              ) : (
                <textarea
                  className="border p-2 rounded-md"
                  name={field.name}
                  value={(formData as any)[field.name] || ""}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}

          {/* 🖼️ IMAGENS (strings) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Images (public_id)</label>

            {/* Input para adicionar */}
            <input
              placeholder="Ex: letmeaskone_rpozj7"
              className="border p-2 rounded-md"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const value = (e.target as HTMLInputElement).value.trim();
                  if (value) {
                    handleAddImage(value);
                    (e.target as HTMLInputElement).value = "";
                  }
                }
              }}
            />

            {/* Lista das strings adicionadas */}
            <div className="flex flex-col gap-1 mt-2">
              {formData.images.map((img) => (
                <div
                  key={img}
                  className="flex justify-between items-center border rounded px-2 py-1 text-sm"
                >
                  <span className="truncate">{img}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(img)}
                    className="text-red-500 text-xs"
                  >
                    remover
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 💎 TECNOLOGIAS */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Tecnologias</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-between w-full">
                  {formData.technologyIds.length > 0
                    ? `${formData.technologyIds.length} selecionadas`
                    : "Selecione tecnologias"}
                  <ChevronDown size={16} />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-80 p-0">
                <Command>
                  <CommandList className="max-h-64 overflow-y-auto">
                    {categories?.map((category: any) => (
                      <CommandGroup key={category.id} heading={category.name}>
                        {category.technologies.map((tech: any) => {
                          const isSelected = formData.technologyIds.includes(
                            tech.id,
                          );

                          return (
                            <CommandItem
                              key={tech.id}
                              onSelect={() => handleToggleTechnology(tech.id)}
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
          <Button variant="default" onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Salvando..." : "Salvar alterações"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
