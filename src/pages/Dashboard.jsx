"use client";

import { useState, useEffect } from "react";
import { useAcademic } from "../contexts/AcademicContext";
import {
  SparklesIcon,
  PlusIcon,
  UsersIcon,
  DocumentChartBarIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const Dashboard = ({ onLogout }) => {
  const { academicSelection, clearAcademicSelection } = useAcademic();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    students: 32,
    grades: 248,
    average: 8.5,
    pending: 5,
    attendance: 94.2,
  });

  // Actualizar hora cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    clearAcademicSelection();
    if (onLogout) {
      onLogout();
    }
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  const getModuleGradient = (moduleName) => {
    const gradients = {
      Matemáticas: "bg-gradient-primary",
      Ciencias: "bg-gradient-success",
      Español: "bg-gradient-danger",
      Inglés: "bg-gradient-secondary",
      Historia: "from-amber-500 to-orange-600",
      "Educación Física": "from-teal-500 to-cyan-600",
    };
    return gradients[moduleName] || "bg-gradient-primary";
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const navigationItems = [
    {
      icon: DocumentChartBarIcon,
      label: "Dashboard",
      active: true,
      color: "text-purple-400",
    },
    {
      icon: PlusIcon,
      label: "Nueva Calificación",
      active: false,
      color: "text-gray-400",
    },
    {
      icon: UsersIcon,
      label: "Estudiantes",
      active: false,
      color: "text-gray-400",
    },
    {
      icon: DocumentChartBarIcon,
      label: "Reportes",
      active: false,
      color: "text-gray-400",
    },
    {
      icon: CogIcon,
      label: "Configuración",
      active: false,
      color: "text-gray-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex h-screen overflow-hidden relative z-10">
        {/* Sidebar */}
        <aside
          className={`fixed lg:relative inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="glass-card h-full flex flex-col shadow-xl border-r border-white/20 rounded-none lg:rounded-r-3xl">
            {/* Logo/Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg neon-glow">
                    <SparklesIcon className="text-white h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Grade Manager
                    </h2>
                    <p className="text-sm text-gray-400 font-medium">
                      Panel Inteligente
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden w-10 h-10 rounded-xl bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-6">
              <div className="space-y-2">
                {navigationItems.map((item, index) => (
                  <button
                    key={index}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                      item.active
                        ? "bg-gradient-primary text-white shadow-lg neon-glow"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/5"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${
                        item.active
                          ? "bg-white/20"
                          : "bg-gray-800 group-hover:bg-gray-700"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </nav>

            {/* User section */}
            <div className="p-6 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="btn-secondary w-full flex items-center justify-center gap-3 py-4"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span className="font-semibold">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-white/20 z-30">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden w-12 h-12 rounded-xl bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                  >
                    <Bars3Icon className="h-6 w-6 text-gray-400" />
                  </button>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {getGreeting()}, Administrador
                    </h1>
                    <p className="text-sm text-gray-500 capitalize">
                      {formatDate(currentTime)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Search */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar..."
                      className="input-modern pl-12 w-64"
                    />
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>

                  {/* Notifications */}
                  <button className="relative w-12 h-12 rounded-xl bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors">
                    <BellIcon className="h-6 w-6 text-gray-400" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">3</span>
                    </div>
                  </button>

                  {/* Time */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatTime(currentTime)}
                    </div>
                  </div>

                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Content area */}
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Module info card */}
              {academicSelection && (
                <div className="glass-card p-8 card-hover animate-fade-in-up">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-8">
                      <div
                        className={`w-24 h-24 rounded-3xl ${getModuleGradient(
                          academicSelection.module?.name
                        )} flex items-center justify-center shadow-2xl text-4xl neon-glow`}
                      >
                        {academicSelection.module?.icon}
                      </div>
                      <div>
                        <h2 className="text-4xl font-bold text-white mb-3">
                          {academicSelection.module?.name}
                        </h2>
                        <div className="flex items-center space-x-4">
                          <div className="px-4 py-2 bg-gradient-primary rounded-xl">
                            <span className="text-white font-semibold">
                              {academicSelection.trimester?.name}
                            </span>
                          </div>
                          <span className="text-gray-400 font-medium">
                            {academicSelection.trimester?.period}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress indicator */}
                    <div className="text-center">
                      <div className="text-5xl font-bold gradient-text mb-2">
                        78%
                      </div>
                      <div className="text-sm text-gray-400 font-medium">
                        Progreso Global
                      </div>
                      <div className="text-xs text-gray-500">
                        Este trimestre
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-300">
                        Progreso del Trimestre
                      </span>
                      <span className="text-sm text-gray-400 font-medium">
                        78%
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3">
                      <div
                        className="bg-gradient-primary h-3 rounded-full transition-all duration-1000 shadow-lg"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Stats grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Estudiantes",
                    value: stats.students,
                    subtitle: "Activos",
                    icon: "👥",
                    color: "primary",
                    trend: { type: "up", value: "+3" },
                  },
                  {
                    title: "Calificaciones",
                    value: stats.grades,
                    subtitle: "Registradas",
                    icon: "📝",
                    color: "success",
                    trend: { type: "up", value: "+12" },
                  },
                  {
                    title: "Promedio",
                    value: stats.average,
                    subtitle: "General",
                    icon: "📊",
                    color: "secondary",
                    trend: { type: "up", value: "+0.3" },
                  },
                  {
                    title: "Pendientes",
                    value: stats.pending,
                    subtitle: "Por revisar",
                    icon: "⏳",
                    color: "danger",
                    trend: { type: "down", value: "-2" },
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="glass-card p-6 card-hover animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-${stat.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}
                      >
                        {stat.icon}
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          stat.trend.type === "up"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {stat.trend.value}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-500 font-medium">
                      {stat.title}
                    </div>
                    <div className="text-sm text-gray-400">{stat.subtitle}</div>
                  </div>
                ))}
              </div>

              {/* Recent activity and quick actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent activity */}
                <div className="lg:col-span-2">
                  <div className="glass-card p-8 animate-fade-in-up stagger-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">
                      Actividad Reciente
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          action: "Calificación agregada",
                          student: "María González",
                          subject: "Examen Parcial",
                          grade: "9.5",
                          time: "Hace 2 horas",
                          icon: "📝",
                        },
                        {
                          action: "Estudiante registrado",
                          student: "Carlos Mendez",
                          subject: "Nuevo ingreso",
                          grade: "-",
                          time: "Hace 4 horas",
                          icon: "👤",
                        },
                        {
                          action: "Calificación editada",
                          student: "Ana Ruiz",
                          subject: "Tarea #3",
                          grade: "8.7",
                          time: "Hace 6 horas",
                          icon: "✏️",
                        },
                        {
                          action: "Reporte generado",
                          student: "Trimestre completo",
                          subject: "PDF exportado",
                          grade: "-",
                          time: "Hace 1 día",
                          icon: "📊",
                        },
                      ].map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 p-6 bg-white/5 rounded-2xl border border-white/10 card-hover"
                        >
                          <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center text-xl shadow-lg">
                            {activity.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-gray-900">
                                  {activity.action}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {activity.student}{" "}
                                  {activity.subject !== "-"
                                    ? `• ${activity.subject}`
                                    : ""}
                                </p>
                              </div>
                              <div className="text-right">
                                {activity.grade !== "-" && (
                                  <div className="text-xl font-bold text-green-600 mb-1">
                                    {activity.grade}
                                  </div>
                                )}
                                <div className="text-xs text-gray-500 font-medium">
                                  {activity.time}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick actions */}
                <div>
                  <div className="glass-card p-8 animate-fade-in-up stagger-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">
                      Acciones Rápidas
                    </h3>
                    <div className="space-y-4">
                      <button className="btn-modern w-full py-4 flex items-center justify-center gap-3">
                        <PlusIcon className="w-5 h-5" />
                        <span className="font-semibold">
                          Nueva Calificación
                        </span>
                      </button>
                      <button className="btn-secondary w-full py-4 flex items-center justify-center gap-3">
                        <UsersIcon className="w-5 h-5" />
                        <span className="font-semibold">Ver Estudiantes</span>
                      </button>
                      <button className="btn-secondary w-full py-4 flex items-center justify-center gap-3">
                        <DocumentChartBarIcon className="w-5 h-5" />
                        <span className="font-semibold">Generar Reporte</span>
                      </button>
                      <button className="btn-secondary w-full py-4 flex items-center justify-center gap-3">
                        <span className="text-lg">📤</span>
                        <span className="font-semibold">Exportar Datos</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
