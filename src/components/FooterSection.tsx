import { Github, Linkedin } from 'lucide-react';
import { handleClick } from './AboutMe';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';

const FooterSection = () => {
  return (
    <footer className="flex flex-col items-center p-10 bg-gray-600 text-white justify-between space-y-20">
      <div className="flex flex-col items-center justify-start space-y-10">
        <img
          src="/logoML.png"
          className="size-10 mx-6 
      "
        />
        <h2 className="text-5xl">Do esboço à execução — o futuro começa agora!</h2>
        <p className="font-bold text-2xl">Estou disponível para funções de tempo integral</p>
        <p>
          Eu prospero transformando ideias em aplicativos web dinâmicos e experiências que encantam
          o usuário.
        </p>
      </div>
      <div className="flex flex-col w-full gap-4">
        <div className="flex justify-around">
          <div className="flex flex-col justify-start w-40">
            <img
              src="/logoML.png"
              className="size-10  
      "
            />
            <p>Eu sou Mauro - um desenvolvedor, freelancer. Obrigado por visitar meu site!</p>
          </div>
          {/* Arrumar os Botoes */}
          <div className="flex flex-col border-l-2 pl-2">
            <h3 className="font-bold">Geral</h3>
            <span>Home</span>
            <span>Sobre</span>
            <span>Projetos</span>
            <span>Mais</span>
          </div>
        </div>
        <div className="flex justify-around">
          <div>
            <p>
              © 2025 <span>Mauro Leal</span>. Todos os direitos reservados
            </p>
          </div>
          <div>
            <div className="flex justify-center gap-6 z-400 text-white">
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
