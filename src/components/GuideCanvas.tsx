import React from 'react';
import { cn } from '@/lib/utils';

interface GuideCanvasProps {
  className?: string;
}

const GuideCanvas: React.FC<GuideCanvasProps> = ({ className }) => {
  return (
    <div className={cn("w-full bg-card flex flex-col md:p-6 p-3 rounded-lg shadow-lg", className)}>
      <h1 id="guide-canvas-title" className="text-2xl font-bold mb-4 text-primary px-4 pt-4 md:px-0 md:pt-0">Guia do Estudante AVA</h1>
      
      <div className="relative flex-1 w-full overflow-hidden rounded-md">
        <iframe
          loading="lazy"
          className="w-full h-full border-none p-0 m-0"
          src="https://www.canva.com/design/DAGoM4RlYLk/glbBj1oz1fE04hE5Kl48Vw/view?embed"
          allowFullScreen
          allow="fullscreen"
          title="Guia do Estudante AVA"
        />
      </div>
       <p className="mt-2 text-sm text-muted-foreground text-center p-4 md:p-0">
        Navegue pelo guia acima. Para a melhor experiência, você também pode{" "}
        <a 
          href="https://www.canva.com/design/DAGoM4RlYLk/glbBj1oz1fE04hE5Kl48Vw/view?utm_content=DAGoM4RlYLk&utm_campaign=designshare&utm_medium=embeds&utm_source=link" 
          target="_blank" 
          rel="noopener noreferrer"
          className="active-link hover:underline"
        >
          abri-lo em uma nova aba
        </a>.
      </p>
    </div>
  );
};

export default GuideCanvas;