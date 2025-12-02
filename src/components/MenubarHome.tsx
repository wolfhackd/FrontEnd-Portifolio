import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { MenuModal } from './MenuModal';

const MenubarHome = () => {
  return (
    <div className="backdrop-blur-sm from-gray-900 via-gray-800 to-transparent flex p-4 fixed z-5000 justify-between w-full">
      <img src="/logoML.png" className="size-10 mx-6" />
      <nav className="bg-[#ADADAE] rounded-full border-2 border-black self-center">
        <Link to="/">
          <Button
            variant="link"
            className="text-white hover:bg-[#8F9091] font-light rounded-full  cursor-pointer"
          >
            Home
          </Button>
        </Link>
        {/* <Link to="/sobre"> */}
        <Link to="/progress">
          <Button
            variant="link"
            className="text-white hover:bg-[#8F9091] font-light rounded-full  cursor-pointer"
          >
            Sobre
          </Button>
        </Link>
        <Link to="/projetos">
          <Button
            variant="link"
            className="text-white hover:bg-[#8F9091] font-light rounded-full  cursor-pointer"
          >
            Trabalho
          </Button>
        </Link>
        {/* <Link to="/mais"> */}
        <Link to="/progress">
          <Button
            variant="link"
            className="text-white hover:bg-[#8F9091] font-light rounded-full  cursor-pointer"
          >
            Mais
          </Button>
        </Link>
        {/* <Link to="/contato"> */}
        <Link to="/progress">
          <Button
            variant="link"
            className="text-white bg-[#8F9091] hover:bg-[#8F9091] font-light rounded-full cursor-pointer"
          >
            Fale Comigo
          </Button>
        </Link>
      </nav>
      <MenuModal />
    </div>
  );
};

export default MenubarHome;
