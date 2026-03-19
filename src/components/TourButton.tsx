
'use client';

import React from 'react';
import { driver, type DriveStep } from 'driver.js';
import 'driver.js/dist/driver.css'; // Import CSS
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const TourButton = () => {
  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      allowClose: true,
      nextBtnText: 'Próximo',
      prevBtnText: 'Anterior',
      doneBtnText: 'Concluir',
      steps: [
        {
          element: '#estrela-assistente-header',
          popover: {
            title: 'Assistente Estrela',
            description: 'Aqui você pode interagir com a Estrela, sua assistente virtual, e fazer pesquisas sobre o AVA CEUMA.',
            side: 'bottom',
            align: 'start',
          },
        },
        {
          element: '[data-tour-id="quick-link-1"]', // Targets the first quick link using data attribute
          popover: {
            title: 'Links Rápidos',
            description: 'Acesse rapidamente vídeos e tutoriais sobre funcionalidades importantes do ambiente virtual.',
            side: 'right',
            align: 'start',
          },
        },
        {
          element: '#chat-input-estrela',
          popover: {
            title: 'Converse com a Estrela',
            description: 'Digite sua pergunta aqui para obter ajuda sobre o ambiente AVA da CEUMA.',
            side: 'top',
            align: 'center',
          },
        },
        {
          element: '#guide-canvas-title',
          popover: {
            title: 'GUIA DO MOCHILEIRO ESTUDANTIL',
            description: 'Explore o guia interativo para conhecer todos os detalhes da sua jornada acadêmica no CEUMA.',
            side: 'bottom',
            align: 'start',
          },
        },
      ] satisfies DriveStep[],
    });

    driverObj.drive();
  };

  return (
    <Button
      onClick={startTour}
      className={cn(
        'fixed bottom-6 right-6 z-50 h-14 w-auto p-4 shadow-lg rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 animate-pulse-scale',
        'md:bottom-8 md:right-8'
      )}
      aria-label="Iniciar tour pela plataforma"
    >
      <PlayCircle size={24} />
      <span className="hidden sm:inline">Iniciar Tour</span>
    </Button>
  );
};

export default TourButton;
