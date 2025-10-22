import { motion } from 'motion/react';

interface FooterNavProps {
  title: string;
  links: { name: string; href: string }[];
}

const FooterNav = ({ title, links }: FooterNavProps) => {
  return (
    <div className="border-l-2 pl-2 border-[#2B7FFF]">
      <h3 className="font-bold mb-2">{title}</h3>
      <ul className="space-y-1">
        {links.map((link) => (
          <motion.li
            key={link.href}
            whileHover="hover"
            initial="initial"
            className="relative transition-colors cursor-pointer"
          >
            {link.name}
            <motion.span
              className="absolute left-0 -bottom-0.5 h-[2px] bg-[#2B7FFF] block"
              variants={{
                initial: { width: 0 },
                hover: { width: '100%' },
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default FooterNav;
