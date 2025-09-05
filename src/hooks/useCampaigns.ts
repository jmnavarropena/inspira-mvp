import { useState, useEffect, useMemo } from "react";
import { Campaign } from "../types";

interface UseCampaignFilters {
  status: "todas" | "activas" | "proximas" | "finalizadas";
  searchTerm: string;
  plantId?: number;
}

interface CampaignStats {
  total: number;
  activas: number;
  proximas: number;
  finalizadas: number;
  participaciones: number;
}

export const useCampaignData = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Datos de ejemplo expandidos
  const mockCampaigns: Campaign[] = [
    {
      id: 1,
      title: "Eficiencia Energética 2025",
      description:
        "Busca ideas innovadoras para reducir el consumo energético en nuestras plantas de producción. Enfócate en soluciones sostenibles y tecnologías verdes que puedan implementarse a corto y mediano plazo.",
      startDate: "2024-12-01T00:00:00Z",
      endDate: "2025-03-31T23:59:59Z",
      isActive: true,
      createdAt: "2024-11-15T00:00:00Z",
      plantId: 1,
      plant: { id: 1, name: "Planta Norte", createdAt: "2024-01-01T00:00:00Z" },
    },
    {
      id: 2,
      title: "Digitalización de Procesos",
      description:
        "Automatización y digitalización de procesos manuales. Propón herramientas digitales, software personalizado o mejoras en sistemas existentes que aumenten la productividad y reduzcan errores humanos.",
      startDate: "2024-11-15T00:00:00Z",
      endDate: "2025-02-15T23:59:59Z",
      isActive: true,
      createdAt: "2024-11-01T00:00:00Z",
      plantId: 2,
      plant: { id: 2, name: "Planta Sur", createdAt: "2024-01-01T00:00:00Z" },
    },
    {
      id: 3,
      title: "Seguridad en el Trabajo",
      description:
        "Ideas para mejorar la seguridad laboral y prevenir accidentes. Enfócate en equipos de protección innovadores, procedimientos mejorados, señalización inteligente y tecnologías de monitoreo.",
      startDate: "2025-01-15T00:00:00Z",
      endDate: "2025-04-30T23:59:59Z",
      isActive: false,
      createdAt: "2024-12-01T00:00:00Z",
      plantId: 3,
      plant: {
        id: 3,
        name: "Planta Central",
        createdAt: "2024-01-01T00:00:00Z",
      },
    },
    {
      id: 4,
      title: "Experiencia del Cliente",
      description:
        "Mejora la experiencia de nuestros clientes con ideas creativas para el servicio, productos y atención al cliente. Considera desde mejoras en el producto hasta innovaciones en el servicio postventa.",
      startDate: "2024-10-01T00:00:00Z",
      endDate: "2024-12-31T23:59:59Z",
      isActive: true,
      createdAt: "2024-09-15T00:00:00Z",
    },
    {
      id: 5,
      title: "Innovación en Materiales",
      description:
        "Investigación y desarrollo de nuevos materiales más resistentes, económicos y sostenibles para nuestros productos. Explora materiales reciclados, bio-materiales y nuevas aleaciones.",
      startDate: "2025-02-01T00:00:00Z",
      endDate: "2025-06-30T23:59:59Z",
      isActive: false,
      createdAt: "2024-12-10T00:00:00Z",
      plantId: 1,
      plant: { id: 1, name: "Planta Norte", createdAt: "2024-01-01T00:00:00Z" },
    },
    {
      id: 6,
      title: "Optimización Logística",
      description:
        "Propuestas para optimizar los procesos logísticos internos y externos. Incluye gestión de inventarios, rutas de distribución, automatización de almacenes y trazabilidad de productos.",
      startDate: "2024-09-01T00:00:00Z",
      endDate: "2024-11-30T23:59:59Z",
      isActive: false,
      createdAt: "2024-08-15T00:00:00Z",
      plantId: 2,
      plant: { id: 2, name: "Planta Sur", createdAt: "2024-01-01T00:00:00Z" },
    },
    {
      id: 7,
      title: "Sostenibilidad Ambiental",
      description:
        "Iniciativas para reducir el impacto ambiental de nuestras operaciones. Gestión de residuos, economía circular, energías renovables y certificaciones ambientales.",
      startDate: "2025-03-01T00:00:00Z",
      endDate: "2025-08-31T23:59:59Z",
      isActive: false,
      createdAt: "2024-12-15T00:00:00Z",
    },
  ];

  useEffect(() => {
    // Simular carga de datos
    const loadCampaigns = async () => {
      try {
        setLoading(true);
        // Simular delay de API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setCampaigns(mockCampaigns);
        setError(null);
      } catch (err) {
        setError("Error al cargar las campañas");
        console.error("Error loading campaigns:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  return { campaigns, loading, error, setCampaigns };
};

export const useCampaignFilters = (
  campaigns: Campaign[],
  filters: UseCampaignFilters
) => {
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      // Filtro por búsqueda
      const matchesSearch =
        !filters.searchTerm ||
        campaign.title
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) ||
        campaign.description
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase());

      // Filtro por planta
      const matchesPlant =
        !filters.plantId || campaign.plantId === filters.plantId;

      // Filtro por estado
      const now = new Date();
      const startDate = new Date(campaign.startDate);
      const endDate = new Date(campaign.endDate);

      let matchesStatus = true;
      switch (filters.status) {
        case "activas":
          matchesStatus =
            campaign.isActive && now >= startDate && now <= endDate;
          break;
        case "proximas":
          matchesStatus = !campaign.isActive && startDate > now;
          break;
        case "finalizadas":
          matchesStatus = !campaign.isActive && endDate < now;
          break;
        default:
          matchesStatus = true;
      }

      return matchesSearch && matchesPlant && matchesStatus;
    });
  }, [campaigns, filters]);

  return filteredCampaigns;
};

