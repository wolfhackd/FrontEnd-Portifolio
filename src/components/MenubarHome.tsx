import { useNavigate } from 'react-router';
import { Button } from './ui/button';

const MenubarHome = () => {
  const navigate = useNavigate();

  const handleClick = (link: string) => {
    navigate(link);
  };
  return (
    //TEnho que fazer um on click para cada botão (Talvez um novo componente)

    <div className="backdrop-blur-sm from-gray-900 via-gray-800 to-transparent flex p-4 fixed z-5000 justify-between w-full ">
      <img
        src="/logoML.png"
        className="size-10 mx-6 
      "
      />

      <nav className="bg-[#ADADAE] rounded-full border-2 border-black self-center ">
        <Button
          variant={'link'}
          className="cursor-pointer rounded-full text-white hover:bg-[#8F9091] font-light"
          onClick={() => handleClick('/')}
        >
          Home
        </Button>
        <Button
          variant={'link'}
          className="cursor-pointer  rounded-full text-white hover:bg-[#8F9091] font-light"
          onClick={() => handleClick('/projetos')}
        >
          Sobre
        </Button>
        <Button
          variant={'link'}
          className="cursor-pointer  rounded-full text-white hover:bg-[#8F9091] font-light"
          onClick={() => handleClick('/')}
        >
          Trabalho
        </Button>
        <Button
          variant={'link'}
          className="cursor-pointer  rounded-full text-white hover:bg-[#8F9091] font-light"
          onClick={() => handleClick('/')}
        >
          Mais
        </Button>
        <Button
          variant={'link'}
          className="cursor-pointer  rounded-full text-white bg-[#8F9091] hover:bg-[#8F9091] font-light"
          onClick={() => handleClick('/')}
        >
          Fale Comigo
        </Button>
      </nav>

      <p>
        <span className="text-green-500">C</span>
        <span>ode</span>
        <span className="text-green-500">W</span>
        <span>ay</span>
        <span className="text-green-500">_</span>
      </p>
    </div>
  );
};

export default MenubarHome;
