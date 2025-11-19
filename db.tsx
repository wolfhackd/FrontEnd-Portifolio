interface Technology {
  name: string;
  color: string;
  icon: any;
}

interface Technologies {
  [key: string]: Technology;
}

interface Challenge {
  title: string;
  text: string;
}

interface Project {
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  link: string;
  id: string;
  created: string;
  fastDescription: string;
  overview: string;
  challenges: Challenge[];
}

export const TECHNOLOGIES: Technologies = {
  // Front-end
  html: { name: 'HTML5', color: 'text-orange-500', icon: 'html5' },
  css: { name: 'CSS3', color: 'text-blue-600', icon: 'css3' },
  javascript: { name: 'JavaScript', color: 'text-yellow-400', icon: 'javascript' },
  typescript: { name: 'TypeScript', color: 'text-blue-500', icon: 'typescript' },
  react: { name: 'React', color: 'text-sky-500', icon: 'react' },
  reactNative: { name: 'React Native', color: 'text-purple-500', icon: 'react' },
  nextjs: { name: 'Next.js', color: 'text-gray-800', icon: 'nextdotjs' },
  vite: { name: 'Vite', color: 'text-purple-400', icon: 'vite' },
  tailwind: { name: 'Tailwind CSS', color: 'text-cyan-500', icon: 'tailwindcss' },
  shadcn: { name: 'shadcn', color: 'text-cyan-500', icon: 'shadcnui' },
  bootstrap: { name: 'Bootstrap', color: 'text-violet-600', icon: 'bootstrap' },
  reactRouter: { name: 'React Router DOM', color: 'text-red-400', icon: 'reactrouter' },
  reactQuery: { name: 'React Query', color: 'text-pink-400', icon: 'reactquery' },
  hooks: { name: 'Hooks Personalizados', color: 'text-yellow-500', icon: 'react' },

  // Back-end
  node: { name: 'Node.js', color: 'text-green-600', icon: 'nodedotjs' },
  express: { name: 'Express.js', color: 'text-gray-700', icon: 'express' },
  fastify: { name: 'Fastify', color: 'text-gray-600', icon: 'fastify' },
  apiRest: { name: 'API REST', color: 'text-emerald-600', icon: 'database' },
  graphql: { name: 'GraphQL', color: 'text-pink-600', icon: 'graphql' },

  // Banco de Dados
  postgres: { name: 'PostgreSQL', color: 'text-blue-700', icon: 'postgresql' },
  mysql: { name: 'MySQL', color: 'text-blue-400', icon: 'mysql' },
  sqlite: { name: 'SQLite', color: 'text-blue-300', icon: 'sqlite' },
  mongodb: { name: 'MongoDB', color: 'text-green-600', icon: 'mongodb' },
  firebase: { name: 'Firebase', color: 'text-yellow-400', icon: 'firebase' },
  supabase: { name: 'Supabase', color: 'text-green-400', icon: 'supabase' },

  // ORMs e Ferramentas
  prisma: { name: 'Prisma', color: 'text-pink-500', icon: 'prisma' },
  drizzle: { name: 'Drizzle ORM', color: 'text-orange-400', icon: 'drizzle' },
  sequelize: { name: 'Sequelize', color: 'text-indigo-500', icon: 'sequelize' },
  zod: { name: 'zod', color: 'text-indigo-500', icon: 'zod' },

  // DevOps e Infra
  docker: { name: 'Docker', color: 'text-blue-400', icon: 'docker' },
  git: { name: 'Git', color: 'text-red-500', icon: 'git' },
  github: { name: 'GitHub', color: 'text-gray-800', icon: 'github' },
  vercel: { name: 'Vercel', color: 'text-black', icon: 'vercel' },
  netlify: { name: 'Netlify', color: 'text-teal-500', icon: 'netlify' },

  // Outras tecnologias
  jest: { name: 'Jest', color: 'text-red-600', icon: 'jest' },
  cypress: { name: 'Cypress', color: 'text-green-500', icon: 'cypress' },
  vitest: { name: 'Vitest', color: 'text-lime-500', icon: 'vitest' },
  figma: { name: 'Figma', color: 'text-pink-500', icon: 'figma' },

  // API / IA
  gemini: { name: 'Gemini', color: 'text-blue-400', icon: 'gemini' },
};

