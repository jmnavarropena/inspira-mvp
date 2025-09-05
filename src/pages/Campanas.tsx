import React, { useState } from "react";
import {
  Calendar,
  Users,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  Award,
  BarChart3,
  Search,
  Filter,
  Lightbulb,
  Eye,
  X,
  MapPin,
  User,
  DollarSign,
} from "lucide-react";
import { useCampaigns } from "../contexts/CampaignsContext";

// Función para obtener el color del estado
const getStatusColor = (status: string) => {
  switch (status) {
    case "Activa":
      return "bg-green-100 text-green-800";
    case "Finalizada":
      return "bg-gray-100 text-gray-800";
    case "Borrador":
      return "bg-yellow-100 text-yellow-800";
    case "En Revisión":
      return "bg-blue-100 text-blue-800";
    case "Pausada":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Función para obtener el icono del estado
const getStatusIcon = (status: string) => {
  switch (status) {
    case "Activa":
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    case "Finalizada":
      return <CheckCircle className="h-4 w-4 text-gray-500" />;
    case "Borrador":
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case "En Revisión":
      return <Target className="h-4 w-4 text-blue-500" />;
    case "Pausada":
      return <Clock className="h-4 w-4 text-red-500" />;
    default:
      return <Target className="h-4 w-4 text-gray-500" />;
  }
};

const Campanas: React.FC = () => {
  const { campaigns } = useCampaigns();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [showCreateIdea, setShowCreateIdea] = useState(false);
  const [ideaForm, setIdeaForm] = useState({
    titulo: "",
    descripcion: "",
    beneficios: "",
    implementacion: "",
  });

  // Función para manejar la creación de ideas
  const handleCreateIdea = () => {
    if (!ideaForm.titulo || !ideaForm.descripcion) return;

    // Aquí podrías agregar la lógica para guardar la idea
    console.log("Nueva idea creada:", {
      ...ideaForm,
      campaignId: selectedCampaign?.id,
      campaignTitle: selectedCampaign?.titulo,
    });

    // Resetear formulario
    setIdeaForm({
      titulo: "",
      descripcion: "",
      beneficios: "",
      implementacion: "",
    });
    setShowCreateIdea(false);
    setSelectedCampaign(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setIdeaForm((prev) => ({ ...prev, [name]: value }));
  };

  // Filtrar campañas según el término de búsqueda
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.categoria.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // Calcular estadísticas
  const stats = {
    total: campaigns.length,
    active: campaigns.filter((c) => c.estado === "Activa").length,
    completed: campaigns.filter((c) => c.estado === "Finalizada").length,
    upcoming: campaigns.filter((c) => c.estado === "Borrador").length,
    totalBudget: campaigns.reduce((sum, c) => sum + (c.presupuesto || 0), 0),
    totalParticipants: campaigns.reduce(
      (sum, c) => sum + (c.participantes || 0),
      0
    ),
    totalIdeas: campaigns.reduce((sum, c) => sum + (c.ideasRecibidas || 0), 0),
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-text-100">🚀 Campañas</h1>
          <p className="text-text-200 mt-1">
            Descubre campañas de innovación y crea tus ideas
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              showFilters
                ? "bg-accent-100 text-white border border-accent-100"
                : "border border-bg-300 text-text-100 hover:bg-bg-100"
            }`}
          >
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </button>
        </div>
      </div>

      {/* Barra de búsqueda */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-sm border border-bg-300 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-200" />
            <input
              type="text"
              placeholder="Buscar campañas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-bg-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-100"
            />
          </div>
        </div>
      )}

      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-bg-300 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-text-200">
                Total Campañas
              </p>
              <p className="text-2xl font-bold text-text-100">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-bg-300 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-text-200">Activas</p>
              <p className="text-2xl font-bold text-text-100">{stats.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-bg-300 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-text-200">Participantes</p>
              <p className="text-2xl font-bold text-text-100">
                {stats.totalParticipants}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-bg-300 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-text-200">Ideas Totales</p>
              <p className="text-2xl font-bold text-text-100">
                {stats.totalIdeas}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de campañas */}
      <div className="bg-white rounded-lg shadow-sm border border-bg-300">
        <div className="px-6 py-4 border-b border-bg-300">
          <h2 className="text-lg font-semibold text-text-100">
            Campañas ({filteredCampaigns.length})
          </h2>
        </div>

        <div className="p-6">
          {filteredCampaigns.length === 0 ? (
            <div className="text-center py-12">
              <Target className="h-16 w-16 text-text-200 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-100 mb-2">
                {searchTerm
                  ? "No se encontraron campañas"
                  : "No hay campañas aún"}
              </h3>
              <p className="text-text-200 mb-6">
                {searchTerm
                  ? "Intenta ajustar tu búsqueda"
                  : "Crea la primera campaña de innovación"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="border border-bg-300 rounded-lg p-6 hover:shadow-md transition-all duration-200 hover:border-accent-100 cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-text-100">
                          {campaign.titulo}
                        </h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-bg-200 text-text-200">
                          {campaign.categoria}
                        </span>
                      </div>
                      <p className="text-text-200 mb-3">
                        {campaign.descripcion}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        campaign.estado
                      )} ml-4 whitespace-nowrap flex items-center space-x-1`}
                    >
                      {getStatusIcon(campaign.estado)}
                      <span>{campaign.estado}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-text-200" />
                      <span className="text-sm text-text-200">
                        {campaign.participantes || 0} participantes
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4 text-text-200" />
                      <span className="text-sm text-text-200">
                        {campaign.ideasRecibidas || 0} ideas
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-text-200 pt-3 border-t border-bg-200 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(campaign.fechaInicio).toLocaleDateString(
                          "es-ES"
                        )}{" "}
                        -{" "}
                        {new Date(campaign.fechaFin).toLocaleDateString(
                          "es-ES"
                        )}
                      </span>
                    </div>
                    <div className="font-medium text-accent-100">
                      ${(campaign.presupuesto || 0).toLocaleString()}
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCampaign(campaign);
                        setShowCreateIdea(true);
                      }}
                      className="flex-1 bg-accent-100 text-white px-4 py-2 rounded-lg hover:bg-accent-200 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Lightbulb className="h-4 w-4" />
                      <span>Crear Idea</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCampaign(campaign);
                      }}
                      className="px-4 py-2 border border-bg-300 text-text-100 rounded-lg hover:bg-bg-100 transition-colors flex items-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Ver Detalles</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal para crear idea */}
      {showCreateIdea && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-bg-200">
              <div>
                <h2 className="text-xl font-semibold text-text-100">
                  Crear Nueva Idea
                </h2>
                <p className="text-sm text-text-200 mt-1">
                  Para la campaña: {selectedCampaign.titulo}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowCreateIdea(false);
                  setSelectedCampaign(null);
                }}
                className="text-text-200 hover:text-text-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-100 mb-1">
                  Título de la idea
                </label>
                <input
                  type="text"
                  name="titulo"
                  value={ideaForm.titulo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-transparent"
                  placeholder="Ej: Sistema de reciclaje inteligente"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-100 mb-1">
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  value={ideaForm.descripcion}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-transparent"
                  placeholder="Describe tu idea y cómo resuelve el problema planteado..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-100 mb-1">
                  Beneficios esperados
                </label>
                <textarea
                  name="beneficios"
                  value={ideaForm.beneficios}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-transparent"
                  placeholder="¿Qué beneficios traería implementar esta idea?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-100 mb-1">
                  Plan de implementación
                </label>
                <textarea
                  name="implementacion"
                  value={ideaForm.implementacion}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-transparent"
                  placeholder="¿Cómo se podría implementar esta idea?"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-bg-200">
              <button
                onClick={() => {
                  setShowCreateIdea(false);
                  setSelectedCampaign(null);
                }}
                className="px-4 py-2 text-text-200 hover:text-text-100 border border-bg-300 rounded-lg hover:bg-bg-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateIdea}
                className="bg-accent-100 text-white px-6 py-2 rounded-lg hover:bg-accent-200 transition-colors flex items-center space-x-2"
              >
                <Lightbulb className="w-4 h-4" />
                <span>Crear Idea</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para ver detalles de la campaña */}
      {selectedCampaign && !showCreateIdea && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-bg-200">
              <div>
                <h2 className="text-2xl font-semibold text-text-100">
                  {selectedCampaign.titulo}
                </h2>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(
                    selectedCampaign.estado
                  )}`}
                >
                  {getStatusIcon(selectedCampaign.estado)}
                  <span className="ml-1">{selectedCampaign.estado}</span>
                </span>
              </div>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="text-text-200 hover:text-text-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-100 mb-3">
                  Descripción
                </h3>
                <p className="text-text-200">{selectedCampaign.descripcion}</p>
              </div>

              {selectedCampaign.objetivo && (
                <div>
                  <h3 className="text-lg font-semibold text-text-100 mb-3">
                    Objetivo
                  </h3>
                  <p className="text-text-200">{selectedCampaign.objetivo}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-text-100 mb-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Duración
                    </h4>
                    <p className="text-text-200">
                      Del{" "}
                      {new Date(
                        selectedCampaign.fechaInicio
                      ).toLocaleDateString("es-ES")}{" "}
                      al{" "}
                      {new Date(selectedCampaign.fechaFin).toLocaleDateString(
                        "es-ES"
                      )}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-text-100 mb-2 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Responsable
                    </h4>
                    <p className="text-text-200">
                      {selectedCampaign.responsable}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-text-100 mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Ubicación
                    </h4>
                    <p className="text-text-200">
                      {selectedCampaign.planta || "Todas las plantas"} •{" "}
                      {selectedCampaign.area || "Todas las áreas"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-text-100 mb-2 flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      Categoría
                    </h4>
                    <span className="inline-block px-3 py-1 bg-bg-200 text-text-200 rounded-full text-sm">
                      {selectedCampaign.categoria}
                    </span>
                  </div>

                  {selectedCampaign.presupuesto && (
                    <div>
                      <h4 className="font-medium text-text-100 mb-2 flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Presupuesto
                      </h4>
                      <p className="text-text-200 font-semibold">
                        ${selectedCampaign.presupuesto.toLocaleString()}
                      </p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium text-text-100 mb-2">
                      Estadísticas
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-text-200">Participantes:</span>
                        <span className="font-medium">
                          {selectedCampaign.participantes || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-200">Ideas recibidas:</span>
                        <span className="font-medium">
                          {selectedCampaign.ideasRecibidas || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-200">Ideas aprobadas:</span>
                        <span className="font-medium">
                          {selectedCampaign.ideasAprobadas || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-bg-200">
              <button
                onClick={() => setSelectedCampaign(null)}
                className="px-4 py-2 text-text-200 hover:text-text-100 border border-bg-300 rounded-lg hover:bg-bg-100 transition-colors"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  setShowCreateIdea(true);
                }}
                className="bg-accent-100 text-white px-6 py-2 rounded-lg hover:bg-accent-200 transition-colors flex items-center space-x-2"
              >
                <Lightbulb className="w-4 h-4" />
                <span>Crear Idea para esta Campaña</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Campanas;
