import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../../db';

export function ProjectsSection() {
  const recentProjects = PROJECTS.slice(-5).reverse();
  return (
    <motion.section
      className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white py-32 px-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
          Últimos <span className="text-cyan-400">Projetos</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Confira meus trabalhos mais recentes — focados em inovação, performance e design moderno.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {recentProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-2xl border border-gray-800 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 overflow-hidden group"
          >
            <div className="relative w-full h-56 overflow-hidden">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-6 flex flex-col gap-3">
              <h2 className="text-2xl font-semibold">{project.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                {project.fastDescription}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <span key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-md">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex justify-between items-center">
                <Link
                  to={`/projeto/${project.id}`}
                  className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                >
                  Ver projeto →
                </Link>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-200 text-sm"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
