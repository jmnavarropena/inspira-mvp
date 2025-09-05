import React, { useState } from "react";
import {
  Vote,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Calendar,
  User,
  Building,
  Target,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { useIdeas } from "../contexts/IdeasContext";

interface VoteDetails {
  ideaId: string;
  vote: "approve" | "reject";
  comentario: string;
}

const Votacion: React.FC = () => {
  const { ideas, moveIdea } = useIdeas();
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [voteType, setVoteType] = useState<"approve" | "reject" | null>(null);
  const [comentario, setComentario] = useState("");

  // Filtrar solo ideas que están esperando votación del CoDir
  const ideasEnAprobacion = ideas.filter(
    (idea) => idea.estado === "Evalúa CoDir"
  );

  const handleVote = (idea: any, type: "approve" | "reject") => {
    setSelectedIdea(idea);
    setVoteType(type);
    setShowVoteModal(true);
    setComentario("");
  };

  const handleViewDetails = (idea: any) => {
    setSelectedIdea(idea);
    setShowDetailModal(true);
  };

  const submitVote = () => {
    if (!selectedIdea || !voteType) return;

    const newStatus = voteType === "approve" ? "Aprobada" : "Rechazada";
    const comentarioFinal =
      comentario.trim() ||
      (voteType === "approve" ? "Aprobada por CoDir" : "Rechazada por CoDir");

    moveIdea(selectedIdea.id, newStatus, comentarioFinal);

    setShowVoteModal(false);
    setSelectedIdea(null);
    setVoteType(null);
    setComentario("");
  };

  const getPriorityColor = (prioridad: string) => {
    switch (prioridad) {
      case "Alta":
        return "text-red-400 bg-red-900/20";
      case "Media":
        return "text-yellow-400 bg-yellow-900/20";
      case "Baja":
        return "text-green-400 bg-green-900/20";
      default:
        return "text-gray-400 bg-gray-900/20";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Vote className="w-8 h-8 text-primary-400" />
          <div>
            <h1 className="text-3xl font-bold text-text-50">Votación CoDir</h1>
            <p className="text-text-200">
              Evalúa y vota las ideas pendientes de aprobación
            </p>
          </div>
        </div>

        <div className="bg-surface-800 rounded-lg p-4 border border-surface-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-text-200">Ideas pendientes:</span>
                <span className="text-2xl font-bold text-yellow-400">
                  {ideasEnAprobacion.length}
                </span>
              </div>
            </div>
            <div className="text-sm text-text-300">
              Como miembro del CoDir, tu voto es crucial para el desarrollo de
              la innovación
            </div>
          </div>
        </div>
      </div>

      {/* Ideas Grid */}
      {ideasEnAprobacion.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {ideasEnAprobacion.map((idea) => (
            <div
              key={idea.id}
              className="bg-surface-800 rounded-lg border border-surface-700 p-6 hover:border-primary-500/50 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-text-50 text-lg mb-2 line-clamp-2">
                    {idea.titulo}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                        idea.prioridad
                      )}`}
                    >
                      {idea.prioridad}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <p className="text-text-200 text-sm mb-4 line-clamp-3">
                {idea.descripcion}
              </p>

              {/* Metadata */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-text-300">
                  <User className="w-4 h-4" />
                  <span>{idea.autor}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-300">
                  <Building className="w-4 h-4" />
                  <span>
                    {idea.planta} • {idea.area}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-300">
                  <Calendar className="w-4 h-4" />
                  <span>Creada: {formatDate(idea.fechaCreacion)}</span>
                </div>
              </div>

              {/* Beneficios Preview */}
              <div className="bg-surface-900 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-primary-400" />
                  <span className="text-xs font-medium text-text-200">
                    Beneficios Esperados
                  </span>
                </div>
                <p className="text-xs text-text-300 line-clamp-2">
                  {idea.beneficios}
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {/* View Details Button */}
                <button
                  onClick={() => handleViewDetails(idea)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-surface-700 hover:bg-surface-600 text-text-200 rounded-lg transition-colors text-sm"
                >
                  <Eye className="w-4 h-4" />
                  Ver Detalles
                </button>

                {/* Vote Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleVote(idea, "approve")}
                    className="flex items-center justify-center gap-2 py-2 px-4 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Aprobar
                  </button>
                  <button
                    onClick={() => handleVote(idea, "reject")}
                    className="flex items-center justify-center gap-2 py-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <ThumbsDown className="w-4 h-4" />
                    Rechazar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-text-100 mb-2">
            ¡Todas las ideas han sido evaluadas!
          </h3>
          <p className="text-text-200 max-w-md mx-auto">
            No hay ideas pendientes de votación en este momento. Las nuevas
            ideas aparecerán aquí cuando estén listas para evaluación.
          </p>
        </div>
      )}

      {/* Vote Modal */}
      {showVoteModal && selectedIdea && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-surface-800 rounded-lg border border-surface-700 max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {voteType === "approve" ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400" />
                )}
                <h3 className="text-lg font-semibold text-text-50">
                  {voteType === "approve" ? "Aprobar Idea" : "Rechazar Idea"}
                </h3>
              </div>

              <div className="mb-4 p-3 bg-surface-900 rounded-lg">
                <h4 className="font-medium text-text-50 mb-2">
                  {selectedIdea.titulo}
                </h4>
                <p className="text-sm text-text-300">
                  por {selectedIdea.autor}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-text-200 mb-2">
                  Comentario{" "}
                  {voteType === "reject" ? "(requerido)" : "(opcional)"}
                </label>
                <textarea
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder={
                    voteType === "approve"
                      ? "Agrega comentarios sobre por qué apruebas esta idea..."
                      : "Explica por qué se rechaza esta idea..."
                  }
                  className="w-full px-3 py-2 bg-surface-900 border border-surface-600 rounded-lg text-text-50 placeholder-text-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-colors"
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowVoteModal(false)}
                  className="flex-1 py-2 px-4 bg-surface-700 hover:bg-surface-600 text-text-200 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={submitVote}
                  disabled={voteType === "reject" && !comentario.trim()}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors font-medium ${
                    voteType === "approve"
                      ? "bg-green-600 hover:bg-green-500 text-white"
                      : "bg-red-600 hover:bg-red-500 text-white"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {voteType === "approve" ? "Aprobar" : "Rechazar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedIdea && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-surface-800 rounded-lg border border-surface-700 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-text-50 mb-2">
                    {selectedIdea.titulo}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-text-300">
                    <span>por {selectedIdea.autor}</span>
                    <span>•</span>
                    <span>{selectedIdea.planta}</span>
                    <span>•</span>
                    <span>{selectedIdea.area}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-surface-700 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5 text-text-300" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-text-100 mb-2">
                    Descripción
                  </h4>
                  <p className="text-text-200">{selectedIdea.descripcion}</p>
                </div>

                <div>
                  <h4 className="font-medium text-text-100 mb-2">
                    Beneficios Esperados
                  </h4>
                  <p className="text-text-200">{selectedIdea.beneficios}</p>
                </div>

                <div>
                  <h4 className="font-medium text-text-100 mb-2">
                    Plan de Implementación
                  </h4>
                  <p className="text-text-200">{selectedIdea.implementacion}</p>
                </div>

                {selectedIdea.comentarios && (
                  <div>
                    <h4 className="font-medium text-text-100 mb-2">
                      Comentarios
                    </h4>
                    <div className="bg-surface-900 rounded-lg p-3">
                      <p className="text-text-200">
                        {selectedIdea.comentarios}
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-surface-700">
                  <div>
                    <span className="text-sm text-text-300">Prioridad:</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                        selectedIdea.prioridad
                      )}`}
                    >
                      {selectedIdea.prioridad}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-text-300">Categoría:</span>
                    <span className="ml-2 text-sm text-text-100">
                      {selectedIdea.categoria}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-surface-700">
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    handleVote(selectedIdea, "approve");
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors font-medium"
                >
                  <ThumbsUp className="w-5 h-5" />
                  Aprobar Idea
                </button>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    handleVote(selectedIdea, "reject");
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors font-medium"
                >
                  <ThumbsDown className="w-5 h-5" />
                  Rechazar Idea
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Votacion;
