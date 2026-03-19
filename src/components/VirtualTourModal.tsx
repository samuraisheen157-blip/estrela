
'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { generateVirtualTourScript } from '@/lib/actions';
import { Loader2, ScrollText } from 'lucide-react';

interface VirtualTourModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const DEFAULT_TOUR_OUTLINE = "An engaging welcome to the university campus. Highlights include: the main administrative building, state-of-the-art library, modern student center, innovative research labs, and vibrant recreational facilities. Conclude with an encouraging message for prospective students.";

const VirtualTourModal: React.FC<VirtualTourModalProps> = ({ isOpen, onOpenChange }) => {
  const [script, setScript] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && !script && !isLoading) {
      fetchScript();
    }
  }, [isOpen, script, isLoading]);

  const fetchScript = async () => {
    setIsLoading(true);
    setError(null);
    setScript(null);
    try {
      const result = await generateVirtualTourScript(DEFAULT_TOUR_OUTLINE);
      setScript(result.script);
    } catch (e) {
      setError('Failed to generate virtual tour script. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-card text-card-foreground rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary flex items-center">
            <ScrollText className="mr-2 h-6 w-6" />
            Virtual Campus Tour Script
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Follow this script for your virtual tour presentation.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[400px] w-full rounded-md p-1 pr-4 border bg-background my-4">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2 text-muted-foreground">Generating script...</p>
            </div>
          )}
          {error && (
            <div className="flex flex-col items-center justify-center h-full text-destructive">
              <p>{error}</p>
              <Button onClick={fetchScript} variant="outline" className="mt-4">Try Again</Button>
            </div>
          )}
          {script && (
            <div className="p-4 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
              {script}
            </div>
          )}
        </ScrollArea>

        <DialogFooter className="sm:justify-between">
           <p className="text-xs text-muted-foreground_italic">
            Tip: Use an enthusiastic and welcoming tone!
          </p>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VirtualTourModal;
