import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import MenubarHome from '@/components/MenubarHome';
import { useFetchProjects } from '@/services/Projects';
import { ImageCloud } from '@/components/ImageCloud';

const Works = () => {
  const { data: projects, isLoading } = useFetchProjects();

  return (
    <>
      <MenubarHome />
      <section className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white py-40 px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Meus <span className="text-cyan-400">Projetos</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Aqui estão alguns dos projetos que desenvolvi com foco em usabilidade, performance e
            design moderno. 🚀
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Olhar isso */}
          {(isLoading && <p>Loading...</p>) ||
            projects?.map((project, index) => (
              <motion.div
                key={project.title + index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900 rounded-2xl border border-gray-800 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 overflow-hidden group"
              >
                <div className="relative w-full h-56 overflow-hidden">
                  {project.images?.length ? (
                    // <img
                    //   src={project.images[0]}
                    //   alt={project.title ?? 'Projeto'}
                    //   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    // />
                    <ImageCloud image={project.images[0]} />
                  ) : (
                    // Placeholder se não houver imagem
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                      Sem imagem
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col gap-3">
                  <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {(project.technologies ?? []).map((tech, i) => {
                      const icon = tech?.icon;
                      return icon ? (
                        <img
                          key={i}
                          src={`https://cdn.simpleicons.org/${icon}`}
                          alt={tech.name}
                          className="size-6"
                        />
                      ) : (
                        <span
                          key={i}
                          className="size-6 bg-gray-700 rounded flex items-center justify-center text-[10px] text-gray-300"
                        >
                          ?
                        </span>
                      );
                    })}
                  </div>

                  {project.id && (
                    <Link
                      to={`/projeto/${project.id}`}
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                    >
                      Ver projeto →
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
        </div>
      </section>
    </>
  );
};

export default Works;
