import React, { useState } from "react";
import {
  Plus,
  Users,
  Target,
  Calendar,
  Clock,
  Edit,
  Trash2,
  Save,
  X,
  BarChart3,
  Filter,
  Search,
  Vote,
  ThumbsUp,
  ThumbsDown,
  Eye,
  User,
  Building,
  MessageSquare,
  CheckCircle,
  XCircle,
  FileText,
} from "lucide-react";
import { useCampaigns } from "../contexts/CampaignsContext";
import { useIdeas } from "../contexts/IdeasContext";
import { useAuth } from "../contexts/AuthContext";
import { useEncuestas } from "../contexts/EncuestasContext";
import KanbanBoard from "../components/KanbanBoard";

const Gestion: React.FC = () => {
  const { campaigns, addCampaign, updateCampaign, deleteCampaign } =
    useCampaigns();
  const { ideas, moveIdea } = useIdeas();
  const { user } = useAuth();
  const { encuestas, addEncuesta, deleteEncuesta } = useEncuestas();

  const [activeTab, setActiveTab] = useState<
    "kanban" | "campanas" | "votacion" | "encuestas"
  >("campanas");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showCreateSurveyForm, setShowCreateSurveyForm] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<any>(null);
  const [editingCampaign, setEditingCampaign] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Estados para funcionalidad de Votación
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [voteType, setVoteType] = useState<"approve" | "reject" | null>(null);
  const [comentario, setComentario] = useState("");

  // Estados para formulario de encuestas
  const [surveyFormData, setSurveyFormData] = useState({
    titulo: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    activa: true,
  });

  // Estados para constructor de preguntas
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    texto: "",
    tipo: "text" as "text" | "multiple_choice" | "rating" | "yes_no",
    requerida: false,
    opciones: [] as { texto: string; valor: string }[],
  });
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<
    number | null
  >(null);

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    objetivo: "",
    fechaInicio: "",
    fechaFin: "",
    planta: "",
    area: "",
    presupuesto: "",
    categoria: "",
    responsable: "",
    prioridad: "Media" as "Alta" | "Media" | "Baja",
  });

  const resetForm = () => {
    setFormData({
      titulo: "",
      descripcion: "",
      objetivo: "",
      fechaInicio: "",
      fechaFin: "",
      planta: "",
      area: "",
      presupuesto: "",
      categoria: "",
      responsable: "",
      prioridad: "Media",
    });
    setEditingCampaign(null);
  };

  // Funciones para manejo de preguntas de encuestas
  const addQuestion = () => {
    if (!currentQuestion.texto.trim()) return;

    const newQuestion = {
      id: `q_${Date.now()}`,
      texto: currentQuestion.texto,
      tipo: currentQuestion.tipo,
      requerida: currentQuestion.requerida,
      orden: questions.length + 1,
      ...(currentQuestion.tipo === "multiple_choice" && {
        opciones: currentQuestion.opciones.map((opt, idx) => ({
          id: `opt_${Date.now()}_${idx}`,
          texto: opt.texto,
          valor: opt.valor || opt.texto.toLowerCase().replace(/\s+/g, "_"),
        })),
      }),
    };

    if (editingQuestionIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[editingQuestionIndex] = newQuestion;
      setQuestions(updatedQuestions);
      setEditingQuestionIndex(null);
    } else {
      setQuestions([...questions, newQuestion]);
    }

    resetQuestionForm();
  };

  const resetQuestionForm = () => {
    setCurrentQuestion({
      texto: "",
      tipo: "text",
      requerida: false,
      opciones: [],
    });
    setShowQuestionForm(false);
  };

  const editQuestion = (index: number) => {
    const question = questions[index];
    setCurrentQuestion({
      texto: question.texto,
      tipo: question.tipo,
      requerida: question.requerida,
      opciones: question.opciones || [],
    });
    setEditingQuestionIndex(index);
    setShowQuestionForm(true);
  };

  const deleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const addOption = () => {
    setCurrentQuestion({
      ...currentQuestion,
      opciones: [...currentQuestion.opciones, { texto: "", valor: "" }],
    });
  };

  const updateOption = (
    index: number,
    field: "texto" | "valor",
    value: string
  ) => {
    const updatedOpciones = [...currentQuestion.opciones];
    updatedOpciones[index] = { ...updatedOpciones[index], [field]: value };
    setCurrentQuestion({ ...currentQuestion, opciones: updatedOpciones });
  };

  const removeOption = (index: number) => {
    setCurrentQuestion({
      ...currentQuestion,
      opciones: currentQuestion.opciones.filter((_, i) => i !== index),
    });
  };

  const handleCreateCampaign = () => {
    if (!formData.titulo || !formData.descripcion) return;

    const campaignData = {
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      objetivo: formData.objetivo,
      fechaInicio: formData.fechaInicio,
      fechaFin: formData.fechaFin,
      estado: "Borrador" as const,
      prioridad: formData.prioridad,
      categoria: formData.categoria || "General",
      planta: formData.planta || "Todas las plantas",
      area: formData.area || "General",
      responsable: formData.responsable || "Usuario Actual",
      presupuesto: formData.presupuesto
        ? parseInt(formData.presupuesto)
        : undefined,
    };

    addCampaign(campaignData);
    setShowCreateForm(false);
    resetForm();
  };

  const handleEditCampaign = (campaign: any) => {
    setEditingCampaign(campaign);
    setFormData({
      titulo: campaign.titulo,
      descripcion: campaign.descripcion,
      objetivo: campaign.objetivo || "",
      fechaInicio: campaign.fechaInicio,
      fechaFin: campaign.fechaFin,
      planta: campaign.planta || "",
      area: campaign.area || "",
      presupuesto: campaign.presupuesto?.toString() || "",
      categoria: campaign.categoria,
      responsable: campaign.responsable,
      prioridad: campaign.prioridad,
    });
    setShowCreateForm(true);
  };

  const handleUpdateCampaign = () => {
    if (!editingCampaign || !formData.titulo || !formData.descripcion) return;

    const updates = {
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      objetivo: formData.objetivo,
      fechaInicio: formData.fechaInicio,
      fechaFin: formData.fechaFin,
      presupuesto: formData.presupuesto
        ? parseInt(formData.presupuesto)
        : undefined,
      categoria: formData.categoria || "General",
      planta: formData.planta || "Todas las plantas",
      area: formData.area || "General",
      responsable: formData.responsable,
      prioridad: formData.prioridad,
    };

    updateCampaign(editingCampaign.id, updates);
    setShowCreateForm(false);
    setEditingCampaign(null);
    resetForm();
  };

  const handleDeleteCampaign = (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta campaña?")) {
      deleteCampaign(id);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Funciones para la funcionalidad de Votación
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

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Activa":
        return "bg-green-100 text-green-800";
      case "Borrador":
        return "bg-yellow-100 text-yellow-800";
      case "En Revisión":
        return "bg-blue-100 text-blue-800";
      case "Finalizada":
        return "bg-gray-100 text-gray-800";
      case "Pausada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-text-100">⚙️ Gestión</h1>
          <p className="text-text-200 mt-1">
            Panel de administración para responsables y coordinadores
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-bg-200 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("campanas")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "campanas"
              ? "bg-white text-text-100 shadow-sm"
              : "text-text-200 hover:text-text-100"
          }`}
        >
          <Target className="w-4 h-4 inline mr-2" />
          Campañas
        </button>
        <button
          onClick={() => setActiveTab("kanban")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "kanban"
              ? "bg-white text-text-100 shadow-sm"
              : "text-text-200 hover:text-text-100"
          }`}
        >
          <BarChart3 className="w-4 h-4 inline mr-2" />
          Kanban
        </button>
        {user?.role === "CoDir" && (
          <button
            onClick={() => setActiveTab("votacion")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "votacion"
                ? "bg-white text-text-100 shadow-sm"
                : "text-text-200 hover:text-text-100"
            }`}
          >
            <Vote className="w-4 h-4 inline mr-2" />
            Votación
          </button>
        )}
        {(user?.role === "Responsable" || user?.role === "CoDir") && (
          <button
            onClick={() => setActiveTab("encuestas")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "encuestas"
                ? "bg-white text-text-100 shadow-sm"
                : "text-text-200 hover:text-text-100"
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Encuestas
          </button>
        )}
      </div>

      {/* Gestión de Campañas */}
      {activeTab === "campanas" && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-text-100">
                Gestión de Campañas
              </h2>
              <p className="text-text-200 mt-1">
                Crear y administrar campañas de innovación
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center space-x-2 bg-accent-100 hover:bg-accent-200 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Campaña</span>
            </button>
          </div>

          {/* Filtros y búsqueda */}
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-200 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar campañas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-bg-300 rounded-lg hover:bg-bg-100 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </button>
          </div>

          {/* Lista de campañas */}
          <div className="grid gap-6">
            {filteredCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white rounded-lg border border-bg-300 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-text-100">
                        {campaign.titulo}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          campaign.estado
                        )}`}
                      >
                        {campaign.estado}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-bg-200 text-text-200">
                        {campaign.categoria}
                      </span>
                    </div>
                    <p className="text-text-200 mb-4">{campaign.descripcion}</p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEditCampaign(campaign)}
                      className="p-2 text-text-200 hover:text-accent-100 hover:bg-bg-100 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCampaign(campaign.id)}
                      className="p-2 text-text-200 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-text-200" />
                    <span className="text-text-200">
                      {new Date(campaign.fechaInicio).toLocaleDateString(
                        "es-ES"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-text-200" />
                    <span className="text-text-200">
                      {new Date(campaign.fechaFin).toLocaleDateString("es-ES")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-text-200" />
                    <span className="text-text-200">
                      Por: {campaign.responsable}
                    </span>
                  </div>
                  {campaign.presupuesto && (
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-text-200" />
                      <span className="text-text-200">
                        Presupuesto: ${campaign.presupuesto.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-bg-200">
                  <div className="flex items-center space-x-4 text-sm text-text-200">
                    <span>{campaign.participantes || 0} participantes</span>
                    <span>{campaign.ideasRecibidas || 0} ideas recibidas</span>
                    <span>{campaign.ideasAprobadas || 0} ideas aprobadas</span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      campaign.prioridad === "Alta"
                        ? "bg-red-100 text-red-800"
                        : campaign.prioridad === "Media"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    Prioridad {campaign.prioridad}
                  </span>
                </div>
              </div>
            ))}

            {filteredCampaigns.length === 0 && (
              <div className="text-center py-12">
                <Target className="w-12 h-12 text-text-200 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-100 mb-2">
                  No hay campañas
                </h3>
                <p className="text-text-200 mb-4">
                  {searchTerm
                    ? "No se encontraron campañas con ese término"
                    : "Crea tu primera campaña para empezar"}
                </p>
                {!searchTerm && (
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-accent-100 text-white px-6 py-2 rounded-lg hover:bg-accent-200 transition-colors"
                  >
                    Crear Campaña
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Kanban View */}
      {activeTab === "kanban" && (
        <div className="space-y-6">
          <KanbanBoard />
        </div>
      )}

      {/* Votación View */}
      {activeTab === "votacion" && (
        <div className="space-y-6">
          {/* Header de Votación */}
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
        </div>
      )}

      {/* Modal de creación/edición */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-bg-200">
              <h2 className="text-xl font-semibold text-text-100">
                {editingCampaign ? "Editar Campaña" : "Crear Nueva Campaña"}
              </h2>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  resetForm();
                }}
                className="text-text-200 hover:text-text-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-100 mb-1">
                  Título de la campaña
                </label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-transparent"
                  placeholder="Ej: Innovación en Sostenibilidad"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-100 mb-1">
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-transparent"
                  placeholder="Describe el propósito y alcance de la campaña..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-100 mb-1">
                  Objetivo
                </label>
                <input
                  type="text"
                  name="objetivo"
                  value={formData.objetivo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-transparent"
                  placeholder="Ej: Reducir el consumo energético en un 15%"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-100 mb-1">
                    Fecha de inicio
                  </label>
                  <input
                    type="date"
                    name="fechaInicio"
                    value={formData.fechaInicio}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-100 mb-1">
                    Fecha de fin
                  </label>
                  <input
                    type="date"
                    name="fechaFin"
                    value={formData.fechaFin}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-100 mb-1">
                    Categoría
                  </label>
                  <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-transparent"
                  >
                    <option value="">Seleccionar categoría</option>
                    <option value="Sostenibilidad">Sostenibilidad</option>
                    <option value="Eficiencia">Eficiencia</option>
                    <option value="Seguridad">Seguridad</option>
                    <option value="Tecnología">Tecnología</option>
                    <option value="Calidad">Calidad</option>
                    <option value="Innovación">Innovación</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-100 mb-1">
                    Prioridad
                  </label>
                  <select
                    name="prioridad"
                    value={formData.prioridad}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-transparent"
                  >
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-100 mb-1">
                    Planta
                  </label>
                  <input
                    type="text"
                    name="planta"
                    value={formData.planta}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-transparent"
                    placeholder="Ej: Planta Norte"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-100 mb-1">
                    Área
                  </label>
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-transparent"
                    placeholder="Ej: Operaciones"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-100 mb-1">
                    Responsable
                  </label>
                  <input
                    type="text"
                    name="responsable"
                    value={formData.responsable}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-transparent"
                    placeholder="Nombre del responsable"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-100 mb-1">
                    Presupuesto (opcional)
                  </label>
                  <input
                    type="number"
                    name="presupuesto"
                    value={formData.presupuesto}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-bg-200">
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  resetForm();
                }}
                className="px-4 py-2 text-text-200 hover:text-text-100 border border-bg-300 rounded-lg hover:bg-bg-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={
                  editingCampaign ? handleUpdateCampaign : handleCreateCampaign
                }
                className="bg-accent-100 text-white px-6 py-2 rounded-lg hover:bg-accent-200 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>
                  {editingCampaign ? "Guardar Cambios" : "Crear Campaña"}
                </span>
              </button>
            </div>
          </div>
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
                  <X className="w-5 h-5 text-text-300" />
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

      {/* Gestión de Encuestas */}
      {activeTab === "encuestas" && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-text-100">
                Gestión de Encuestas
              </h2>
              <p className="text-text-200 mt-1">
                Crear y administrar encuestas para el equipo
              </p>
            </div>
            <button
              onClick={() => setShowCreateSurveyForm(true)}
              className="flex items-center space-x-2 bg-accent-100 hover:bg-accent-200 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Encuesta</span>
            </button>
          </div>

          {/* Lista de encuestas */}
          <div className="grid gap-6">
            {encuestas.map((encuesta) => (
              <div
                key={encuesta.id}
                className="bg-white rounded-lg border border-bg-300 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-text-100 mb-2">
                      {encuesta.titulo}
                    </h3>
                    <p className="text-text-200 mb-3">{encuesta.descripcion}</p>
                    <div className="flex items-center space-x-4 text-sm text-text-200">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Inicio:{" "}
                          {new Date(encuesta.fechaInicio).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Fin:{" "}
                          {new Date(encuesta.fechaFin).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{encuesta.preguntas.length} preguntas</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        encuesta.activa
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {encuesta.activa ? "Activa" : "Inactiva"}
                    </span>
                    <button
                      onClick={() => setSelectedSurvey(encuesta)}
                      className="p-2 text-text-200 hover:text-accent-100 hover:bg-bg-100 rounded-lg transition-colors"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "¿Estás seguro de que quieres eliminar esta encuesta?"
                          )
                        ) {
                          deleteEncuesta(encuesta.id);
                        }
                      }}
                      className="p-2 text-text-200 hover:text-red-500 hover:bg-bg-100 rounded-lg transition-colors"
                      title="Eliminar encuesta"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {encuestas.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-text-200 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-100 mb-2">
                No hay encuestas
              </h3>
              <p className="text-text-200 mb-4">
                Crea tu primera encuesta para comenzar a recopilar feedback del
                equipo
              </p>
              <button
                onClick={() => setShowCreateSurveyForm(true)}
                className="bg-accent-100 hover:bg-accent-200 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Crear Primera Encuesta
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal de creación de encuesta */}
      {showCreateSurveyForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-bg-300 p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-text-100">
                  Constructor de Encuestas
                </h3>
                <button
                  onClick={() => {
                    setShowCreateSurveyForm(false);
                    setSurveyFormData({
                      titulo: "",
                      descripcion: "",
                      fechaInicio: "",
                      fechaFin: "",
                      activa: true,
                    });
                    setQuestions([]);
                    resetQuestionForm();
                  }}
                  className="text-text-200 hover:text-text-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Información básica de la encuesta */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-text-100">
                  Información Básica
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-100 mb-1">
                      Título *
                    </label>
                    <input
                      type="text"
                      value={surveyFormData.titulo}
                      onChange={(e) =>
                        setSurveyFormData({
                          ...surveyFormData,
                          titulo: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-transparent"
                      placeholder="Título de la encuesta"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-100 mb-1">
                      Estado
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="activa"
                        checked={surveyFormData.activa}
                        onChange={(e) =>
                          setSurveyFormData({
                            ...surveyFormData,
                            activa: e.target.checked,
                          })
                        }
                        className="w-4 h-4 text-accent-100 border-bg-300 rounded focus:ring-accent-100"
                      />
                      <label
                        htmlFor="activa"
                        className="ml-2 text-sm text-text-100"
                      >
                        Activar encuesta inmediatamente
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-100 mb-1">
                    Descripción *
                  </label>
                  <textarea
                    value={surveyFormData.descripcion}
                    onChange={(e) =>
                      setSurveyFormData({
                        ...surveyFormData,
                        descripcion: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-transparent"
                    placeholder="Descripción de la encuesta"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-100 mb-1">
                      Fecha de inicio
                    </label>
                    <input
                      type="date"
                      value={
                        surveyFormData.fechaInicio
                          ? surveyFormData.fechaInicio.split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        setSurveyFormData({
                          ...surveyFormData,
                          fechaInicio: e.target.value
                            ? new Date(e.target.value).toISOString()
                            : "",
                        })
                      }
                      className="w-full px-3 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-100 mb-1">
                      Fecha de fin
                    </label>
                    <input
                      type="date"
                      value={
                        surveyFormData.fechaFin
                          ? surveyFormData.fechaFin.split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        setSurveyFormData({
                          ...surveyFormData,
                          fechaFin: e.target.value
                            ? new Date(e.target.value).toISOString()
                            : "",
                        })
                      }
                      className="w-full px-3 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Constructor de preguntas */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-medium text-text-100">
                    Preguntas ({questions.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowQuestionForm(true)}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar Pregunta</span>
                  </button>
                </div>

                {/* Lista de preguntas */}
                {questions.length > 0 && (
                  <div className="space-y-3">
                    {questions.map((question, index) => (
                      <div
                        key={question.id}
                        className="bg-bg-100 rounded-lg p-4 border border-bg-300"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="bg-accent-100 text-white text-xs px-2 py-1 rounded">
                                {index + 1}
                              </span>
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                {question.tipo === "text" && "Texto libre"}
                                {question.tipo === "multiple_choice" &&
                                  "Opción múltiple"}
                                {question.tipo === "rating" && "Calificación"}
                                {question.tipo === "yes_no" && "Sí/No"}
                              </span>
                              {question.requerida && (
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                                  Requerida
                                </span>
                              )}
                            </div>
                            <p className="text-text-100 font-medium">
                              {question.texto}
                            </p>
                            {question.opciones &&
                              question.opciones.length > 0 && (
                                <div className="mt-2 text-sm text-text-200">
                                  Opciones:{" "}
                                  {question.opciones
                                    .map((opt: any) => opt.texto)
                                    .join(", ")}
                                </div>
                              )}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => editQuestion(index)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteQuestion(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Formulario de agregar/editar pregunta */}
                {showQuestionForm && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h5 className="font-medium text-text-100 mb-3">
                      {editingQuestionIndex !== null
                        ? "Editar Pregunta"
                        : "Nueva Pregunta"}
                    </h5>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-text-100 mb-1">
                          Pregunta *
                        </label>
                        <input
                          type="text"
                          value={currentQuestion.texto}
                          onChange={(e) =>
                            setCurrentQuestion({
                              ...currentQuestion,
                              texto: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100"
                          placeholder="Escribe tu pregunta aquí..."
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-text-100 mb-1">
                            Tipo de pregunta
                          </label>
                          <select
                            value={currentQuestion.tipo}
                            onChange={(e) =>
                              setCurrentQuestion({
                                ...currentQuestion,
                                tipo: e.target.value as any,
                                opciones:
                                  e.target.value === "multiple_choice"
                                    ? currentQuestion.opciones
                                    : [],
                              })
                            }
                            className="w-full px-3 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100"
                          >
                            <option value="text">Texto libre</option>
                            <option value="multiple_choice">
                              Opción múltiple
                            </option>
                            <option value="rating">
                              Calificación (1-5 estrellas)
                            </option>
                            <option value="yes_no">Sí/No</option>
                          </select>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="requerida"
                            checked={currentQuestion.requerida}
                            onChange={(e) =>
                              setCurrentQuestion({
                                ...currentQuestion,
                                requerida: e.target.checked,
                              })
                            }
                            className="w-4 h-4 text-accent-100 border-bg-300 rounded focus:ring-accent-100"
                          />
                          <label
                            htmlFor="requerida"
                            className="ml-2 text-sm text-text-100"
                          >
                            Pregunta requerida
                          </label>
                        </div>
                      </div>

                      {/* Opciones para preguntas de opción múltiple */}
                      {currentQuestion.tipo === "multiple_choice" && (
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-text-100">
                              Opciones
                            </label>
                            <button
                              type="button"
                              onClick={addOption}
                              className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                            >
                              + Agregar opción
                            </button>
                          </div>
                          <div className="space-y-2">
                            {currentQuestion.opciones.map((option, idx) => (
                              <div key={idx} className="flex space-x-2">
                                <input
                                  type="text"
                                  value={option.texto}
                                  onChange={(e) =>
                                    updateOption(idx, "texto", e.target.value)
                                  }
                                  className="flex-1 px-3 py-2 border border-bg-300 rounded-lg focus:ring-2 focus:ring-accent-100"
                                  placeholder={`Opción ${idx + 1}`}
                                />
                                <button
                                  type="button"
                                  onClick={() => removeOption(idx)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-3">
                        <button
                          type="button"
                          onClick={resetQuestionForm}
                          className="flex-1 px-4 py-2 text-text-200 border border-bg-300 rounded-lg hover:bg-bg-100 transition-colors"
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          onClick={addQuestion}
                          className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                        >
                          {editingQuestionIndex !== null
                            ? "Actualizar Pregunta"
                            : "Agregar Pregunta"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Botones finales */}
              <div className="flex space-x-3 pt-6 border-t border-bg-300">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateSurveyForm(false);
                    setSurveyFormData({
                      titulo: "",
                      descripcion: "",
                      fechaInicio: "",
                      fechaFin: "",
                      activa: true,
                    });
                    setQuestions([]);
                    resetQuestionForm();
                  }}
                  className="flex-1 px-4 py-2 text-text-200 border border-bg-300 rounded-lg hover:bg-bg-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    if (
                      surveyFormData.titulo &&
                      surveyFormData.descripcion &&
                      questions.length > 0
                    ) {
                      addEncuesta({
                        titulo: surveyFormData.titulo,
                        descripcion: surveyFormData.descripcion,
                        fechaInicio:
                          surveyFormData.fechaInicio ||
                          new Date().toISOString(),
                        fechaFin:
                          surveyFormData.fechaFin ||
                          new Date(
                            Date.now() + 30 * 24 * 60 * 60 * 1000
                          ).toISOString(),
                        activa: surveyFormData.activa,
                        preguntas: questions,
                        creadorId: user?.id?.toString() || "1",
                        creador: user?.name || "Usuario",
                      });
                      setShowCreateSurveyForm(false);
                      setSurveyFormData({
                        titulo: "",
                        descripcion: "",
                        fechaInicio: "",
                        fechaFin: "",
                        activa: true,
                      });
                      setQuestions([]);
                      resetQuestionForm();
                    }
                  }}
                  disabled={
                    !surveyFormData.titulo ||
                    !surveyFormData.descripcion ||
                    questions.length === 0
                  }
                  className="flex-1 px-4 py-2 bg-accent-100 hover:bg-accent-200 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  Crear Encuesta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de visualización de encuesta */}
      {selectedSurvey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-bg-300 p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-text-100">
                  {selectedSurvey.titulo}
                </h3>
                <button
                  onClick={() => setSelectedSurvey(null)}
                  className="text-text-200 hover:text-text-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Información básica */}
              <div>
                <h4 className="text-lg font-medium text-text-100 mb-3">
                  Información General
                </h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Descripción:</span>{" "}
                    {selectedSurvey.descripcion}
                  </p>
                  <p>
                    <span className="font-medium">Creador:</span>{" "}
                    {selectedSurvey.creador}
                  </p>
                  <p>
                    <span className="font-medium">Fecha de inicio:</span>{" "}
                    {new Date(selectedSurvey.fechaInicio).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Fecha de fin:</span>{" "}
                    {new Date(selectedSurvey.fechaFin).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Estado:</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded text-xs ${
                        selectedSurvey.activa
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {selectedSurvey.activa ? "Activa" : "Inactiva"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Preguntas */}
              <div>
                <h4 className="text-lg font-medium text-text-100 mb-3">
                  Preguntas ({selectedSurvey.preguntas.length})
                </h4>
                <div className="space-y-4">
                  {selectedSurvey.preguntas.map(
                    (pregunta: any, index: number) => (
                      <div
                        key={pregunta.id}
                        className="bg-bg-100 rounded-lg p-4 border border-bg-300"
                      >
                        <div className="flex items-start space-x-3">
                          <span className="bg-accent-100 text-white text-xs px-2 py-1 rounded font-medium">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm font-medium text-text-100">
                                {pregunta.texto}
                              </span>
                              {pregunta.requerida && (
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                                  Requerida
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-text-200 mb-2">
                              Tipo:{" "}
                              {pregunta.tipo === "text"
                                ? "Texto libre"
                                : pregunta.tipo === "multiple_choice"
                                ? "Opción múltiple"
                                : pregunta.tipo === "rating"
                                ? "Calificación (1-5 estrellas)"
                                : pregunta.tipo === "yes_no"
                                ? "Sí/No"
                                : pregunta.tipo}
                            </div>
                            {pregunta.opciones &&
                              pregunta.opciones.length > 0 && (
                                <div className="text-sm text-text-200">
                                  <span className="font-medium">Opciones:</span>
                                  <ul className="list-disc list-inside ml-4 mt-1">
                                    {pregunta.opciones.map(
                                      (opcion: any, idx: number) => (
                                        <li key={idx}>{opcion.texto}</li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Estadísticas básicas */}
              <div>
                <h4 className="text-lg font-medium text-text-100 mb-3">
                  Estadísticas
                </h4>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedSurvey.preguntas.length}
                      </div>
                      <div className="text-sm text-text-200">Preguntas</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {
                          selectedSurvey.preguntas.filter(
                            (p: any) => p.requerida
                          ).length
                        }
                      </div>
                      <div className="text-sm text-text-200">Requeridas</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {
                          selectedSurvey.preguntas.filter(
                            (p: any) => p.tipo === "multiple_choice"
                          ).length
                        }
                      </div>
                      <div className="text-sm text-text-200">Múltiple</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">
                        {
                          selectedSurvey.preguntas.filter(
                            (p: any) => p.tipo === "rating"
                          ).length
                        }
                      </div>
                      <div className="text-sm text-text-200">Rating</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón de cerrar */}
              <div className="flex justify-end pt-4 border-t border-bg-300">
                <button
                  onClick={() => setSelectedSurvey(null)}
                  className="px-4 py-2 bg-accent-100 hover:bg-accent-200 text-white rounded-lg transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gestion;
