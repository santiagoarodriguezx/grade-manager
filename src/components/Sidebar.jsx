"use client"

import { useState } from "react"
import {
  ChartBarIcon,
  BookOpenIcon,
  CalendarIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  DocumentChartBarIcon,
  PlusIcon,
  UsersIcon,
  AcademicCapIcon,
  CogIcon
} from "@heroicons/react/24/outline"

const Sidebar = ({ user, onLogout, onNavigate, currentPage, userType }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const studentMenuItems = [
    { icon: ChartBarIcon, label: "Dashboard", page: "dashboard", active: currentPage === "dashboard" },
    { icon: ChartBarIcon, label: "Mis Calificaciones", page: "allGrades", active: currentPage === "allGrades" },
    { icon: CalendarIcon, label: "Horarios", page: "fullSchedule", active: currentPage === "fullSchedule" },
    { icon: BellIcon, label: "Notificaciones", page: "notifications", active: currentPage === "notifications" },
  ]

  const teacherMenuItems = [
    { icon: DocumentChartBarIcon, label: "Dashboard", page: "dashboard", active: currentPage === "dashboard" },
    { icon: PlusIcon, label: "Nueva Calificación", page: "newGrade", active: currentPage === "newGrade" },
    { icon: UsersIcon, label: "Mis Estudiantes", page: "studentsList", active: currentPage === "studentsList" },
    { icon: DocumentChartBarIcon, label: "Reportes", page: "allReports", active: currentPage === "allReports" },
    { icon: AcademicCapIcon, label: "Módulos", page: "modules", active: currentPage === "modules" },
    { icon: CogIcon, label: "Configuración", page: "settings", active: currentPage === "settings" },
  ]

  const menuItems = userType === "estudiante" ? studentMenuItems : teacherMenuItems

  const handleNavigation = (page) => {
    onNavigate(page)
    setSidebarOpen(false)
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg text-gray-500 hover:bg-gray-100"
      >
        <Bars3Icon className="w-6 h-6" />
      </button>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:z-auto`}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <UserIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{user?.name || 'Usuario'}</h3>
                <p className="text-xs text-gray-600">{user?.role || (userType === "estudiante" ? 'Estudiante' : 'Instructor')}</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-lg text-gray-400 hover:bg-gray-100"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.page}>
                  <button
                    onClick={() => handleNavigation(item.page)}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                      item.active 
                        ? "bg-gradient-primary text-white shadow-lg" 
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${
                      item.active 
                        ? "bg-white/20" 
                        : "bg-gray-200 group-hover:bg-gray-300"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-200 text-red-600 hover:bg-red-50"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-100">
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar