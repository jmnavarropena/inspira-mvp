import React from "react";
import {
  Users,
  Lightbulb,
  TrendingUp,
  Award,
  Plus,
  Eye,
  Vote,
  Target,
  Building2,
  Calendar,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  color: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  icon,
  color,
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-bg-300 p-6 hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-text-200 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-text-100 mt-1">{value}</p>
        {change && <p className={`text-sm mt-1 ${color}`}>{change}</p>}
      </div>
      <div
        className={`p-3 rounded-lg ${
          color.includes("green")
            ? "bg-green-100"
            : color.includes("blue")
            ? "bg-blue-100"
            : color.includes("purple")
            ? "bg-purple-100"
            : "bg-accent-100"
        }`}
      >
        {icon}
      </div>
    </div>
  </div>
);

interface PlantRankingProps {
  position: number;
  name: string;
  ideas: number;
  change: number;
}

const PlantRankingItem: React.FC<PlantRankingProps> = ({
  position,
  name,
  ideas,
  change,
}) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-bg-300 hover:bg-bg-100 transition-colors duration-200">
    <div className="flex items-center space-x-4">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          position === 1
            ? "bg-yellow-100 text-yellow-800"
            : position === 2
            ? "bg-gray-100 text-gray-800"
            : position === 3
            ? "bg-orange-100 text-orange-800"
            : "bg-bg-200 text-text-200"
        }`}
      >
        {position}
      </div>
      <div>
        <p className="font-medium text-text-100">{name}</p>
        <p className="text-sm text-text-200">{ideas} ideas este mes</p>
      </div>
    </div>
    <div
      className={`text-sm font-medium ${
        change >= 0 ? "text-green-600" : "text-red-600"
      }`}
    >
      {change >= 0 ? "+" : ""}
      {change}%
    </div>
  </div>
);

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  title,
  description,
  icon,
  color,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`${color} rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
  >
    <div className="flex items-center space-x-3 mb-3">
      {icon}
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    <p className="text-white/90 text-sm">{description}</p>
  </div>
);

interface RecentIdeaProps {
  title: string;
  author: string;
  plant: string;
  status: string;
  votes: number;
  date: string;
}

const RecentIdeaCard: React.FC<RecentIdeaProps> = ({
  title,
  author,
  plant,
  status,
  votes,
  date,
}) => (
  <div className="bg-white rounded-lg border border-bg-300 p-4 hover:shadow-md transition-shadow duration-200">
    <div className="flex justify-between items-start mb-3">
      <h4 className="font-medium text-text-100 line-clamp-2">{title}</h4>
      <span className={`status-badge status-${status.toLowerCase()}`}>
        {status}
      </span>
    </div>
    <div className="flex items-center justify-between text-sm text-text-200">
      <div className="flex items-center space-x-4">
        <span className="flex items-center space-x-1">
          <Users className="w-4 h-4" />
          <span>{author}</span>
        </span>
        <span className="flex items-center space-x-1">
          <Building2 className="w-4 h-4" />
          <span>{plant}</span>
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <span className="flex items-center space-x-1">
          <Vote className="w-4 h-4" />
          <span>{votes}</span>
        </span>
        <span className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </span>
      </div>
    </div>
  </div>
);

