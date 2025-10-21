import { PROJECTS } from '../../db';
import { StickyScroll } from './sticky-scroll-reveal';

//Primeiro fazer uma chamado no db com os ultimos 5 itens e mandar pra uma const
//Segundo correr  a variavel e colocar aqui

export function ProjectsSection() {
  return (
    <>
      <section className="poppins-regular">
        <StickyScroll content={PROJECTS} />
      </section>
    </>
  );
}
