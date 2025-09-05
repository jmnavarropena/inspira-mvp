import { Loader, Sparkles } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner = ({
  size = "md",
  text = "Cargando...",
  fullScreen = false,
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const content = (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="relative">
        <Loader
          className={`${sizeClasses[size]} animate-spin text-primary-600`}
        />
        <Sparkles
          className={`${sizeClasses[size]} absolute inset-0 animate-pulse text-primary-300`}
        />
      </div>
      {text && (
        <p className={`${textSizeClasses[size]} text-gray-600 font-medium`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
};

// Componente para suspense boundaries
export const PageLoadingFallback = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size="lg" text="Cargando página..." />
    </div>
  </div>
);

// Componente para secciones
export const SectionLoadingFallback = () => (
  <div className="card">
    <div className="flex items-center justify-center py-12">
      <LoadingSpinner text="Cargando datos..." />
    </div>
  </div>
);

export default LoadingSpinner;
