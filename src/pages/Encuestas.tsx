import React, { useState } from "react";
import {
  ClipboardList,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Send,
  Eye,
  Calendar,
  User,
  Building,
} from "lucide-react";
import { useEncuestas } from "../contexts/EncuestasContext";
import { useAuth } from "../contexts/AuthContext";

const Encuestas: React.FC = () => {
  const { getEncuestasDisponibles, addRespuesta } = useEncuestas();
  const { user } = useAuth();
  const [selectedEncuesta, setSelectedEncuesta] = useState<any>(null);
  const [respuestas, setRespuestas] = useState<Record<string, string | number>>(
    {}
  );
  const [enviando, setEnviando] = useState(false);
  const [encuestaEnviada, setEncuestaEnviada] = useState(false);

  const encuestasDisponibles = user
    ? getEncuestasDisponibles(user.id.toString())
    : [];

  const handleRespuestaChange = (
    preguntaId: string,
    valor: string | number
  ) => {
    setRespuestas((prev) => ({
      ...prev,
      [preguntaId]: valor,
    }));
  };

  const handleSubmitEncuesta = async () => {
    if (!selectedEncuesta || !user) return;

    // Validar preguntas requeridas
    const preguntasRequeridas = selectedEncuesta.preguntas.filter(
      (p: any) => p.requerida
    );
    const faltanRespuestas = preguntasRequeridas.some(
      (p: any) => !respuestas[p.id] || respuestas[p.id] === ""
    );

    if (faltanRespuestas) {
      alert("Por favor, responde todas las preguntas requeridas.");
      return;
    }

    setEnviando(true);

    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 1000));

    addRespuesta({
      encuestaId: selectedEncuesta.id,
      usuarioId: user.id.toString(),
      usuario: user.name,
      respuestas,
    });

    setEnviando(false);
    setEncuestaEnviada(true);
    setRespuestas({});

    // Volver a la lista después de 2 segundos
    setTimeout(() => {
      setSelectedEncuesta(null);
      setEncuestaEnviada(false);
    }, 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderPregunta = (pregunta: any) => {
    const valor = respuestas[pregunta.id] || "";

    switch (pregunta.tipo) {
      case "text":
        return (
          <textarea
            value={valor as string}
            onChange={(e) => handleRespuestaChange(pregunta.id, e.target.value)}
            placeholder="Escribe tu respuesta..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows={3}
          />
        );

      case "multiple_choice":
        return (
          <div className="space-y-2">
            {pregunta.opciones?.map((opcion: any) => (
              <label
                key={opcion.id}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  name={pregunta.id}
                  value={opcion.valor}
                  checked={valor === opcion.valor}
                  onChange={(e) =>
                    handleRespuestaChange(pregunta.id, e.target.value)
                  }
                  className="mr-3 text-primary-500"
                />
                <span className="text-gray-700">{opcion.texto}</span>
              </label>
            ))}
          </div>
        );

      case "yes_no":
        return (
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name={pregunta.id}
                value="si"
                checked={valor === "si"}
                onChange={(e) =>
                  handleRespuestaChange(pregunta.id, e.target.value)
                }
                className="mr-2 text-primary-500"
              />
              <span className="text-gray-700">Sí</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name={pregunta.id}
                value="no"
                checked={valor === "no"}
                onChange={(e) =>
                  handleRespuestaChange(pregunta.id, e.target.value)
                }
                className="mr-2 text-primary-500"
              />
              <span className="text-gray-700">No</span>
            </label>
          </div>
        );

      case "rating":
        return (
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRespuestaChange(pregunta.id, rating)}
                className={`p-2 rounded-lg transition-colors ${
                  Number(valor) >= rating
                    ? "text-yellow-500"
                    : "text-gray-300 hover:text-yellow-400"
                }`}
              >
                <Star className="w-6 h-6 fill-current" />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600 self-center">
              {valor ? `${valor}/5` : "No calificado"}
            </span>
          </div>
        );

      default:
        return null;
    }
  };

  if (selectedEncuesta) {
    return (
      <div className="min-h-screen bg-bg-100 p-6">
        <div className="max-w-3xl mx-auto">
          {encuestaEnviada ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                ¡Respuesta enviada!
              </h2>
              <p className="text-gray-600">
                Gracias por tu participación. Regresando a la lista de
                encuestas...
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <button
                  onClick={() => setSelectedEncuesta(null)}
                  className="text-primary-500 text-sm font-medium mb-4 hover:text-primary-600"
                >
                  ← Volver a encuestas
                </button>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedEncuesta.titulo}
                </h1>
                <p className="text-gray-600 mb-4">
                  {selectedEncuesta.descripcion}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>Por {selectedEncuesta.creador}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    <span>{selectedEncuesta.planta}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Hasta {formatDate(selectedEncuesta.fechaFin)}</span>
                  </div>
                </div>
              </div>

              {/* Preguntas */}
              <div className="space-y-6">
                {selectedEncuesta.preguntas
                  .sort((a: any, b: any) => a.orden - b.orden)
                  .map((pregunta: any, index: number) => (
                    <div
                      key={pregunta.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 mb-1">
                            {pregunta.texto}
                            {pregunta.requerida && (
                              <span className="text-red-500 ml-1">*</span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-500 mb-4">
                            {pregunta.tipo === "text" && "Respuesta libre"}
                            {pregunta.tipo === "multiple_choice" &&
                              "Selecciona una opción"}
                            {pregunta.tipo === "yes_no" && "Responde Sí o No"}
                            {pregunta.tipo === "rating" &&
                              "Califica del 1 al 5"}
                          </p>
                        </div>
                      </div>

                      <div className="ml-11">{renderPregunta(pregunta)}</div>
                    </div>
                  ))}
              </div>

              {/* Submit Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={handleSubmitEncuesta}
                  disabled={enviando}
                  className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                >
                  {enviando ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar Respuestas
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <ClipboardList className="w-8 h-8 text-primary-500" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Encuestas</h1>
              <p className="text-gray-600">
                Participa en las encuestas disponibles y comparte tu opinión
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">Encuestas disponibles:</span>
                  <span className="text-2xl font-bold text-blue-500">
                    {encuestasDisponibles.length}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Completa las encuestas para ayudarnos a mejorar
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Encuestas */}
        {encuestasDisponibles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {encuestasDisponibles.map((encuesta) => (
              <div
                key={encuesta.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedEncuesta(encuesta)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
                      {encuesta.titulo}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {encuesta.descripcion}
                    </p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <User className="w-4 h-4" />
                    <span>Por {encuesta.creador}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Building className="w-4 h-4" />
                    <span>
                      {encuesta.planta} • {encuesta.area}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Hasta {formatDate(encuesta.fechaFin)}</span>
                  </div>
                </div>

                {/* Preguntas info */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ClipboardList className="w-4 h-4 text-primary-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {encuesta.preguntas.length} preguntas
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Tiempo estimado:{" "}
                    {Math.ceil(encuesta.preguntas.length * 1.5)} min
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEncuesta(encuesta);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
                >
                  <Eye className="w-4 h-4" />
                  Responder Encuesta
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              ¡Todas las encuestas completadas!
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              No hay encuestas disponibles en este momento. Las nuevas encuestas
              aparecerán aquí cuando estén disponibles.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Encuestas;
