import React from "react";
import { TrendingUp, Users, Lightbulb, CheckCircle, Clock } from "lucide-react";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Resumen de la actividad de innovación
        </p>
      </div>

      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Lightbulb className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Ideas</p>
              <p className="text-2xl font-bold text-gray-900">45</p>
              <p className="text-sm text-green-600">+12% vs mes anterior</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">En Progreso</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-green-600">+8% vs mes anterior</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Implementadas</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
              <p className="text-sm text-green-600">+15% vs mes anterior</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Participantes</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
              <p className="text-sm text-green-600">+5% vs mes anterior</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actividad reciente */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Actividad Reciente
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-full">
                <Lightbulb className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Nueva idea creada: "Optimización de procesos"
                </p>
                <p className="text-sm text-gray-500">
                  María González • hace 2 horas
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Idea implementada: "Reducción de desperdicios"
                </p>
                <p className="text-sm text-gray-500">
                  Carlos Ruiz • hace 4 horas
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className="p-2 bg-purple-100 rounded-full">
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Idea aprobada: "Sistema de inventario inteligente"
                </p>
                <p className="text-sm text-gray-500">Ana López • hace 1 día</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
