import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Lightbulb, Target, Trophy, Settings } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import NotificationCenter from "../Notifications/NotificationCenter";

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const navigationItems = [
    {
      name: "Inicio",
      href: "/",
      icon: Home,
      roles: ["Usuario", "Responsable", "CoDir"],
    },
    {
      name: "Mis Ideas",
      href: "/mis-ideas",
      icon: Lightbulb,
      roles: ["Usuario", "Responsable", "CoDir"],
    },
    {
      name: "Campañas",
      href: "/campanas",
      icon: Target,
      roles: ["Usuario", "Responsable", "CoDir"],
    },
    {
      name: "Rankings",
      href: "/rankings",
      icon: Trophy,
      roles: ["Usuario", "Responsable", "CoDir"],
    },
    {
      name: "Gestión",
      href: "/gestion",
      icon: Settings,
      roles: ["Responsable", "CoDir"],
    },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95 supports-[backdrop-filter]:bg-white/75">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                className="h-8 w-auto"
                src="/logo_inspira2.png"
                alt="Inspira"
              />
              <span className="ml-2 text-xl font-bold text-gray-900 hidden sm:block">
                Inspira
              </span>
            </Link>

            <div className="hidden md:ml-6 md:flex md:space-x-2">
              {navigationItems
                .filter((item) => item.roles.includes(user?.role || "Usuario"))
                .map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        isActive
                          ? "bg-accent-50 border-accent-100 text-accent-100"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      } inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition-colors duration-200`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </Link>
                  );
                })}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <NotificationCenter />
            <div className="hidden md:flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-400" />
                <span className="text-sm font-medium text-gray-700">
                  1,250 pts
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {user?.name || "Usuario"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
