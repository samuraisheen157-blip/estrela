
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { askEva } from '@/lib/actions';
import { Bot, SendHorizonal, User, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'eva';
  timestamp: string;
}

interface EvaAIChatProps {
  className?: string;
}

/**
 * @deprecated This component's functionality has been merged into AppSidebar.tsx
 */
const EvaAIChat: React.FC<EvaAIChatProps> = ({ className }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const formatTimestamp = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString() + '-user',
      text: inputValue,
      sender: 'user',
      timestamp: formatTimestamp(new Date()),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const evaResponse = await askEva(userMessage.text);
      const evaMessage: Message = {
        id: Date.now().toString() + '-eva',
        text: evaResponse.answer,
        sender: 'eva',
        timestamp: formatTimestamp(new Date()),
      };
      setMessages((prev) => [...prev, evaMessage]);
    } catch (error) {
      console.error('Error fetching Eva response:', error);
      const errorMessage: Message = {
        id: Date.now().toString() + '-error',
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: 'eva',
        timestamp: formatTimestamp(new Date()),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col h-full w-full", className)}>
      <h2 className="text-xl font-semibold mb-3 text-primary flex items-center">
        <Bot className="mr-2 h-6 w-6" />
        Eva AI Assistant
      </h2>
      <ScrollArea ref={scrollAreaRef} className="h-[250px] sm:h-[300px] md:flex-grow mb-4 pr-3 border rounded-lg p-3 bg-muted/30 shadow-inner">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex items-end space-x-2 max-w-[85%]',
                msg.sender === 'user' ? 'ml-auto flex-row-reverse space-x-reverse' : ''
              )}
            >
              {msg.sender === 'eva' && (
                 <div className="flex-shrink-0 bg-accent text-accent-foreground rounded-full p-1.5 self-start">
                    <Sparkles className="h-4 w-4" />
                  </div>
              )}
               {msg.sender === 'user' && (
                 <div className="flex-shrink-0 bg-primary text-primary-foreground rounded-full p-1.5 self-start">
                    <User className="h-4 w-4" />
                  </div>
              )}
              <div
                className={cn(
                  'p-3 rounded-lg shadow-sm',
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-background text-foreground rounded-bl-none border border-border'
                )}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={cn(
                    "text-xs mt-1",
                    msg.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground text-left'
                  )}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
           {messages.length === 0 && !isLoading && (
            <div className="text-center text-muted-foreground py-8">
              <Sparkles className="h-8 w-8 mx-auto mb-2 text-accent" />
              <p>Ask Eva anything about the university!</p>
              <p className="text-xs">e.g., "What are the library hours?"</p>
            </div>
          )}
          {isLoading && messages[messages.length -1]?.sender === 'user' && (
            <div className="flex items-end space-x-2 max-w-[85%]">
              <div className="flex-shrink-0 bg-accent text-accent-foreground rounded-full p-1.5 self-start">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="p-3 rounded-lg shadow-sm bg-background text-foreground rounded-bl-none border border-border">
                <Loader2 className="h-5 w-5 animate-spin text-accent" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask Eva..."
          className="flex-grow focus-visible:ring-accent"
          disabled={isLoading}
          aria-label="Ask Eva a question"
        />
        <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizonal className="h-4 w-4" />}
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
};

export default EvaAIChat;
