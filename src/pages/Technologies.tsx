import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Cpu } from "lucide-react";
import { NewTechnologyModal } from "@/components/NewTechnologieModal";
import { Toaster } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useCreateTechnology,
  useDeleteTechnology,
  type newTech,
} from "@/services/Technologies";
import { useFetchCategoriesWithTech } from "@/services/Category";
import type { CategoryWithTech, Technology } from "@/types/types";

export default function Technologies() {
  const [open, setOpen] = useState(false);

  const { data: categories, isLoading } = useFetchCategoriesWithTech();

  const createTechnology = useCreateTechnology();
  const deleteTechnology = useDeleteTechnology();

  const handleCreate = async (tech: newTech) => {
    try {
      createTechnology.mutate(tech);
      setOpen(false);
    } catch (error) {
      console.error("Erro ao criar tecnologia:", error);
    }
  };

  const excludeTechnology = async (technologyId: string) => {
    try {
      deleteTechnology.mutate(technologyId);
    } catch (error) {
      console.error("Erro ao deletar tecnologia:", error);
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

        <NewTechnologyModal
          open={open}
          setOpen={setOpen}
          handleCreate={handleCreate}
        />
      </header>

      {/* Lista */}
      <section className="p-8 space-y-10">
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <Cpu className="animate-spin text-cyan-400" />
          </div>
        ) : categories?.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">
            Nenhuma tecnologia cadastrada.
          </p>
        ) : (
          categories?.map((category: CategoryWithTech) => (
            <div key={category.id} className="space-y-4">
              {/* Nome da Categoria */}
              <h2 className="text-xl font-bold text-primary border-b pb-2">
                {category.name}
              </h2>

              {/* Grid de Tecnologias */}
              {category.technologies.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nenhuma tecnologia nessa categoria.
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {category.technologies.map((tech: Technology) => (
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
                          {category.name}
                        </Badge>
                      </div>

                      {/* Delete */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <Trash2 size={18} className="text-destructive" />
                          </Button>
                        </DialogTrigger>

                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Você realmente deseja excluir?
                            </DialogTitle>
                            <DialogDescription>
                              Essa ação apagará a tecnologia{" "}
                              <strong>{tech.name}</strong> permanentemente.
                            </DialogDescription>
                          </DialogHeader>

                          <div className="flex justify-end gap-2 mt-4">
                            <Button
                              variant="outline"
                              onClick={() =>
                                document.dispatchEvent(
                                  new KeyboardEvent("keydown", {
                                    key: "Escape",
                                  }),
                                )
                              }
                            >
                              Cancelar
                            </Button>

                            <Button
                              variant="destructive"
                              onClick={() => excludeTechnology(tech.id)}
                            >
                              Excluir
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </section>
    </main>
  );
}
