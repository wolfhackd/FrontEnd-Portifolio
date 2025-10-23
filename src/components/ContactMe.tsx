import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Instagram, Linkedin, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export default function ContactMe() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* BOTÃO PRINCIPAL */}
      <Button
        className="relative overflow-hidden bg-[#8DA9C4] border-2 border-[#8DA9C4] group cursor-pointer hover:bg-[#EEF4ED] text-[#0b2545]"
        size={'lg'}
        onClick={() => setOpen(true)}
      >
        <span className="absolute inset-0 bg-[#0B2545] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0 pointer-events-none" />

        <span className="relative z-10 flex items-center gap-2 transition-colors duration-500 group-hover:text-[#EEF4ED]">
          Vamos Conversar
          <ArrowRight className="w-5 h-5" />
        </span>
      </Button>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
          >
            <div className="absolute inset-0" onClick={() => setOpen(false)} />

            {/* modal */}
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#EEF4ED] rounded-t-2xl shadow-lg p-6 z-10"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[#0B2545] text-lg font-semibold">Conecte-se comigo</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  className="text-[#0B2545] hover:bg-[#8DA9C4]/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="quickConection">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="quickConection">Conexão rápida</TabsTrigger>
                  <TabsTrigger value="form">Formulário</TabsTrigger>
                </TabsList>

                {/* Quick Connect */}
                <TabsContent value="quickConection" className="mt-4 flex justify-around">
                  <Button asChild variant="outline" className="bg-[#8DA9C4]/20 text-[#0B2545]">
                    <a
                      href="https://www.linkedin.com/in/mauro-leal-b1134425a/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="mr-2" /> LinkedIn
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="bg-[#8DA9C4]/20 text-[#0B2545]">
                    <a
                      href="https://github.com/wolfhackd"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2" /> GitHub
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="bg-[#8DA9C4]/20 text-[#0B2545]">
                    <a
                      href="https://instagram.com/codeway__"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="mr-2" /> Instagram
                    </a>
                  </Button>
                </TabsContent>

                {/* Form */}
                <TabsContent value="form" className="mt-6 text-center text-[#0B2545]">
                  <p className="text-sm mb-4">Envie uma mensagem direta para meu e-mail:</p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                      const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                      const message = (form.elements.namedItem('message') as HTMLTextAreaElement)
                        .value;

                      const subject = encodeURIComponent(`Contato de ${name}`);
                      const body = encodeURIComponent(
                        `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
                      );

                      window.location.href = `mailto:mauro.costa.12.j@hotmail.com?subject=${subject}&body=${body}`;
                    }}
                    className="flex flex-col gap-3 max-w-md mx-auto text-left"
                  >
                    <label className="text-sm font-medium">Nome</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Seu nome"
                      required
                      className="w-full p-2 border border-[#8DA9C4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8DA9C4] bg-white text-[#0B2545]"
                    />

                    <label className="text-sm font-medium">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="seuemail@exemplo.com"
                      required
                      className="w-full p-2 border border-[#8DA9C4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8DA9C4] bg-white text-[#0B2545]"
                    />

                    <label className="text-sm font-medium">Mensagem</label>
                    <textarea
                      name="message"
                      placeholder="Escreva sua mensagem aqui..."
                      required
                      className="w-full h-32 p-3 border border-[#8DA9C4] rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#8DA9C4] bg-white text-[#0B2545]"
                    />

                    <Button
                      type="submit"
                      className="mt-2 bg-[#8DA9C4] text-[#0B2545] hover:bg-[#0B2545] hover:text-[#EEF4ED] transition-colors"
                    >
                      Enviar Mensagem
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
