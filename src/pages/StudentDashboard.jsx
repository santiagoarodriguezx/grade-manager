"use client"

import { useState, useEffect } from "react"
import {
  ChartBarIcon,
  CalendarIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline"

const StudentDashboard = ({ user, onNavigate }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedTrimester, setSelectedTrimester] = useState("1")

  // Test data - solo para mostrar como se ve
  const trimesters = [
    { id: "1", name: "Primer Trimestre", period: "2025-I", active: true },
    { id: "2", name: "Segundo Trimestre", period: "2025-II", active: false },
    { id: "3", name: "Tercer Trimestre", period: "2025-III", active: false },
  ]

  const testGrades = [
    { subject: "Programación Web", grade: 4.2, status: "Aprobado" },
  ]

  const testSchedule = [
    { time: "08:00 - 10:00", subject: "Programación Web", room: "Lab 101" },
  ]

  // Actualizar hora cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDate = (date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                ¡Hola, {user?.name || 'Estudiante'}!
              </h1>
              <p className="text-gray-600">{formatDate(currentTime)}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Conectado como</p>
                <p className="text-sm font-medium text-gray-900">{user?.role || 'Estudiante'}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trimester Selector */}
        <div className="glass-card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Seleccionar Trimestre</h3>
          </div>
          <div className="relative">
            <select 
              value={selectedTrimester}
              onChange={(e) => setSelectedTrimester(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
            >
              {trimesters.map((trimester) => (
                <option key={trimester.id} value={trimester.id}>
                  {trimester.name} - {trimester.period}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Academic Info */}
        <div className="glass-card p-6 mb-8 border border-blue-200 bg-blue-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Académica</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Trimestre Actual</p>
              <p className="font-medium text-gray-900">
                {trimesters.find(t => t.id === selectedTrimester)?.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Período</p>
              <p className="font-medium text-gray-900">
                {trimesters.find(t => t.id === selectedTrimester)?.period}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Estado</p>
              <p className="font-medium text-green-600">Activo</p>
            </div>
          </div>
        </div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Grades Card */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Mis Calificaciones</h3>
              <ChartBarIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div className="space-y-4">
              {testGrades.map((grade, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{grade.subject}</p>
                    <p className="text-sm text-gray-600">{grade.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{grade.grade}</p>
                    <p className="text-xs text-gray-500">sobre 5.0</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule Card */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Horario de Hoy</h3>
              <CalendarIcon className="h-5 w-5 text-green-600" />
            </div>
            <div className="space-y-4">
              {testSchedule.map((schedule, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{schedule.subject}</p>
                    <p className="text-sm text-gray-600">{schedule.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{schedule.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <button 
            onClick={() => onNavigate && onNavigate('allGrades')}
            className="glass-card p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <ChartBarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Ver Todas las Calificaciones</h4>
            <p className="text-sm text-gray-600">Consulta tu historial académico completo</p>
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('fullSchedule')}
            className="glass-card p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <CalendarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Horario Completo</h4>
            <p className="text-sm text-gray-600">Ve tu horario semanal detallado</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard