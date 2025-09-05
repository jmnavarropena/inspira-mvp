import { useState, useEffect } from "react";

interface Badge {
  id: string;
  nombre: string;
  descripcion: string;
  iconName: string;
  color: string;
  criterio: (stats: any) => boolean;
}

interface BadgeNotificationData {
  badgeName: string;
  badgeDescription: string;
  badgeIconName: string;
  badgeColor: string;
}

export const useBadgeNotifications = (estadisticas: any) => {
  const [notificationQueue, setNotificationQueue] = useState<
    BadgeNotificationData[]
  >([]);
  const [currentNotification, setCurrentNotification] =
    useState<BadgeNotificationData | null>(null);
  const [obtainedBadges, setObtainedBadges] = useState<Set<string>>(new Set());

  const badges: Badge[] = [
    {
      id: "primer-idea",
      nombre: "Primera Chispa",
      descripcion:
        "Has enviado tu primera idea. ¡Este es solo el comienzo de tu viaje innovador!",
      iconName: "Lightbulb",
      color: "text-yellow-600",
      criterio: (stats) => stats.totalIdeas >= 1,
    },
    {
      id: "innovador-activo",
      nombre: "Innovador Activo",
      descripcion:
        "Has enviado 5 ideas en total. Tu creatividad está en marcha.",
      iconName: "Zap",
      color: "text-blue-600",
      criterio: (stats) => stats.totalIdeas >= 5,
    },
    {
      id: "calidad-superior",
      nombre: "Calidad Superior",
      descripcion:
        "Mantienes una tasa de aprobación del 80%. ¡Excelente trabajo!",
      iconName: "Target",
      color: "text-green-600",
      criterio: (stats) => stats.tasaAprobacion >= 80 && stats.totalIdeas >= 3,
    },
    {
      id: "implementador",
      nombre: "Implementador",
      descripcion:
        "Tu primera idea ha sido implementada. ¡Estás haciendo un impacto real!",
      iconName: "CheckCircle",
      color: "text-purple-600",
      criterio: (stats) => stats.ideasImplementadas >= 1,
    },
    {
      id: "racha-creativa",
      nombre: "Racha Creativa",
      descripcion:
        "Has enviado 5 ideas en un solo mes. ¡Tu creatividad está en llamas!",
      iconName: "Flame",
      color: "text-orange-600",
      criterio: (stats) =>
        stats.ideasPorMes?.some((mes: any) => mes.cantidad >= 5),
    },
    {
      id: "mega-innovador",
      nombre: "Mega Innovador",
      descripcion:
        "Has alcanzado 500 puntos de innovación. ¡Eres una leyenda en CL Grupo!",
      iconName: "Crown",
      color: "text-yellow-500",
      criterio: (stats) => stats.puntuacionTotal >= 500,
    },
  ];

  // Verificar nuevos badges obtenidos
  useEffect(() => {
    if (!estadisticas) return;

    const newBadges: BadgeNotificationData[] = [];

    badges.forEach((badge) => {
      const shouldHaveBadge = badge.criterio(estadisticas);
      const alreadyHas = obtainedBadges.has(badge.id);

      if (shouldHaveBadge && !alreadyHas) {
        newBadges.push({
          badgeName: badge.nombre,
          badgeDescription: badge.descripcion,
          badgeIconName: badge.iconName,
          badgeColor: badge.color,
        });
        setObtainedBadges((prev) => new Set([...prev, badge.id]));
      }
    });

    if (newBadges.length > 0) {
      setNotificationQueue((prev) => [...prev, ...newBadges]);
    }
  }, [estadisticas, obtainedBadges]);

  // Mostrar notificaciones de la cola
  useEffect(() => {
    if (notificationQueue.length > 0 && !currentNotification) {
      const [nextNotification, ...remaining] = notificationQueue;
      setCurrentNotification(nextNotification);
      setNotificationQueue(remaining);

      // Auto-cerrar después de 8 segundos
      const timer = setTimeout(() => {
        setCurrentNotification(null);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [notificationQueue, currentNotification]);

  const dismissCurrentNotification = () => {
    setCurrentNotification(null);
  };

  return {
    currentNotification,
    dismissCurrentNotification,
    hasQueuedNotifications: notificationQueue.length > 0,
  };
};
