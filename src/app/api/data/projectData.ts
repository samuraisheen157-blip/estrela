
export interface QuickLink {
  id: number;
  title: string;
  url: string;
  iconName: string; // Deve corresponder a uma chave em iconComponents no AppSidebar
  videoId: string;
}

export const quickLinksData: QuickLink[] = [
  { id: 1, title: "Acesso AVA", url: "#", iconName: "Home", videoId: "dQw4w9WgXcQ" },
  { id: 2, title: "Minhas Disciplinas", url: "#", iconName: "BookOpen", videoId: "L0U7k2rdesA" },
  { id: 3, title: "Calendário Acadêmico", url: "#", iconName: "CalendarDays", videoId: "y2DxqGJLBag" },
  { id: 4, title: "Biblioteca Virtual", url: "#", iconName: "Library", videoId: "QH2-TGUlwu4" },
  { id: 5, title: "Minhas Notas", url: "#", iconName: "GraduationCap", videoId: "u31FO_4d9Kk" },
  { id: 6, title: "Fóruns", url: "#", iconName: "MessageSquare", videoId: "gtM4jrLuGk0" },
  { id: 7, title: "Plano de Ensino", url: "#", iconName: "FileText", videoId: "iSkBdF9j13o" },
  { id: 8, title: "Aulas Online", url: "#", iconName: "PlaySquare", videoId: "vC8gJ0_9o4M" },
  { id: 9, title: "Provas", url: "#", iconName: "ClipboardCheck", videoId: "PqJNc9KVIZE" },
  { id: 10, title: "Tutoria Online", url: "#", iconName: "HelpCircle", videoId: "0e3GPea1Tyg" },
  { id: 11, title: "Materiais de Aula", url: "#", iconName: "Archive", videoId: "TBsGx6NotF4" },
  { id: 12, title: "Avisos Importantes", url: "#", iconName: "Megaphone", videoId: "h6fcK_fRYaI" },
];


export const supportContactData = {
  email: {
    name: "Suporte Técnico CEAD",
    address: "suporte.cead@ceuma.br",
    link: "mailto:suporte.cead@ceuma.br"
  }
};

    