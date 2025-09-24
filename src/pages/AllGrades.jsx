"use client"

import { useState } from "react"
import {
  ChartBarIcon,
  ArrowLeftIcon,
  CalendarIcon,
  TrophyIcon
} from "@heroicons/react/24/outline"

const AllGrades = ({ user }) => {
  const [selectedTrimester, setSelectedTrimester] = useState('trimester1')
  
  const trimesters = [
    { id: 'trimester1', name: 'Trimestre I', period: 'Enero - Abril 2024' },
    { id: 'trimester2', name: 'Trimestre II', period: 'Mayo - Agosto 2024' },
    { id: 'trimester3', name: 'Trimestre III', period: 'Septiembre - Diciembre 2024' },
  ]

  const allGrades = {
    trimester1: [
      { subject: 'Matemáticas Aplicadas', grade: 4.2, status: 'Aprobado', assignments: [
        { name: 'Parcial 1', grade: 4.0, weight: '30%', date: '2024-02-15' },
        { name: 'Parcial 2', grade: 4.5, weight: '30%', date: '2024-03-20' },
        { name: 'Final', grade: 4.1, weight: '40%', date: '2024-04-10' }
      ]},
      { subject: 'Programación Web', grade: 4.7, status: 'Aprobado', assignments: [
        { name: 'Proyecto 1', grade: 4.5, weight: '25%', date: '2024-02-10' },
        { name: 'Proyecto 2', grade: 4.8, weight: '25%', date: '2024-03-15' },
        { name: 'Proyecto Final', grade: 4.9, weight: '50%', date: '2024-04-05' }
      ]},
      { subject: 'Base de Datos', grade: 3.8, status: 'Aprobado', assignments: [
        { name: 'Quiz 1', grade: 3.5, weight: '20%', date: '2024-02-08' },
        { name: 'Quiz 2', grade: 4.0, weight: '20%', date: '2024-03-08' },
        { name: 'Proyecto', grade: 4.0, weight: '60%', date: '2024-04-02' }
      ]},
      { subject: 'Sistemas Operativos', grade: 4.1, status: 'Aprobado', assignments: [
        { name: 'Laboratorio 1', grade: 4.2, weight: '30%', date: '2024-02-20' },
        { name: 'Laboratorio 2', grade: 4.0, weight: '30%', date: '2024-03-25' },
        { name: 'Examen Final', grade: 4.1, weight: '40%', date: '2024-04-12' }
      ]},
    ]
  }

  const currentGrades = allGrades[selectedTrimester] || []
  const averageGrade = currentGrades.length > 0 
    ? (currentGrades.reduce((sum, grade) => sum + grade.grade, 0) / currentGrades.length).toFixed(2)
    : '0.00'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Todas las Calificaciones
              </h1>
              <p className="text-gray-600">Historial académico completo de {user?.name || 'Estudiante'}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Promedio General</p>
                <p className="text-2xl font-bold text-blue-600">{averageGrade}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trimester Selector */}
        <div className="glass-card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Seleccionar Trimestre</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trimesters.map((trimester) => (
              <button
                key={trimester.id}
                onClick={() => setSelectedTrimester(trimester.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedTrimester === trimester.id
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <p className="font-semibold text-gray-900">{trimester.name}</p>
                <p className="text-sm text-gray-600">{trimester.period}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <ChartBarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900">{averageGrade}</h4>
            <p className="text-sm text-gray-600">Promedio</p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <TrophyIcon className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900">{currentGrades.length}</h4>
            <p className="text-sm text-gray-600">Materias</p>
          </div>
        </div>

        {/* Grades List */}
        <div className="space-y-6">
          {currentGrades.map((subject, index) => (
            <div key={index} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{subject.subject}</h3>
                  <p className="text-sm text-gray-600">{subject.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-600">{subject.grade}</p>
                  <p className="text-sm text-gray-500">sobre 5.0</p>
                </div>
              </div>
              
              {/* Assignments breakdown */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Desglose de Evaluaciones</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subject.assignments.map((assignment, assignIndex) => (
                    <div key={assignIndex} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-gray-900">{assignment.name}</h5>
                        <span className="text-sm text-blue-600 font-medium">{assignment.weight}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{assignment.date}</span>
                        <span className="text-lg font-bold text-gray-900">{assignment.grade}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {currentGrades.length === 0 && (
          <div className="text-center py-12">
            <ChartBarIcon className="h-24 w-24 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No hay calificaciones disponibles
            </h3>
            <p className="text-gray-600">
              Las calificaciones para este trimestre estarán disponibles próximamente.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllGrades