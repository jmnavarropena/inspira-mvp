import React, { createContext, useContext, useState, ReactNode } from "react";

// Definición de interfaces
export interface Idea {
  id: string;
  titulo: string;
  descripcion: string;
  beneficios?: string;
  implementacion?: string;
  estado:
    | "Abierta"
    | "En Revisión"
    | "Evalúa CoDir"
    | "Aprobada"
    | "En Progreso"
    | "Implementada"
    | "Rechazada";
  prioridad: "Alta" | "Media" | "Baja";
  fechaCreacion: string;
  fechaActualizacion: string;
  autor: string;
  autorId: string;
  planta: string;
  area: string;
  categoria: string;
  campanaId?: string;
  campanaTitulo?: string;
  comentarios?: string;
  votosPositivos?: number;
  votosNegativos?: number;
  archivosAdjuntos?: string[];
}

interface IdeasContextType {
  ideas: Idea[];
  addIdea: (
    idea: Omit<Idea, "id" | "fechaCreacion" | "fechaActualizacion">
  ) => void;
  updateIdea: (id: string, updates: Partial<Idea>) => void;
  deleteIdea: (id: string) => void;
  moveIdea: (
    id: string,
    newStatus: Idea["estado"],
    comentario?: string
  ) => void;
  getIdeasByStatus: (status: Idea["estado"]) => Idea[];
  getIdeasByAuthor: (authorId: string) => Idea[];
}

const IdeasContext = createContext<IdeasContextType | undefined>(undefined);

// Datos mock para desarrollo
const mockIdeas: Idea[] = [
  {
    id: "1",
    titulo: "Sistema de reciclaje inteligente",
    descripcion:
      "Implementar sensores IoT para optimizar la gestión de residuos en la planta.",
    beneficios:
      "Reducción del 30% en costos de gestión de residuos y mejora ambiental.",
    implementacion:
      "Instalación de sensores en contenedores y desarrollo de dashboard.",
    estado: "En Revisión",
    prioridad: "Alta",
    fechaCreacion: "2025-01-15T10:30:00Z",
    fechaActualizacion: "2025-02-01T14:20:00Z",
    autor: "María García",
    autorId: "user1",
    planta: "Planta Norte",
    area: "Producción",
    categoria: "Sostenibilidad",
    comentarios: "Idea muy prometedora, necesita evaluación técnica.",
  },
  {
    id: "2",
    titulo: "Automatización de reportes de calidad",
    descripcion:
      "Crear sistema automático para generar reportes de control de calidad.",
    beneficios: "Ahorro de 10 horas semanales en tareas administrativas.",
    implementacion:
      "Desarrollo de scripts Python y conexión con base de datos.",
    estado: "Evalúa CoDir",
    prioridad: "Media",
    fechaCreacion: "2025-01-20T09:15:00Z",
    fechaActualizacion: "2025-02-05T16:45:00Z",
    autor: "Carlos Ruiz",
    autorId: "user2",
    planta: "Planta Sur",
    area: "Calidad",
    categoria: "Eficiencia",
    comentarios: "Aprobada por responsable, pendiente de votación CoDir.",
  },
  {
    id: "3",
    titulo: "App móvil para gestión de inventario",
    descripcion:
      "Aplicación móvil para escanear códigos QR y gestionar stock en tiempo real.",
    beneficios:
      "Reducción de errores de inventario y actualización en tiempo real.",
    implementacion: "Desarrollo de app React Native con backend API.",
    estado: "Aprobada",
    prioridad: "Alta",
    fechaCreacion: "2025-01-10T11:00:00Z",
    fechaActualizacion: "2025-02-10T13:30:00Z",
    autor: "Ana Martínez",
    autorId: "user3",
    planta: "Centro Logístico",
    area: "Logística",
    categoria: "Tecnología",
    comentarios: "Aprobada unánimemente. Presupuesto asignado: €15.000",
  },
  {
    id: "4",
    titulo: "Sistema de sugerencias anónimas",
    descripcion:
      "Plataforma para que empleados envíen sugerencias de mejora de forma anónima.",
    beneficios: "Mayor participación y detección de problemas internos.",
    implementacion: "Portal web con sistema de buzón digital.",
    estado: "En Progreso",
    prioridad: "Media",
    fechaCreacion: "2025-01-08T14:22:00Z",
    fechaActualizacion: "2025-02-12T10:15:00Z",
    autor: "Luis Fernández",
    autorId: "user4",
    planta: "Oficinas Centrales",
    area: "RRHH",
    categoria: "Comunicación",
    comentarios: "En desarrollo. Estimado de finalización: marzo 2025.",
  },
  {
    id: "5",
    titulo: "Optimización energética con IA",
    descripcion:
      "Usar machine learning para optimizar el consumo energético en las líneas de producción.",
    beneficios: "Ahorro estimado del 20% en costos energéticos anuales.",
    implementacion: "Instalación de medidores inteligentes y algoritmos de ML.",
    estado: "Implementada",
    prioridad: "Alta",
    fechaCreacion: "2024-11-15T08:45:00Z",
    fechaActualizacion: "2025-01-30T17:00:00Z",
    autor: "Roberto Silva",
    autorId: "user5",
    planta: "Planta Norte",
    area: "Eficiencia Energética",
    categoria: "Sostenibilidad",
    comentarios: "Implementada exitosamente. Resultados superan expectativas.",
  },
  {
    id: "6",
    titulo: "Chatbot para atención al cliente",
    descripcion:
      "Bot inteligente para resolver consultas frecuentes de clientes 24/7.",
    beneficios: "Reducción de 40% en llamadas al call center.",
    implementacion: "Desarrollo con tecnología GPT y integración web.",
    estado: "Rechazada",
    prioridad: "Baja",
    fechaCreacion: "2025-01-25T16:30:00Z",
    fechaActualizacion: "2025-02-08T12:00:00Z",
    autor: "Elena Torres",
    autorId: "user6",
    planta: "General",
    area: "Comercial",
    categoria: "Tecnología",
    comentarios: "Rechazada por duplicidad con proyecto ya en marcha en IT.",
  },
  {
    id: "7",
    titulo: "Programa de formación en sostenibilidad",
    descripcion:
      "Crear programa de capacitación para empleados sobre prácticas sostenibles.",
    beneficios: "Mayor conciencia ambiental y mejores prácticas de trabajo.",
    implementacion:
      "Desarrollo de contenidos e-learning y talleres presenciales.",
    estado: "Abierta",
    prioridad: "Media",
    fechaCreacion: "2025-02-01T12:10:00Z",
    fechaActualizacion: "2025-02-01T12:10:00Z",
    autor: "Patricia López",
    autorId: "user7",
    planta: "Todas las plantas",
    area: "RRHH",
    categoria: "Formación",
    comentarios: "",
  },
];

