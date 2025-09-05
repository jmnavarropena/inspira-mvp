import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Campaign {
  id: string;
  titulo: string;
  descripcion: string;
  objetivo: string;
  fechaInicio: string;
  fechaFin: string;
  estado: "Borrador" | "Activa" | "En Revisión" | "Finalizada" | "Pausada";
  prioridad: "Alta" | "Media" | "Baja";
  categoria: string;
  planta: string;
  area: string;
  responsable: string;
  presupuesto?: number;
  recursosNecesarios?: string;
  criteriosEvaluacion?: string;
  recompensas?: string;
  metricasEsperadas?: string;
  fechaCreacion: string;
  fechaModificacion: string;
  participantes?: number;
  ideasRecibidas?: number;
  ideasAprobadas?: number;
  tags?: string[];
}

interface Idea {
  id: string;
  campaignId: string;
  titulo: string;
  descripcion: string;
  autor: string;
  fechaCreacion: string;
  estado:
    | "Enviada"
    | "En Evaluación"
    | "Aprobada"
    | "Rechazada"
    | "Implementada";
  puntuacion?: number;
  comentarios?: string;
  archivos?: string[];
  categoria: string;
  impactoEstimado?: "Alto" | "Medio" | "Bajo";
  facilidadImplementacion?: "Alta" | "Media" | "Baja";
  recursosNecesarios?: string;
}

interface CampaignsContextType {
  campaigns: Campaign[];
  ideas: Idea[];
  addCampaign: (
    campaign: Omit<Campaign, "id" | "fechaCreacion" | "fechaModificacion">
  ) => void;
  updateCampaign: (id: string, campaign: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  addIdea: (idea: Omit<Idea, "id" | "fechaCreacion">) => void;
  updateIdea: (id: string, idea: Partial<Idea>) => void;
  getIdeasByCampaign: (campaignId: string) => Idea[];
  getActiveCampaigns: () => Campaign[];
  getCampaignById: (id: string) => Campaign | undefined;
}

const CampaignsContext = createContext<CampaignsContextType | undefined>(
  undefined
);

// Datos de ejemplo para demostración
const mockCampaigns: Campaign[] = [
  {
    id: "1",
    titulo: "Optimización Energética 2025",
    descripcion:
      "Iniciativa para reducir el consumo energético en todas las plantas mediante la implementación de tecnologías innovadoras y mejores prácticas operativas.",
    objetivo: "Reducir el consumo energético en un 15% durante 2025",
    fechaInicio: "2025-01-15",
    fechaFin: "2025-12-15",
    estado: "Activa",
    prioridad: "Alta",
    categoria: "Sostenibilidad",
    planta: "Todas las plantas",
    area: "Operaciones",
    responsable: "Juan Carlos Pérez",
    presupuesto: 500000,
    recursosNecesarios:
      "Equipo de ingeniería, consultores especializados, presupuesto para implementación",
    criteriosEvaluacion:
      "Impacto ambiental, viabilidad técnica, retorno de inversión",
    recompensas: "Bonificación de $2000 para la mejor idea implementada",
    metricasEsperadas:
      "kWh ahorrados, reducción de costos, tiempo de implementación",
    fechaCreacion: "2025-01-10",
    fechaModificacion: "2025-01-10",
    participantes: 45,
    ideasRecibidas: 23,
    ideasAprobadas: 8,
    tags: ["energía", "sostenibilidad", "innovación", "costos"],
  },
  {
    id: "2",
    titulo: "Mejora de Seguridad Industrial",
    descripcion:
      "Campaña enfocada en identificar y implementar mejoras en los protocolos de seguridad industrial.",
    objetivo: "Reducir incidentes de seguridad en un 25%",
    fechaInicio: "2025-02-01",
    fechaFin: "2025-08-31",
    estado: "Activa",
    prioridad: "Alta",
    categoria: "Seguridad",
    planta: "Planta Norte",
    area: "Seguridad Industrial",
    responsable: "María González",
    presupuesto: 300000,
    recursosNecesarios:
      "Equipo de seguridad, capacitación, nuevos equipos de protección",
    criteriosEvaluacion:
      "Impacto en seguridad, facilidad de implementación, costo-beneficio",
    recompensas: "Reconocimiento público y bonificación económica",
    metricasEsperadas:
      "Reducción de incidentes, mejora en indicadores de seguridad",
    fechaCreacion: "2025-01-25",
    fechaModificacion: "2025-01-25",
    participantes: 32,
    ideasRecibidas: 18,
    ideasAprobadas: 5,
    tags: ["seguridad", "protocolos", "prevención"],
  },
  {
    id: "3",
    titulo: "Digitalización de Procesos",
    descripcion:
      "Identificar oportunidades para digitalizar y automatizar procesos manuales.",
    objetivo: "Digitalizar el 30% de los procesos manuales críticos",
    fechaInicio: "2025-03-01",
    fechaFin: "2025-11-30",
    estado: "En Revisión",
    prioridad: "Media",
    categoria: "Tecnología",
    planta: "Planta Sur",
    area: "IT & Sistemas",
    responsable: "Carlos Rodríguez",
    presupuesto: 750000,
    recursosNecesarios: "Desarrolladores, software especializado, capacitación",
    criteriosEvaluacion:
      "Impacto en eficiencia, complejidad técnica, escalabilidad",
    recompensas: "Participación en proyecto de implementación",
    metricasEsperadas:
      "Procesos automatizados, tiempo ahorrado, errores reducidos",
    fechaCreacion: "2025-02-15",
    fechaModificacion: "2025-02-20",
    participantes: 28,
    ideasRecibidas: 15,
    ideasAprobadas: 3,
    tags: ["digitalización", "automatización", "eficiencia"],
  },
];

const mockIdeas: Idea[] = [
  {
    id: "1",
    campaignId: "1",
    titulo: "Sistema de Monitoreo Inteligente",
    descripcion:
      "Implementar sensores IoT para monitorear el consumo energético en tiempo real",
    autor: "Ana Martínez",
    fechaCreacion: "2025-01-20",
    estado: "Aprobada",
    puntuacion: 95,
    categoria: "Tecnología",
    impactoEstimado: "Alto",
    facilidadImplementacion: "Media",
    recursosNecesarios: "Sensores IoT, plataforma de monitoreo, instalación",
  },
  {
    id: "2",
    campaignId: "1",
    titulo: "Programa de Concienciación Energética",
    descripcion:
      "Capacitar a los empleados sobre buenas prácticas de ahorro energético",
    autor: "Roberto Silva",
    fechaCreacion: "2025-01-22",
    estado: "En Evaluación",
    categoria: "Capacitación",
    impactoEstimado: "Medio",
    facilidadImplementacion: "Alta",
    recursosNecesarios: "Material de capacitación, tiempo de los empleados",
  },
  {
    id: "3",
    campaignId: "2",
    titulo: "App de Reporte de Incidentes",
    descripcion:
      "Aplicación móvil para reportar incidentes de seguridad de forma inmediata",
    autor: "Laura Fernández",
    fechaCreacion: "2025-02-05",
    estado: "Aprobada",
    puntuacion: 88,
    categoria: "Tecnología",
    impactoEstimado: "Alto",
    facilidadImplementacion: "Media",
    recursosNecesarios:
      "Desarrollo de app, integración con sistemas existentes",
  },
];

export const CampaignsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [ideas, setIdeas] = useState<Idea[]>(mockIdeas);

