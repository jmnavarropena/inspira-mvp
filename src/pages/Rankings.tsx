import { useState, useEffect } from "react";
import { rankingsApi } from "../services/api";
import type {
  RankingUser as ApiRankingUser,
  RankingPlant as ApiRankingPlant,
} from "../services/api";
import {
  Trophy,
  Medal,
  Award,
  Users,
  Building2,
  Crown,
  Star,
  Target,
  Zap,
  Lightbulb,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

// Tipos extendidos locales
interface RankingUserLocal extends ApiRankingUser {
  id?: string;
  name?: string;
  rank?: number;
}

interface RankingPlantLocal extends ApiRankingPlant {
  id?: string;
  name?: string;
  rank?: number;
}

interface BadgeLocal {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earned: boolean;
  progress?: number;
  requirement?: string;
}

// Datos mock temporales
const mockTopUsers: any[] = [
  {
    id: "1",
    name: "Ana García",
    implementedIdeas: 12,
    totalIdeas: 15,
    successRate: 80,
    rank: 1,
  },
  {
    id: "2",
    name: "Carlos Ruiz",
    implementedIdeas: 10,
    totalIdeas: 14,
    successRate: 71,
    rank: 2,
  },
  {
    id: "3",
    name: "María López",
    implementedIdeas: 8,
    totalIdeas: 10,
    successRate: 80,
    rank: 3,
  },
  {
    id: "4",
    name: "David Torres",
    implementedIdeas: 7,
    totalIdeas: 12,
    successRate: 58,
    rank: 4,
  },
  {
    id: "5",
    name: "Laura Sánchez",
    implementedIdeas: 6,
    totalIdeas: 8,
    successRate: 75,
    rank: 5,
  },
  {
    id: "6",
    name: "Jorge Martín",
    implementedIdeas: 5,
    totalIdeas: 9,
    successRate: 56,
    rank: 6,
  },
  {
    id: "7",
    name: "Elena Rodríguez",
    implementedIdeas: 4,
    totalIdeas: 6,
    successRate: 67,
    rank: 7,
  },
  {
    id: "8",
    name: "Pedro Jiménez",
    implementedIdeas: 4,
    totalIdeas: 7,
    successRate: 57,
    rank: 8,
  },
  {
    id: "9",
    name: "Sofía Morales",
    implementedIdeas: 3,
    totalIdeas: 5,
    successRate: 60,
    rank: 9,
  },
  {
    id: "10",
    name: "Miguel Herrera",
    implementedIdeas: 3,
    totalIdeas: 6,
    successRate: 50,
    rank: 10,
  },
];

const mockTopPlants: any[] = [
  {
    id: "1",
    name: "Planta Azpeitia",
    implementedIdeas: 45,
    totalIdeas: 68,
    successRate: 66,
    rank: 1,
  },
  {
    id: "2",
    name: "Planta Balboa",
    implementedIdeas: 38,
    totalIdeas: 55,
    successRate: 69,
    rank: 2,
  },
  {
    id: "3",
    name: "Centro de Servicios",
    implementedIdeas: 32,
    totalIdeas: 48,
    successRate: 67,
    rank: 3,
  },
  {
    id: "4",
    name: "Planta Bigues",
    implementedIdeas: 28,
    totalIdeas: 41,
    successRate: 68,
    rank: 4,
  },
  {
    id: "5",
    name: "Galvacolor",
    implementedIdeas: 25,
    totalIdeas: 39,
    successRate: 64,
    rank: 5,
  },
  {
    id: "6",
    name: "Ferromallas",
    implementedIdeas: 22,
    totalIdeas: 35,
    successRate: 63,
    rank: 6,
  },
  {
    id: "7",
    name: "Ondupack Almendralejo",
    implementedIdeas: 20,
    totalIdeas: 32,
    successRate: 63,
    rank: 7,
  },
  {
    id: "8",
    name: "Murcia Cartón",
    implementedIdeas: 18,
    totalIdeas: 29,
    successRate: 62,
    rank: 8,
  },
  {
    id: "9",
    name: "Laytours",
    implementedIdeas: 15,
    totalIdeas: 25,
    successRate: 60,
    rank: 9,
  },
  {
    id: "10",
    name: "CL Solar",
    implementedIdeas: 12,
    totalIdeas: 22,
    successRate: 55,
    rank: 10,
  },
];

const mockBadges: any[] = [
  {
    id: "1",
    name: "Primera Idea",
    description: "Crea tu primera idea",
    icon: "💡",
    color: "bg-blue-500",
    earned: true,
    requirement: "Crear 1 idea",
  },
  {
    id: "2",
    name: "Innovador",
    description: "Tiene 5 ideas implementadas",
    icon: "⚡",
    color: "bg-yellow-500",
    earned: true,
    requirement: "Implementar 5 ideas",
  },
  {
    id: "3",
    name: "Visionario",
    description: "Tiene 10 ideas implementadas",
    icon: "🌟",
    color: "bg-purple-500",
    earned: false,
    progress: 70,
    requirement: "Implementar 10 ideas",
  },
  {
    id: "4",
    name: "Maestro de Ideas",
    description: "Tiene 20 ideas implementadas",
    icon: "👑",
    color: "bg-orange-500",
    earned: false,
    progress: 35,
    requirement: "Implementar 20 ideas",
  },
  {
    id: "5",
    name: "Colaborador",
    description: "Participa en 3 campañas diferentes",
    icon: "🤝",
    color: "bg-green-500",
    earned: true,
    requirement: "Participar en 3 campañas",
  },
  {
    id: "6",
    name: "Consistente",
    description: "Crea ideas durante 3 meses consecutivos",
    icon: "📅",
    color: "bg-indigo-500",
    earned: false,
    progress: 66,
    requirement: "3 meses seguidos",
  },
];

export default function Rankings() {
  const [topUsers, setTopUsers] = useState<any[]>([]);
  const [topPlants, setTopPlants] = useState<any[]>([]);
  const [userBadges, setUserBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"users" | "plants">("users");

  useEffect(() => {
    const loadRankingData = async () => {
      setLoading(true);
      try {
        // Intentar cargar datos reales de la API
        const [usersData, plantsData] = await Promise.all([
          rankingsApi.getUsers(),
          rankingsApi.getPlants(),
        ]);

        // Agregar ranking a los datos
        const usersWithRank = usersData.map((user, index) => ({
          ...user,
          rank: index + 1,
          name: user.userName,
          totalIdeas: user.implementedIdeas + Math.floor(Math.random() * 5), // Mock total
        }));

        const plantsWithRank = plantsData.map((plant, index) => ({
          ...plant,
          rank: index + 1,
          name: plant.plantName,
          totalIdeas: plant.implementedIdeas + Math.floor(Math.random() * 10), // Mock total
        }));

        setTopUsers(usersWithRank);
        setTopPlants(plantsWithRank);
        setUserBadges(mockBadges);
      } catch (error) {
        console.error("Error loading ranking data:", error);
        // Fallback a datos mock
        setTopUsers(mockTopUsers);
        setTopPlants(mockTopPlants);
        setUserBadges(mockBadges);
      } finally {
        setLoading(false);
      }
    };

    loadRankingData();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-orange-500" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500";
      case 3:
        return "bg-gradient-to-r from-orange-400 to-orange-600";
      default:
        return "bg-gradient-to-r from-primary-400 to-primary-600";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando rankings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl text-white p-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Trophy className="h-8 w-8" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">
          Rankings de Innovación
        </h1>
        <p className="text-center text-yellow-100">
          Descubre quién está liderando la transformación en CL Grupo Industrial
        </p>
      </div>

      {/* Tabs para cambiar entre rankings */}
      <div className="bg-white rounded-lg border">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("users")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "users"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Top Usuarios
              </div>
            </button>
            <button
              onClick={() => setActiveTab("plants")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "plants"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                Top Plantas
              </div>
            </button>
          </nav>
        </div>

        {/* Ranking de Usuarios */}
        {activeTab === "users" && (
          <div className="p-6">
            <div className="space-y-4">
              {topUsers.map((user) => (
                <div
                  key={user.id}
                  className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                    user.rank <= 3
                      ? getRankBadgeColor(user.rank) +
                        " text-white border-transparent"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-center w-12 h-12 mr-4">
                    {getRankIcon(user.rank)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3
                          className={`font-semibold ${
                            user.rank <= 3 ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {user.name}
                        </h3>
                        <div
                          className={`flex items-center text-sm ${
                            user.rank <= 3 ? "text-white/90" : "text-gray-600"
                          }`}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          <span>
                            {user.implementedIdeas} ideas implementadas
                          </span>
                          <span className="mx-2">•</span>
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span>{user.successRate}% éxito</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div
                          className={`text-2xl font-bold ${
                            user.rank <= 3 ? "text-white" : "text-primary-600"
                          }`}
                        >
                          {user.implementedIdeas}
                        </div>
                        <div
                          className={`text-sm ${
                            user.rank <= 3 ? "text-white/80" : "text-gray-500"
                          }`}
                        >
                          de {user.totalIdeas} ideas
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ranking de Plantas */}
        {activeTab === "plants" && (
          <div className="p-6">
            <div className="space-y-4">
              {topPlants.map((plant) => (
                <div
                  key={plant.id}
                  className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                    plant.rank <= 3
                      ? getRankBadgeColor(plant.rank) +
                        " text-white border-transparent"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-center w-12 h-12 mr-4">
                    {getRankIcon(plant.rank)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3
                          className={`font-semibold ${
                            plant.rank <= 3 ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {plant.name}
                        </h3>
                        <div
                          className={`flex items-center text-sm ${
                            plant.rank <= 3 ? "text-white/90" : "text-gray-600"
                          }`}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          <span>
                            {plant.implementedIdeas} ideas implementadas
                          </span>
                          <span className="mx-2">•</span>
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span>{plant.successRate}% éxito</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div
                          className={`text-2xl font-bold ${
                            plant.rank <= 3 ? "text-white" : "text-primary-600"
                          }`}
                        >
                          {plant.implementedIdeas}
                        </div>
                        <div
                          className={`text-sm ${
                            plant.rank <= 3 ? "text-white/80" : "text-gray-500"
                          }`}
                        >
                          de {plant.totalIdeas} ideas
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sistema de Insignias */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center mb-6">
          <Star className="h-6 w-6 text-yellow-500 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Mis Insignias</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userBadges.map((badge) => (
            <div
              key={badge.id}
              className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
                badge.earned
                  ? "border-green-200 bg-green-50 shadow-sm"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-3xl mb-3 ${
                    badge.earned ? badge.color : "bg-gray-300"
                  }`}
                >
                  {badge.earned ? badge.icon : "🔒"}
                </div>

                <h3
                  className={`font-semibold mb-1 ${
                    badge.earned ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {badge.name}
                </h3>

                <p
                  className={`text-sm mb-3 ${
                    badge.earned ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  {badge.description}
                </p>

                <div
                  className={`text-xs font-medium ${
                    badge.earned ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {badge.requirement}
                </div>

                {!badge.earned && badge.progress && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progreso</span>
                      <span>{badge.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${badge.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {badge.earned && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estadísticas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border p-6 text-center">
          <Lightbulb className="h-8 w-8 text-blue-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {mockTopUsers.reduce((sum, user) => sum + user.totalIdeas, 0)}
          </div>
          <div className="text-sm text-gray-600">Ideas totales creadas</div>
        </div>

        <div className="bg-white rounded-lg border p-6 text-center">
          <Target className="h-8 w-8 text-green-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {Math.round(
              mockTopUsers.reduce((sum, user) => sum + user.successRate, 0) /
                mockTopUsers.length
            )}
            %
          </div>
          <div className="text-sm text-gray-600">Tasa de éxito promedio</div>
        </div>

        <div className="bg-white rounded-lg border p-6 text-center">
          <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {mockTopUsers.reduce((sum, user) => sum + user.implementedIdeas, 0)}
          </div>
          <div className="text-sm text-gray-600">Ideas implementadas</div>
        </div>
      </div>
    </div>
  );
}
