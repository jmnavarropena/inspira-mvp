import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  Users,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Settings,
  Target,
  Send,
  Save,
  File,
} from "lucide-react";
import CrearIdeaModal from "../components/CrearIdeaModal";
import VisualizarIdeaModal from "../components/VisualizarIdeaModal";
import EditarIdeaModal from "../components/EditarIdeaModal";
import DashboardAnalytic from "../components/DashboardAnalytic";
import BadgeSystem from "../components/BadgeSystem";
import BadgeNotification from "../components/BadgeNotification";
import { useBadgeNotifications } from "../hooks/useBadgeNotifications";
import { useIdeaNotifications } from "../contexts/NotificationContext";

// Tipos de datos
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

interface Borrador {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  planta: string;
  fechaCreacion: string;
  fechaModificacion: string;
  archivos: any[];
}

// Datos de ejemplo con plantas y categorías reales de CL Grupo Industrial
const ideasEjemplo: Idea[] = [
  {
    id: 1,
    titulo: "Optimización del sistema de climatización en producción",
    descripcion:
      "Propuesta para mejorar la eficiencia energética del sistema de climatización mediante sensores inteligentes y control automático de temperatura.",
    categoria: "Eficiencia Energética",
    estado: "Aprobada",
    planta: "CLGI",
    fechaCreacion: "2024-08-28",
    votos: 23,
    comentarios: 8,
    impactoEstimado: "Alto",
    ahorroPotencial: "€15,000/año",
  },
  {
    id: 2,
    titulo: "Implementación de sistema ERP integrado",
    descripcion:
      "Unificar los sistemas de gestión empresarial para mejorar la trazabilidad y reducir errores administrativos entre plantas.",
    categoria: "ERP",
    estado: "Progreso",
    planta: "Centro de Servicios",
    fechaCreacion: "2024-08-25",
    votos: 18,
    comentarios: 12,
    impactoEstimado: "Alto",
    ahorroPotencial: "€25,000/año",
  },
  {
    id: 3,
    titulo: "Mejora de protocolos de seguridad en Galvacolor",
    descripcion:
      "Revisar y actualizar los protocolos de seguridad industrial para cumplir con las nuevas normativas europeas de PRL.",
    categoria: "Seguridad-PRL",
    estado: "Revision",
    planta: "Galvacolor",
    fechaCreacion: "2024-08-22",
    votos: 15,
    comentarios: 6,
    impactoEstimado: "Alto",
    ahorroPotencial: "Cumplimiento normativo",
  },
  {
    id: 4,
    titulo: "Digitalización de procesos comerciales",
    descripcion:
      "Crear una plataforma digital para gestión de clientes y seguimiento de oportunidades comerciales en tiempo real.",
    categoria: "Comercial",
    estado: "CoDir",
    planta: "Industrias Cristian Lay",
    fechaCreacion: "2024-08-20",
    votos: 12,
    comentarios: 4,
    impactoEstimado: "Medio",
    ahorroPotencial: "€12,000/año",
  },
  {
    id: 5,
    titulo: "Optimización de rutas logísticas",
    descripcion:
      "Implementar un sistema de optimización de rutas para reducir costos de transporte y mejorar tiempos de entrega.",
    categoria: "Logística",
    estado: "Implementada",
    planta: "Ondupack Almendralejo",
    fechaCreacion: "2024-08-18",
    votos: 28,
    comentarios: 15,
    impactoEstimado: "Alto",
    ahorroPotencial: "€20,000/año",
  },
];

// Componente para mostrar el estado de la idea
const EstadoBadge: React.FC<{ estado: string }> = ({ estado }) => {
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

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getEstadoColor(
        estado
      )}`}
    >
      {estado}
    </span>
  );
};

// Componente para mostrar el impacto
const ImpactoBadge: React.FC<{ impacto: string }> = ({ impacto }) => {
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
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getImpactoColor(
        impacto
      )}`}
    >
      {impacto} Impacto
    </span>
  );
};

