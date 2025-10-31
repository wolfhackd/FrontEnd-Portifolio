import MenubarHome from '@/components/MenubarHome';
import { Toaster } from 'sonner';
import Technologies from '@/components/Technologies';
import { ProjectsSection } from '@/components/ProjectsSection';
import { AboutMe } from '@/components/AboutMe';
import HeroSection from '@/components/HeroSection';
import FooterSection from '@/components/FooterSection';
import FileUploader from '@/components/FileUploader';

const Home = () => {
  return (
    <>
      <MenubarHome />
      <Toaster />
      {/* <div className="bg-gradient-to-b from-black via-[#0a0a0a] to-gray-900"> */}
      <div className="bg-[#0B2545]">
        {/* <div> */}
        <HeroSection />
        <AboutMe />
        {/* Tenho que fazer um update para usar db */}
        <Technologies />
        <ProjectsSection />
        <FooterSection />
        {/* <FileUploader /> */}
      </div>
    </>
  );
};

export default Home;
