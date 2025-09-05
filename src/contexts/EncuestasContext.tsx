import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  Encuesta,
  EncuestaPregunta,
  EncuestaRespuesta,
  EncuestaStats,
} from "../types";

interface EncuestasContextType {
  encuestas: Encuesta[];
  respuestas: EncuestaRespuesta[];
  addEncuesta: (
    encuesta: Omit<Encuesta, "id" | "fechaCreacion" | "fechaActualizacion">
  ) => void;
  updateEncuesta: (id: string, updates: Partial<Encuesta>) => void;
  deleteEncuesta: (id: string) => void;
  addRespuesta: (
    respuesta: Omit<EncuestaRespuesta, "id" | "fechaRespuesta">
  ) => void;
  getEncuestasDisponibles: (usuarioId: string) => Encuesta[];
  getEstadisticas: (encuestaId: string) => EncuestaStats;
  hasUserResponded: (encuestaId: string, usuarioId: string) => boolean;
}

const EncuestasContext = createContext<EncuestasContextType | undefined>(
  undefined
);

export const useEncuestas = () => {
  const context = useContext(EncuestasContext);
  if (context === undefined) {
    throw new Error("useEncuestas must be used within an EncuestasProvider");
  }
  return context;
};

// Datos mock para desarrollo
const mockEncuestas: Encuesta[] = [
  {
    id: "encuesta_1",
    titulo: "Satisfacción con el Sistema Inspira",
    descripcion:
      "Queremos conocer tu opinión sobre la plataforma de gestión de ideas.",
    fechaInicio: "2025-01-01T00:00:00Z",
    fechaFin: "2025-12-31T23:59:59Z",
    activa: true,
    creadorId: "user_resp_1",
    creador: "María González",
    planta: "AGSA",
    area: "Recursos Humanos",
    fechaCreacion: "2024-12-15T09:00:00Z",
    fechaActualizacion: "2024-12-15T09:00:00Z",
    preguntas: [
      {
        id: "p1",
        texto: "¿Cómo calificarías la facilidad de uso del sistema?",
        tipo: "rating",
        requerida: true,
        orden: 1,
      },
      {
        id: "p2",
        texto: "¿Qué funcionalidad te parece más útil?",
        tipo: "multiple_choice",
        opciones: [
          { id: "o1", texto: "Gestión de ideas", valor: "ideas" },
          { id: "o2", texto: "Sistema de campañas", valor: "campanas" },
          { id: "o3", texto: "Tablero Kanban", valor: "kanban" },
          { id: "o4", texto: "Sistema de votación", valor: "votacion" },
        ],
        requerida: true,
        orden: 2,
      },
      {
        id: "p3",
        texto: "¿Tienes alguna sugerencia de mejora?",
        tipo: "text",
        requerida: false,
        orden: 3,
      },
    ],
  },
  {
    id: "encuesta_2",
    titulo: "Evaluación de Campañas 2025",
    descripcion: "Evalúa las campañas de innovación del primer trimestre.",
    fechaInicio: "2025-04-01T00:00:00Z",
    fechaFin: "2025-04-30T23:59:59Z",
    activa: true,
    creadorId: "user_codir_1",
    creador: "Carlos Ruiz",
    planta: "Todas",
    area: "General",
    fechaCreacion: "2025-03-25T14:30:00Z",
    fechaActualizacion: "2025-03-25T14:30:00Z",
    preguntas: [
      {
        id: "p1",
        texto: "¿Las campañas actuales te motivan a participar?",
        tipo: "yes_no",
        requerida: true,
        orden: 1,
      },
      {
        id: "p2",
        texto: "¿Qué tipo de campañas te interesan más?",
        tipo: "multiple_choice",
        opciones: [
          { id: "o1", texto: "Sostenibilidad", valor: "sostenibilidad" },
          { id: "o2", texto: "Eficiencia Energética", valor: "energia" },
          { id: "o3", texto: "Digitalización", valor: "digital" },
          { id: "o4", texto: "Seguridad Industrial", valor: "seguridad" },
        ],
        requerida: true,
        orden: 2,
      },
    ],
  },
  {
    id: "encuesta_3",
    titulo: "Feedback sobre Ideas Implementadas",
    descripcion:
      "Comparte tu experiencia con las ideas que se han implementado.",
    fechaInicio: "2025-02-01T00:00:00Z",
    fechaFin: "2025-02-28T23:59:59Z",
    activa: false,
    creadorId: "user_resp_2",
    creador: "Ana Martínez",
    planta: "Biomasa Forestal",
    area: "Producción",
    fechaCreacion: "2025-01-20T11:15:00Z",
    fechaActualizacion: "2025-02-28T23:59:59Z",
    preguntas: [
      {
        id: "p1",
        texto: "¿Has notado mejoras desde la implementación de nuevas ideas?",
        tipo: "yes_no",
        requerida: true,
        orden: 1,
      },
      {
        id: "p2",
        texto: "Califica el impacto general de las ideas implementadas",
        tipo: "rating",
        requerida: true,
        orden: 2,
      },
    ],
  },
];

