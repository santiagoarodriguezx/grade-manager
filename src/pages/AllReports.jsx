"use client"

import { useState } from "react"
import {
  DocumentChartBarIcon,
  ArrowLeftIcon,
  UsersIcon,
  ChartBarIcon,
  TrophyIcon,
  CalendarIcon
} from "@heroicons/react/24/outline"

const AllReports = ({ onBack, user }) => {
  const [selectedTrimester, setSelectedTrimester] = useState('trimester1')
  const [selectedSubject, setSelectedSubject] = useState('all')
  
  const trimesters = [
    { id: 'trimester1', name: 'Trimestre I', period: 'Enero - Abril 2024' },
    { id: 'trimester2', name: 'Trimestre II', period: 'Mayo - Agosto 2024' },
    { id: 'trimester3', name: 'Trimestre III', period: 'Septiembre - Diciembre 2024' },
  ]

  const subjects = [
    { id: 'all', name: 'Todas las Materias' },
    { id: 'math', name: 'Matemáticas Aplicadas' },
    { id: 'web', name: 'Programación Web' },
    { id: 'db', name: 'Base de Datos' },
    { id: 'os', name: 'Sistemas Operativos' },
  ]

  const reportData = {
    trimester1: {
      summary: {
        totalStudents: 128,
        averageGrade: 4.1,
        passRate: 87,
        excellenceRate: 23
      },
      subjectStats: [
        { name: 'Matemáticas Aplicadas', students: 28, average: 4.2, passRate: 89, excellence: 25 },
        { name: 'Programación Web', students: 22, average: 4.5, passRate: 95, excellence: 32 },
        { name: 'Base de Datos', students: 25, average: 3.8, passRate: 80, excellence: 16 },
        { name: 'Sistemas Operativos', students: 30, average: 4.0, passRate: 83, excellence: 20 },
      ],
      topStudents: [
        { name: 'María González', average: 4.8, subjects: 4 },
        { name: 'Carlos López', average: 4.7, subjects: 4 },
        { name: 'Ana Martínez', average: 4.6, subjects: 4 },
        { name: 'Diego Torres', average: 4.5, subjects: 4 },
        { name: 'Laura Rodríguez', average: 4.4, subjects: 3 },
      ],
      alertStudents: [
        { name: 'Pedro Sánchez', average: 2.8, subjects: 4, status: 'Riesgo Alto' },
        { name: 'Sofia Herrera', average: 3.2, subjects: 3, status: 'Riesgo Medio' },
        { name: 'Juan Morales', average: 3.1, subjects: 4, status: 'Riesgo Medio' },
      ]
    }
  }

  const currentData = reportData[selectedTrimester] || reportData.trimester1

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 mr-4 transition-colors"
              >
                <ArrowLeftIcon className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Reportes Académicos
                </h1>
                <p className="text-gray-600">Análisis de rendimiento y estadísticas de {user?.name || 'Instructor'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Promedio General</p>
                <p className="text-2xl font-bold text-blue-600">{currentData.summary.averageGrade}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="glass-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trimester Selector */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Seleccionar Trimestre</h3>
              <div className="space-y-2">
                {trimesters.map((trimester) => (
                  <button
                    key={trimester.id}
                    onClick={() => setSelectedTrimester(trimester.id)}
                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                      selectedTrimester === trimester.id
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <p className="font-medium text-gray-900">{trimester.name}</p>
                    <p className="text-sm text-gray-600">{trimester.period}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtrar por Materia</h3>
              <div className="space-y-2">
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedSubject(subject.id)}
                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                      selectedSubject === subject.id
                        ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <p className="font-medium text-gray-900">{subject.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <UsersIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900">{currentData.summary.totalStudents}</h4>
            <p className="text-sm text-gray-600">Total Estudiantes</p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <ChartBarIcon className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900">{currentData.summary.averageGrade}</h4>
            <p className="text-sm text-gray-600">Promedio General</p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <TrophyIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900">{currentData.summary.passRate}%</h4>
            <p className="text-sm text-gray-600">Tasa de Aprobación</p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <TrophyIcon className="h-6 w-6 text-orange-600" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900">{currentData.summary.excellenceRate}%</h4>
            <p className="text-sm text-gray-600">Excelencia Académica</p>
          </div>
        </div>

        {/* Subject Statistics */}
        <div className="glass-card p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Estadísticas por Materia</h3>
          <div className="space-y-4">
            {currentData.subjectStats.map((subject, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{subject.name}</h4>
                  <span className="text-sm text-gray-600">{subject.students} estudiantes</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-blue-600">{subject.average}</p>
                    <p className="text-xs text-gray-600">Promedio</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-600">{subject.passRate}%</p>
                    <p className="text-xs text-gray-600">Aprobación</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-orange-600">{subject.excellence}%</p>
                    <p className="text-xs text-gray-600">Excelencia</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Students Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Students */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Mejores Estudiantes</h3>
            <div className="space-y-4">
              {currentData.topStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.subjects} materias</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">{student.average}</p>
                    <p className="text-xs text-gray-500">promedio</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alert Students */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Estudiantes en Riesgo</h3>
            <div className="space-y-4">
              {currentData.alertStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.subjects} materias</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-red-600">{student.average}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      student.status === 'Riesgo Alto' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {student.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllReports