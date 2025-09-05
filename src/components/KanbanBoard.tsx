import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Clock,
  Eye,
  CheckCircle,
  X,
  MessageCircle,
  Calendar,
  User,
  Building2,
  Tag,
  AlertCircle,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { useIdeas, Idea } from "../contexts/IdeasContext";

// Mapeo de estados con colores y configuración
const ESTADOS_CONFIG = {
  Abierta: {
    titulo: "Abierta",
    color: "bg-blue-100 border-blue-200",
    headerColor: "bg-blue-600 text-white",
    icon: <Clock className="w-4 h-4" />,
    descripcion: "Ideas recién creadas",
  },
  "En Revisión": {
    titulo: "En Revisión",
    color: "bg-yellow-100 border-yellow-200",
    headerColor: "bg-yellow-600 text-white",
    icon: <Eye className="w-4 h-4" />,
    descripcion: "Siendo evaluadas por responsables",
  },
  "Evalúa CoDir": {
    titulo: "Evalúa CoDir",
    color: "bg-purple-100 border-purple-200",
    headerColor: "bg-purple-600 text-white",
    icon: <AlertCircle className="w-4 h-4" />,
    descripcion: "Pendientes de votación",
  },
  Aprobada: {
    titulo: "Aprobada",
    color: "bg-green-100 border-green-200",
    headerColor: "bg-green-600 text-white",
    icon: <CheckCircle className="w-4 h-4" />,
    descripcion: "Aprobadas para implementar",
  },
  "En Progreso": {
    titulo: "En Progreso",
    color: "bg-orange-100 border-orange-200",
    headerColor: "bg-orange-600 text-white",
    icon: <TrendingUp className="w-4 h-4" />,
    descripcion: "En proceso de implementación",
  },
  Implementada: {
    titulo: "Implementada",
    color: "bg-emerald-100 border-emerald-200",
    headerColor: "bg-emerald-600 text-white",
    icon: <CheckCircle className="w-4 h-4" />,
    descripcion: "Completadas exitosamente",
  },
  Rechazada: {
    titulo: "Rechazada",
    color: "bg-red-100 border-red-200",
    headerColor: "bg-red-600 text-white",
    icon: <XCircle className="w-4 h-4" />,
    descripcion: "No aprobadas",
  },
};

