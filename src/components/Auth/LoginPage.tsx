import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Building2, Mail, Lock, Loader2 } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
    } catch (error) {
      console.error('Error de login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicrosoftLogin = () => {
    // Simular redirección a Microsoft
    setIsLoading(true);
    setTimeout(() => {
      login('usuario@clgrupo.com', 'password');
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Cargando Inspira...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-4 mb-6">
            <img 
              src="/logo_inspira2.png" 
              alt="Inspira" 
              className="h-16 w-auto"
            />
            <div className="text-white">
              <h1 className="text-4xl font-bold">Inspira</h1>
              <p className="text-primary-light">Sistema de Gestión de Ideas</p>
            </div>
          </div>
          <img 
            src="/logo_cl_grupo.png" 
            alt="CL Grupo Industrial" 
            className="h-12 w-auto mx-auto mb-6"
          />
          <h2 className="text-2xl font-bold text-white">
            Tu idea puede cambiar el futuro
          </h2>
          <p className="mt-2 text-primary-light">
            Inicia sesión con tu cuenta corporativa
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Botón Microsoft */}
          <button
            onClick={handleMicrosoftLogin}
            disabled={isLoading}
            className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <Building2 className="w-5 h-5 mr-2 text-blue-600" />
            )}
            Iniciar sesión con Microsoft
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">O continúa con</span>
            </div>
          </div>

          {/* Formulario de desarrollo */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo Corporativo
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 input-field"
                  placeholder="tu.nombre@clgrupo.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 input-field"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Solo empleados de CL Grupo Industrial pueden acceder
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;