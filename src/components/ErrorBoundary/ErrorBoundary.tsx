import { Component, ReactNode, ErrorInfo } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="mb-4">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Ups! Algo salió mal
            </h2>
            <p className="text-gray-600 mb-6">
              Ha ocurrido un error inesperado. Por favor, intenta recargar la
              página.
            </p>

            {process.env.NODE_ENV === "development" && (
              <div className="mb-6 p-3 bg-red-50 rounded-lg text-left">
                <details>
                  <summary className="cursor-pointer text-red-700 font-medium">
                    Detalles del error (dev)
                  </summary>
                  <div className="mt-2 text-sm text-red-600">
                    <p>
                      <strong>Error:</strong> {this.state.error?.message}
                    </p>
                    <pre className="mt-2 overflow-auto text-xs">
                      {this.state.error?.stack}
                    </pre>
                  </div>
                </details>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={this.handleReset}
                className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reintentar
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center"
              >
                <Home className="w-4 h-4 mr-2" />
                Ir al inicio
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
