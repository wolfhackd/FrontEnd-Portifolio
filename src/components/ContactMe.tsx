import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function ContactMe() {
  return (
    <Button
      className="relative overflow-hidden bg-[#8DA9C4]  border-2 border-[#8DA9C4] group cursor-pointer hover:bg-[#EEF4ED] text-[#0b2545]"
      size={'lg'}
    >
      <span className="absolute inset-0 bg-[#0B2545] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0 pointer-events-none" />

      <span className="relative z-10 flex items-center gap-2 transition-colors duration-500 group-hover:text-[#EEF4ED] ">
        Vamos Conversar
        <ArrowRight className="w-5 h-5" />
      </span>
    </Button>
  );
}
