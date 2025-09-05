export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  plantId?: number;
  createdAt: string;
}

export type UserRole = "Usuario" | "Responsable" | "CoDir" | "Admin";

export interface Plant {
  id: number;
  name: string;
  createdAt: string;
}

export interface Area {
  id: number;
  name: string;
  createdAt: string;
}

export interface Campaign {
  id: number;
  title: string;
  description: string;
  plantId?: number;
  plant?: Plant;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
}

export interface Idea {
  id: number;
  title: string;
  description: string;
  status: IdeaStatus;
  authorId: number;
  author?: User;
  plantId?: number;
  plant?: Plant;
  areaId?: number;
  area?: Area;
  campaignId?: number;
  campaign?: Campaign;
  rejectedReason?: string;
  approvedDate?: string;
  implementedDate?: string;
  createdAt: string;
  updatedAt: string;
  attachments?: Attachment[];
  votes?: IdeaVote[];
}

export type IdeaStatus =
  | "Borrador"
  | "Abierta"
  | "En Revisión"
  | "Evalúa CoDir"
  | "Aprobada"
  | "En Progreso"
  | "Implementada"
  | "Rechazada";

export interface Attachment {
  id: number;
  ideaId: number;
  fileName: string;
  filePath: string;
  contentType: string;
  uploadedDate: string;
}

export interface IdeaVote {
  id: number;
  ideaId: number;
  voterId: number;
  voter?: User;
  vote: boolean;
  comment: string;
  voteDate: string;
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  criteria: string;
}

export interface UserBadge {
  id: number;
  userId: number;
  badgeId: number;
  badge?: Badge;
  dateEarned: string;
}

export interface DashboardStats {
  totalIdeas: number;
  ideasInReview: number;
  implementedIdeas: number;
  myIdeas: number;
  totalUsers: number;
  activeCampaigns: number;
  topPlants: Array<{
    plant: string;
    count: number;
  }>;
}

export interface RankingData {
  topUsers: Array<{
    user: string;
    implementedCount: number;
    avatar?: string;
  }>;
  topPlants: Array<{
    plant: string;
    implementedCount: number;
  }>;
}

export interface Notification {
  id: number;
  userId: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  createdAt: string;
}

// Tipos para sistema de encuestas
export interface EncuestaOpcion {
  id: string;
  texto: string;
  valor: string;
}

export interface EncuestaPregunta {
  id: string;
  texto: string;
  tipo: "multiple_choice" | "text" | "rating" | "yes_no";
  opciones?: EncuestaOpcion[];
  requerida: boolean;
  orden: number;
}

export interface Encuesta {
  id: string;
  titulo: string;
  descripcion: string;
  preguntas: EncuestaPregunta[];
  fechaInicio: string;
  fechaFin: string;
  activa: boolean;
  creadorId: string;
  creador: string;
  planta?: string;
  area?: string;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface EncuestaRespuesta {
  id: string;
  encuestaId: string;
  usuarioId: string;
  usuario: string;
  respuestas: Record<string, string | number>;
  fechaRespuesta: string;
}

export interface EncuestaStats {
  encuestaId: string;
  totalRespuestas: number;
  respuestasPorPregunta: Record<string, any>;
  fechaUltimaRespuesta?: string;
}