const KanbanBoard: React.FC = () => {
  const { ideas, moveIdea, getIdeasByStatus } = useIdeas();
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectComment, setRejectComment] = useState("");
  const [ideaToReject, setIdeaToReject] = useState<{
    id: string;
    targetStatus: Idea["estado"];
  } | null>(null);

  // Manejar el drag and drop
  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    // Si no hay destino, no hacer nada
    if (!destination) return;

    // Si se soltó en la misma posición, no hacer nada
    if (destination.droppableId === source.droppableId) return;

    const newStatus = destination.droppableId as Idea["estado"];

    // Si se mueve a "Rechazada", pedir comentario obligatorio
    if (newStatus === "Rechazada") {
      setIdeaToReject({ id: draggableId, targetStatus: newStatus });
      setShowRejectModal(true);
      return;
    }

    // Mover la idea al nuevo estado
    moveIdea(draggableId, newStatus);
  };

  // Manejar rechazo con comentario
  const handleReject = () => {
    if (!ideaToReject || !rejectComment.trim()) return;

    moveIdea(ideaToReject.id, ideaToReject.targetStatus, rejectComment);
    setShowRejectModal(false);
    setRejectComment("");
    setIdeaToReject(null);
  };

  // Obtener color de prioridad
  const getPriorityColor = (prioridad: string) => {
    switch (prioridad) {
      case "Alta":
        return "bg-red-500";
      case "Media":
        return "bg-yellow-500";
      case "Baja":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-bg-300">
        <h2 className="text-xl font-semibold text-text-100 mb-4">
          📋 Gestión de Ideas - Tablero Kanban
        </h2>
        <p className="text-text-200 mb-6">
          Arrastra las ideas entre columnas para cambiar su estado. Las ideas
          rechazadas requieren comentario obligatorio.
        </p>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 overflow-x-auto">
            {Object.entries(ESTADOS_CONFIG).map(([estado, config]) => {
              const ideasEnEstado = getIdeasByStatus(estado as Idea["estado"]);

              return (
                <div key={estado} className="min-w-[280px]">
                  {/* Header de columna */}
                  <div
                    className={`${config.headerColor} rounded-t-lg p-3 flex items-center justify-between`}
                  >
                    <div className="flex items-center space-x-2">
                      {config.icon}
                      <span className="font-medium text-sm">
                        {config.titulo}
                      </span>
                    </div>
                    <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                      {ideasEnEstado.length}
                    </span>
                  </div>

                  {/* Descripción */}
                  <div
                    className={`${config.color} border-x border-b-0 px-3 py-2`}
                  >
                    <p className="text-xs text-gray-600">
                      {config.descripcion}
                    </p>
                  </div>

                  {/* Área droppable */}
                  <Droppable droppableId={estado}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`${
                          config.color
                        } border-x border-b rounded-b-lg p-3 min-h-[400px] space-y-3 ${
                          snapshot.isDraggingOver ? "bg-opacity-50" : ""
                        }`}
                      >
                        {ideasEnEstado.map((idea, index) => (
                          <Draggable
                            key={idea.id}
                            draggableId={idea.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-white rounded-lg p-4 shadow-sm border cursor-pointer hover:shadow-md transition-all ${
                                  snapshot.isDragging
                                    ? "shadow-lg rotate-2"
                                    : ""
                                }`}
                                onClick={() => setSelectedIdea(idea)}
                              >
                                {/* Header de tarjeta */}
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-medium text-sm text-text-100 line-clamp-2">
                                    {idea.titulo}
                                  </h4>
                                  <div
                                    className={`w-3 h-3 rounded-full ${getPriorityColor(
                                      idea.prioridad
                                    )} flex-shrink-0 ml-2`}
                                    title={`Prioridad ${idea.prioridad}`}
                                  />
                                </div>

                                {/* Descripción */}
                                <p className="text-xs text-text-200 mb-3 line-clamp-2">
                                  {idea.descripcion}
                                </p>

                                {/* Meta información */}
                                <div className="space-y-1">
                                  <div className="flex items-center space-x-1 text-xs text-text-200">
                                    <User className="w-3 h-3" />
                                    <span className="truncate">
                                      {idea.autor}
                                    </span>
                                  </div>

                                  <div className="flex items-center space-x-1 text-xs text-text-200">
                                    <Building2 className="w-3 h-3" />
                                    <span className="truncate">
                                      {idea.planta}
                                    </span>
                                  </div>

                                  <div className="flex items-center space-x-1 text-xs text-text-200">
                                    <Tag className="w-3 h-3" />
                                    <span className="truncate">
                                      {idea.area}
                                    </span>
                                  </div>

                                  <div className="flex items-center space-x-1 text-xs text-text-200">
                                    <Calendar className="w-3 h-3" />
                                    <span>
                                      {new Date(
                                        idea.fechaCreacion
                                      ).toLocaleDateString("es-ES")}
                                    </span>
                                  </div>
                                </div>

                                {/* Comentarios (si existen) */}
                                {idea.comentarios && (
                                  <div className="mt-2 flex items-start space-x-1 text-xs">
                                    <MessageCircle className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-text-200 line-clamp-2">
                                      {idea.comentarios}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}

                        {/* Mensaje si no hay ideas */}
                        {ideasEnEstado.length === 0 && (
                          <div className="text-center py-8 text-text-200">
                            <div className="opacity-50">{config.icon}</div>
                            <p className="text-xs mt-2">
                              Sin ideas en este estado
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>

      {/* Modal para ver detalles de idea */}
      {selectedIdea && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-bg-200">
              <div>
                <h2 className="text-xl font-semibold text-text-100">
                  {selectedIdea.titulo}
                </h2>
                <div className="flex items-center space-x-2 mt-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${ESTADOS_CONFIG[
                      selectedIdea.estado
                    ].color
                      .replace("bg-", "bg-")
                      .replace("border-", "text-")}`}
                  >
                    {selectedIdea.estado}
                  </span>
                  <span
                    className={`w-3 h-3 rounded-full ${getPriorityColor(
                      selectedIdea.prioridad
                    )}`}
                  />
                  <span className="text-sm text-text-200">
                    Prioridad {selectedIdea.prioridad}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedIdea(null)}
                className="text-text-200 hover:text-text-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-medium text-text-100 mb-2">Descripción</h3>
                <p className="text-text-200">{selectedIdea.descripcion}</p>
              </div>

              {selectedIdea.beneficios && (
                <div>
                  <h3 className="font-medium text-text-100 mb-2">
                    Beneficios Esperados
                  </h3>
                  <p className="text-text-200">{selectedIdea.beneficios}</p>
                </div>
              )}

              {selectedIdea.implementacion && (
                <div>
                  <h3 className="font-medium text-text-100 mb-2">
                    Plan de Implementación
                  </h3>
                  <p className="text-text-200">{selectedIdea.implementacion}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-text-100 mb-1">
                    Información
                  </h4>
                  <div className="space-y-1 text-sm text-text-200">
                    <p>
                      <strong>Autor:</strong> {selectedIdea.autor}
                    </p>
                    <p>
                      <strong>Planta:</strong> {selectedIdea.planta}
                    </p>
                    <p>
                      <strong>Área:</strong> {selectedIdea.area}
                    </p>
                    <p>
                      <strong>Categoría:</strong> {selectedIdea.categoria}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-text-100 mb-1">Fechas</h4>
                  <div className="space-y-1 text-sm text-text-200">
                    <p>
                      <strong>Creada:</strong>{" "}
                      {new Date(selectedIdea.fechaCreacion).toLocaleDateString(
                        "es-ES"
                      )}
                    </p>
                    <p>
                      <strong>Actualizada:</strong>{" "}
                      {new Date(
                        selectedIdea.fechaActualizacion
                      ).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                </div>
              </div>

              {selectedIdea.comentarios && (
                <div>
                  <h3 className="font-medium text-text-100 mb-2">
                    Comentarios
                  </h3>
                  <div className="bg-bg-100 rounded-lg p-3">
                    <p className="text-text-200">{selectedIdea.comentarios}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end p-6 border-t border-bg-200">
              <button
                onClick={() => setSelectedIdea(null)}
                className="px-4 py-2 text-text-200 hover:text-text-100 border border-bg-300 rounded-lg hover:bg-bg-100 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para rechazar con comentario */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b border-bg-200">
              <h2 className="text-lg font-semibold text-text-100">
                Rechazar Idea
              </h2>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectComment("");
                  setIdeaToReject(null);
                }}
                className="text-text-200 hover:text-text-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-text-200 mb-4">
                Por favor, proporciona un comentario explicando por qué se
                rechaza esta idea:
              </p>
              <textarea
                value={rejectComment}
                onChange={(e) => setRejectComment(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-transparent"
                placeholder="Explica el motivo del rechazo..."
              />
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-bg-200">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectComment("");
                  setIdeaToReject(null);
                }}
                className="px-4 py-2 text-text-200 hover:text-text-100 border border-bg-300 rounded-lg hover:bg-bg-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectComment.trim()}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Rechazar Idea
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
