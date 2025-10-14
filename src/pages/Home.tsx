import ContactMe from '@/components/ContactMe';
import CopyEmail from '@/components/CopyEmail';
import MenubarHome from '@/components/MenubarHome';
import { StarsBackground } from '@/components/ui/stars-background';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { motion } from 'framer-motion';
import { Toaster } from 'sonner';
import { Github, Linkedin } from 'lucide-react';
import Technologies from '@/components/Technologies';
import { ProjectsSection } from '@/components/ProjectsSection';

const Home = () => {
  const handleClick = (link: string) => {
    window.open(`${link}`, '_blanck');
  };

  return (
    <>
      <MenubarHome />
      <Toaster />
      <section className="flex flex-col w-full pb-10 h-screen relative bg-gradient-to-b from-black via-[#0a0a0a] to-gray-900 text-white overflow-hidden">
        {/* motion.div substitui o container principal */}
        <motion.div
          className="flex flex-col items-center space-y-12 pt-[18%] z-40"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-center drop-shadow-lg">
            Transformamos suas ideias em código
          </h2>

          <p className="text-2xl md:text-3xl font-light text-center max-w-2xl leading-relaxed">
            Olá, meu nome é <span className="font-medium">Mauro Leal</span> e sou desenvolvedor
            Fullstack.
          </p>

          <motion.div
            className="flex gap-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          >
            <ContactMe />
            <CopyEmail email="mauro.costa.12.j@hotmail.com" />
          </motion.div>
        </motion.div>

        <StarsBackground />
      </section>
      {/* AboutMe */}
      <section className="w-full flex justify-center py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-blue-300 backdrop-blur-sm ">
        <motion.div
          className="max-w-3xl text-center px-auto space-y-6 z-4000"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: false }}
        >
          <p className="text-sm uppercase tracking-[3px] text-gray-400">Sobre Mim</p>

          <h2 className="text-4xl md:text-5xl font-semibold text-white drop-shadow-lg">
            Desenvolvedor Full-Stack e um curioso
          </h2>

          <p className="text-gray-300 leading-relaxed">
            Eu sou <span className="font-semibold text-white">Mauro Leal</span>, apaixonado por
            criar soluções digitais. Do front-end ao back-end, meu foco é resolver problemas
            complexos com código limpo e eficiente. Sempre buscando a evolução para ser um
            profissional melhor.
          </p>

          <p className="text-gray-400 italic">
            Quando não estou trabalhando, estou explorando novas ideias e saciando minha
            curiosidade.
          </p>

          <blockquote className="text-gray-500 text-sm italic border-l-4 border-gray-700 pl-4 bg-accent">
            "O presente é deles, mas o futuro é nosso." — Nikola Tesla
          </blockquote>

          <div className="flex justify-center gap-6 z-400">
            <HoverCard>
              <HoverCardTrigger
                className="cursor-pointer"
                onClick={() => handleClick('https://www.linkedin.com/in/mauro-leal-b1134425a/')}
              >
                <Linkedin />
              </HoverCardTrigger>
              <HoverCardContent side="top" className="text-center w-fit">
                LinkedIn
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger
                className="cursor-pointer"
                onClick={() => handleClick('https://github.com/wolfhackd')}
              >
                <Github />
              </HoverCardTrigger>
              <HoverCardContent side="top" className="text-center w-fit">
                Github
              </HoverCardContent>
            </HoverCard>
          </div>
        </motion.div>
        <StarsBackground className="z-1" />
      </section>
      {/* techStack */}
      {/* Importar as tecnologias aqui pra usar nos projetos os mesmos objetos */}
      <Technologies />
      <ProjectsSection />
    </>
  );
};

export default Home;
