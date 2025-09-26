"use client";

import { useState } from "react";
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
  CogIcon,
} from "@heroicons/react/24/outline";
import Avatar from "./ui/Avatar";

const Sidebar = ({ user, onLogout, onNavigate, currentPage, userType }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const studentMenuItems = [
    {
      icon: ChartBarIcon,
      label: "Dashboard",
      page: "dashboard",
      active: currentPage === "dashboard",
    },
    {
      icon: ChartBarIcon,
      label: "Mis Calificaciones",
      page: "allGrades",
      active: currentPage === "allGrades",
    },
    {
      icon: CalendarIcon,
      label: "Horarios",
      page: "fullSchedule",
      active: currentPage === "fullSchedule",
    },
    {
      icon: BellIcon,
      label: "Notificaciones",
      page: "notifications",
      active: currentPage === "notifications",
    },
  ];

  const teacherMenuItems = [
    {
      icon: DocumentChartBarIcon,
      label: "Dashboard",
      page: "dashboard",
      active: currentPage === "dashboard",
    },
    {
      icon: PlusIcon,
      label: "Nueva Calificación",
      page: "newGrade",
      active: currentPage === "newGrade",
    },
    {
      icon: UsersIcon,
      label: "Mis Estudiantes",
      page: "studentsList",
      active: currentPage === "studentsList",
    },
    {
      icon: DocumentChartBarIcon,
      label: "Reportes",
      page: "allReports",
      active: currentPage === "allReports",
    },
    {
      icon: AcademicCapIcon,
      label: "Módulos",
      page: "modules",
      active: currentPage === "modules",
    },
    {
      icon: CogIcon,
      label: "Configuración",
      page: "settings",
      active: currentPage === "settings",
    },
  ];

  console.log("  - userType:", userType);
  console.log("  - currentPage:", currentPage);
  console.log("  - teacherMenuItems:", teacherMenuItems);

  const menuItems = userType === "estudiante" ? studentMenuItems : teacherMenuItems;
  
  console.log("  - menuItems seleccionado:", menuItems);

  const handleNavigation = (page) => {
    console.log("  - Navegando a:", page);
    console.log("  - currentPage actual:", currentPage);
    console.log("  - userType:", userType);
    onNavigate(page);
    setSidebarOpen(false);
  };

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
      <div
        className={`fixed left-0 top-0 h-screen w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar 
                name={user?.name || "Usuario"} 
                size="md"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {user?.name || "Usuario"}
                </h3>
                <p className="text-xs text-gray-600">
                  {user?.role ||
                    (userType === "estudiante" ? "Estudiante" : "Instructor")}
                </p>
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
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.page}>
                  <button
                    onClick={() => handleNavigation(item.page)}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                      item.active
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl shadow-blue-500/25 transform scale-105"
                        : "text-neutral-600 hover:text-gray-900 hover:bg-secondary hover:shadow-md"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-all duration-300 ${
                        item.active
                          ? "bg-white/25 shadow-lg"
                          : "bg-gray-200 group-hover:bg-gray-300"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-sm font-semibold transition-all duration-300 ${
                      item.active 
                        ? "text-white drop-shadow-sm" 
                        : "text-gray-600 group-hover:text-gray-900"
                    }`}>
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-300 hover:bg-red-50 hover:shadow-md hover:scale-105 group"
            style={{ color: '#EA4335' }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-all duration-300"
                 style={{ backgroundColor: '#fef2f2' }}>
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;