export const useCampaignStats = (campaigns: Campaign[]): CampaignStats => {
  const stats = useMemo(() => {
    const now = new Date();

    const activas = campaigns.filter((c) => {
      const start = new Date(c.startDate);
      const end = new Date(c.endDate);
      return c.isActive && now >= start && now <= end;
    }).length;

    const proximas = campaigns.filter((c) => {
      const start = new Date(c.startDate);
      return !c.isActive && start > now;
    }).length;

    const finalizadas = campaigns.filter((c) => {
      const end = new Date(c.endDate);
      return !c.isActive && end < now;
    }).length;

    return {
      total: campaigns.length,
      activas,
      proximas,
      finalizadas,
      participaciones: 12, // Esto vendría de la API del usuario
    };
  }, [campaigns]);

  return stats;
};

export const useCampaignUtils = () => {
  const calcularDiasRestantes = (fechaFin: string): number => {
    const ahora = new Date();
    const fin = new Date(fechaFin);
    const diferencia = fin.getTime() - ahora.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24));
  };

  const formatearFecha = (fecha: string): string => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const obtenerEstadoCampana = (campana: Campaign) => {
    const ahora = new Date();
    const inicio = new Date(campana.startDate);
    const fin = new Date(campana.endDate);

    if (ahora < inicio) {
      return {
        estado: "proxima" as const,
        label: "Próximamente",
        color: "bg-blue-100 text-blue-800",
      };
    }

    if (ahora >= inicio && ahora <= fin) {
      return {
        estado: "activa" as const,
        label: "Activa",
        color: "bg-green-100 text-green-800",
      };
    }

    return {
      estado: "finalizada" as const,
      label: "Finalizada",
      color: "bg-gray-100 text-gray-800",
    };
  };

  const calcularProgreso = (campana: Campaign): number => {
    const ahora = new Date();
    const inicio = new Date(campana.startDate);
    const fin = new Date(campana.endDate);

    if (ahora < inicio) return 0;
    if (ahora > fin) return 100;

    const duracionTotal = fin.getTime() - inicio.getTime();
    const tiempoTranscurrido = ahora.getTime() - inicio.getTime();
    return Math.max(
      10,
      Math.min(90, (tiempoTranscurrido / duracionTotal) * 100)
    );
  };

  return {
    calcularDiasRestantes,
    formatearFecha,
    obtenerEstadoCampana,
    calcularProgreso,
  };
};

// Hook principal que combina toda la funcionalidad
export const useCampaigns = (initialFilters?: Partial<UseCampaignFilters>) => {
  const [filters, setFilters] = useState<UseCampaignFilters>({
    status: "todas",
    searchTerm: "",
    ...initialFilters,
  });

  const { campaigns, loading, error, setCampaigns } = useCampaignData();
  const filteredCampaigns = useCampaignFilters(campaigns, filters);
  const stats = useCampaignStats(campaigns);
  const utils = useCampaignUtils();

  const updateFilter = (key: keyof UseCampaignFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      status: "todas",
      searchTerm: "",
      plantId: undefined,
    });
  };

  return {
    campaigns: filteredCampaigns,
    allCampaigns: campaigns,
    loading,
    error,
    filters,
    stats,
    utils,
    updateFilter,
    resetFilters,
    setCampaigns,
  };
};
