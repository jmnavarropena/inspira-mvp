const API_BASE_URL = "http://localhost:5154/api";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  plantId: number;
  plant?: {
    id: number;
    name: string;
    createdAt: string;
  };
  createdAt: string;
  isActive: boolean;
  ideas?: Idea[];
}

export interface Idea {
  id: number;
  title: string;
  description: string;
  status: string;
  authorId: number;
  author?: User;
  plantId?: number;
  plant?: {
    id: number;
    name: string;
    createdAt: string;
  };
  areaId?: number;
  area?: {
    id: number;
    name: string;
    createdAt: string;
  };
  campaignId?: number;
  campaign?: Campaign;
  attachedFiles?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Plant {
  id: number;
  name: string;
  createdAt: string;
  users?: User[];
  ideas?: Idea[];
}

export interface Area {
  id: number;
  name: string;
  createdAt: string;
  ideas?: Idea[];
}

export interface Campaign {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  plantId?: number;
  plant?: Plant;
  isActive: boolean;
  createdById: number;
  createdBy?: User;
  createdAt: string;
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  requirementType: string;
  requirementValue: number;
}

export interface UserBadge {
  id: number;
  userId: number;
  badgeId: number;
  badge?: Badge;
  earnedAt: string;
}

export interface DashboardKpis {
  kpIs: {
    totalIdeas: number;
    totalUsers: number;
    totalPlants: number;
    activeCampaigns: number;
    implemented: number;
    inProgress: number;
    approved: number;
    inReview: number;
    implementationRate: number;
  };
  charts: {
    ideasByMonth: Array<{
      year: number;
      month: number;
      count: number;
      implemented: number;
    }>;
    ideasByPlant: Array<{
      plantName: string;
      totalIdeas: number;
      implemented: number;
      inProgress: number;
    }>;
    ideasByArea: Array<{
      areaName: string;
      totalIdeas: number;
      implemented: number;
    }>;
    ideasByStatus: Array<{
      status: string;
      count: number;
    }>;
  };
  topUsersThisMonth: Array<{
    name: string;
    plantName: string;
    ideasThisMonth: number;
  }>;
}

export interface RankingUser {
  userId: number;
  userName: string;
  userEmail: string;
  implementedIdeas: number;
  totalIdeas: number;
  successRate: number;
}

export interface RankingPlant {
  plantId: number;
  plantName: string;
  implementedIdeas: number;
  totalIdeas: number;
  successRate: number;
}

// Servicio para Users
export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/Users`);
    if (!response.ok) {
      throw new Error("Error fetching users");
    }
    return response.json();
  },

  getById: async (id: number): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/Users/${id}`);
    if (!response.ok) {
      throw new Error("Error fetching user");
    }
    return response.json();
  },

  create: async (
    user: Omit<User, "id" | "createdAt" | "isActive">
  ): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/Users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Error creating user");
    }
    return response.json();
  },
};

// Servicio para Ideas
export const ideasApi = {
  getAll: async (): Promise<Idea[]> => {
    const response = await fetch(`${API_BASE_URL}/Ideas`);
    if (!response.ok) {
      throw new Error("Error fetching ideas");
    }
    return response.json();
  },

  getById: async (id: number): Promise<Idea> => {
    const response = await fetch(`${API_BASE_URL}/Ideas/${id}`);
    if (!response.ok) {
      throw new Error("Error fetching idea");
    }
    return response.json();
  },

  getByStatus: async (status: string): Promise<Idea[]> => {
    const response = await fetch(`${API_BASE_URL}/Ideas/ByStatus/${status}`);
    if (!response.ok) {
      throw new Error("Error fetching ideas by status");
    }
    return response.json();
  },

  getByAuthor: async (authorId: number): Promise<Idea[]> => {
    const response = await fetch(`${API_BASE_URL}/Ideas/ByAuthor/${authorId}`);
    if (!response.ok) {
      throw new Error("Error fetching ideas by author");
    }
    return response.json();
  },

  create: async (
    idea: Omit<Idea, "id" | "createdAt" | "updatedAt">
  ): Promise<Idea> => {
    const response = await fetch(`${API_BASE_URL}/Ideas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(idea),
    });
    if (!response.ok) {
      throw new Error("Error creating idea");
    }
    return response.json();
  },
};

// Servicio para Campaigns
export const campaignsApi = {
  getAll: async (): Promise<Campaign[]> => {
    const response = await fetch(`${API_BASE_URL}/Campaigns`);
    if (!response.ok) {
      throw new Error("Error fetching campaigns");
    }
    return response.json();
  },

  getActive: async (): Promise<Campaign[]> => {
    const response = await fetch(`${API_BASE_URL}/Campaigns/active`);
    if (!response.ok) {
      throw new Error("Error fetching active campaigns");
    }
    return response.json();
  },

  getById: async (id: number): Promise<Campaign> => {
    const response = await fetch(`${API_BASE_URL}/Campaigns/${id}`);
    if (!response.ok) {
      throw new Error("Error fetching campaign");
    }
    return response.json();
  },

  create: async (
    campaign: Omit<Campaign, "id" | "createdAt">
  ): Promise<Campaign> => {
    const response = await fetch(`${API_BASE_URL}/Campaigns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(campaign),
    });
    if (!response.ok) {
      throw new Error("Error creating campaign");
    }
    return response.json();
  },
};

