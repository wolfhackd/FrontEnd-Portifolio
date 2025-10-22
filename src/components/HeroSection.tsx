import { motion } from 'motion/react';
import ContactMe from './ContactMe';
import CopyEmail from './CopyEmail';
import { StarsBackground } from './ui/stars-background';
import { TypewriterEffect } from './typewriter-effect';

const words = [
  {
    text: 'Olá,',
    className: ' text-white',
  },
  {
    text: 'meu',
    className: ' text-white',
  },
  {
    text: 'nome',
    className: ' text-white',
  },
  {
    text: 'é',
    className: ' text-white',
  },
  {
    text: 'Mauro',
    className: 'font-medium text-white',
  },
  {
    text: 'Leal',
    className: 'font-medium text-white',
  },
  {
    text: 'e',
    className: ' text-white',
  },
  {
    text: ' sou',
    className: ' text-white',
  },
  {
    text: ' desenvolvedor',
    className: ' text-white',
  },
  {
    text: ' Fullstack.',
    className: ' text-white',
  },
];

const HeroSection = () => {
  return (
    <section className="flex flex-col w-full pb-10 h-screen relative text-white overflow-hidden poppins-regular ">
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

        <TypewriterEffect words={words} className="text-[#EEF4ED]" />

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
      <StarsBackground className="absolute" />
      <StarsBackground className="absolute" />
      <StarsBackground className="absolute" />
    </section>
  );
};

export default HeroSection;
