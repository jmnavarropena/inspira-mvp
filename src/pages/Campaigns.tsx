import { useState, useEffect } from "react";
import { campaignsApi, Campaign } from "../services/api";
import {
  Calendar,
  Clock,
  MapPin,
  Lightbulb,
  Plus,
  Filter,
  Search,
  ChevronRight,
  Sparkles,
  AlertCircle,
} from "lucide-react";

// Datos mock temporales - luego se reemplazarán con API calls
const mockCampaigns: Campaign[] = [];

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState<
    "all" | "active" | "inactive"
  >("active");

  useEffect(() => {
    // Cargar campañas desde la API
    const loadCampaigns = async () => {
      setLoading(true);
      try {
        const data = await campaignsApi.getAll();
        setCampaigns(data);
      } catch (error) {
        console.error("Error loading campaigns:", error);
        // Fallback a datos mock si hay error
        setCampaigns(mockCampaigns);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  useEffect(() => {
    let filtered = campaigns;

    // Filtrar por estado activo/inactivo
    if (filterActive === "active") {
      filtered = filtered.filter((campaign) => campaign.isActive);
    } else if (filterActive === "inactive") {
      filtered = filtered.filter((campaign) => !campaign.isActive);
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (campaign) =>
          campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCampaigns(filtered);
  }, [campaigns, searchTerm, filterActive]);

  const isExpired = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  const daysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleCreateIdeaForCampaign = (campaignId: number) => {
    // Navegar a crear idea con campaña preseleccionada
    window.location.href = `/ideas?campaign=${campaignId}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando campañas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl text-white p-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Calendar className="h-8 w-8" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">
          Campañas de Innovación
        </h1>
        <p className="text-center text-green-100">
          Participa en iniciativas específicas y contribuye con ideas temáticas
        </p>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Búsqueda */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar campañas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Filtro de estado */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterActive}
              onChange={(e) =>
                setFilterActive(e.target.value as "all" | "active" | "inactive")
              }
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">Todas</option>
              <option value="active">Activas</option>
              <option value="inactive">Finalizadas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de campañas */}
      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay campañas disponibles
          </h3>
          <p className="text-gray-500">
            {filterActive === "active"
              ? "No hay campañas activas en este momento. ¡Mantente atento a nuevas convocatorias!"
              : "No se encontraron campañas con los filtros aplicados."}
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredCampaigns.map((campaign) => {
            const expired = isExpired(campaign.endDate);
            const remainingDays = daysRemaining(campaign.endDate);

            return (
              <div
                key={campaign.id}
                className={`bg-white rounded-lg border p-6 hover:shadow-lg transition-shadow ${
                  expired ? "opacity-75" : ""
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {campaign.title}
                      </h3>
                      <div className="flex gap-2">
                        {campaign.isActive && !expired && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
                            Activa
                          </span>
                        )}
                        {expired && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Finalizada
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {campaign.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>
                          {new Date(campaign.startDate).toLocaleDateString(
                            "es-ES"
                          )}{" "}
                          -{" "}
                          {new Date(campaign.endDate).toLocaleDateString(
                            "es-ES"
                          )}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>
                          {campaign.plant?.name || "Sin planta asignada"}
                        </span>
                      </div>

                      {!expired && remainingDays > 0 && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>
                            {remainingDays === 1
                              ? "1 día restante"
                              : `${remainingDays} días restantes`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {campaign.isActive && !expired && (
                    <button
                      onClick={() => handleCreateIdeaForCampaign(campaign.id)}
                      className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2 ml-4"
                    >
                      <Plus className="h-4 w-4" />
                      Crear Idea
                    </button>
                  )}
                </div>

                {!expired && remainingDays <= 7 && campaign.isActive && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                      <p className="text-yellow-800 font-medium">
                        ¡Últimos días! Esta campaña finaliza pronto.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Call to action si no hay campañas activas */}
      {filteredCampaigns.filter((c) => c.isActive && !isExpired(c.endDate))
        .length === 0 &&
        filterActive === "active" && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <Sparkles className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              ¿No encuentras una campaña que te interese?
            </h3>
            <p className="text-blue-700 mb-4">
              Siempre puedes crear una idea general desde la sección "Mis Ideas"
            </p>
            <a
              href="/ideas"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              Crear Idea General
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        )}
    </div>
  );
}
