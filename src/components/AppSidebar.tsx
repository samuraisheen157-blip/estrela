
'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image'; // Import next/image
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  ArrowUpRight, 
  Home, 
  BookOpen, 
  CalendarDays, 
  Library, 
  GraduationCap, 
  Briefcase, 
  Users as UsersIcon,
  Puzzle, 
  FlaskConical, 
  Award, 
  MessageSquareWarning, 
  ExternalLink,
  Loader2,
  Sparkles, 
  SendHorizonal,
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  LifeBuoy,
  Mail,
  Phone,
  MessageSquare, 
  FileText, 
  PlaySquare, 
  ClipboardCheck, 
  HelpCircle, 
  Archive, 
  Megaphone,
  Bug
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { askEstrelaMind, performAiSearch } from '@/lib/actions'; 
import ReactMarkdown from 'react-markdown';
import { supportContactData, quickLinksData, type QuickLink } from '@/app/api/data/projectData';
import { Label } from '@/components/ui/label';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'estrela';
  timestamp: string;
}

const iconComponents: { [key: string]: React.ElementType } = {
  Home, BookOpen, CalendarDays, Library, GraduationCap, Briefcase, UsersIcon, Puzzle, FlaskConical, Award, MessageSquareWarning, ExternalLink, Sparkles, Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, LifeBuoy, Mail, Phone, MessageSquare, FileText, PlaySquare, ClipboardCheck, HelpCircle, Archive, Megaphone, Bug
};

