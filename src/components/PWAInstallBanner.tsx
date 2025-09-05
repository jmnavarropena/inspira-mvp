import React from "react";
import { Download, X, Smartphone } from "lucide-react";
import { usePWAInstall } from "../hooks/usePWAInstall";

const PWAInstallBanner: React.FC = () => {
  const { isInstallable, installPWA, dismissInstallPrompt } = usePWAInstall();

  if (!isInstallable) {
    return null;
  }

  const handleInstall = async () => {
    const success = await installPWA();
    if (!success) {
      // Si falla, mostrar instrucciones manuales
      alert(
        'Para instalar Inspira CL:\n\niOS Safari: Toca el botón "Compartir" y selecciona "Agregar a pantalla de inicio"\n\nAndroid Chrome: Ve al menú (⋮) y selecciona "Instalar app"'
      );
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50">
      <div className="bg-white rounded-lg shadow-xl border border-bg-300 p-4 animate-slide-in-right">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-accent-100 rounded-lg flex-shrink-0">
            <Smartphone className="w-6 h-6 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-100 text-sm mb-1">
              Instalar Inspira CL
            </h3>
            <p className="text-xs text-text-200 mb-3 leading-relaxed">
              Agrega Inspira a tu pantalla de inicio para acceso rápido y
              experiencia nativa
            </p>

            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="flex items-center gap-2 bg-accent-100 text-white text-xs px-3 py-2 rounded-lg font-medium hover:bg-accent-200 transition-colors flex-1"
              >
                <Download className="w-4 h-4" />
                Instalar
              </button>

              <button
                onClick={dismissInstallPrompt}
                className="p-2 text-text-200 hover:text-text-100 hover:bg-bg-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Indicador de beneficios */}
        <div className="mt-3 pt-3 border-t border-bg-200">
          <div className="flex items-center gap-4 text-xs text-text-200">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Acceso sin internet</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Notificaciones</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Experiencia nativa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallBanner;