export const PROJECTS: Project[] = [
  {
    title: 'Let Me Ask',
    id: '1',
    created: '19/027/2004',
    description:
      'O Let Me Ask é um app de perguntas e respostas em tempo real para lives e eventos, onde os participantes podem enviar questões, votar nas mais relevantes e acompanhar se já foram respondidas. A proposta é organizar a participação do público, promovendo engajamento e clareza na comunicação.',
    fastDescription:
      'App de perguntas e respostas em tempo real para eventos e transmissões ao vivo.',
    overview:
      'O projeto Let Me Ask foi desenvolvido para modernizar a interação em lives, eventos e conferências, tornando o processo de perguntas mais simples e democrático. A aplicação é totalmente responsiva, conta com autenticação via Google e integrações em tempo real via WebSocket.',
    images: ['/letmeasktwo.jpeg', '/letmeaskone.jpeg'],
    technologies: [],
    link: 'https://github.com/wolfhackd/let-me-ask',
    challenges: [
      {
        title: 'Gerenciamento em tempo real',
        text: 'Implementar o sistema de votação e atualização de perguntas sem recarregar a página exigiu o uso eficiente de WebSockets e React Query.',
      },
      {
        title: 'Autenticação segura com Google',
        text: 'Garantir uma autenticação fluida e segura usando OAuth2 e persistência de sessão foi um dos maiores desafios técnicos.',
      },
    ],
  },
  {
    title: 'Spotify',
    id: '2',
    created: '19/027/2004',
    description:
      'Website de música inspirado no Spotify, que permite ao usuário navegar entre playlists, ouvir prévias de faixas e explorar artistas e álbuns.',
    fastDescription: 'Clone funcional do Spotify com navegação fluida e foco em UX e performance.',
    overview:
      'O projeto foi desenvolvido para estudar arquitetura de aplicações complexas com React e Node.js, simulando uma plataforma de streaming real. A aplicação inclui rotas dinâmicas, autenticação e integração com uma API de músicas mockada.',
    images: ['/spotify.jpg', '/spotify2.jpg', '/spotify3.jpg'],
    technologies: [
      'react',
      'vite',
      'javascript',
      'tailwind',
      'reactRouter',
      'hooks',
      'node',
      'express',
      'mongodb',
      'zod',
    ],
    link: 'https://github.com/wolfhackd/Spotify-Project',
    challenges: [
      {
        title: 'Renderização de listas dinâmicas',
        text: 'Gerenciar listas grandes de músicas sem perda de performance foi desafiador, exigindo otimização de renderização e uso de lazy loading.',
      },
      {
        title: 'Simulação de player funcional',
        text: 'Reproduzir a experiência de um player real com controle de progresso, volume e pausa exigiu lógica assíncrona e estados bem estruturados.',
      },
    ],
  },
  {
    title: 'PortuGênio',
    id: '3',
    created: '19/027/2004',
    description:
      'O PortuGênio é um projeto web voltado para o ensino e aprimoramento da língua portuguesa, com foco inicial na gramática. A plataforma utiliza inteligência artificial para oferecer correções automáticas, explicações personalizadas e exemplos práticos, tornando o aprendizado mais dinâmico e interativo.',
    fastDescription:
      'Plataforma inteligente para aprendizado de gramática com correções automáticas e explicações personalizadas.',
    overview:
      'Desenvolvido com React, Node e integração com IA, o PortuGênio busca tornar o estudo de português mais acessível e prático. A aplicação fornece feedback em tempo real, análises gramaticais e sugestões de melhoria baseadas em contexto.',
    images: ['/portugenio.jpeg', '/portugenio2.jpeg'],
    technologies: [
      'react',
      'vite',
      'typescript',
      'tailwind',
      'fastify',
      'hooks',
      'gemini',
      'node',
      'shadcn',
      'docker',
    ],
    link: 'https://github.com/wolfhackd/PortuGenio',
    challenges: [
      {
        title: 'Integração com modelo de IA',
        text: 'Criar uma comunicação eficiente com a API de IA para interpretar e corrigir textos foi o maior desafio técnico do projeto.',
      },
      {
        title: 'Interface responsiva e acessível',
        text: 'Garantir boa experiência em dispositivos móveis e para pessoas com deficiência visual exigiu foco em acessibilidade e design adaptativo.',
      },
    ],
  },
];
