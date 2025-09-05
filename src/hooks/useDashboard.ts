import { useState, useEffect, useCallback } from "react";
import { DashboardKpis, Idea } from "../services/api";
import { useToast } from "../components/Notifications/ToastProvider";

interface UseDashboardReturn {
  kpis: DashboardKpis | null;
  recentActivity: Idea[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useDashboard = (): UseDashboardReturn => {
  const { showToast } = useToast();
  const [kpis, setKpis] = useState<DashboardKpis | null>(null);
  const [recentActivity, setRecentActivity] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Simular una pequeña demora para mostrar el loading
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Usar datos mock como si fueran datos reales del servidor
      setKpis({
        kpIs: {
          totalIdeas: 45,
          totalUsers: 25,
          totalPlants: 4,
          activeCampaigns: 3,
          implemented: 18,
          inProgress: 5,
          approved: 8,
          inReview: 12,
          implementationRate: 40,
        },
        charts: {
          ideasByMonth: [
            { year: 2025, month: 1, count: 8, implemented: 3 },
            { year: 2025, month: 2, count: 12, implemented: 5 },
            { year: 2025, month: 3, count: 15, implemented: 7 },
            { year: 2025, month: 4, count: 10, implemented: 3 },
          ],
          ideasByPlant: [
            {
              plantName: "AGSA",
              totalIdeas: 15,
              implemented: 8,
              inProgress: 2,
            },
            {
              plantName: "Alter Enersun",
              totalIdeas: 12,
              implemented: 5,
              inProgress: 1,
            },
            {
              plantName: "Biomasa Forestal",
              totalIdeas: 8,
              implemented: 3,
              inProgress: 1,
            },
            { plantName: "CLH", totalIdeas: 10, implemented: 2, inProgress: 2 },
          ],
          ideasByArea: [
            { areaName: "Producción", totalIdeas: 18, implemented: 8 },
            { areaName: "Calidad", totalIdeas: 12, implemented: 5 },
            { areaName: "Mantenimiento", totalIdeas: 10, implemented: 3 },
            { areaName: "Logística", totalIdeas: 5, implemented: 2 },
          ],
          ideasByStatus: [
            { status: "Implementada", count: 18 },
            { status: "En revisión", count: 12 },
            { status: "Aprobada", count: 8 },
            { status: "En progreso", count: 5 },
          ],
        },
        topUsersThisMonth: [
          { name: "Juan Pérez", plantName: "AGSA", ideasThisMonth: 5 },
          {
            name: "María García",
            plantName: "Alter Enersun",
            ideasThisMonth: 4,
          },
          {
            name: "Carlos López",
            plantName: "Biomasa Forestal",
            ideasThisMonth: 3,
          },
        ],
      });

      setRecentActivity([
        {
          id: 1,
          title: "Optimización de línea de producción",
          description: "Nueva idea propuesta para mejorar la eficiencia",
          status: "En Revisión",
          authorId: 1,
          plantId: 1,
          areaId: 1,
          createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        },
        {
          id: 2,
          title: "Mejora en control de calidad",
          description: "Idea implementada para reducir defectos",
          status: "Implementada",
          authorId: 2,
          plantId: 2,
          areaId: 2,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        },
        {
          id: 3,
          title: "Automatización de procesos",
          description: "Propuesta para automatizar tareas repetitivas",
          status: "Aprobada",
          authorId: 3,
          plantId: 1,
          areaId: 3,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        },
      ]);

      setError(null);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
      setError("Error inesperado al cargar los datos.");

      showToast({
        type: "error",
        title: "Error de carga",
        message: "No se pudieron cargar los datos del dashboard.",
        duration: 5000,
      });

      setKpis(null);
      setRecentActivity([]);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    kpis,
    recentActivity,
    loading,
    error,
    refetch: loadData,
  };
};
