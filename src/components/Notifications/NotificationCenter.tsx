import { useState } from "react";
import { Bell, X, CheckCircle, AlertCircle, Info, Clock } from "lucide-react";
import {
  useNotifications,
  Notification,
} from "../../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    unreadCount,
  } = useNotifications();
  const navigate = useNavigate();

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `hace ${days} día${days > 1 ? "s" : ""}`;
    if (hours > 0) return `hace ${hours} hora${hours > 1 ? "s" : ""}`;
    if (minutes > 0) return `hace ${minutes} minuto${minutes > 1 ? "s" : ""}`;
    return "hace un momento";
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Notificaciones
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Marcar todas como leídas
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-64 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p>No tienes notificaciones</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer relative ${
                      !notification.read ? "bg-blue-50" : ""
                    }`}
                    onClick={() => {
                      markAsRead(notification.id);
                      if (notification.actionUrl) {
                        navigate(notification.actionUrl);
                        setIsOpen(false);
                      }
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="flex items-start space-x-3">
                      {getIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium ${
                            !notification.read
                              ? "text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatTime(notification.timestamp)}
                        </div>
                      </div>
                    </div>

                    {!notification.read && (
                      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={() => {
                    // Aquí podrías navegar a una página completa de notificaciones
                    setIsOpen(false);
                  }}
                  className="w-full text-center text-sm text-primary-600 hover:text-primary-700"
                >
                  Ver todas las notificaciones
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
