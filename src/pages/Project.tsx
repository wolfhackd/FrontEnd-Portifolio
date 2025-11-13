import MenubarHome from '@/components/MenubarHome';
import { useParams } from 'react-router';
import { PROJECTS } from '../../db';
import { Badge } from '@/components/ui/badge';
import FooterSection from '@/components/FooterSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

//falta implementar algumas funções, pois o banco ainda não foi construído

const Project = () => {
  //não estou usando ainda, porem funciona
  //Só implementar depois do dashboard completo
  // const { id } = useParams();

  // Chamada de teste
  const project = PROJECTS[2];

  const handleClick = () => {
    window.open(project.link, '_blank');
  };

  return (
    <>
      <MenubarHome />
      <div className="relative pt-30 flex flex-col justify-between p-[15%] text-[#EEF4ED] bg-[#134074] space-y-6 poppins-medium">
        <div className="flex justify-between">
          <div>
            <h1 className="text-left font-bold text-5xl ">{project.title}</h1>
            <p className=" text-md">{project.fastDescription}</p>
            {/* Map de badge com tecnologias do projeto */}
            <div className="flex gap-3">
              {project.technologies.map((tech, i) => {
                return (
                  <Badge key={i} className="uppercase">
                    {tech}
                  </Badge>
                );
              })}
            </div>
          </div>
          <Button className="cursor-pointer poppins-medium justify-end" onClick={handleClick}>
            Ver Código ↗
          </Button>
        </div>
        {/* Date of post */}
        <p>Postado em: {project.created}</p>

        <img
          src={`${project.images[0]}`}
          alt={`Imagem do projeto ${project.title}`}
          className="rounded-2xl"
        />
        {/* Overview */}
        <h2 className="text-4xl font-bold">🥽Visão Geral</h2>
        <div className="bg-[#EEF4ED] p-2 rounded-md flex">
          <blockquote className=" text-[#0B2545] text-lg italic border-l-4 border-blue-600 pl-4 bg-accent rounded-r-md">
            {project.overview}
          </blockquote>
        </div>
        {/* techstack with icons */}
        <h2 className="text-4xl font-bold">🤖Tecnologias</h2>
        <ul className="bg-[#EEF4ED] p-2 rounded-md border-l-4 border-blue-600 pl-4">
          {project.technologies.map((tech) => {
            return (
              <li
                key={tech}
                className="capitalize text-lg italic  rounded-r-md mb-2 hover:text-muted-foreground cursor-pointer text-[#0B2545]"
              >
                {tech}
              </li>
            );
          })}
        </ul>
        {/* challenges and learnings */}
        <h2 className="text-4xl font-bold">📚Desafios e Aprendizados</h2>
        <Accordion type="single" collapsible className="cursor-pointer">
          {project.challenges.map((challenge, i) => {
            return (
              <AccordionItem
                value={`item-${i}`}
                key={`${challenge.title}-${i}`}
                className="mb-4 border rounded-md p-2 poppins-medium bg-[#EEF4ED] cursor-pointer"
              >
                <AccordionTrigger className="cursor-pointer border-l-4 border-blue-600 rounded-none pl-2 text-[#0B2545]">
                  {challenge.title}
                </AccordionTrigger>
                <AccordionContent className="cursor-pointer border-l-4 border-blue-600 pl-2 text-[#0B2545]">
                  {challenge.text}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
      {/* Footer */}
      <FooterSection />
    </>
  );
};

export default Project;
