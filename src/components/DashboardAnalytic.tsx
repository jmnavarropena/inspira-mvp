import React from "react";
import {
  TrendingUp,
  Award,
  Calendar,
  Target,
  BarChart3,
  Trophy,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

interface EstadisticasUsuario {
  totalIdeas: number;
  ideasPorMes: { mes: string; cantidad: number }[];
  tasaAprobacion: number;
  ideasImplementadas: number;
  puntuacionTotal: number;
  mesActivo: string;
}

interface DashboardAnalyticProps {
  estadisticas: EstadisticasUsuario;
  onNavigateToIdeas?: () => void;
}

const DashboardAnalytic: React.FC<DashboardAnalyticProps> = ({
  estadisticas,
  onNavigateToIdeas,
}) => {
  const {
    totalIdeas,
    ideasPorMes,
    tasaAprobacion,
    ideasImplementadas,
    puntuacionTotal,
    mesActivo,
  } = estadisticas;

  // Calcular tendencia (comparar últimos 2 meses)
  const tendencia =
    ideasPorMes.length >= 2
      ? ideasPorMes[ideasPorMes.length - 1].cantidad -
        ideasPorMes[ideasPorMes.length - 2].cantidad
      : 0;

  // Determinar nivel según puntuación
  const obtenerNivel = (puntos: number) => {
    if (puntos >= 500)
      return {
        nivel: "Innovador Experto",
        color: "text-purple-600",
        bg: "bg-purple-100",
      };
    if (puntos >= 300)
      return {
        nivel: "Innovador Avanzado",
        color: "text-blue-600",
        bg: "bg-blue-100",
      };
    if (puntos >= 150)
      return {
        nivel: "Innovador Activo",
        color: "text-green-600",
        bg: "bg-green-100",
      };
    if (puntos >= 50)
      return {
        nivel: "Innovador Emergente",
        color: "text-yellow-600",
        bg: "bg-yellow-100",
      };
    return {
      nivel: "Nuevo Innovador",
      color: "text-gray-600",
      bg: "bg-gray-100",
    };
  };

  const nivelInfo = obtenerNivel(puntuacionTotal);

  // Mensaje motivacional basado en el desempeño
  const obtenerMensajeMotivacional = () => {
    if (totalIdeas === 0) {
      return "¡Es hora de compartir tu primera idea! Cada gran innovación comienza con un pequeño paso.";
    }
    if (tasaAprobacion >= 80) {
      return "¡Excelente calidad en tus ideas! Sigues siendo una fuente constante de innovación.";
    }
    if (tendencia > 0) {
      return "¡Vas en aumento! Tu actividad creativa está creciendo este mes.";
    }
    if (ideasImplementadas > 0) {
      return "¡Felicitaciones! Tus ideas están haciendo un impacto real en la empresa.";
    }
    return "Sigue compartiendo tus ideas. Cada contribución cuenta para el crecimiento de CL Grupo Industrial.";
  };

  return (
    <div className="space-y-6">
      {/* Header con nivel y puntuación */}
      <div className="bg-gradient-to-r from-accent-100 to-accent-200 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Mi Desempeño Innovador</h2>
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${nivelInfo.bg} ${nivelInfo.color}`}
            >
              <Trophy className="w-4 h-4 mr-2" />
              {nivelInfo.nivel}
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-sm">Puntuación Total</p>
            <p className="text-3xl font-bold">{puntuacionTotal}</p>
            <p className="text-white/80 text-xs">puntos ganados</p>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-white/90 text-sm leading-relaxed">
            {obtenerMensajeMotivacional()}
          </p>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-bg-300 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Lightbulb className="w-6 h-6 text-blue-600" />
            </div>
            {onNavigateToIdeas && (
              <button
                onClick={onNavigateToIdeas}
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
          <h3 className="text-sm font-medium text-text-200 mb-1">
            Ideas Totales
          </h3>
          <p className="text-2xl font-bold text-text-100">{totalIdeas}</p>
          <p className="text-xs text-text-200 mt-1">ideas enviadas</p>
        </div>

        <div className="bg-white rounded-lg border border-bg-300 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div
              className={`flex items-center text-xs ${
                tendencia >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendingUp className="w-3 h-3 mr-1" />
              {tendencia >= 0 ? "+" : ""}
              {tendencia}
            </div>
          </div>
          <h3 className="text-sm font-medium text-text-200 mb-1">
            Tasa de Aprobación
          </h3>
          <p className="text-2xl font-bold text-text-100">{tasaAprobacion}%</p>
          <p className="text-xs text-text-200 mt-1">ideas aprobadas</p>
        </div>

        <div className="bg-white rounded-lg border border-bg-300 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-text-200 mb-1">
            Ideas Implementadas
          </h3>
          <p className="text-2xl font-bold text-text-100">
            {ideasImplementadas}
          </p>
          <p className="text-xs text-text-200 mt-1">en producción</p>
        </div>

        <div className="bg-white rounded-lg border border-bg-300 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-text-200 mb-1">
            Mes Más Activo
          </h3>
          <p className="text-lg font-bold text-text-100">
            {mesActivo.split(" ")[0]}
          </p>
          <p className="text-xs text-text-200 mt-1">
            {mesActivo.split(" ")[1]}
          </p>
        </div>
      </div>

      {/* Gráfico de actividad mensual */}
      <div className="bg-white rounded-lg border border-bg-300 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-100">
            Actividad de los Últimos 6 Meses
          </h3>
          <BarChart3 className="w-5 h-5 text-text-200" />
        </div>

        <div className="space-y-4">
          {ideasPorMes.map((dato, index) => {
            const porcentaje = Math.max(
              (dato.cantidad /
                Math.max(...ideasPorMes.map((d) => d.cantidad), 1)) *
                100,
              5
            );
            const esUltimo = index === ideasPorMes.length - 1;

            return (
              <div key={dato.mes} className="flex items-center gap-4">
                <div className="w-12 text-sm text-text-200 font-medium">
                  {dato.mes}
                </div>
                <div className="flex-1 bg-bg-200 rounded-full h-3 relative overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      esUltimo ? "bg-accent-100" : "bg-bg-400"
                    }`}
                    style={{ width: `${porcentaje}%` }}
                  />
                </div>
                <div className="w-8 text-sm text-text-100 font-medium text-right">
                  {dato.cantidad}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sistema de puntuación */}
      <div className="bg-white rounded-lg border border-bg-300 p-6">
        <h3 className="text-lg font-semibold text-text-100 mb-4">
          Sistema de Puntuación
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-bold">10</span>
            </div>
            <div>
              <p className="text-sm font-medium text-text-100">
                Por Idea Enviada
              </p>
              <p className="text-xs text-text-200">Cada contribución cuenta</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm font-bold">25</span>
            </div>
            <div>
              <p className="text-sm font-medium text-text-100">
                Por Idea Aprobada
              </p>
              <p className="text-xs text-text-200">Calidad reconocida</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-sm font-bold">50</span>
            </div>
            <div>
              <p className="text-sm font-medium text-text-100">
                Por Idea Implementada
              </p>
              <p className="text-xs text-text-200">Impacto real</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytic;
