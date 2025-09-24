"use client"

import { useState } from "react"
import {
  UsersIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  EnvelopeIcon,
  PhoneIcon,
  AcademicCapIcon
} from "@heroicons/react/24/outline"

const StudentsList = ({ onBack, user }) => {
  const [selectedTrimester, setSelectedTrimester] = useState('trimester1')
  const [searchTerm, setSearchTerm] = useState('')
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

  const studentsData = {
    trimester1: [
      {
        id: 1,
        name: 'María González',
        email: 'maria.gonzalez@estudiante.edu',
        phone: '+57 300 123 4567',
        program: 'Tecnología en Sistemas',
        semester: 4,
        average: 4.8,
        subjects: ['Matemáticas Aplicadas', 'Programación Web', 'Base de Datos', 'Sistemas Operativos'],
        status: 'Activo',
        lastConnection: '2024-01-15'
      },
      {
        id: 2,
        name: 'Carlos López',
        email: 'carlos.lopez@estudiante.edu',
        phone: '+57 301 234 5678',
        program: 'Tecnología en Sistemas',
        semester: 4,
        average: 4.7,
        subjects: ['Matemáticas Aplicadas', 'Programación Web', 'Base de Datos', 'Sistemas Operativos'],
        status: 'Activo',
        lastConnection: '2024-01-14'
      },
      {
        id: 3,
        name: 'Ana Martínez',
        email: 'ana.martinez@estudiante.edu',
        phone: '+57 302 345 6789',
        program: 'Tecnología en Sistemas',
        semester: 4,
        average: 4.6,
        subjects: ['Matemáticas Aplicadas', 'Programación Web', 'Base de Datos'],
        status: 'Activo',
        lastConnection: '2024-01-15'
      },
      {
        id: 4,
        name: 'Diego Torres',
        email: 'diego.torres@estudiante.edu',
        phone: '+57 303 456 7890',
        program: 'Tecnología en Sistemas',
        semester: 4,
        average: 4.5,
        subjects: ['Matemáticas Aplicadas', 'Programación Web', 'Base de Datos', 'Sistemas Operativos'],
        status: 'Activo',
        lastConnection: '2024-01-13'
      },
      {
        id: 5,
        name: 'Laura Rodríguez',
        email: 'laura.rodriguez@estudiante.edu',
        phone: '+57 304 567 8901',
        program: 'Tecnología en Sistemas',
        semester: 4,
        average: 4.4,
        subjects: ['Matemáticas Aplicadas', 'Programación Web', 'Base de Datos'],
        status: 'Activo',
        lastConnection: '2024-01-15'
      },
      {
        id: 6,
        name: 'Pedro Sánchez',
        email: 'pedro.sanchez@estudiante.edu',
        phone: '+57 305 678 9012',
        program: 'Tecnología en Sistemas',
        semester: 4,
        average: 2.8,
        subjects: ['Matemáticas Aplicadas', 'Programación Web', 'Base de Datos', 'Sistemas Operativos'],
        status: 'Riesgo',
        lastConnection: '2024-01-10'
      },
      {
        id: 7,
        name: 'Sofia Herrera',
        email: 'sofia.herrera@estudiante.edu',
        phone: '+57 306 789 0123',
        program: 'Tecnología en Sistemas',
        semester: 4,
        average: 3.2,
        subjects: ['Matemáticas Aplicadas', 'Programación Web', 'Base de Datos'],
        status: 'Advertencia',
        lastConnection: '2024-01-12'
      }
    ]
  }

  const currentStudents = studentsData[selectedTrimester] || []

  // Filter students based on search term and subject
  const filteredStudents = currentStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSubject = selectedSubject === 'all' || 
                          student.subjects.some(subject => 
                            subject.toLowerCase().includes(subjects.find(s => s.id === selectedSubject)?.name.toLowerCase() || '')
                          )
    
    return matchesSearch && matchesSubject
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Activo': return 'bg-green-100 text-green-800'
      case 'Riesgo': return 'bg-red-100 text-red-800'
      case 'Advertencia': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

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
                  Lista de Estudiantes
                </h1>
                <p className="text-gray-600">Gestión de estudiantes de {user?.name || 'Instructor'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Estudiantes</p>
                <p className="text-2xl font-bold text-blue-600">{filteredStudents.length}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="glass-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Buscar Estudiante</h3>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nombre o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Trimester Selector */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trimestre</h3>
              <select 
                value={selectedTrimester}
                onChange={(e) => setSelectedTrimester(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {trimesters.map((trimester) => (
                  <option key={trimester.id} value={trimester.id}>
                    {trimester.name} - {trimester.period}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtrar por Materia</h3>
              <select 
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStudents.map((student) => (
            <div key={student.id} className="glass-card p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <AcademicCapIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.program} - Semestre {student.semester}</p>
                  </div>
                </div>
                <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(student.status)}`}>
                  {student.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <EnvelopeIcon className="h-4 w-4 mr-2" />
                  {student.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  {student.phone}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-900">Promedio General</span>
                  <span className={`text-lg font-bold ${
                    student.average >= 4.5 ? 'text-green-600' :
                    student.average >= 3.5 ? 'text-blue-600' :
                    student.average >= 3.0 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {student.average}
                  </span>
                </div>
                
                <div className="mb-3">
                  <span className="text-sm font-medium text-gray-900">Materias ({student.subjects.length})</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {student.subjects.map((subject, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between text-xs text-gray-500">
                  <span>ID: {student.id.toString().padStart(4, '0')}</span>
                  <span>Última conexión: {student.lastConnection}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Ver Perfil
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  Contactar
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <UsersIcon className="h-24 w-24 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron estudiantes
            </h3>
            <p className="text-gray-600">
              Intenta ajustar los filtros de búsqueda para encontrar estudiantes.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentsList