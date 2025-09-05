import React from "react";
import {
  X,
  Calendar,
  MapPin,
  Users,
  TrendingUp,
  Tag,
  File,
  Download,
} from "lucide-react";

interface Idea {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  estado:
    | "Abierta"
    | "Revision"
    | "CoDir"
    | "Aprobada"
    | "Progreso"
    | "Implementada"
    | "Rechazada";
  planta: string;
  fechaCreacion: string;
  votos: number;
  comentarios: number;
  impactoEstimado: string;
  ahorroPotencial?: string;
  archivos?: any[];
}

interface VisualizarIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  idea: Idea | null;
}

const VisualizarIdeaModal: React.FC<VisualizarIdeaModalProps> = ({
  isOpen,
  onClose,
  idea,
}) => {
  if (!isOpen || !idea) return null;

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Abierta":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Revision":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "CoDir":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Aprobada":
        return "bg-green-100 text-green-800 border-green-200";
      case "Progreso":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Implementada":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Rechazada":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getImpactoColor = (impacto: string) => {
    switch (impacto) {
      case "Alto":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medio":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Bajo":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-bg-300">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-text-100">
                {idea.titulo}
              </h2>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getEstadoColor(
                  idea.estado
                )}`}
              >
                {idea.estado}
              </span>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getImpactoColor(
                  idea.impactoEstimado
                )}`}
              >
                {idea.impactoEstimado} Impacto
              </span>
            </div>
            <p className="text-sm text-text-200">
              ID: #{idea.id} • Creada el {formatearFecha(idea.fechaCreacion)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-bg-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-text-200" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-text-100 mb-3">
                  Información General
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-text-200" />
                    <div>
                      <p className="text-sm text-text-200">Planta</p>
                      <p className="font-medium text-text-100">{idea.planta}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5 text-text-200" />
                    <div>
                      <p className="text-sm text-text-200">Categoría</p>
                      <p className="font-medium text-text-100">
                        {idea.categoria}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-text-200" />
                    <div>
                      <p className="text-sm text-text-200">Fecha de creación</p>
                      <p className="font-medium text-text-100">
                        {formatearFecha(idea.fechaCreacion)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-text-100 mb-3">
                  Métricas
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-text-200" />
                    <div>
                      <p className="text-sm text-text-200">Votos recibidos</p>
                      <p className="font-medium text-text-100">{idea.votos}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-text-200" />
                    <div>
                      <p className="text-sm text-text-200">Ahorro potencial</p>
                      <p className="font-medium text-text-100">
                        {idea.ahorroPotencial || "Por evaluar"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent-100"></div>
                    <div>
                      <p className="text-sm text-text-200">Comentarios</p>
                      <p className="font-medium text-text-100">
                        {idea.comentarios}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-text-100 mb-3">
              Descripción
            </h3>
            <div className="bg-bg-100 rounded-lg p-4">
              <p className="text-text-100 leading-relaxed">
                {idea.descripcion}
              </p>
            </div>
          </div>

          {/* Archivos adjuntos */}
          {idea.archivos && idea.archivos.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-text-100 mb-3">
                Archivos Adjuntos ({idea.archivos.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {idea.archivos.map((archivo, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-bg-100 rounded-lg border border-bg-300"
                  >
                    <div className="flex items-center gap-3">
                      <File className="w-5 h-5 text-accent-100" />
                      <div>
                        <p className="text-sm font-medium text-text-100">
                          {archivo.nombre || `Archivo ${index + 1}`}
                        </p>
                        <p className="text-xs text-text-200">
                          {archivo.tamaño || "Tamaño desconocido"}
                        </p>
                      </div>
                    </div>
                    <button className="p-2 text-text-200 hover:text-accent-100 hover:bg-white rounded transition-colors duration-200">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline/Estado actual */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Estado Actual
            </h3>
            <p className="text-blue-700">
              {idea.estado === "Abierta" &&
                "📝 Tu idea ha sido registrada y está pendiente de revisión inicial."}
              {idea.estado === "Revision" &&
                "👀 Tu idea está siendo revisada por el equipo responsable."}
              {idea.estado === "CoDir" &&
                "📋 Tu idea está siendo evaluada por el Comité de Dirección."}
              {idea.estado === "Aprobada" &&
                "✅ ¡Felicidades! Tu idea ha sido aprobada y se procederá a su implementación."}
              {idea.estado === "Progreso" &&
                "🚀 Tu idea está siendo implementada actualmente."}
              {idea.estado === "Implementada" &&
                "🎉 ¡Tu idea ha sido implementada con éxito!"}
              {idea.estado === "Rechazada" &&
                "❌ Tu idea ha sido evaluada pero no se procederá con su implementación en este momento."}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-6 border-t border-bg-300 bg-bg-100">
          <button onClick={onClose} className="btn-secondary">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualizarIdeaModal;