  const addCampaign = (
    campaignData: Omit<Campaign, "id" | "fechaCreacion" | "fechaModificacion">
  ) => {
    const newCampaign: Campaign = {
      ...campaignData,
      id: Date.now().toString(),
      fechaCreacion: new Date().toISOString().split("T")[0],
      fechaModificacion: new Date().toISOString().split("T")[0],
      participantes: 0,
      ideasRecibidas: 0,
      ideasAprobadas: 0,
    };
    setCampaigns((prev) => [...prev, newCampaign]);
  };

  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    setCampaigns((prev) =>
      prev.map((campaign) =>
        campaign.id === id
          ? {
              ...campaign,
              ...updates,
              fechaModificacion: new Date().toISOString().split("T")[0],
            }
          : campaign
      )
    );
  };

  const deleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((campaign) => campaign.id !== id));
    setIdeas((prev) => prev.filter((idea) => idea.campaignId !== id));
  };

  const addIdea = (ideaData: Omit<Idea, "id" | "fechaCreacion">) => {
    const newIdea: Idea = {
      ...ideaData,
      id: Date.now().toString(),
      fechaCreacion: new Date().toISOString().split("T")[0],
      estado: "Enviada",
    };
    setIdeas((prev) => [...prev, newIdea]);

    // Actualizar contador de ideas en la campaña
    updateCampaign(ideaData.campaignId, {
      ideasRecibidas:
        (campaigns.find((c) => c.id === ideaData.campaignId)?.ideasRecibidas ||
          0) + 1,
    });
  };

  const updateIdea = (id: string, updates: Partial<Idea>) => {
    setIdeas((prev) =>
      prev.map((idea) => (idea.id === id ? { ...idea, ...updates } : idea))
    );
  };

  const getIdeasByCampaign = (campaignId: string) => {
    return ideas.filter((idea) => idea.campaignId === campaignId);
  };

  const getActiveCampaigns = () => {
    return campaigns.filter((campaign) => campaign.estado === "Activa");
  };

  const getCampaignById = (id: string) => {
    return campaigns.find((campaign) => campaign.id === id);
  };

  const value: CampaignsContextType = {
    campaigns,
    ideas,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    addIdea,
    updateIdea,
    getIdeasByCampaign,
    getActiveCampaigns,
    getCampaignById,
  };

  return (
    <CampaignsContext.Provider value={value}>
      {children}
    </CampaignsContext.Provider>
  );
};

export const useCampaigns = () => {
  const context = useContext(CampaignsContext);
  if (context === undefined) {
    throw new Error("useCampaigns must be used within a CampaignsProvider");
  }
  return context;
};