// Servicio para Dashboard
export const dashboardApi = {
  getKpis: async (): Promise<DashboardKpis> => {
    const response = await fetch(`${API_BASE_URL}/Dashboard/kpis`);
    if (!response.ok) {
      throw new Error("Error fetching dashboard KPIs");
    }
    return response.json();
  },

  getRecentActivity: async (): Promise<Idea[]> => {
    const response = await fetch(`${API_BASE_URL}/Dashboard/recent-activity`);
    if (!response.ok) {
      throw new Error("Error fetching recent activity");
    }
    return response.json();
  },

  getStats: async (period: string = "month"): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/Dashboard/stats/${period}`);
    if (!response.ok) {
      throw new Error("Error fetching dashboard stats");
    }
    return response.json();
  },
};

// Servicio para Rankings
export const rankingsApi = {
  getUsers: async (): Promise<RankingUser[]> => {
    const response = await fetch(`${API_BASE_URL}/Rankings/users`);
    if (!response.ok) {
      throw new Error("Error fetching user rankings");
    }
    return response.json();
  },

  getPlants: async (): Promise<RankingPlant[]> => {
    const response = await fetch(`${API_BASE_URL}/Rankings/plants`);
    if (!response.ok) {
      throw new Error("Error fetching plant rankings");
    }
    return response.json();
  },

  getAreas: async (): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/Rankings/areas`);
    if (!response.ok) {
      throw new Error("Error fetching area rankings");
    }
    return response.json();
  },

  getMonthly: async (): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/Rankings/monthly`);
    if (!response.ok) {
      throw new Error("Error fetching monthly rankings");
    }
    return response.json();
  },
};

// Servicio para Badges
export const badgesApi = {
  getAll: async (): Promise<Badge[]> => {
    const response = await fetch(`${API_BASE_URL}/Badges`);
    if (!response.ok) {
      throw new Error("Error fetching badges");
    }
    return response.json();
  },

  getUserBadges: async (userId: number): Promise<UserBadge[]> => {
    const response = await fetch(`${API_BASE_URL}/UserBadges/user/${userId}`);
    if (!response.ok) {
      throw new Error("Error fetching user badges");
    }
    return response.json();
  },

  autoAssignBadges: async (userId: number): Promise<UserBadge[]> => {
    const response = await fetch(
      `${API_BASE_URL}/UserBadges/auto-assign/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error auto-assigning badges");
    }
    return response.json();
  },
};

// Utilidades para calcular estadísticas (mantenemos por compatibilidad)
export const calculateStats = (ideas: Idea[], currentUserId?: number) => {
  const totalIdeas = ideas.length;
  const ideasInReview = ideas.filter(
    (idea) =>
      idea.status === "En Revisión" ||
      idea.status === "InReview" ||
      idea.status === "Pendiente" ||
      idea.status === "Abierta" ||
      idea.status === "Open"
  ).length;
  const implementedIdeas = ideas.filter(
    (idea) => idea.status === "Implementada" || idea.status === "Implemented"
  ).length;
  const myIdeas = currentUserId
    ? ideas.filter((idea) => idea.authorId === currentUserId).length
    : 0;
  const myImplementedIdeas = currentUserId
    ? ideas.filter(
        (idea) =>
          idea.authorId === currentUserId &&
          (idea.status === "Implementada" || idea.status === "Implemented")
      ).length
    : 0;

  return {
    totalIdeas,
    ideasInReview,
    implementedIdeas,
    myIdeas,
    myImplementedIdeas,
  };
};

// Función para obtener datos de plantas para el gráfico (actualizada)
export const getPlantChartData = (
  plantsData: Array<{
    plantName: string;
    totalIdeas: number;
    implemented: number;
    inProgress: number;
  }>
) => {
  const labels = plantsData.map((plant) => plant.plantName);
  const data = plantsData.map((plant) => plant.totalIdeas);

  return {
    labels,
    datasets: [
      {
        label: "Ideas Propuestas",
        data,
        backgroundColor: "#1BADFA",
        borderRadius: 8,
      },
    ],
  };
};
