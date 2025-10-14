import clsx from 'clsx';
import { PROJECTS, TECHNOLOGIES } from '../../db';
import { Badge } from './ui/badge';

export function ProjectsSection() {
  return (
    <>
      <section className="bg-blue-950 px-10 text-white">
        <h2 className="text-4xl font-bold text-center p-6">Últimos Projetos</h2>

        {PROJECTS.map((project, i) => (
          <div className="grid md:grid-cols-2 gap-6 my-6 items-center h-[80vh]" key={i}>
            <img
              src={project.images[0]}
              alt={`Imagem do projeto ${project.title}`}
              className="rounded-4xl border-2 border-accent w-full object-cover"
            />

            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold">
                <span className="text-yellow-300">&mdash; </span>
                {project.title}
              </h2>

              <p className="pl-2 text-lg">{project.description}</p>

              {/* Stack de Tecnologias */}
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech) => {
                  const data = TECHNOLOGIES[tech];
                  if (!data) return null;

                  return (
                    <Badge
                      key={data.name}
                      className={clsx('flex items-center gap-1 px-2 py-1 text-lg')}
                    >
                      <img
                        src={`https://cdn.simpleicons.org/${data.icon}`}
                        alt={data.name}
                        className="w-4 h-4"
                      />
                      <span className={clsx(data.color)}>{data.name}</span>
                    </Badge>
                  );
                })}
              </div>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Ver projeto
              </a>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
