"use client";

import React, { useState } from 'react';
import { PlusIcon, ArrowLeftIcon, CheckCircleIcon, ExclamationTriangleIcon, ClockIcon } from '@heroicons/react/24/outline';

const NewGrade = ({ user }) => {
  const students = [
    { id: 1, name: "María González", email: "maria.gonzalez@estudiante.edu", code: "0001" },
    { id: 2, name: "Carlos López", email: "carlos.lopez@estudiante.edu", code: "0002" },
    { id: 3, name: "Ana Martínez", email: "ana.martinez@estudiante.edu", code: "0003" },
    { id: 4, name: "Diego Torres", email: "diego.torres@estudiante.edu", code: "0004" },
    { id: 5, name: "Laura Rodríguez", email: "laura.rodriguez@estudiante.edu", code: "0005" },
    { id: 6, name: "Pedro Sánchez", email: "pedro.sanchez@estudiante.edu", code: "0006" },
    { id: 7, name: "Sofia Herrera", email: "sofia.herrera@estudiante.edu", code: "0007" }
  ];

  const subjects = [
    { value: "Matematicas Aplicadas", label: "Matemáticas Aplicadas" },
    { value: "Programacion Web", label: "Programación Web" },
    { value: "Base de Datos", label: "Base de Datos" },
    { value: "Sistemas Operativos", label: "Sistemas Operativos" },
  ];

  const [grades, setGrades] = useState({});
  const [subject, setSubject] = useState('');
  const [errors, setErrors] = useState({});
  const [trimester, setTrimester] = useState('primer-trimestre-2025-I');

  // Validar calificación en tiempo real
  const validateGrade = (value) => {
    if (value === '') return '';
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 'Debe ser un número válido';
    if (numValue < 0 || numValue > 5) return 'Debe estar entre 0.0 y 5.0';
    return '';
  };

  // Manejar cambio de calificación
  const handleGradeChange = (studentId, value) => {
    setGrades(prev => ({
      ...prev,
      [studentId]: value
    }));

    const error = validateGrade(value);
    setErrors(prev => ({
      ...prev,
      [studentId]: error
    }));
  };

  // Obtener estudiantes sin calificar
  const getUnratedStudents = () => {
    return students.filter(student => {
      const grade = grades[student.id];
      return !grade || grade.trim() === '';
    });
  };

  // Guardar calificaciones
  const handleSave = () => {
    if (!subject.trim()) {
      alert('❌ Por favor selecciona una materia antes de guardar');
      return;
    }

    let hasValidationErrors = false;
    const newErrors = {};

    students.forEach(student => {
      const grade = grades[student.id] || '';
      if (grade.trim() !== '') {
        const error = validateGrade(grade);
        if (error) {
          newErrors[student.id] = error;
          hasValidationErrors = true;
        }
      }
    });

    setErrors(newErrors);

    if (hasValidationErrors) {
      alert('❌ Por favor corrige las calificaciones con errores antes de guardar');
      return;
    }

    const unratedStudents = getUnratedStudents();
    
    if (unratedStudents.length > 0) {
      const studentNames = unratedStudents.map(s => s.name).join('\n• ');
      const confirmMessage = `⚠️ ADVERTENCIA: Tienes ${unratedStudents.length} estudiante(s) sin calificar:\n\n• ${studentNames}\n\n¿Deseas guardar las calificaciones de todos modos?\n\nLos estudiantes sin calificar quedarán como "Pendiente".`;
      
      if (!confirm(confirmMessage)) {
        return;
      }
    }

    const ratedCount = students.length - unratedStudents.length;
    const subjectName = subjects.find(s => s.value === subject)?.label || subject;
    
    alert(`✅ ¡Calificaciones guardadas exitosamente!\n\n📊 Resumen:\n• Materia: ${subjectName}\n• Estudiantes calificados: ${ratedCount}/${students.length}\n• Estudiantes pendientes: ${unratedStudents.length}`);
    
    setGrades({});
    setErrors({});
    setSubject('');
  };

  // Calcular estadísticas
  const ratedStudents = students.filter(student => {
    const grade = grades[student.id];
    return grade && grade.trim() !== '' && !errors[student.id];
  });

  const unratedStudents = getUnratedStudents();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100/70 rounded-lg transition-colors">
                <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Nueva Calificación
                </h1>
                <p className="text-gray-600">
                  Registro y gestión de calificaciones de {user?.name || 'María González'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Selector de Trimestre y Materia */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Trimestre */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Trimestre Académico</h2>
            <select 
              value={trimester}
              onChange={(e) => setTrimester(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/70 backdrop-blur-sm"
            >
              <option value="primer-trimestre-2025-I">Primer Trimestre - 2025-I</option>
              <option value="segundo-trimestre-2025-I">Segundo Trimestre - 2025-I</option>
              <option value="tercer-trimestre-2025-I">Tercer Trimestre - 2025-I</option>
            </select>
          </div>

          {/* Materia */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Seleccionar Materia *</h2>
            <select 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/70 backdrop-blur-sm"
            >
              <option value="">Selecciona una materia...</option>
              {subjects.map(subj => (
                <option key={subj.value} value={subj.value}>{subj.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        {subject && (
          <div className="glass-card p-6 mb-8">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">{ratedStudents.length}</div>
                <div className="text-sm text-green-800">Calificados</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                  <ClockIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-yellow-600">{unratedStudents.length}</div>
                <div className="text-sm text-yellow-800">Pendientes</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <PlusIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">{students.length}</div>
                <div className="text-sm text-blue-800">Total</div>
              </div>
            </div>
          </div>
        )}

        {/* Formulario de Calificaciones */}
        {subject ? (
          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Calificar: {subjects.find(s => s.value === subject)?.label}
              </h2>
              <div className="text-right">
                <div className="text-sm text-gray-600">Rango válido: 0.0 - 5.0</div>
                <div className="text-xs text-gray-500">Dejar vacío = Pendiente</div>
              </div>
            </div>

            {/* Lista de Estudiantes */}
            <div className="space-y-4 mb-8">
              {students.map((student) => {
                const hasGrade = grades[student.id] && grades[student.id].trim() !== '';
                const hasError = errors[student.id];
                
                return (
                  <div key={student.id} className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all bg-white/50 backdrop-blur-sm ${
                    hasError ? 'border-red-300 bg-red-50/50' : 
                    hasGrade ? 'border-green-300 bg-green-50/50' : 
                    'border-gray-200'
                  }`}>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          hasError ? 'bg-red-500' : 
                          hasGrade ? 'bg-green-500' : 
                          'bg-gray-400'
                        }`}></div>
                        <div>
                          <h3 className="font-medium text-gray-900">{student.name}</h3>
                          <p className="text-sm text-gray-600">
                            {student.code} • {student.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col">
                        <input
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={grades[student.id] || ''}
                          onChange={(e) => handleGradeChange(student.id, e.target.value)}
                          className={`w-28 px-3 py-2 text-center border rounded-lg focus:ring-2 text-lg font-semibold bg-white/70 backdrop-blur-sm ${
                            hasError
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                              : hasGrade
                              ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                          }`}
                          placeholder="0.0"
                        />
                        {hasError && (
                          <span className="text-xs text-red-600 mt-1 text-center">
                            {errors[student.id]}
                          </span>
                        )}
                      </div>
                      
                      {/* Estado */}
                      <div className="w-20 text-center">
                        {hasError ? (
                          <span className="text-xs px-2 py-1 bg-red-100/70 text-red-800 rounded-full backdrop-blur-sm">
                            Error
                          </span>
                        ) : hasGrade ? (
                          <span className="text-xs px-2 py-1 bg-green-100/70 text-green-800 rounded-full backdrop-blur-sm">
                            Listo
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-1 bg-gray-100/70 text-gray-600 rounded-full backdrop-blur-sm">
                            Pendiente
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Alerta de estudiantes pendientes */}
            {unratedStudents.length > 0 && (
              <div className="bg-yellow-50/70 border border-yellow-200 rounded-lg p-4 mb-6 backdrop-blur-sm">
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mr-2" />
                  <div className="text-yellow-800">
                    <strong>Atención:</strong> Tienes {unratedStudents.length} estudiante(s) sin calificar. 
                    Puedes guardar de todos modos y completar las calificaciones más tarde.
                  </div>
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  if (confirm('¿Estás seguro de que deseas limpiar todas las calificaciones?')) {
                    setGrades({});
                    setErrors({});
                  }
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50/70 backdrop-blur-sm transition-colors"
              >
                Limpiar Todo
              </button>
              
              <button
                onClick={handleSave}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-lg transition-colors"
              >
                Guardar Calificaciones ({ratedStudents.length}/{students.length})
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-card p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Selecciona Trimestre y una Materia
            </h3>
            <p className="text-gray-600 mb-6">
              Para comenzar a calificar, selecciona primero el trimestre y la materia en el selector de arriba.
            </p>
            <div className="text-sm text-gray-500">
              Una vez seleccionados el trimestre y la materia, podrás ingresar las calificaciones de todos los estudiantes.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewGrade;