
export interface QuickLink {
  id: number;
  title: string;
  url: string;
  iconName: string; // Deve corresponder a uma chave em iconComponents no AppSidebar
  startSeconds: number; // Timestamp do Vimeo para iniciar quando clicar neste item
  videoId: string;
}

export const quickLinksData: QuickLink[] = [

  { id: 1, title: "Intro", url: "#", iconName: "Home", startSeconds: 26, videoId: "1090689535" },
  { id: 2, title: "Biblioteca Virtual", url: "#", iconName: "Library", startSeconds: 48, videoId: "1090689535" },
  { id: 3, title: "Calendário Acadêmico", url: "#", iconName: "CalendarDays", startSeconds: 60, videoId: "1090689535" },
  { id: 4, title: "Minhas Disciplinas", url: "#", iconName: "BookOpen", startSeconds: 74, videoId: "1090689535" },
  { id: 5, title: "Plano de Ensino", url: "#", iconName: "FileText", startSeconds: 102, videoId: "1090689535" },
  { id: 6, title: "Fóruns", url: "#", iconName: "MessageSquare", startSeconds: 120, videoId: "1090689535" },
  { id: 7, title: "Materiais de Aula", url: "#", iconName: "Archive", startSeconds: 143, videoId: "1090689535" },
  { id: 8, title: "Fórum Avaliativo", url: "#", iconName: "ClipboardCheck", startSeconds: 170, videoId: "1090689535" },
  { id: 9, title: "Questionário Avaliativo", url: "#", iconName: "FileText", startSeconds: 225, videoId: "1090689535" },
  { id: 10, title: "Aulas Online", url: "#", iconName: "PlaySquare", startSeconds: 242, videoId: "1090689535" },
  { id: 11, title: "Provas Digitais", url: "#", iconName: "ClipboardCheck", startSeconds: 258, videoId: "1090689535" },
  { id: 12, title: "Avisos Importantes", url: "#", iconName: "Megaphone", startSeconds: 299, videoId: "1090689535" },
  { id: 13, title: "Notas", url: "#", iconName: "GraduationCap", startSeconds: 307, videoId: "1090689535" },
  { id: 14, title: "Interface da Disciplina", url: "#", iconName: "Puzzle", startSeconds: 345, videoId: "1090689535" },
  { id: 15, title: "Tutoria Online", url: "#", iconName: "HelpCircle", startSeconds: 372, videoId: "1090689535" },
  { id: 16, title: "Suporte", url: "#", iconName: "LifeBuoy", startSeconds: 372, videoId: "1090689535" },
];


export const supportContactData = {
  email: {
    name: "Suporte Técnico CEAD",
    address: "suporte.cead@ceuma.br",
    link: "mailto:suporte.cead@ceuma.br"
  }
};

    