const AppSidebar: React.FC = () => {
  const [activeQuickLinkId, setActiveQuickLinkId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInputValue, setChatInputValue] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatScrollAreaRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isAISearchLoading, setIsAISearchLoading] = useState(false);

  const [selectedVideo, setSelectedVideo] = useState("");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAllLinksModalOpen, setIsAllLinksModalOpen] = useState(false);
  const [isQuickLinksExpanded, setIsQuickLinksExpanded] = useState(true);

  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isBugReportModalOpen, setIsBugReportModalOpen] = useState(false);
  const [bugReportMatricula, setBugReportMatricula] = useState('');
  const [bugReportEmail, setBugReportEmail] = useState('');
  const [bugReportDescription, setBugReportDescription] = useState('');


  const filteredQuickLinks = useMemo(() => {
    if (!searchQuery.trim()) {
      return quickLinksData;
    }
    return quickLinksData.filter(link =>
      link.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]); // quickLinksData foi removido das dependências pois é constante

  const formatTimestamp = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    if (chatScrollAreaRef.current) {
      const viewport = chatScrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInputValue.trim() || isChatLoading) return;

    const userMessage: Message = {
      id: Date.now().toString() + '-user-chat',
      text: chatInputValue,
      sender: 'user',
      timestamp: formatTimestamp(new Date()),
    };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = chatInputValue;
    setChatInputValue('');
    setIsChatLoading(true);

    try {
      const estrelaResponse = await askEstrelaMind({ question: currentInput }); 
      const estrelaMessage: Message = {
        id: Date.now().toString() + '-estrela-chat',
        text: estrelaResponse.answer,
        sender: 'estrela',
        timestamp: formatTimestamp(new Date()),
      };
      setMessages((prev) => [...prev, estrelaMessage]);
    } catch (error) {
      console.error('Erro ao buscar resposta da Estrela:', error);
      const errorMessage: Message = {
        id: Date.now().toString() + '-error-chat',
        text: "Desculpe, estou tendo problemas para me conectar. Por favor, tente novamente mais tarde.",
        sender: 'estrela',
        timestamp: formatTimestamp(new Date()),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleAISearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || isAISearchLoading) return;

    const userSearchMessageText = `Você pesquisou por: "${searchQuery}"`;
    const userSearchMessage: Message = {
      id: Date.now().toString() + '-user-aisearch',
      text: userSearchMessageText,
      sender: 'user',
      timestamp: formatTimestamp(new Date()),
    };
    setMessages((prev) => [...prev, userSearchMessage]);
    
    const currentSearchTerm = searchQuery;
    setIsAISearchLoading(true);

    try {
      const searchResponse = await performAiSearch({ searchQuery: currentSearchTerm });
      const estrelaSearchResponseMessage: Message = {
        id: Date.now().toString() + '-estrela-aisearch',
        text: searchResponse.searchResults,
        sender: 'estrela',
        timestamp: formatTimestamp(new Date()),
      };
      setMessages((prev) => [...prev, estrelaSearchResponseMessage]);
    } catch (error) {
      console.error('Erro ao realizar pesquisa com Estrela:', error);
      const errorMessage: Message = {
        id: Date.now().toString() + '-error-aisearch',
        text: "Desculpe, não consegui realizar a pesquisa neste momento. Tente novamente.",
        sender: 'estrela',
        timestamp: formatTimestamp(new Date()),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsAISearchLoading(false);
      setSearchQuery(''); 
    }
  };


  const handleQuickLinkClick = (id: number, videoId: string) => {
    setActiveQuickLinkId(id);
    setSelectedVideo(videoId);
    setIsVideoModalOpen(true);
    if(isAllLinksModalOpen) setIsAllLinksModalOpen(false); 
  };

  const navigateVideo = (direction: 'next' | 'prev') => {
    if (activeQuickLinkId === null) return;

    const currentLinks = quickLinksData; // Sempre usar a lista completa para navegação
    if(currentLinks.length === 0) return;

    const currentIndex = currentLinks.findIndex(link => link.id === activeQuickLinkId);
    if (currentIndex === -1) return;

    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % currentLinks.length;
    } else {
      nextIndex = (currentIndex - 1 + currentLinks.length) % currentLinks.length;
    }
    
    const nextLink = currentLinks[nextIndex];
    setActiveQuickLinkId(nextLink.id);
    setSelectedVideo(nextLink.videoId);
  };

  const handleBugReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Relatório de Bug/Sugestão:", {
      matricula: bugReportMatricula,
      email: bugReportEmail,
      description: bugReportDescription,
    });
    // Aqui você pode adicionar a lógica para enviar o relatório para um backend
    setBugReportMatricula('');
    setBugReportEmail('');
    setBugReportDescription('');
    setIsBugReportModalOpen(false);
    // Poderia adicionar um toast de sucesso aqui
  };

  return (
    <aside 
      className="w-full md:w-[380px] lg:w-[420px] p-0 bg-card flex flex-col shadow-xl md:border-r border-border overflow-hidden"
      aria-label="Barra Lateral Principal"
    >
      <div id="estrela-assistente-header" className="p-4 bg-primary text-primary-foreground">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles size={24} /> Estrela Assistente 
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsBugReportModalOpen(true)}
            className="text-primary-foreground hover:bg-primary-foreground/10 h-10 w-10"
            aria-label="Reportar Problema ou Sugestão"
          >
            <Bug size={22} />
          </Button>
        </div>

        <form onSubmit={handleAISearchSubmit} className="mt-3 flex gap-2">
          <Input
            placeholder="Pesquisar com Estrela..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/70 focus-visible:ring-accent"
            disabled={isAISearchLoading}
          />
          <Button 
            type="submit" 
            variant="secondary" 
            size="icon" 
            className="shrink-0" 
            aria-label="Pesquisar com Estrela"
            disabled={isAISearchLoading || !searchQuery.trim()}
          >
            {isAISearchLoading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
          </Button>
        </form>
      </div>
      
      <ScrollArea className="flex-grow custom-scrollbar"> 
        <div className="bg-background/50 p-3 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
                <h3 className="font-medium text-sm text-muted-foreground">
                LINKS RÁPIDOS
                </h3>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsQuickLinksExpanded(!isQuickLinksExpanded)}
                    className="h-6 w-6 text-muted-foreground hover:text-ring"
                    aria-label={isQuickLinksExpanded ? "Recolher links rápidos" : "Expandir links rápidos"}
                >
                    {isQuickLinksExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </Button>
            </div>
            <button 
              onClick={() => setIsAllLinksModalOpen(true)} 
              className="text-xs text-ring hover:underline transition-all cursor-pointer"
            >
              Ver todos
            </button>
          </div>
          <div className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isQuickLinksExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}>
            {filteredQuickLinks.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 pt-1">
                {filteredQuickLinks.slice(0, 4).map((link) => {
                  const IconComponent = iconComponents[link.iconName] || ExternalLink;
                  return (
                    <button
                      key={link.id}
                      data-tour-id={`quick-link-${link.id}`}
                      className={cn(
                        "quick-link group",
                        activeQuickLinkId === link.id && "active-link"
                      )}
                      onClick={() => handleQuickLinkClick(link.id, link.videoId)}
                    >
                      <IconComponent size={16} className={cn(
                          "mr-1 transition-colors duration-200 ease-in-out", 
                          activeQuickLinkId === link.id ? "text-ring" : "text-primary group-hover:text-ring" 
                        )}/>
                      <span className="text-sm flex-1 text-left">{link.title}</span>
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out" />
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-2">Nenhum link encontrado para "{searchQuery}".</p>
            )}
          </div>
        </div>

        <Separator className="my-3"/>

        <div className="px-3 pb-3 flex flex-col flex-grow">
          <ScrollArea ref={chatScrollAreaRef} className="h-[220px] mb-4 pr-1 border rounded-lg p-3 bg-muted/30 shadow-inner custom-scrollbar animate-fade-in">
            <div className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex items-end space-x-2 animate-slide-in',
                    msg.sender === 'user' ? 'ml-auto flex-row-reverse space-x-reverse' : ''
                  )}
                >
                  {msg.sender === 'estrela' && (
                     <div className="flex-shrink-0 bg-accent text-accent-foreground rounded-full p-1.5 self-start animate-pulse-scale">
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
                      'p-3 rounded-lg shadow-sm chat-bubble text-sm', 
                      msg.sender === 'user'
                        ? 'chat-bubble-user' 
                        : 'chat-bubble-bot' 
                    )}
                  >
                    {msg.sender === 'estrela' ? (
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    )}
                    <p className={cn(
                        "text-xs mt-1",
                        msg.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground text-left'
                      )}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              {messages.length === 0 && !isChatLoading && (
                <div className="text-center text-muted-foreground py-8 animate-fade-in">
                  <Sparkles className="h-8 w-8 mx-auto mb-2 text-accent animate-bounce-subtle" />
                  <p>Olá! Sou a Estrela. Como posso te ajudar com o AVA da CEUMA?</p>
                  <p className="text-xs">Ex: "Como acesso a biblioteca virtual?"</p>
                </div>
              )}
              {isChatLoading && messages.length > 0 && messages[messages.length -1]?.sender === 'user' && (
                <div className="flex items-end space-x-2 max-w-[85%] animate-slide-in">
                  <div className="flex-shrink-0 bg-accent text-accent-foreground rounded-full p-1.5 self-start animate-pulse-scale">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="p-3 rounded-lg shadow-sm chat-bubble-bot">
                    <Loader2 className="h-5 w-5 animate-spin text-accent" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <Input
              id="chat-input-estrela"
              type="text"
              value={chatInputValue}
              onChange={(e) => setChatInputValue(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-grow focus-visible:ring-accent"
              disabled={isChatLoading}
              aria-label="Pergunte para Estrela" 
            />
            <Button type="submit" size="icon" disabled={isChatLoading || !chatInputValue.trim()} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isChatLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizonal className="h-4 w-4" />}
              <span className="sr-only">Enviar mensagem</span>
            </Button>
          </form>
        </div>
        
      </ScrollArea>

      <div style={{ padding:1 }} className=" border-t border-border flex items-center justify-center space-x-4 bg-background/50">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsTeamModalOpen(true)}
          className="text-muted-foreground hover:text-primary"
          aria-label="Equipe do Projeto"
        >
          <UsersIcon size={15} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsSupportModalOpen(true)}
          className="text-muted-foreground hover:text-primary"
          aria-label="Suporte"
        >
          <Mail size={15} />
        </Button>
      </div>


      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="sm:max-w-2xl animate-scale-in bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary">
              {quickLinksData.find(link => link.id === activeQuickLinkId)?.title || "Tutorial"}
            </DialogTitle>
             <DialogDescription className="text-muted-foreground">
              Assista ao vídeo para saber mais.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <div className="aspect-video w-full overflow-hidden rounded-lg shadow-lg bg-muted">
              {selectedVideo ? (
                <iframe 
                  src={`https://player.vimeo.com/video/${selectedVideo}?autoplay=1&dnt=1&autopause=0#t=${quickLinksData.find(link => link.id === activeQuickLinkId)?.startSeconds ?? 0}`}
                  className="w-full h-full" 
                  title="Vídeo Tutorial (Vimeo)"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  allowFullScreen
                ></iframe>
              ) : <p className="flex items-center justify-center h-full text-muted-foreground">Vídeo não disponível.</p>}
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-muted-foreground text-sm">
                Este vídeo apresenta as funcionalidades relacionadas a {quickLinksData.find(link => link.id === activeQuickLinkId)?.title || "esta seção"}.
              </p>
            </div>
          </div>
          <DialogFooter className="mt-6 grid grid-cols-3 gap-2 sm:flex sm:justify-between items-center">
            <Button 
              variant="outline"
              onClick={() => navigateVideo('prev')}
              className="hover-scale"
              aria-label="Vídeo Anterior"
            >
              <ChevronLeft size={18} className="mr-1 sm:mr-2"/>
              <span className="hidden sm:inline">Anterior</span>
            </Button>
            <Button 
                variant="default"
                onClick={() => {
                  setIsVideoModalOpen(false);
                  setIsAllLinksModalOpen(true); 
                }}
                className="hover-scale col-span-1"
              >
                Voltar aos Links
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigateVideo('next')}
              className="hover-scale"
              aria-label="Próximo Vídeo"
            >
              <span className="hidden sm:inline">Próximo</span>
              <ChevronRight size={18} className="ml-1 sm:ml-2"/>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAllLinksModalOpen} onOpenChange={setIsAllLinksModalOpen}>
        <DialogContent className="sm:max-w-lg animate-scale-in bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary flex items-center">
              <ExternalLink className="mr-2 h-6 w-6" />
              Todos os Links Rápidos
            </DialogTitle>
             <DialogDescription className="text-muted-foreground">
              Acesse recursos importantes da universidade rapidamente.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="mt-4 max-h-[60vh] custom-scrollbar pr-3">
            {filteredQuickLinks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1">
                {filteredQuickLinks.map((link) => {
                  const IconComponent = iconComponents[link.iconName] || ExternalLink;
                  return (
                  <button
                    key={link.id}
                    data-tour-id={`quick-link-all-${link.id}`}
                    className={cn("quick-link group w-full", activeQuickLinkId === link.id && "active-link")}
                    onClick={() => handleQuickLinkClick(link.id, link.videoId)}
                  >
                    <IconComponent size={16} className={cn(
                        "mr-2 transition-colors duration-200 ease-in-out", 
                        activeQuickLinkId === link.id ? "text-ring" : "text-primary group-hover:text-ring"
                      )}/>
                    <span className="text-sm flex-1 text-left">{link.title}</span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out ml-auto" />
                  </button>
                )})}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">Nenhum link encontrado para "{searchQuery}".</p>
            )}
          </ScrollArea>
          <DialogFooter className="flex justify-end mt-6">
              <Button 
                variant="outline"
                onClick={() => setIsAllLinksModalOpen(false)}
                className="hover-scale"
              >
                Fechar
              </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isTeamModalOpen} onOpenChange={setIsTeamModalOpen}>
        <DialogContent className="sm:max-w-md animate-scale-in bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle className="text-xl text-primary flex items-center">
              <UsersIcon className="mr-2 h-5 w-5" />
              Equipe CEAD
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Conheça quem tornou este projeto possível.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-center">
            <Image 
              src="/img-equipe.jpeg" 
              alt="Equipe CEAD" 
              width={300}
              height={200}
              className="rounded-lg shadow-md"
              data-ai-hint="team group"
            />
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsTeamModalOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isSupportModalOpen} onOpenChange={setIsSupportModalOpen}>
        <DialogContent className="sm:max-w-md animate-scale-in bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle className="text-xl text-primary flex items-center">
              <LifeBuoy className="mr-2 h-5 w-5" /> {/* Ícone do título do modal de suporte */}
              Canais de Suporte
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Precisa de ajuda? Entre em contato conosco.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 space-y-3"> 
            <Card className="bg-background/70 card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-foreground flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-blue-500" />
                  {supportContactData.email.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Envie-nos um e-mail com sua dúvida ou problema.</p>
                <p className="font-semibold text-foreground/80 mb-1">{supportContactData.email.address}</p>
                <Button asChild size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <a href={supportContactData.email.link}>
                    Enviar E-mail
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsSupportModalOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isBugReportModalOpen} onOpenChange={setIsBugReportModalOpen}>
        <DialogContent className="sm:max-w-lg animate-scale-in bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle className="text-xl text-primary flex items-center">
              <Bug className="mr-2 h-5 w-5" />
              Reportar Problema ou Sugestão
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Ajude-nos a melhorar a plataforma. Descreva o problema encontrado ou sua sugestão.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBugReportSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="bug-matricula" className="text-sm font-medium text-foreground">Matrícula (Opcional)</Label>
              <Input 
                id="bug-matricula" 
                value={bugReportMatricula} 
                onChange={(e) => setBugReportMatricula(e.target.value)} 
                placeholder="Sua matrícula"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="bug-email" className="text-sm font-medium text-foreground">Email (Opcional)</Label>
              <Input 
                id="bug-email" 
                type="email"
                value={bugReportEmail} 
                onChange={(e) => setBugReportEmail(e.target.value)} 
                placeholder="seu.email@exemplo.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="bug-description" className="text-sm font-medium text-foreground">Descrição do Problema ou Sugestão</Label>
              <Textarea
                id="bug-description"
                value={bugReportDescription}
                onChange={(e) => setBugReportDescription(e.target.value)}
                placeholder="Descreva detalhadamente..."
                className="mt-1 min-h-[100px]"
                required
              />
            </div>
            <DialogFooter className="pt-2">
              <Button variant="outline" type="button" onClick={() => setIsBugReportModalOpen(false)}>Cancelar</Button>
              <Button type="submit">Enviar Relatório</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </aside>
  );
};

export default AppSidebar;

    