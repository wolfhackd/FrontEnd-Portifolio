import MenubarHome from '@/components/MenubarHome';
import { useParams } from 'react-router';

const Project = () => {
  const { id } = useParams();
  return (
    <>
      <MenubarHome />
      <div className="bg-black">{id}</div>
    </>
  );
};

export default Project;