// Componente principal
const MisIdeas: React.FC = () => {
  const { notifyIdeaStateChange } = useIdeaNotifications();

  const [ideas, setIdeas] = useState<Idea[]>(ideasEjemplo);
  const [borradores, setBorradores] = useState<Borrador[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<string>("Todas");
  const [filtroCategoria, setFiltroCategoria] = useState<string>("Todas");
  const [busqueda, setBusqueda] = useState<string>("");
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [vistaActual, setVistaActual] = useState<
    "ideas" | "borradores" | "analytics" | "badges"
  >("ideas");

  // Estados para modales
  const [mostrarVisualizarModal, setMostrarVisualizarModal] =
    useState<boolean>(false);
  const [mostrarEditarModal, setMostrarEditarModal] = useState<boolean>(false);
  const [ideaSeleccionada, setIdeaSeleccionada] = useState<Idea | null>(null);

  // Filtrar ideas
  const ideasFiltradas = ideas.filter((idea) => {
    const matchBusqueda =
      idea.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      idea.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const matchEstado =
      filtroEstado === "Todas" || idea.estado === filtroEstado;
    const matchCategoria =
      filtroCategoria === "Todas" || idea.categoria === filtroCategoria;

    return matchBusqueda && matchEstado && matchCategoria;
  });

  // Filtrar borradores
  const borradoresFiltrados = borradores.filter((borrador) => {
    const matchBusqueda =
      borrador.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      borrador.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const matchCategoria =
      filtroCategoria === "Todas" || borrador.categoria === filtroCategoria;

    return matchBusqueda && matchCategoria;
  });

  // Obtener listas únicas para filtros
  const categorias = [
    "Todas",
    ...Array.from(new Set(ideas.map((idea) => idea.categoria))),
  ];
  const estados = [
    "Todas",
    ...Array.from(new Set(ideas.map((idea) => idea.estado))),
  ];

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleNuevaIdea = (nuevaIdeaData: any, esBorrador: boolean = false) => {
    if (esBorrador) {
      // Guardar como borrador
      const nuevoBorrador: Borrador = {
        id: borradores.length + 1,
        titulo: nuevaIdeaData.titulo,
        descripcion: nuevaIdeaData.descripcion,
        categoria: nuevaIdeaData.categoria,
        planta: nuevaIdeaData.planta,
        fechaCreacion: new Date().toISOString().split("T")[0],
        fechaModificacion: new Date().toISOString().split("T")[0],
        archivos: nuevaIdeaData.archivos || [],
      };

      setBorradores((prev) => [nuevoBorrador, ...prev]);

      // Mostrar mensaje de confirmación
      console.log("💾 Borrador guardado correctamente");
    } else {
      // Enviar como idea oficial
      const nuevaIdea: Idea = {
        id: ideas.length + 1,
        titulo: nuevaIdeaData.titulo,
        descripcion: nuevaIdeaData.descripcion,
        categoria: nuevaIdeaData.categoria,
        estado: "Revision",
        planta: nuevaIdeaData.planta,
        fechaCreacion: new Date().toISOString().split("T")[0],
        votos: 0,
        comentarios: 0,
        impactoEstimado: "Por evaluar",
        ahorroPotencial: "Por evaluar",
        archivos: nuevaIdeaData.archivos || [],
      };

      setIdeas((prev) => [nuevaIdea, ...prev]);

      // Mostrar mensaje de confirmación
      console.log("🚀 Idea enviada para revisión");
    }
  };

  // Función para enviar borrador como idea
  const enviarBorrador = (borrador: Borrador) => {
    const nuevaIdea: Idea = {
      id: ideas.length + 1,
      titulo: borrador.titulo,
      descripcion: borrador.descripcion,
      categoria: borrador.categoria,
      estado: "Revision",
      planta: borrador.planta,
      fechaCreacion: new Date().toISOString().split("T")[0],
      votos: 0,
      comentarios: 0,
      impactoEstimado: "Por evaluar",
      ahorroPotencial: "Por evaluar",
      archivos: borrador.archivos,
    };

    setIdeas((prev) => [nuevaIdea, ...prev]);
    setBorradores((prev) => prev.filter((b) => b.id !== borrador.id));

    console.log("🚀 Borrador enviado como idea para revisión");
  };

  // Función para eliminar borrador
  const eliminarBorrador = (id: number) => {
    setBorradores((prev) => prev.filter((b) => b.id !== id));
    console.log("🗑️ Borrador eliminado");
  };

  // Calcular estadísticas del usuario
  const calcularEstadisticas = () => {
    const totalIdeas = ideas.length;
    const ideasAprobadas = ideas.filter((i) =>
      ["Aprobada", "Progreso", "Implementada"].includes(i.estado)
    ).length;
    const tasaAprobacion =
      totalIdeas > 0 ? Math.round((ideasAprobadas / totalIdeas) * 100) : 0;
    const ideasImplementadas = ideas.filter(
      (i) => i.estado === "Implementada"
    ).length;

    // Simular datos por mes (últimos 6 meses)
    const meses = ["Ago", "Sep", "Oct", "Nov", "Dic", "Ene"];
    const ideasPorMes = meses.map((mes) => ({
      mes,
      cantidad: Math.floor(Math.random() * 4) + (mes === "Dic" ? 2 : 0), // Dic más activo
    }));

    // Calcular puntuación (ideas * 10 + implementadas * 50 + aprobadas * 25)
    const puntuacionTotal =
      totalIdeas * 10 + ideasImplementadas * 50 + ideasAprobadas * 25;

    return {
      totalIdeas,
      ideasPorMes,
      tasaAprobacion,
      ideasImplementadas,
      puntuacionTotal,
      mesActivo: "Diciembre 2024",
    };
  };

  // Hook para notificaciones de badges
  const estadisticas = calcularEstadisticas();
  const { currentNotification, dismissCurrentNotification } =
    useBadgeNotifications(estadisticas);

  // Sistema de permisos por estado
  const puedeEditar = (estado: string) => {
    return ["Abierta", "Revision"].includes(estado);
  };

  const puedeEliminar = (estado: string) => {
    return ["Abierta", "Revision"].includes(estado);
  };

  // Funciones para manejar acciones de ideas
  const visualizarIdea = (idea: Idea) => {
    setIdeaSeleccionada(idea);
    setMostrarVisualizarModal(true);
  };

  const editarIdea = (idea: Idea) => {
    if (!puedeEditar(idea.estado)) {
      alert(
        "No puedes editar esta idea porque ya está siendo procesada por el equipo responsable."
      );
      return;
    }
    setIdeaSeleccionada(idea);
    setMostrarEditarModal(true);
  };

  const guardarEdicionIdea = (ideaEditada: Partial<Idea>) => {
    if (!ideaSeleccionada) return;

    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === ideaSeleccionada.id ? { ...idea, ...ideaEditada } : idea
      )
    );

    console.log("✅ Idea actualizada correctamente");
  };

  const eliminarIdea = (id: number, estado: string) => {
    if (!puedeEliminar(estado)) {
      alert(
        "No puedes eliminar esta idea porque ya está siendo procesada por el equipo responsable."
      );
      return;
    }

    if (
      confirm(
        "¿Estás seguro de que quieres eliminar esta idea? Esta acción no se puede deshacer."
      )
    ) {
      setIdeas((prev) => prev.filter((idea) => idea.id !== id));
      console.log("🗑️ Idea eliminada");
    }
  };

  return (
    <div className="min-h-screen bg-bg-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-text-100 mb-2">Mis Ideas</h1>
            <p className="text-text-200">
              Gestiona y da seguimiento a todas tus propuestas de innovación
            </p>
          </div>
          <button
            onClick={() => setMostrarModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Nueva Idea
          </button>
        </div>

        {/* Pestañas de navegación */}
        <div className="flex items-center gap-6 mb-6 border-b border-bg-300">
          <button
            onClick={() => setVistaActual("ideas")}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              vistaActual === "ideas"
                ? "border-accent-100 text-accent-100"
                : "border-transparent text-text-200 hover:text-text-100 hover:border-bg-400"
            }`}
          >
            Ideas Enviadas
            <span className="ml-2 px-2 py-1 text-xs rounded-full bg-accent-50 text-accent-100">
              {ideas.length}
            </span>
          </button>
          <button
            onClick={() => setVistaActual("borradores")}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              vistaActual === "borradores"
                ? "border-accent-100 text-accent-100"
                : "border-transparent text-text-200 hover:text-text-100 hover:border-bg-400"
            }`}
          >
            Borradores
            <span className="ml-2 px-2 py-1 text-xs rounded-full bg-orange-50 text-orange-600">
              {borradores.length}
            </span>
          </button>
          <button
            onClick={() => setVistaActual("analytics")}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              vistaActual === "analytics"
                ? "border-accent-100 text-accent-100"
                : "border-transparent text-text-200 hover:text-text-100 hover:border-bg-400"
            }`}
          >
            Mi Desempeño
            <span className="ml-2 px-2 py-1 text-xs rounded-full bg-green-50 text-green-600">
              {calcularEstadisticas().puntuacionTotal}
            </span>
          </button>
          <button
            onClick={() => setVistaActual("badges")}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              vistaActual === "badges"
                ? "border-accent-100 text-accent-100"
                : "border-transparent text-text-200 hover:text-text-100 hover:border-bg-400"
            }`}
          >
            Logros
            <span className="ml-2 px-2 py-1 text-xs rounded-full bg-purple-50 text-purple-600">
              🏆
            </span>
          </button>
        </div>

        {vistaActual === "ideas" ? (
          <>
            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg border border-bg-300 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-200">Ideas Totales</p>
                    <p className="text-2xl font-bold text-text-100">
                      {ideas.length}
                    </p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-bg-300 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-200">En Progreso</p>
                    <p className="text-2xl font-bold text-text-100">
                      {
                        ideas.filter((idea) => idea.estado === "Progreso")
                          .length
                      }
                    </p>
                  </div>
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-bg-300 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-200">Implementadas</p>
                    <p className="text-2xl font-bold text-text-100">
                      {
                        ideas.filter((idea) => idea.estado === "Implementada")
                          .length
                      }
                    </p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-bg-300 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-200">Total Votos</p>
                    <p className="text-2xl font-bold text-text-100">
                      {ideas.reduce((sum, idea) => sum + idea.votos, 0)}
                    </p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Filtros y búsqueda */}
            <div className="bg-white rounded-lg border border-bg-300 p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Búsqueda */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-200 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar ideas..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>

                {/* Filtro por categoría */}
                <select
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                  className="input-field"
                >
                  {categorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria === "Todas"
                        ? "Todas las categorías"
                        : categoria}
                    </option>
                  ))}
                </select>

                {/* Filtro por estado */}
                <select
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                  className="input-field"
                >
                  {estados.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado === "Todas" ? "Todos los estados" : estado}
                    </option>
                  ))}
                </select>

                {/* Botón de filtros avanzados */}
                <button className="btn-secondary flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filtros
                </button>
              </div>
            </div>

            {/* Mensaje informativo sobre permisos */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-blue-100 rounded-full">
                  <AlertCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    ℹ️ Sobre la edición de ideas
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Puedes editar o eliminar tus ideas mientras estén en estado{" "}
                    <strong>"Abierta"</strong> o <strong>"Revisión"</strong>.
                    Una vez que el equipo responsable comience a trabajar en
                    ellas, se marcarán como 🔒 <strong>Protegidas</strong> para
                    mantener la integridad del proceso.
                  </p>
                </div>
              </div>
            </div>

            {/* Demo de notificaciones */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-900">
                    🧪 Demo de Notificaciones
                  </p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Simula cambios de estado en tus ideas para ver las
                    notificaciones en acción
                  </p>
                </div>
                <button
                  onClick={() => {
                    const estadosDemo = [
                      "Revision",
                      "CoDir",
                      "Aprobada",
                      "Progreso",
                      "Implementada",
                    ];
                    const estadoAleatorio =
                      estadosDemo[
                        Math.floor(Math.random() * estadosDemo.length)
                      ];
                    const ideaDemo =
                      ideas[Math.floor(Math.random() * ideas.length)];
                    if (ideaDemo) {
                      notifyIdeaStateChange(
                        ideaDemo.titulo,
                        estadoAleatorio,
                        ideaDemo.id
                      );
                    }
                  }}
                  className="btn-secondary text-sm"
                >
                  Simular Cambio de Estado
                </button>
              </div>
            </div>

            {/* Lista de ideas */}
            <div className="space-y-4">
              {ideasFiltradas.length === 0 ? (
                <div className="bg-white rounded-lg border border-bg-300 p-12 text-center">
                  <div className="p-4 bg-bg-200 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Search className="w-8 h-8 text-text-200" />
                  </div>
                  <h3 className="text-lg font-medium text-text-100 mb-2">
                    No se encontraron ideas
                  </h3>
                  <p className="text-text-200">
                    Intenta cambiar los filtros o crear una nueva idea.
                  </p>
                </div>
              ) : (
                ideasFiltradas.map((idea) => (
                  <div
                    key={idea.id}
                    className="bg-white rounded-lg border border-bg-300 p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-text-100">
                            {idea.titulo}
                          </h3>
                          <EstadoBadge estado={idea.estado} />
                          <ImpactoBadge impacto={idea.impactoEstimado} />

                          {/* Indicador de protección */}
                          {!puedeEditar(idea.estado) && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                              🔒 Protegida
                            </span>
                          )}
                        </div>
                        <p className="text-text-200 mb-3 line-clamp-2">
                          {idea.descripcion}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        {/* Botón Ver - Siempre disponible */}
                        <button
                          onClick={() => visualizarIdea(idea)}
                          className="p-2 text-text-200 hover:text-accent-100 hover:bg-bg-100 rounded-lg transition-colors duration-200"
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Botón Editar - Condicional */}
                        <button
                          onClick={() => editarIdea(idea)}
                          disabled={!puedeEditar(idea.estado)}
                          className={`p-2 rounded-lg transition-colors duration-200 ${
                            puedeEditar(idea.estado)
                              ? "text-text-200 hover:text-accent-100 hover:bg-bg-100"
                              : "text-bg-400 cursor-not-allowed bg-bg-200"
                          }`}
                          title={
                            puedeEditar(idea.estado)
                              ? "Editar idea"
                              : "No se puede editar - Ya está en proceso"
                          }
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {/* Botón Eliminar - Condicional */}
                        <button
                          onClick={() => eliminarIdea(idea.id, idea.estado)}
                          disabled={!puedeEliminar(idea.estado)}
                          className={`p-2 rounded-lg transition-colors duration-200 ${
                            puedeEliminar(idea.estado)
                              ? "text-text-200 hover:text-red-600 hover:bg-red-50"
                              : "text-bg-400 cursor-not-allowed bg-bg-200"
                          }`}
                          title={
                            puedeEliminar(idea.estado)
                              ? "Eliminar idea"
                              : "No se puede eliminar - Ya está en proceso"
                          }
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-text-200" />
                        <span className="text-text-200">
                          {formatearFecha(idea.fechaCreacion)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-text-200" />
                        <span className="text-text-200">{idea.planta}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-text-200" />
                        <span className="text-text-200">
                          {idea.votos} votos
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-text-200" />
                        <span className="text-text-200">
                          {idea.ahorroPotencial}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : vistaActual === "analytics" ? (
          <DashboardAnalytic
            estadisticas={calcularEstadisticas()}
            onNavigateToIdeas={() => setVistaActual("ideas")}
          />
        ) : vistaActual === "badges" ? (
          <BadgeSystem estadisticas={calcularEstadisticas()} />
        ) : (
          <>
            {/* Vista de Borradores */}
            <div className="bg-white rounded-lg border border-bg-300 p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <Save className="w-5 h-5 text-orange-600" />
                <div>
                  <h2 className="text-lg font-semibold text-text-100">
                    Borradores
                  </h2>
                  <p className="text-sm text-text-200">
                    Ideas guardadas que aún no has enviado para revisión
                  </p>
                </div>
              </div>

              {/* Búsqueda para borradores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-200 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar borradores..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>

                <select
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                  className="input-field"
                >
                  {categorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria === "Todas"
                        ? "Todas las categorías"
                        : categoria}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Lista de borradores */}
            <div className="space-y-4">
              {borradoresFiltrados.length === 0 ? (
                <div className="bg-white rounded-lg border border-bg-300 p-12 text-center">
                  <div className="p-4 bg-orange-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Save className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-medium text-text-100 mb-2">
                    No tienes borradores
                  </h3>
                  <p className="text-text-200">
                    Cuando guardes una idea como borrador, aparecerá aquí.
                  </p>
                </div>
              ) : (
                borradoresFiltrados.map((borrador) => (
                  <div
                    key={borrador.id}
                    className="bg-white rounded-lg border border-orange-200 p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-text-100">
                            {borrador.titulo}
                          </h3>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                            Borrador
                          </span>
                        </div>
                        <p className="text-text-200 mb-3 line-clamp-2">
                          {borrador.descripcion}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => enviarBorrador(borrador)}
                          className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200"
                          title="Enviar idea"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-text-200 hover:text-accent-100 hover:bg-bg-100 rounded-lg transition-colors duration-200">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => eliminarBorrador(borrador.id)}
                          className="p-2 text-text-200 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-text-200" />
                        <span className="text-text-200">
                          {formatearFecha(borrador.fechaCreacion)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-text-200" />
                        <span className="text-text-200">{borrador.planta}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-text-200" />
                        <span className="text-text-200">
                          {borrador.categoria}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <File className="w-4 h-4 text-text-200" />
                        <span className="text-text-200">
                          {borrador.archivos.length} archivos
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* Modal para crear nueva idea */}
        <CrearIdeaModal
          isOpen={mostrarModal}
          onClose={() => setMostrarModal(false)}
          onSubmit={handleNuevaIdea}
        />

        {/* Modal para visualizar idea */}
        <VisualizarIdeaModal
          isOpen={mostrarVisualizarModal}
          onClose={() => {
            setMostrarVisualizarModal(false);
            setIdeaSeleccionada(null);
          }}
          idea={ideaSeleccionada}
        />

        {/* Modal para editar idea */}
        <EditarIdeaModal
          isOpen={mostrarEditarModal}
          onClose={() => {
            setMostrarEditarModal(false);
            setIdeaSeleccionada(null);
          }}
          onSave={guardarEdicionIdea}
          idea={ideaSeleccionada}
        />

        {/* Notificaciones de badges */}
        {currentNotification && (
          <BadgeNotification
            badgeName={currentNotification.badgeName}
            badgeDescription={currentNotification.badgeDescription}
            badgeIconName={currentNotification.badgeIconName}
            badgeColor={currentNotification.badgeColor}
            isVisible={true}
            onClose={dismissCurrentNotification}
          />
        )}
      </div>
    </div>
  );
};

export default MisIdeas;