const mockRespuestas: EncuestaRespuesta[] = [
  {
    id: "resp_1",
    encuestaId: "encuesta_1",
    usuarioId: "user_1",
    usuario: "Pedro López",
    respuestas: {
      p1: 4,
      p2: "ideas",
      p3: "Me gustaría que tuviera notificaciones push",
    },
    fechaRespuesta: "2025-01-15T10:30:00Z",
  },
  {
    id: "resp_2",
    encuestaId: "encuesta_1",
    usuarioId: "user_2",
    usuario: "Laura García",
    respuestas: {
      p1: 5,
      p2: "kanban",
      p3: "",
    },
    fechaRespuesta: "2025-01-16T14:20:00Z",
  },
  {
    id: "resp_3",
    encuestaId: "encuesta_2",
    usuarioId: "user_1",
    usuario: "Pedro López",
    respuestas: {
      p1: "si",
      p2: "sostenibilidad",
    },
    fechaRespuesta: "2025-04-05T09:45:00Z",
  },
];

export const EncuestasProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [encuestas, setEncuestas] = useState<Encuesta[]>(mockEncuestas);
  const [respuestas, setRespuestas] =
    useState<EncuestaRespuesta[]>(mockRespuestas);

  const addEncuesta = (
    nuevaEncuesta: Omit<Encuesta, "id" | "fechaCreacion" | "fechaActualizacion">
  ) => {
    const encuesta: Encuesta = {
      ...nuevaEncuesta,
      id: `encuesta_${Date.now()}`,
      fechaCreacion: new Date().toISOString(),
      fechaActualizacion: new Date().toISOString(),
    };
    setEncuestas((prev) => [...prev, encuesta]);
  };

  const updateEncuesta = (id: string, updates: Partial<Encuesta>) => {
    setEncuestas((prev) =>
      prev.map((encuesta) =>
        encuesta.id === id
          ? {
              ...encuesta,
              ...updates,
              fechaActualizacion: new Date().toISOString(),
            }
          : encuesta
      )
    );
  };

  const deleteEncuesta = (id: string) => {
    setEncuestas((prev) => prev.filter((encuesta) => encuesta.id !== id));
    // También eliminar respuestas asociadas
    setRespuestas((prev) =>
      prev.filter((respuesta) => respuesta.encuestaId !== id)
    );
  };

  const addRespuesta = (
    nuevaRespuesta: Omit<EncuestaRespuesta, "id" | "fechaRespuesta">
  ) => {
    const respuesta: EncuestaRespuesta = {
      ...nuevaRespuesta,
      id: `resp_${Date.now()}`,
      fechaRespuesta: new Date().toISOString(),
    };
    setRespuestas((prev) => [...prev, respuesta]);
  };

  const getEncuestasDisponibles = (usuarioId: string): Encuesta[] => {
    const now = new Date();
    return encuestas.filter((encuesta) => {
      const inicioDate = new Date(encuesta.fechaInicio);
      const finDate = new Date(encuesta.fechaFin);
      const enPeriodo = now >= inicioDate && now <= finDate;
      const yaRespondida = hasUserResponded(encuesta.id, usuarioId);

      return encuesta.activa && enPeriodo && !yaRespondida;
    });
  };

  const hasUserResponded = (encuestaId: string, usuarioId: string): boolean => {
    return respuestas.some(
      (respuesta) =>
        respuesta.encuestaId === encuestaId && respuesta.usuarioId === usuarioId
    );
  };

  const getEstadisticas = (encuestaId: string): EncuestaStats => {
    const respuestasEncuesta = respuestas.filter(
      (r) => r.encuestaId === encuestaId
    );
    const totalRespuestas = respuestasEncuesta.length;

    const respuestasPorPregunta: Record<string, any> = {};

    // Procesar estadísticas por tipo de pregunta
    const encuesta = encuestas.find((e) => e.id === encuestaId);
    if (encuesta) {
      encuesta.preguntas.forEach((pregunta) => {
        const respuestasPregunta = respuestasEncuesta
          .map((r) => r.respuestas[pregunta.id])
          .filter((r) => r !== undefined && r !== "");

        if (pregunta.tipo === "rating") {
          const ratings = respuestasPregunta.map(Number);
          const promedio =
            ratings.length > 0
              ? ratings.reduce((a, b) => a + b, 0) / ratings.length
              : 0;
          respuestasPorPregunta[pregunta.id] = {
            promedio: Math.round(promedio * 10) / 10,
            distribución: ratings.reduce((acc, rating) => {
              acc[rating] = (acc[rating] || 0) + 1;
              return acc;
            }, {} as Record<number, number>),
          };
        } else if (
          pregunta.tipo === "multiple_choice" ||
          pregunta.tipo === "yes_no"
        ) {
          respuestasPorPregunta[pregunta.id] = respuestasPregunta.reduce(
            (acc, respuesta) => {
              acc[respuesta as string] = (acc[respuesta as string] || 0) + 1;
              return acc;
            },
            {} as Record<string, number>
          );
        } else if (pregunta.tipo === "text") {
          respuestasPorPregunta[pregunta.id] = respuestasPregunta;
        }
      });
    }

    return {
      encuestaId,
      totalRespuestas,
      respuestasPorPregunta,
      fechaUltimaRespuesta:
        respuestasEncuesta.length > 0
          ? respuestasEncuesta[respuestasEncuesta.length - 1].fechaRespuesta
          : undefined,
    };
  };

  const value = {
    encuestas,
    respuestas,
    addEncuesta,
    updateEncuesta,
    deleteEncuesta,
    addRespuesta,
    getEncuestasDisponibles,
    getEstadisticas,
    hasUserResponded,
  };

  return (
    <EncuestasContext.Provider value={value}>
      {children}
    </EncuestasContext.Provider>
  );
};

export default EncuestasProvider;
