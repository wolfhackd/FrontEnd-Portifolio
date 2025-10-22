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

const Project = () => {
  //não estou usando ainda, porem funciona
  const { id } = useParams();

  // Chamada de teste
  const project = PROJECTS[2];

  return (
    <>
      <MenubarHome />
      <div className="relative pt-30 flex flex-col justify-between p-[15%] bg-gradient-to-b from-[#CCD0CF] via-[#4a5c6a] to-[#11212d] space-y-6 poppins-medium ">
        <h1 className="text-left font-bold text-5xl">{project.title}</h1>
        <p className="text-muted-foreground text-md">{project.fastDescription}</p>
        {/* Map de badge com technologias do projeto */}
        <div className="flex gap-3">
          {project.technologies.map((tech, i) => {
            return (
              <Badge key={i} className="uppercase">
                {tech}
              </Badge>
            );
          })}
        </div>
        {/* data do projeto */}
        <p>Postado em: {project.created}</p>
        {/* imagem */}
        <img
          src={`${project.images[0]}`}
          alt={`Imagem do projeto ${project.title}`}
          className="rounded-2xl"
        />
        {/* Visão geral */}
        <h2 className="text-4xl font-bold">🥽Visão Geral</h2>
        <div className="bg-[#F1F1F1] p-2 rounded-md flex">
          <blockquote className="text-gray-500 text-lg italic border-l-4 border-blue-600 pl-4 bg-accent rounded-r-md">
            {project.overview}
          </blockquote>
        </div>
        {/* techstack com desc */}
        <h2 className="text-4xl font-bold">🤖Tecnologias</h2>
        <ul className="bg-[#F1F1F1] p-2 rounded-md">
          {project.technologies.map((tech) => {
            return (
              <li
                key={tech}
                className="capitalize className=text-gray-500 text-lg italic border-l-4 border-blue-600 pl-4 bg-accent rounded-r-md underline mb-2 hover:text-muted-foreground cursor-pointer"
              >
                {tech}
              </li>
            );
          })}
        </ul>
        {/* Desafios e aprendizados */}
        <h2 className="text-4xl font-bold">📚Desafios e Aprendizados</h2>
        <Accordion type="single" collapsible className="cursor-pointer">
          {project.challenges.map((challenge, i) => {
            return (
              <AccordionItem
                value={`item-${i}`}
                key={`${challenge.title}-${i}`}
                className="mb-4 border rounded-md p-2 poppins-medium bg-[#F1F1F1] cursor-pointer"
              >
                <AccordionTrigger className="cursor-pointer border-l-4 border-blue-600 rounded-none pl-2">
                  {challenge.title}
                </AccordionTrigger>
                <AccordionContent className="cursor-pointer border-l-4 border-blue-600 pl-2">
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
