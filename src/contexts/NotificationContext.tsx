import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info" | "error";
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  ideaId?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (
    notification: Omit<Notification, "id" | "timestamp" | "read">
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    // Notificaciones de ejemplo
    {
      id: "1",
      title: "Nueva idea aprobada",
      message:
        'Tu idea "Optimización de línea de producción" ha sido aprobada para implementación.',
      type: "success",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
      read: false,
      actionUrl: "/mis-ideas",
      ideaId: 1,
    },
    {
      id: "2",
      title: "Campaña disponible",
      message:
        'Nueva campaña "Eficiencia Energética 2025" disponible para participar.',
      type: "info",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      actionUrl: "/campanas",
    },
    {
      id: "3",
      title: "Revisión pendiente",
      message: 'Tu idea "Mejora en control de calidad" está en revisión.',
      type: "warning",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      actionUrl: "/mis-ideas",
      ideaId: 3,
    },
  ]);

  const addNotification = useCallback(
    (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
      const newNotification: Notification = {
        ...notification,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        read: false,
      };

      setNotifications((prev) => [newNotification, ...prev]);
    },
    []
  );

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const value: NotificationContextType = {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    unreadCount,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook para crear notificaciones específicas de ideas
export const useIdeaNotifications = () => {
  const { addNotification } = useNotifications();

  const notifyIdeaStateChange = useCallback(
    (ideaTitle: string, newState: string, ideaId: number) => {
      const stateMessages = {
        Revision: {
          title: "Idea en revisión",
          message: `Tu idea "${ideaTitle}" está siendo revisada por el equipo responsable.`,
          type: "info" as const,
        },
        CoDir: {
          title: "Evaluación en Comité",
          message: `Tu idea "${ideaTitle}" está siendo evaluada por el Comité de Dirección.`,
          type: "info" as const,
        },
        Aprobada: {
          title: "¡Idea aprobada!",
          message: `¡Felicidades! Tu idea "${ideaTitle}" ha sido aprobada para implementación.`,
          type: "success" as const,
        },
        Progreso: {
          title: "Idea en implementación",
          message: `Tu idea "${ideaTitle}" está siendo implementada actualmente.`,
          type: "info" as const,
        },
        Implementada: {
          title: "¡Idea implementada!",
          message: `¡Excelente! Tu idea "${ideaTitle}" ha sido implementada con éxito.`,
          type: "success" as const,
        },
        Rechazada: {
          title: "Idea no aprobada",
          message: `Tu idea "${ideaTitle}" ha sido evaluada pero no se procederá con su implementación en este momento.`,
          type: "warning" as const,
        },
      };

      const messageInfo = stateMessages[newState as keyof typeof stateMessages];
      if (messageInfo) {
        addNotification({
          ...messageInfo,
          actionUrl: "/mis-ideas",
          ideaId,
        });
      }
    },
    [addNotification]
  );

  const notifyNewComment = useCallback(
    (ideaTitle: string, commenterName: string, ideaId: number) => {
      addNotification({
        title: "Nuevo comentario",
        message: `${commenterName} ha comentado en tu idea "${ideaTitle}".`,
        type: "info",
        actionUrl: "/mis-ideas",
        ideaId,
      });
    },
    [addNotification]
  );

  const notifyIdeaVoted = useCallback(
    (ideaTitle: string, voterName: string, ideaId: number) => {
      addNotification({
        title: "Nueva votación",
        message: `${voterName} ha votado por tu idea "${ideaTitle}".`,
        type: "info",
        actionUrl: "/mis-ideas",
        ideaId,
      });
    },
    [addNotification]
  );

  return {
    notifyIdeaStateChange,
    notifyNewComment,
    notifyIdeaVoted,
  };
};
