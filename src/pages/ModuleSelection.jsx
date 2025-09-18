import { useState } from 'react'
import { useFormValidation } from '../hooks/useFormValidation'
import { useAcademic } from '../contexts/AcademicContext'

const ModuleSelection = ({ onComplete }) => {
  const [selectedModule, setSelectedModule] = useState('')
  const [selectedTrimester, setSelectedTrimester] = useState('')
  
  const [errors, setErrors] = useState({})
  const { saveAcademicSelection } = useAcademic()

  const clearError = (field) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }

  const validateForm = (data, rules) => {
    const newErrors = {}
    
    Object.keys(rules).forEach(field => {
      const rule = rules[field]
      const value = data[field]
      
      if (rule.required && (!value || value.trim() === '')) {
        newErrors[field] = rule.message
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Módulos académicos disponibles
  const modules = [
    { id: 'math', name: 'Matemáticas', icon: '📊', color: 'bg-blue-100 border-blue-300 text-blue-800' },
    { id: 'science', name: 'Ciencias', icon: '🔬', color: 'bg-green-100 border-green-300 text-green-800' },
    { id: 'spanish', name: 'Español', icon: '📖', color: 'bg-purple-100 border-purple-300 text-purple-800' },
    { id: 'english', name: 'Inglés', icon: '🌍', color: 'bg-yellow-100 border-yellow-300 text-yellow-800' },
    { id: 'history', name: 'Historia', icon: '🏛️', color: 'bg-red-100 border-red-300 text-red-800' },
    { id: 'pe', name: 'Educación Física', icon: '⚽', color: 'bg-orange-100 border-orange-300 text-orange-800' }
  ]

  // Trimestres disponibles
  const trimesters = [
    { id: 'first', name: 'Primer Trimestre', period: 'Enero - Abril', status: 'completed' },
    { id: 'second', name: 'Segundo Trimestre', period: 'Mayo - Agosto', status: 'current' },
    { id: 'third', name: 'Tercer Trimestre', period: 'Septiembre - Diciembre', status: 'upcoming' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 border-green-300 text-green-800'
      case 'current': return 'bg-blue-100 border-blue-300 text-blue-800'
      case 'upcoming': return 'bg-gray-100 border-gray-300 text-gray-800'
      default: return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅'
      case 'current': return '📅'
      case 'upcoming': return '⏳'
      default: return '📅'
    }
  }

  const handleModuleSelect = (moduleId) => {
    setSelectedModule(moduleId)
    clearError('module')
  }

  const handleTrimesterSelect = (trimesterId) => {
    setSelectedTrimester(trimesterId)
    clearError('trimester')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const formData = { module: selectedModule, trimester: selectedTrimester }
    const validationRules = {
      module: { required: true, message: 'Debes seleccionar un módulo' },
      trimester: { required: true, message: 'Debes seleccionar un trimestre' }
    }

    if (validateForm(formData, validationRules)) {
      const moduleData = modules.find(m => m.id === selectedModule)
      const trimesterData = trimesters.find(t => t.id === selectedTrimester)
      
      // Guardar la selección en el contexto
      saveAcademicSelection(moduleData, trimesterData)
      
      // Notificar al componente padre que se completó la selección
      if (onComplete) {
        onComplete({ module: moduleData, trimester: trimesterData })
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Selecciona tu Módulo y Trimestre
          </h1>
          <p className="text-lg text-gray-600">
            Elige el módulo académico y el trimestre para gestionar las calificaciones
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Selección de Módulo */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Módulo Académico
            </h2>
            {errors.module && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {errors.module}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md ${
                    selectedModule === module.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => handleModuleSelect(module.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{module.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{module.name}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${module.color} mt-1`}>
                        Disponible
                      </span>
                    </div>
                    {selectedModule === module.id && (
                      <div className="text-blue-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selección de Trimestre */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Trimestre Académico
            </h2>
            {errors.trimester && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {errors.trimester}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trimesters.map((trimester) => (
                <div
                  key={trimester.id}
                  className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md ${
                    selectedTrimester === trimester.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => handleTrimesterSelect(trimester.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xl">{getStatusIcon(trimester.status)}</span>
                        <h3 className="font-medium text-gray-900">{trimester.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{trimester.period}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(trimester.status)}`}>
                        {trimester.status === 'completed' && 'Completado'}
                        {trimester.status === 'current' && 'En Progreso'}
                        {trimester.status === 'upcoming' && 'Por Iniciar'}
                      </span>
                    </div>
                    {selectedTrimester === trimester.id && (
                      <div className="text-blue-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Volver al Login
            </button>
            
            <button
              type="submit"
              disabled={!selectedModule || !selectedTrimester}
              className={`px-6 py-2 text-sm font-medium text-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                selectedModule && selectedTrimester
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Continuar al Dashboard
            </button>
          </div>
        </form>

        {/* Información adicional */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Información sobre la selección
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>Selecciona el módulo académico que vas a gestionar</li>
                  <li>Elige el trimestre correspondiente al período académico</li>
                  <li>Podrás cambiar estas selecciones más tarde desde el dashboard</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModuleSelection