import React from "react";
import {
  Trophy,
  X,
  Sparkles,
  Lightbulb,
  Zap,
  Target,
  CheckCircle,
  Flame,
  Crown,
} from "lucide-react";

interface BadgeNotificationProps {
  badgeName: string;
  badgeDescription: string;
  badgeIconName: string;
  badgeColor: string;
  isVisible: boolean;
  onClose: () => void;
}

const BadgeNotification: React.FC<BadgeNotificationProps> = ({
  badgeName,
  badgeDescription,
  badgeIconName,
  badgeColor,
  isVisible,
  onClose,
}) => {
  if (!isVisible) return null;

  const getIcon = (iconName: string) => {
    const iconProps = { className: "w-6 h-6" };
    switch (iconName) {
      case "Lightbulb":
        return <Lightbulb {...iconProps} />;
      case "Zap":
        return <Zap {...iconProps} />;
      case "Target":
        return <Target {...iconProps} />;
      case "CheckCircle":
        return <CheckCircle {...iconProps} />;
      case "Flame":
        return <Flame {...iconProps} />;
      case "Crown":
        return <Crown {...iconProps} />;
      default:
        return <Trophy {...iconProps} />;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div className="bg-white rounded-lg shadow-2xl border border-bg-300 p-6 max-w-sm relative overflow-hidden">
        {/* Efecto de celebración */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>

        {/* Fondo decorativo */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
          <Sparkles className="w-full h-full text-yellow-500" />
        </div>

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 text-text-200 hover:text-text-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Contenido */}
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-full ${badgeColor} bg-opacity-20 flex-shrink-0`}
          >
            <div
              className={`p-2 rounded-full ${badgeColor
                .replace("text-", "bg-")
                .replace("600", "100")} ${badgeColor}`}
            >
              {getIcon(badgeIconName)}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-bold text-yellow-600 uppercase tracking-wide">
                ¡Nuevo Logro!
              </span>
            </div>

            <h3 className="font-bold text-text-100 text-lg mb-1">
              {badgeName}
            </h3>

            <p className="text-sm text-text-200 leading-relaxed">
              {badgeDescription}
            </p>

            <div className="mt-4 text-xs text-text-200 bg-bg-100 rounded px-2 py-1 inline-block">
              🎉 ¡Felicitaciones por tu logro en CL Grupo Industrial!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeNotification;
