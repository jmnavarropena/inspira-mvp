import { useState, useEffect, useCallback } from "react";
import { Idea, User } from "../services/api";
import { useToast } from "../components/Notifications/ToastProvider";

interface UseIdeasReturn {
  ideas: Idea[];
  users: User[];
  loading: boolean;
  error: string | null;
  creating: boolean;
  filteredIdeas: Idea[];
  searchTerm: string;
  statusFilter: string;
  plantFilter: string;
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: string) => void;
  setPlantFilter: (plant: string) => void;
  createIdea: (ideaData: Partial<Idea>) => Promise<boolean>;
  refreshData: () => Promise<void>;
  getStats: () => {
    total: number;
    inProgress: number;
    implemented: number;
    byStatus: Record<string, number>;
  };
}

export const useIdeas = (): UseIdeasReturn => {
  const { showToast } = useToast();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  // Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [plantFilter, setPlantFilter] = useState("");

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Simular carga con datos mock mejorados
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Datos mock más realistas para ideas
      const mockIdeas: Idea[] = [
        {
          id: 1,
          title: "Optimización de línea de producción",
          description:
            "Implementar sensores IoT para monitoreo en tiempo real de la línea de producción, reduciendo tiempos muertos y mejorando la eficiencia global.",
          status: "En Revisión",
          authorId: 1,
          plantId: 1,
          areaId: 1,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          author: {
            id: 1,
            name: "Juan Pérez",
            email: "juan.perez@clgrupo.com",
            role: "Operario",
            plantId: 1,
            createdAt: "2025-01-01T00:00:00.000Z",
            isActive: true,
          },
          plant: { id: 1, name: "AGSA", createdAt: "2025-01-01T00:00:00.000Z" },
          area: {
            id: 1,
            name: "Producción",
            createdAt: "2025-01-01T00:00:00.000Z",
          },
        },
        {
          id: 2,
          title: "Sistema de reciclaje de agua",
          description:
            "Crear un sistema cerrado de reciclaje de agua para reducir el consumo y mejorar la sostenibilidad ambiental de la planta.",
          status: "Implementada",
          authorId: 2,
          plantId: 1,
          areaId: 2,
          createdAt: new Date(
            Date.now() - 1000 * 60 * 60 * 24 * 5
          ).toISOString(),
          updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
          author: {
            id: 2,
            name: "María García",
            email: "maria.garcia@clgrupo.com",
            role: "Supervisora",
            plantId: 1,
            createdAt: "2025-01-01T00:00:00.000Z",
            isActive: true,
          },
          plant: { id: 1, name: "AGSA", createdAt: "2025-01-01T00:00:00.000Z" },
          area: {
            id: 2,
            name: "Calidad",
            createdAt: "2025-01-01T00:00:00.000Z",
          },
        },
        {
          id: 3,
          title: "Automatización de inventarios",
          description:
            "Implementar códigos QR y lectores automáticos para el control de inventarios, eliminando errores manuales.",
          status: "Aprobada",
          authorId: 3,
          plantId: 2,
          areaId: 3,
          createdAt: new Date(
            Date.now() - 1000 * 60 * 60 * 24 * 3
          ).toISOString(),
          updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
          author: {
            id: 3,
            name: "Carlos López",
            email: "carlos.lopez@clgrupo.com",
            role: "Técnico",
            plantId: 2,
            createdAt: "2025-01-01T00:00:00.000Z",
            isActive: true,
          },
          plant: {
            id: 2,
            name: "Alter Enersun",
            createdAt: "2025-01-01T00:00:00.000Z",
          },
          area: {
            id: 3,
            name: "Logística",
            createdAt: "2025-01-01T00:00:00.000Z",
          },
        },
        {
          id: 4,
          title: "Mejora en seguridad laboral",
          description:
            "Instalar sistemas de detección de movimiento en zonas peligrosas para alertar automáticamente sobre riesgos.",
          status: "En Progreso",
          authorId: 4,
          plantId: 3,
          areaId: 4,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          author: {
            id: 4,
            name: "Ana Martínez",
            email: "ana.martinez@clgrupo.com",
            role: "Coordinadora",
            plantId: 3,
            createdAt: "2025-01-01T00:00:00.000Z",
            isActive: true,
          },
          plant: {
            id: 3,
            name: "Biomasa Forestal",
            createdAt: "2025-01-01T00:00:00.000Z",
          },
          area: {
            id: 4,
            name: "Seguridad",
            createdAt: "2025-01-01T00:00:00.000Z",
          },
        },
        {
          id: 5,
          title: "Digitalización de reportes",
          description:
            "Migrar todos los reportes en papel a un sistema digital con firmas electrónicas y almacenamiento en la nube.",
          status: "Abierta",
          authorId: 1,
          plantId: 4,
          areaId: 1,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
          updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
          author: {
            id: 1,
            name: "Juan Pérez",
            email: "juan.perez@clgrupo.com",
            role: "Operario",
            plantId: 1,
            createdAt: "2025-01-01T00:00:00.000Z",
            isActive: true,
          },
          plant: { id: 4, name: "CLH", createdAt: "2025-01-01T00:00:00.000Z" },
          area: {
            id: 1,
            name: "Producción",
            createdAt: "2025-01-01T00:00:00.000Z",
          },
        },
      ];

      const mockUsers: User[] = [
        {
          id: 1,
          name: "Juan Pérez",
          email: "juan.perez@clgrupo.com",
          role: "Operario",
          plantId: 1,
          createdAt: "2025-01-01T00:00:00.000Z",
          isActive: true,
        },
        {
          id: 2,
          name: "María García",
          email: "maria.garcia@clgrupo.com",
          role: "Supervisora",
          plantId: 1,
          createdAt: "2025-01-01T00:00:00.000Z",
          isActive: true,
        },
        {
          id: 3,
          name: "Carlos López",
          email: "carlos.lopez@clgrupo.com",
          role: "Técnico",
          plantId: 2,
          createdAt: "2025-01-01T00:00:00.000Z",
          isActive: true,
        },
        {
          id: 4,
          name: "Ana Martínez",
          email: "ana.martinez@clgrupo.com",
          role: "Coordinadora",
          plantId: 3,
          createdAt: "2025-01-01T00:00:00.000Z",
          isActive: true,
        },
      ];

      setIdeas(mockIdeas);
      setUsers(mockUsers);
      setError(null);
    } catch (err) {
      console.error("Error loading ideas:", err);
      setError("Error al cargar las ideas. Inténtalo de nuevo.");

      showToast({
        type: "error",
        title: "Error de carga",
        message: "No se pudieron cargar las ideas.",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const createIdea = useCallback(
    async (ideaData: Partial<Idea>): Promise<boolean> => {
      try {
        setCreating(true);

        // Simular creación
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newIdea: Idea = {
          id: ideas.length + 1,
          title: ideaData.title || "",
          description: ideaData.description || "",
          status: "Abierta",
          authorId: ideaData.authorId || users[0]?.id || 1,
          plantId: ideaData.plantId,
          areaId: ideaData.areaId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          author:
            users.find((u) => u.id === (ideaData.authorId || users[0]?.id)) ||
            users[0],
          plant: ideaData.plantId
            ? {
                id: ideaData.plantId,
                name: `Planta ${ideaData.plantId}`,
                createdAt: "2025-01-01T00:00:00.000Z",
              }
            : undefined,
          area: ideaData.areaId
            ? {
                id: ideaData.areaId,
                name: `Área ${ideaData.areaId}`,
                createdAt: "2025-01-01T00:00:00.000Z",
              }
            : undefined,
        };

        setIdeas((prev) => [newIdea, ...prev]);

        showToast({
          type: "success",
          title: "¡Idea creada!",
          message: "Tu idea ha sido enviada para revisión.",
          duration: 4000,
        });

        return true;
      } catch (err) {
        console.error("Error creating idea:", err);

        showToast({
          type: "error",
          title: "Error al crear idea",
          message: "No se pudo crear la idea. Inténtalo de nuevo.",
          duration: 5000,
        });

        return false;
      } finally {
        setCreating(false);
      }
    },
    [ideas.length, users, showToast]
  );

  // Filtrar ideas basado en los filtros activos
  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch =
      idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || idea.status === statusFilter;
    const matchesPlant = !plantFilter || idea.plant?.name === plantFilter;

    return matchesSearch && matchesStatus && matchesPlant;
  });

  // Calcular estadísticas
  const getStats = useCallback(() => {
    const total = ideas.length;
    const inProgress = ideas.filter(
      (idea) =>
        idea.status === "En Progreso" ||
        idea.status === "En Revisión" ||
        idea.status === "Abierta"
    ).length;
    const implemented = ideas.filter(
      (idea) => idea.status === "Implementada"
    ).length;

    const byStatus = ideas.reduce((acc, idea) => {
      acc[idea.status] = (acc[idea.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total, inProgress, implemented, byStatus };
  }, [ideas]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    ideas,
    users,
    loading,
    error,
    creating,
    filteredIdeas,
    searchTerm,
    statusFilter,
    plantFilter,
    setSearchTerm,
    setStatusFilter,
    setPlantFilter,
    createIdea,
    refreshData: loadData,
    getStats,
  };
};