const Inicio: React.FC = () => {
  const { user, setUser } = useAuth();

  const handleQuickAction = (action: string) => {
    console.log(`Acción rápida: ${action}`);
    // Aquí implementaremos la navegación cuando tengamos las rutas
  };

  const changeRole = (newRole: "Usuario" | "Responsable" | "CoDir") => {
    if (user) {
      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
      localStorage.setItem("inspira_user", JSON.stringify(updatedUser));
      console.log(`Rol cambiado a: ${newRole}`);
    }
  };

  return (
    <div className="min-h-screen bg-bg-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header de bienvenida */}
        <div className="bg-gradient-to-r from-accent-100 to-primary-100 rounded-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                ¡Bienvenido a Inspira!
              </h1>
              <p className="text-lg opacity-90">
                Tu idea puede cambiar el futuro de CL Grupo Industrial
              </p>
              <p className="text-sm opacity-75 mt-2">
                Plataforma de Innovación Colaborativa
              </p>
            </div>
            <div className="hidden md:block">
              <Lightbulb className="w-16 h-16 opacity-20" />
            </div>
          </div>
        </div>

        {/* KPIs Globales */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-100 mb-6">
            Indicadores Globales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="Ideas Totales"
              value="1,247"
              change="+12% este mes"
              icon={<Lightbulb className="w-6 h-6 text-blue-600" />}
              color="text-blue-600"
            />
            <KPICard
              title="Usuarios Activos"
              value="856"
              change="+8% este mes"
              icon={<Users className="w-6 h-6 text-green-600" />}
              color="text-green-600"
            />
            <KPICard
              title="Ideas Implementadas"
              value="94"
              change="+5% este mes"
              icon={<Award className="w-6 h-6 text-purple-600" />}
              color="text-purple-600"
            />
            <KPICard
              title="Ahorros Generados"
              value="€2.3M"
              change="+18% este mes"
              icon={<TrendingUp className="w-6 h-6 text-accent-500" />}
              color="text-accent-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Ranking de Plantas */}
          <div>
            <h2 className="text-2xl font-bold text-text-100 mb-6">
              Ranking de Plantas
            </h2>
            <div className="bg-bg-200 rounded-lg p-6">
              <div className="space-y-4">
                <PlantRankingItem
                  position={1}
                  name="Planta Madrid"
                  ideas={47}
                  change={12}
                />
                <PlantRankingItem
                  position={2}
                  name="Planta Barcelona"
                  ideas={39}
                  change={8}
                />
                <PlantRankingItem
                  position={3}
                  name="Planta Valencia"
                  ideas={34}
                  change={-2}
                />
                <PlantRankingItem
                  position={4}
                  name="Planta Sevilla"
                  ideas={28}
                  change={15}
                />
                <PlantRankingItem
                  position={5}
                  name="Planta Bilbao"
                  ideas={22}
                  change={5}
                />
              </div>
            </div>
          </div>

          {/* Acceso Rápido */}
          <div>
            <h2 className="text-2xl font-bold text-text-100 mb-6">
              Acceso Rápido
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <QuickAccessCard
                title="Nueva Idea"
                description="Comparte tu innovación con el equipo"
                icon={<Plus className="w-6 h-6" />}
                color="bg-gradient-to-r from-accent-100 to-accent-200"
                onClick={() => handleQuickAction("nueva-idea")}
              />
              <QuickAccessCard
                title="Explorar Ideas"
                description="Descubre las últimas propuestas"
                icon={<Eye className="w-6 h-6" />}
                color="bg-gradient-to-r from-primary-100 to-primary-200"
                onClick={() => handleQuickAction("explorar")}
              />
              <QuickAccessCard
                title="Votar Ideas"
                description="Participa en la evaluación"
                icon={<Vote className="w-6 h-6" />}
                color="bg-gradient-to-r from-green-500 to-green-600"
                onClick={() => handleQuickAction("votar")}
              />
              <QuickAccessCard
                title="Ver Campañas"
                description="Revisa las campañas activas"
                icon={<Target className="w-6 h-6" />}
                color="bg-gradient-to-r from-purple-500 to-purple-600"
                onClick={() => handleQuickAction("campanas")}
              />
            </div>
          </div>
        </div>

        {/* Últimas Ideas Destacadas */}
        <div>
          <h2 className="text-2xl font-bold text-text-100 mb-6">
            Ideas Destacadas Recientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RecentIdeaCard
              title="Sistema de monitorización energética en tiempo real"
              author="Ana García"
              plant="Madrid"
              status="Aprobada"
              votes={23}
              date="28 Ago"
            />
            <RecentIdeaCard
              title="Optimización del proceso de soldadura automatizada"
              author="Carlos López"
              plant="Barcelona"
              status="Revision"
              votes={18}
              date="27 Ago"
            />
            <RecentIdeaCard
              title="Implementación de IA para control de calidad"
              author="María Rodríguez"
              plant="Valencia"
              status="CoDir"
              votes={31}
              date="26 Ago"
            />
            <RecentIdeaCard
              title="Reducción de residuos en línea de producción"
              author="David Martín"
              plant="Sevilla"
              status="Progreso"
              votes={15}
              date="25 Ago"
            />
            <RecentIdeaCard
              title="Sistema de mantenimiento predictivo"
              author="Laura Sánchez"
              plant="Bilbao"
              status="Abierta"
              votes={9}
              date="24 Ago"
            />
            <RecentIdeaCard
              title="Mejora en ergonomía del puesto de trabajo"
              author="Roberto Díaz"
              plant="Madrid"
              status="Implementada"
              votes={42}
              date="23 Ago"
            />
          </div>
        </div>

        {/* Debug: Role Selector */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">
            🔧 Debug - Cambiar Rol (solo para pruebas)
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => changeRole("Usuario")}
              className={`px-3 py-1 text-xs rounded hover:opacity-80 transition-opacity ${
                user?.role === "Usuario"
                  ? "bg-blue-200 text-blue-900 font-medium"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              Usuario
            </button>
            <button
              onClick={() => changeRole("Responsable")}
              className={`px-3 py-1 text-xs rounded hover:opacity-80 transition-opacity ${
                user?.role === "Responsable"
                  ? "bg-green-200 text-green-900 font-medium"
                  : "bg-green-100 text-green-800"
              }`}
            >
              Responsable
            </button>
            <button
              onClick={() => changeRole("CoDir")}
              className={`px-3 py-1 text-xs rounded hover:opacity-80 transition-opacity ${
                user?.role === "CoDir"
                  ? "bg-purple-200 text-purple-900 font-medium"
                  : "bg-purple-100 text-purple-800"
              }`}
            >
              CoDir
            </button>
          </div>
          <p className="text-xs text-yellow-600 mt-1">
            Rol actual:{" "}
            <span className="font-medium">{user?.role || "Cargando..."}</span> |
            Los cambios son inmediatos
          </p>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
