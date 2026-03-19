
'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ExternalLink, BookOpen, CalendarDays, Library, Info, FileText } from 'lucide-react';

interface QuickLinkItem {
  href: string;
  label: string;
  icon: React.ElementType;
  description?: string;
}

const quickLinks: QuickLinkItem[] = [
  { href: '#', label: 'Academic Calendar', icon: CalendarDays, description: 'View important dates and deadlines.' },
  { href: '#', label: 'Library Portal', icon: Library, description: 'Access digital resources and catalogs.' },
  { href: '#', label: 'Course Catalog', icon: BookOpen, description: 'Explore available courses and programs.' },
  { href: '#', label: 'Student Handbook', icon: FileText, description: 'University policies and guidelines.' },
  { href: '#', label: 'Campus Map', icon: Info, description: 'Find your way around the campus.' },
  { href: '#', label: 'IT Support', icon: Info, description: 'Get help with technical issues.' },
  { href: '#', label: 'Financial Aid', icon: Info, description: 'Information on scholarships and grants.' },
  { href: '#', label: 'Student Services', icon: Info, description: 'Access various student support services.' },
];

interface QuickLinksModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

/**
 * @deprecated This component's functionality has been merged into AppSidebar.tsx's own modal logic.
 */
const QuickLinksModal: React.FC<QuickLinksModalProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] bg-card text-card-foreground rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary flex items-center">
            <ExternalLink className="mr-2 h-6 w-6" />
            All Quick Links
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Access important university resources quickly.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px] w-full rounded-md p-1 pr-4">
          <div className="space-y-3">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-background hover:bg-muted rounded-md transition-colors group"
              >
                <link.icon className="h-5 w-5 mr-3 text-accent flex-shrink-0" />
                <div className="flex-grow">
                  <p className="font-medium text-foreground group-hover:text-accent-foreground">{link.label}</p>
                  {link.description && <p className="text-xs text-muted-foreground">{link.description}</p>}
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground ml-2" />
              </a>
            ))}
          </div>
        </ScrollArea>
        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickLinksModal;