export const IdeasProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [ideas, setIdeas] = useState<Idea[]>(mockIdeas);

  const addIdea = (
    newIdea: Omit<Idea, "id" | "fechaCreacion" | "fechaActualizacion">
  ) => {
    const idea: Idea = {
      ...newIdea,
      id: `idea_${Date.now()}`,
      fechaCreacion: new Date().toISOString(),
      fechaActualizacion: new Date().toISOString(),
    };
    setIdeas((prev) => [...prev, idea]);
  };

  const updateIdea = (id: string, updates: Partial<Idea>) => {
    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === id
          ? {
              ...idea,
              ...updates,
              fechaActualizacion: new Date().toISOString(),
            }
          : idea
      )
    );
  };

  const deleteIdea = (id: string) => {
    setIdeas((prev) => prev.filter((idea) => idea.id !== id));
  };

  const moveIdea = (
    id: string,
    newStatus: Idea["estado"],
    comentario?: string
  ) => {
    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === id
          ? {
              ...idea,
              estado: newStatus,
              comentarios: comentario || idea.comentarios,
              fechaActualizacion: new Date().toISOString(),
            }
          : idea
      )
    );
  };

  const getIdeasByStatus = (status: Idea["estado"]) => {
    return ideas.filter((idea) => idea.estado === status);
  };

  const getIdeasByAuthor = (authorId: string) => {
    return ideas.filter((idea) => idea.autorId === authorId);
  };

  const value = {
    ideas,
    addIdea,
    updateIdea,
    deleteIdea,
    moveIdea,
    getIdeasByStatus,
    getIdeasByAuthor,
  };

  return (
    <IdeasContext.Provider value={value}>{children}</IdeasContext.Provider>
  );
};

export const useIdeas = () => {
  const context = useContext(IdeasContext);
  if (context === undefined) {
    throw new Error("useIdeas must be used within an IdeasProvider");
  }
  return context;
};
