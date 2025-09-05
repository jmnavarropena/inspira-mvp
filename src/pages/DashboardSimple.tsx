import { useAuth } from "../contexts/AuthContext";
import {
  Lightbulb,
  Clock,
  CheckCircle,
  TrendingUp,
  Calendar,
  Trophy,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();

  // Datos mock temporales para debug
  const mockStats = {
    totalIdeas: 45,
    ideasInReview: 12,
    implementedIdeas: 18,
    totalUsers: 25,
    activeCampaigns: 3,
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header con bienvenida */}
      <div className="text-center py-8 bg-gradient-to-r from-primary-500 to-blue-600 rounded-2xl text-white">
        <div className="flex justify-center mb-4">
          <div className="bg-white/20 p-3 rounded-full animate-bounce-subtle">
            <Sparkles className="h-8 w-8" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          ¡Bienvenido, {user?.name}!
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 font-medium">
          Tu idea puede cambiar el futuro
        </p>
        <p className="text-blue-200 mt-2">
          Comparte tus ideas innovadoras y sé parte del cambio en CL Grupo
          Industrial
        </p>
      </div>

      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card hover:scale-105 transition-transform duration-200">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <Lightbulb className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Ideas</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockStats.totalIdeas}
              </p>
            </div>
          </div>
        </div>

        <div className="card hover:scale-105 transition-transform duration-200">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">En Revisión</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockStats.ideasInReview}
              </p>
            </div>
          </div>
        </div>

        <div className="card hover:scale-105 transition-transform duration-200">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Implementadas</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockStats.implementedIdeas}
              </p>
            </div>
          </div>
        </div>

        <div className="card hover:scale-105 transition-transform duration-200">
          <div className="flex items-center">
            <div className="bg-primary-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Usuarios
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {mockStats.totalUsers}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enlaces rápidos simplificados */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Accesos Rápidos
        </h3>
        <div className="space-y-4">
          <a
            href="/ideas"
            className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-500 p-2 rounded-lg text-white">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary-600">
                    Mis Ideas
                  </h4>
                  <p className="text-sm text-gray-500">
                    Gestiona y revisa tus ideas propuestas
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
            </div>
          </a>

          <a
            href="/campaigns"
            className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-green-500 p-2 rounded-lg text-white">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary-600">
                    Campañas
                    <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {mockStats.activeCampaigns}
                    </span>
                  </h4>
                  <p className="text-sm text-gray-500">
                    Participa en campañas activas de innovación
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
            </div>
          </a>

          <a
            href="/rankings"
            className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-yellow-500 p-2 rounded-lg text-white">
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary-600">
                    Rankings
                  </h4>
                  <p className="text-sm text-gray-500">
                    Descubre los líderes en innovación
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
            </div>
          </a>
        </div>
      </div>

      {/* Mensaje de estado */}
      <div className="card text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          🚀 Dashboard Simplificado Funcionando
        </h3>
        <p className="text-gray-600">
          Esta es una versión simplificada para verificar que todo funciona
          correctamente.
        </p>
      </div>
    </div>
  );
}
