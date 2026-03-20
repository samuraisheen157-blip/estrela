
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { quickLinksData } from '@/app/api/data/projectData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlayCircle, FileText } from 'lucide-react';

interface GuideCanvasProps {
  className?: string;
}

const GuideCanvas: React.FC<GuideCanvasProps> = ({ className }) => {
  const canvaEmbedUrl =
    process.env.NEXT_PUBLIC_CANVA_EMBED_URL ??
    'https://www.canva.com/design/DAGoM4RlYLk/glbBj1oz1fE04hE5Kl48Vw/view?embed';

  const canvaViewUrl =
    process.env.NEXT_PUBLIC_CANVA_VIEW_URL ??
    'https://www.canva.com/design/DAGoM4RlYLk/glbBj1oz1fE04hE5Kl48Vw/view?utm_content=DAGoM4RlYLk&utm_campaign=designshare&utm_medium=embeds&utm_source=link';

  // O projeto usa um vídeo único do Vimeo; os capítulos ficam em `quickLinksData` (modal do sidebar).
  const vimeoVideoId =
    process.env.NEXT_PUBLIC_VIMEO_VIDEO_ID ?? quickLinksData[0]?.videoId ?? '1090689535';

  return (
    <div className={cn("w-full bg-card flex flex-col p-3 rounded-lg shadow-lg flex-1 min-h-0 overflow-hidden", className)}>
      <h1 id="guide-canvas-title" className="text-2xl font-bold mb-4 text-primary px-4 pt-4 md:px-0 md:pt-0">Guia do Estudante AVA</h1>

      <div className="flex-1 min-h-0">
        <Tabs defaultValue="video" className="w-full flex flex-col h-full">
        <div className="w-full flex justify-center">
          <TabsList className="w-fit bg-muted/70 border border-border">
            <TabsTrigger
              value="video"
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <PlayCircle size={16} />
              Vídeo
            </TabsTrigger>
            <TabsTrigger
              value="material"
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <FileText size={16} />
              Material
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="video" className="mt-4 flex-1 min-h-0 overflow-hidden">
          <div className="aspect-video w-full overflow-hidden rounded-md border bg-muted relative">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              loading="lazy"
              src={`https://player.vimeo.com/video/${vimeoVideoId}?dnt=1&autopause=0#t=0`}
              allowFullScreen
              allow="fullscreen; picture-in-picture"
              title="Guia do Estudante AVA (Vídeo)"
            />
          </div>
        </TabsContent>

        <TabsContent value="material" className="mt-4 flex-1 min-h-0 overflow-hidden">
          <div className="aspect-video w-full overflow-hidden rounded-md border bg-muted relative">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              loading="lazy"
              title="Guia do Estudante AVA (Material)"
              src={canvaEmbedUrl}
              allowFullScreen
              allow="fullscreen"
            />
          </div>
          {/* link de fallback (acessibilidade) */}
          <div className="sr-only">
            <a href={canvaViewUrl} target="_blank" rel="noopener noreferrer">
              Abrir guia do Canva em nova aba
            </a>
          </div>
        </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default GuideCanvas;