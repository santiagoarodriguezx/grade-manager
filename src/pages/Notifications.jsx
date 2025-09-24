"use client";

import { BellIcon } from "@heroicons/react/24/outline";

const Notifications = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Notificaciones
              </h1>
              <p className="text-gray-600">
                Centro de notificaciones y alertas
              </p>
            </div>
            <BellIcon className="h-8 w-8 text-gray-400" />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <BellIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Centro de Notificaciones
          </h3>
          <p className="text-gray-600 mb-6">
            Esta sección está en desarrollo. Aquí podrás ver todas tus
            notificaciones importantes.
          </p>
          <div className="text-sm text-gray-500">
            Próximamente: Notificaciones en tiempo real, alertas personalizadas
            y más.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
