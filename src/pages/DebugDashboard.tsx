import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const DebugDashboard = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    console.log("🔍 DebugDashboard - Componente montado");
    console.log("👤 Usuario:", user);

    const timer = setTimeout(() => setStep(2), 1000);
    return () => clearTimeout(timer);
  }, [user]);

  useEffect(() => {
    if (step === 2) {
      console.log("🔍 Step 2 - Verificando API");
      setStep(3);
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🔍 Debug Dashboard
        </h1>

        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Estado de la aplicación:
          </h2>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✅</span>
              <span>Componente DebugDashboard cargado</span>
            </div>

            <div className="flex items-center space-x-2">
              {user ? (
                <>
                  <span className="text-green-500">✅</span>
                  <span>Usuario autenticado: {user.name}</span>
                </>
              ) : (
                <>
                  <span className="text-red-500">❌</span>
                  <span>Usuario NO autenticado</span>
                </>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {step >= 2 ? (
                <>
                  <span className="text-green-500">✅</span>
                  <span>Step 2 completado</span>
                </>
              ) : (
                <>
                  <span className="text-yellow-500">⏳</span>
                  <span>Esperando Step 2...</span>
                </>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {step >= 3 ? (
                <>
                  <span className="text-green-500">✅</span>
                  <span>Step 3 completado</span>
                </>
              ) : (
                <>
                  <span className="text-yellow-500">⏳</span>
                  <span>Esperando Step 3...</span>
                </>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
              <p className="text-red-600">Error: {error}</p>
            </div>
          )}

          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-2">Información de depuración:</h3>
            <pre className="text-sm text-gray-600">
              {JSON.stringify(
                {
                  user: user
                    ? { id: user.id, name: user.name, email: user.email }
                    : null,
                  step,
                  timestamp: new Date().toISOString(),
                },
                null,
                2
              )}
            </pre>
          </div>

          <div className="mt-4">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Recargar página
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugDashboard;
