"use client"

import { PlusIcon, DocumentChartBarIcon } from "@heroicons/react/24/outline"

const NewGrade = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Nueva Calificación</h1>
              <p className="text-gray-600">Registrar calificaciones de estudiantes</p>
            </div>
            <DocumentChartBarIcon className="h-8 w-8 text-gray-400" />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
            <PlusIcon className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Sistema de Calificaciones</h3>
          <p className="text-gray-600 mb-6">
            Esta funcionalidad está en desarrollo. Aquí podrás registrar y gestionar las calificaciones de tus estudiantes.
          </p>
          <div className="text-sm text-gray-500">
            Próximamente: Formularios de calificación, importación masiva, cálculos automáticos y más.
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewGrade