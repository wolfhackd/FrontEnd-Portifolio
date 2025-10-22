import FooterNav from './FooterNav';

const FooterSection = () => {
  const geralLinks = [
    { name: 'Home', href: '/' },
    { name: 'Sobre', href: '/about' },
    { name: 'Trabalho', href: '/work' },
    { name: 'Mais', href: '/more' },
  ];
  const aboutMe = [{ name: 'Home', href: '/' }];
  const letMeTalk = [{ name: 'Home', href: '/' }];

  return (
    <footer className="flex flex-col p-10 justify-between space-y-20 w-full bg-[#e6e6e6]">
      <div className="flex justify-between border-b border-black pb-6">
        <div className="flex items-center space-x-4 justify-start">
          <img src="/logoML.png" alt="Logo pessoal ML" className="w-7 h-7" />
          <p className="font-bold">Mauro Leal</p>
        </div>
        <div className="flex justify-end space-x-10 ">
          <FooterNav title="Geral" links={geralLinks} />
          <FooterNav title="Sobre Mim" links={letMeTalk} />
          <FooterNav title="Vamos Conversar" links={aboutMe} />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p>
          Criado por{' '}
          <a href="https://www.instagram.com/mauroo_leal/" className="text-[#2B7FFF]">
            @Mauroo_Leal
          </a>
        </p>
        <p>Criado em outubro de 2025</p>
      </div>
    </footer>
  );
};

export default FooterSection;
