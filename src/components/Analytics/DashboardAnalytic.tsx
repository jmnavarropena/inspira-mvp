import React from "react";
import {
  BarChart3,
  TrendingUp,
  Target,
  Calendar,
  Award,
  Zap,
} from "lucide-react";

interface IdeaStats {
  totalIdeas: number;
  ideasPorMes: { mes: string; cantidad: number }[];
  tasaAprobacion: number;
  ideasImplementadas: number;
  puntuacionTotal: number;
  mesActivo: string;
}

interface DashboardAnalyticProps {
  stats: IdeaStats;
}

const DashboardAnalytic: React.FC<DashboardAnalyticProps> = ({ stats }) => {
  // Calcular el progreso mensual
  const mesesRecientes = stats.ideasPorMes.slice(-6);
  const maxIdeasMes = Math.max(...mesesRecientes.map((m) => m.cantidad));

  // Calcular tendencia
  const ultimosMeses = mesesRecientes.slice(-2);
  const tendencia =
    ultimosMeses.length >= 2
      ? ultimosMeses[1].cantidad - ultimosMeses[0].cantidad
      : 0;

  return (
    <div className="bg-white rounded-lg border border-bg-300 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-100 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-accent-100" />
            Mi Rendimiento
          </h3>
          <p className="text-sm text-text-200 mt-1">
            Análisis de tu participación e innovación
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-text-200">Período más activo</p>
          <p className="font-semibold text-accent-100">{stats.mesActivo}</p>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-900">{stats.totalIdeas}</p>
          <p className="text-sm text-blue-700">Ideas Totales</p>
        </div>

        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Award className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-900">
            {stats.tasaAprobacion}%
          </p>
          <p className="text-sm text-green-700">Tasa Aprobación</p>
        </div>

        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Zap className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-purple-900">
            {stats.ideasImplementadas}
          </p>
          <p className="text-sm text-purple-700">Implementadas</p>
        </div>

        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="w-6 h-6 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-orange-900">
            {stats.puntuacionTotal}
          </p>
          <p className="text-sm text-orange-700">Puntos Innovación</p>
        </div>
      </div>

      {/* Gráfico de barras simple */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-text-100">
            Ideas por Mes (últimos 6 meses)
          </h4>
          <div
            className={`flex items-center gap-1 text-sm ${
              tendencia >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            <TrendingUp
              className={`w-4 h-4 ${tendencia < 0 ? "rotate-180" : ""}`}
            />
            {tendencia >= 0 ? "+" : ""}
            {tendencia} vs mes anterior
          </div>
        </div>

        <div className="space-y-3">
          {mesesRecientes.map((mes, _index) => (
            <div key={mes.mes} className="flex items-center gap-3">
              <div className="w-16 text-sm text-text-200 font-medium">
                {mes.mes}
              </div>
              <div className="flex-1 bg-bg-200 rounded-full h-6 relative overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent-100 to-primary-100 rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
                  style={{
                    width: `${
                      maxIdeasMes > 0 ? (mes.cantidad / maxIdeasMes) * 100 : 0
                    }%`,
                    minWidth: mes.cantidad > 0 ? "24px" : "0px",
                  }}
                >
                  {mes.cantidad > 0 && (
                    <span className="text-xs font-semibold text-white">
                      {mes.cantidad}
                    </span>
                  )}
                </div>
                {mes.cantidad === 0 && (
                  <div className="absolute inset-0 flex items-center pl-2">
                    <span className="text-xs text-text-200">0</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mensaje motivacional */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg border border-primary-200">
        <div className="flex items-start gap-3">
          <div className="p-1 bg-accent-100 rounded-full">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-accent-100">
              💡 Insight Personalizado
            </p>
            <p className="text-sm text-primary-900 mt-1">
              {stats.tasaAprobacion >= 60
                ? `¡Excelente! Tu tasa de aprobación del ${stats.tasaAprobacion}% está por encima del promedio.`
                : stats.tasaAprobacion >= 40
                ? `Buen trabajo. Con una tasa del ${stats.tasaAprobacion}%, estás en camino hacia la excelencia.`
                : `¡Sigue innovando! Cada idea es una oportunidad de impacto.`}
              {stats.ideasImplementadas > 0 &&
                ` Has logrado implementar ${stats.ideasImplementadas} idea${
                  stats.ideasImplementadas > 1 ? "s" : ""
                } que generan valor real.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytic;
