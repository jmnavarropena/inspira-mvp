import React from "react";
import {
  Award,
  Star,
  Zap,
  Target,
  Trophy,
  Crown,
  Lightbulb,
  TrendingUp,
  Users,
  Calendar,
  CheckCircle,
  Flame,
} from "lucide-react";

interface Badge {
  id: string;
  nombre: string;
  descripcion: string;
  icono: React.ReactNode;
  color: string;
  bgColor: string;
  criterio: string;
  obtenido: boolean;
  fechaObtencion?: string;
  progreso?: {
    actual: number;
    objetivo: number;
  };
}

interface BadgeSystemProps {
  estadisticas: {
    totalIdeas: number;
    ideasImplementadas: number;
    tasaAprobacion: number;
    ideasPorMes: { mes: string; cantidad: number }[];
    puntuacionTotal: number;
  };
}

const BadgeSystem: React.FC<BadgeSystemProps> = ({ estadisticas }) => {
  const {
    totalIdeas,
    ideasImplementadas,
    tasaAprobacion,
    ideasPorMes,
    puntuacionTotal,
  } = estadisticas;

  // Calcular si hay racha de actividad (3 meses consecutivos con ideas)
  const tieneRachaActividad = () => {
    const ultimosTresMeses = ideasPorMes.slice(-3);
    return (
      ultimosTresMeses.length === 3 &&
      ultimosTresMeses.every((mes) => mes.cantidad > 0)
    );
  };

  // Verificar si tuvo un mes especialmente productivo
  const tieneRachaCreativa = () => {
    return ideasPorMes.some((mes) => mes.cantidad >= 5);
  };

  const badges: Badge[] = [
    {
      id: "primer-idea",
      nombre: "Primera Chispa",
      descripcion: "Envía tu primera idea",
      icono: <Lightbulb className="w-6 h-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      criterio: "Enviar 1 idea",
      obtenido: totalIdeas >= 1,
      fechaObtencion: totalIdeas >= 1 ? "15 de Diciembre, 2024" : undefined,
      progreso:
        totalIdeas < 1 ? { actual: totalIdeas, objetivo: 1 } : undefined,
    },
    {
      id: "innovador-activo",
      nombre: "Innovador Activo",
      descripcion: "Envía 5 ideas en total",
      icono: <Zap className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      criterio: "Enviar 5 ideas",
      obtenido: totalIdeas >= 5,
      fechaObtencion: totalIdeas >= 5 ? "20 de Diciembre, 2024" : undefined,
      progreso:
        totalIdeas < 5 ? { actual: totalIdeas, objetivo: 5 } : undefined,
    },
    {
      id: "calidad-superior",
      nombre: "Calidad Superior",
      descripcion: "Mantén una tasa de aprobación del 80%",
      icono: <Target className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
      criterio: "80% de aprobación",
      obtenido: tasaAprobacion >= 80 && totalIdeas >= 3,
      fechaObtencion:
        tasaAprobacion >= 80 && totalIdeas >= 3
          ? "22 de Diciembre, 2024"
          : undefined,
      progreso:
        tasaAprobacion < 80 || totalIdeas < 3
          ? { actual: tasaAprobacion, objetivo: 80 }
          : undefined,
    },
    {
      id: "implementador",
      nombre: "Implementador",
      descripcion: "Ten tu primera idea implementada",
      icono: <CheckCircle className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      criterio: "1 idea implementada",
      obtenido: ideasImplementadas >= 1,
      fechaObtencion:
        ideasImplementadas >= 1 ? "28 de Diciembre, 2024" : undefined,
      progreso:
        ideasImplementadas < 1
          ? { actual: ideasImplementadas, objetivo: 1 }
          : undefined,
    },
    {
      id: "racha-creativa",
      nombre: "Racha Creativa",
      descripcion: "Envía 5 ideas en un solo mes",
      icono: <Flame className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      criterio: "5 ideas en un mes",
      obtenido: tieneRachaCreativa(),
      fechaObtencion: tieneRachaCreativa()
        ? "31 de Diciembre, 2024"
        : undefined,
      progreso: !tieneRachaCreativa()
        ? {
            actual: Math.max(...ideasPorMes.map((m) => m.cantidad), 0),
            objetivo: 5,
          }
        : undefined,
    },
    {
      id: "constancia",
      nombre: "Constancia",
      descripcion: "Mantén actividad 3 meses consecutivos",
      icono: <Calendar className="w-6 h-6" />,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      criterio: "3 meses consecutivos",
      obtenido: tieneRachaActividad(),
      fechaObtencion: tieneRachaActividad()
        ? "31 de Diciembre, 2024"
        : undefined,
    },
    {
      id: "mega-innovador",
      nombre: "Mega Innovador",
      descripcion: "Alcanza 500 puntos de innovación",
      icono: <Crown className="w-6 h-6" />,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      criterio: "500 puntos",
      obtenido: puntuacionTotal >= 500,
      fechaObtencion: puntuacionTotal >= 500 ? "2 de Enero, 2025" : undefined,
      progreso:
        puntuacionTotal < 500
          ? { actual: puntuacionTotal, objetivo: 500 }
          : undefined,
    },
    {
      id: "legend",
      nombre: "Leyenda CL",
      descripcion: "Logra 3 ideas implementadas",
      icono: <Trophy className="w-6 h-6" />,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      criterio: "3 ideas implementadas",
      obtenido: ideasImplementadas >= 3,
      progreso:
        ideasImplementadas < 3
          ? { actual: ideasImplementadas, objetivo: 3 }
          : undefined,
    },
  ];

  const badgesObtenidos = badges.filter((badge) => badge.obtenido);
  const badgesPendientes = badges.filter((badge) => !badge.obtenido);

  const calcularProgresoPorcentaje = (actual: number, objetivo: number) => {
    return Math.min((actual / objetivo) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Header con resumen */}
      <div className="bg-gradient-to-r from-accent-100 to-accent-200 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Sistema de Reconocimientos
            </h2>
            <p className="text-white/90">
              Obtén badges por tus logros en innovación
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-6 h-6" />
              <span className="text-2xl font-bold">
                {badgesObtenidos.length}
              </span>
              <span className="text-white/80">/ {badges.length}</span>
            </div>
            <p className="text-white/80 text-sm">badges obtenidos</p>
          </div>
        </div>
      </div>

      {/* Badges obtenidos */}
      {badgesObtenidos.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-text-100 mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Logros Obtenidos ({badgesObtenidos.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badgesObtenidos.map((badge) => (
              <div
                key={badge.id}
                className="bg-white rounded-lg border border-bg-300 p-4 relative overflow-hidden"
              >
                {/* Efecto de celebración */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-yellow-200/30 to-yellow-400/30 rounded-full -translate-y-4 translate-x-4"></div>

                <div className="flex items-start gap-3">
                  <div
                    className={`p-3 rounded-lg ${badge.bgColor} ${badge.color} flex-shrink-0`}
                  >
                    {badge.icono}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-text-100 mb-1">
                      {badge.nombre}
                    </h4>
                    <p className="text-sm text-text-200 mb-2">
                      {badge.descripcion}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                        ✓ Completado
                      </span>
                      {badge.fechaObtencion && (
                        <span className="text-xs text-text-200">
                          {badge.fechaObtencion}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Badges pendientes */}
      {badgesPendientes.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-text-100 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-blue-600" />
            Próximos Logros ({badgesPendientes.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badgesPendientes.map((badge) => (
              <div
                key={badge.id}
                className="bg-white rounded-lg border border-bg-300 p-4 opacity-75 hover:opacity-100 transition-opacity"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-3 rounded-lg bg-gray-100 text-gray-400 flex-shrink-0`}
                  >
                    {badge.icono}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-text-100 mb-1">
                      {badge.nombre}
                    </h4>
                    <p className="text-sm text-text-200 mb-3">
                      {badge.descripcion}
                    </p>

                    {badge.progreso && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-text-200">
                            {badge.progreso.actual} / {badge.progreso.objetivo}
                          </span>
                          <span className="text-xs text-text-200">
                            {Math.round(
                              calcularProgresoPorcentaje(
                                badge.progreso.actual,
                                badge.progreso.objetivo
                              )
                            )}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-bg-200 rounded-full h-2">
                          <div
                            className="bg-accent-100 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${calcularProgresoPorcentaje(
                                badge.progreso.actual,
                                badge.progreso.objetivo
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    <span className="inline-block mt-2 text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                      {badge.criterio}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips para obtener badges */}
      <div className="bg-white rounded-lg border border-bg-300 p-6">
        <h3 className="text-lg font-semibold text-text-100 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Consejos para Obtener Más Badges
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-100">
                Calidad sobre Cantidad
              </p>
              <p className="text-xs text-text-200">
                Piensa bien tus ideas antes de enviarlas para mantener alta
                aprobación
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-3 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-100">
                Mantén la Constancia
              </p>
              <p className="text-xs text-text-200">
                Envía al menos una idea cada mes para mantener tu racha
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-3 bg-purple-50 rounded-lg">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-100">
                Observa tu Entorno
              </p>
              <p className="text-xs text-text-200">
                Las mejores ideas surgen de problemas reales del día a día
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-3 bg-orange-50 rounded-lg">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Target className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-100">Sé Específico</p>
              <p className="text-xs text-text-200">
                Ideas claras y detalladas tienen más probabilidad de
                implementarse
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeSystem;
