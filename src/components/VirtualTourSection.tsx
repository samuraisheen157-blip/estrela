
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import VirtualTourModal from './VirtualTourModal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlayCircle, UserCircle } from 'lucide-react'; // UserCircle as fallback

/**
 * @deprecated This component's functionality (trigger and modal) has been merged into AppSidebar.tsx
 */
const VirtualTourSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full text-center">
      <Avatar className="h-20 w-20 mx-auto mb-3 border-2 border-primary shadow-md">
        <AvatarImage 
          src="https://placehold.co/100x100.png" 
          alt="Virtual Tour Guide Avatar" 
          data-ai-hint="avatar guide"
        />
        <AvatarFallback>
          <UserCircle className="h-12 w-12 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      <p className="text-sm text-muted-foreground mb-1">Meet your guide!</p>
      <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => setIsModalOpen(true)}>
        <PlayCircle className="mr-2 h-5 w-5" />
        Start Virtual Tour
      </Button>
      <VirtualTourModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default VirtualTourSection;
