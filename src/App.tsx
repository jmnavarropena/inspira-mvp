import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  BarChart3,
  Lightbulb,
  Target,
  Trophy,
  Settings,
  FileText,
} from "lucide-react";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { CampaignsProvider } from "./contexts/CampaignsContext";
import { IdeasProvider } from "./contexts/IdeasContext";
import { EncuestasProvider } from "./contexts/EncuestasContext";
import NotificationCenter from "./components/Notifications/NotificationCenter";
import PWAInstallBanner from "./components/PWAInstallBanner";
import Inicio from "./pages/Inicio";
import MisIdeas from "./pages/MisIdeas";
import Campanas from "./pages/Campanas";
import Gestion from "./pages/Gestion";
import Encuestas from "./pages/Encuestas";

const Rankings = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-text-100 mb-4">Rankings</h1>
    <p className="text-text-200">
      Consulta los rankings de ideas y participantes.
    </p>
  </div>
);

// Componente Navbar
const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Inicio", icon: <BarChart3 className="w-5 h-5" /> },
    {
      path: "/mis-ideas",
      label: "Mis Ideas",
      icon: <Lightbulb className="w-5 h-5" />,
    },
    {
      path: "/campanas",
      label: "Campañas",
      icon: <Target className="w-5 h-5" />,
    },
    {
      path: "/encuestas",
      label: "Encuestas",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      path: "/gestion",
      label: "Gestión",
      icon: <Settings className="w-5 h-5" />,
    },
    {
      path: "/rankings",
      label: "Rankings",
      icon: <Trophy className="w-5 h-5" />,
    },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-bg-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-text-100">Inspira</h1>
              <span className="ml-2 text-sm text-text-200">
                CL Grupo Industrial
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-8">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "border-accent-100 text-accent-100"
                        : "border-transparent text-text-200 hover:text-accent-100 hover:border-primary-100"
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <NotificationCenter />
          </div>
        </div>
      </div>
    </nav>
  );
};

// Componente Layout
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-bg-100">
      <Navbar />
      <main className="pb-safe">{children}</main>
      <PWAInstallBanner />
    </div>
  );
};

// Componente principal App
const App: React.FC = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <CampaignsProvider>
          <IdeasProvider>
            <EncuestasProvider>
              <Router>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/mis-ideas" element={<MisIdeas />} />
                    <Route path="/campanas" element={<Campanas />} />
                    <Route path="/encuestas" element={<Encuestas />} />
                    <Route path="/gestion" element={<Gestion />} />
                    <Route path="/rankings" element={<Rankings />} />
                  </Routes>
                </Layout>
              </Router>
            </EncuestasProvider>
          </IdeasProvider>
        </CampaignsProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
