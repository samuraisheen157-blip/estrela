
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import QuickLinksModal from './QuickLinksModal';
import { Link as LinkIcon, ExternalLink, BookOpen, CalendarDays, Library } from 'lucide-react';

const featuredLinks = [
  { href: '#', label: 'Academic Calendar', icon: CalendarDays },
  { href: '#', label: 'Library Portal', icon: Library },
  { href: '#', label: 'Course Catalog', icon: BookOpen },
];

/**
 * @deprecated This component's functionality has been merged into AppSidebar.tsx
 */
const QuickLinksSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-3 text-primary flex items-center">
        <LinkIcon className="mr-2 h-6 w-6" />
        Quick Links
      </h2>
      <div className="space-y-2 mb-4">
        {featuredLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors group"
          >
            <link.icon className="h-4 w-4 mr-2 text-accent group-hover:text-accent-foreground" />
            {link.label}
            <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>
      <Button variant="outline" className="w-full" onClick={() => setIsModalOpen(true)}>
        View All Links
        <ExternalLink className="ml-2 h-4 w-4" />
      </Button>
      <QuickLinksModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default QuickLinksSection;
