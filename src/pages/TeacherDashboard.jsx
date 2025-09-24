"use client";

import { useState, useEffect } from "react";
import {
  PlusIcon,
  UsersIcon,
  DocumentChartBarIcon,
  CogIcon,
  ChevronDownIcon,
  BookOpenIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import Avatar from "../components/ui/Avatar";

const TeacherDashboard = ({ user, onNavigate }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTrimester, setSelectedTrimester] = useState("trimester1");

  // Test data for teacher dashboard
  const trimesters = [
    { id: "trimester1", name: "Trimestre I", period: "Enero - Abril 2024" },
    { id: "trimester2", name: "Trimestre II", period: "Mayo - Agosto 2024" },
    {
      id: "trimester3",
      name: "Trimestre III",
      period: "Septiembre - Diciembre 2024",
    },
  ];

  const testClasses = [
    {
      subject: "Matemáticas Aplicadas",
      students: 28,
      average: 4.2,
      time: "08:00 - 10:00",
    },
    {
      subject: "Programación Web",
      students: 22,
      average: 4.5,
      time: "10:30 - 12:30",
    },
    {
      subject: "Base de Datos",
      students: 25,
      average: 3.8,
      time: "14:00 - 16:00",
    },
    {
      subject: "Sistemas Operativos",
      students: 30,
      average: 4.0,
      time: "16:30 - 18:30",
    },
  ];

  // Actualizar hora cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                ¡Hola, {user?.name || "Instructor"}!
              </h1>
              <p className="text-gray-600">{formatDate(currentTime)}</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm text-gray-600">Conectado como</p>
                <p className="text-sm font-medium text-gray-900">
                  {user?.role || "Instructor"}
                </p>
              </div>
              <Avatar 
                name={user?.name || "Instructor"} 
                size="md"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trimester Selector */}
        <div className="glass-card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Seleccionar Trimestre
            </h3>
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
        <div className="glass-card p-6 mb-8 border border-blue-200" style={{backgroundColor: '#E8F0FE'}}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Información Académica
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Trimestre Actual</p>
              <p className="font-medium text-gray-900">
                {trimesters.find((t) => t.id === selectedTrimester)?.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Período</p>
              <p className="font-medium text-gray-900">
                {trimesters.find((t) => t.id === selectedTrimester)?.period}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Rol</p>
              <p className="font-medium text-blue-600">Instructor</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <button className="glass-card p-6 hover:shadow-lg transition-all duration-200 text-left group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors" style={{backgroundColor: '#E8F0FE'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#1A73E8'} onMouseLeave={(e) => e.target.style.backgroundColor = '#E8F0FE'}>
                <PlusIcon className="h-6 w-6" style={{color: '#1A73E8'}} />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nueva Calificación
            </h3>
            <p className="text-sm text-gray-600">
              Registrar notas de estudiantes
            </p>
          </button>

          <button className="glass-card p-6 hover:shadow-lg transition-all duration-200 text-left group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors" style={{backgroundColor: '#E8F7E8'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#34A853'} onMouseLeave={(e) => e.target.style.backgroundColor = '#E8F7E8'}>
                <UsersIcon className="h-6 w-6" style={{color: '#34A853'}} />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Gestionar Estudiantes
            </h3>
            <p className="text-sm text-gray-600">
              Ver y editar información de estudiantes
            </p>
          </button>

          <button className="glass-card p-6 hover:shadow-lg transition-all duration-200 text-left group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors" style={{backgroundColor: '#E8F0FE'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#1A73E8'} onMouseLeave={(e) => e.target.style.backgroundColor = '#E8F0FE'}>
                <DocumentChartBarIcon className="h-6 w-6" style={{color: '#1A73E8'}} />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Generar Reportes
            </h3>
            <p className="text-sm text-gray-600">
              Reportes de rendimiento y estadísticas
            </p>
          </button>

          <button className="glass-card p-6 hover:shadow-lg transition-all duration-200 text-left group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <AcademicCapIcon className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Módulos
            </h3>
            <p className="text-sm text-gray-600">
              Gestionar contenidos y materiales
            </p>
          </button>
        </div>

        {/* Classes Today Card */}
        <div className="glass-card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Mis Clases de Hoy
            </h3>
            <BookOpenIcon className="h-5 w-5 text-blue-600" />
          </div>
          <div className="space-y-4">
            {testClasses.map((classItem, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {classItem.subject}
                  </p>
                  <p className="text-sm text-gray-600">
                    {classItem.students} estudiantes
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {classItem.time}
                  </p>
                  <p className="text-xs text-gray-500">
                    Promedio: {classItem.average}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => onNavigate && onNavigate("allReports")}
            className="glass-card p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4" style={{backgroundColor: '#E8F7E8'}}>
              <DocumentChartBarIcon className="h-6 w-6" style={{color: '#34A853'}} />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Ver Todos los Reportes
            </h4>
            <p className="text-sm text-gray-600">
              Accede a reportes detallados de rendimiento
            </p>
          </button>
          <button
            onClick={() => onNavigate && onNavigate("studentsList")}
            className="glass-card p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4" style={{backgroundColor: '#E8F0FE'}}>
              <UsersIcon className="h-6 w-6" style={{color: '#1A73E8'}} />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Lista de Estudiantes
            </h4>
            <p className="text-sm text-gray-600">
              Gestiona información de todos los estudiantes
            </p>
          </button>
          <button
            onClick={() => onNavigate && onNavigate("settings")}
            className="glass-card p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <CogIcon className="h-6 w-6 text-orange-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Configuración</h4>
            <p className="text-sm text-gray-600">
              Ajusta preferencias y configuraciones
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
