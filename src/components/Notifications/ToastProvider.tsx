import { useState, createContext, useContext, ReactNode } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

interface Toast {
  id: string;
  title: string;
  message?: string;
  type: "success" | "error" | "info" | "warning";
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Omit<Toast, "id">) => {
    const id = Date.now().toString();
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    // Auto remove after duration
    const duration = toast.duration || 5000;
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const getIcon = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "error":
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      case "warning":
        return <AlertCircle className="w-6 h-6 text-yellow-500" />;
      default:
        return <Info className="w-6 h-6 text-blue-500" />;
    }
  };

  const getStyles = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`max-w-sm w-full ${getStyles(
              toast.type
            )} border rounded-lg shadow-lg transform transition-all duration-300 ease-in-out animate-slide-in-right`}
          >
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">{getIcon(toast.type)}</div>
                <div className="ml-3 w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {toast.title}
                  </p>
                  {toast.message && (
                    <p className="mt-1 text-sm text-gray-500">
                      {toast.message}
                    </p>
                  )}
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    onClick={() => removeToast(toast.id)}
                    className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
