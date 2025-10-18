import { motion } from 'framer-motion';
import { TECHNOLOGIES } from '../../db';

export default function Technologies() {
  return (
    <section className="relative overflow-hidden py-28 text-white bg-gradient-to-t from-slate-950 via-slate-900 to-slate-800">
      {/* Fundo sutil animado */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)]" />

      {/* Cabeçalho da seção */}
      <motion.div
        className="flex flex-col items-center text-center space-y-4 mb-12 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          variants={{
            hidden: { opacity: 0, x: -80 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl font-bold tracking-tight"
        >
          Tecnologias que utilizo
        </motion.h2>

        <motion.p
          variants={{
            hidden: { opacity: 0, x: 80 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="text-gray-400 max-w-2xl"
        >
          Ferramentas e linguagens que fazem parte do meu dia a dia como desenvolvedor.
        </motion.p>
      </motion.div>

      <div className="overflow-hidden relative py-10">
        <motion.div
          className="flex gap-16 whitespace-nowrap will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
          whileInView={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: 'linear',
          }}
          viewport={{ once: true }}
        >
          {Object.values(TECHNOLOGIES).map((tech, index) => (
            <div
              key={`tech-${index}`}
              className="flex flex-col items-center justify-center min-w-[120px] hover:scale-110 transition-transform duration-300"
            >
              <div className="text-6xl drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                <img
                  src={`https://cdn.simpleicons.org/${tech.icon}`}
                  alt={tech.name}
                  className="w-full h-full"
                />
              </div>
              <p className="text-sm mt-2 text-gray-300">{tech.name}</p>
            </div>
          ))}

          {Object.values(TECHNOLOGIES).map((tech, index) => (
            <div
              key={`tech-dup-${index}`}
              className="flex flex-col items-center justify-center min-w-[120px] hover:scale-110 transition-transform duration-300"
            >
              <div className="w-10 h-10">
                <img
                  src={`https://cdn.simpleicons.org/${tech.icon}`}
                  alt={tech.name}
                  className="w-full h-full"
                />
              </div>
              <p className={`text-sm mt-2 ${tech.color}`}>{tech.name}</p>
            </div>
          ))}
        </motion.div>

        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
