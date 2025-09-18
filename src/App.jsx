import React, { useState } from 'react'
import { AcademicProvider, useAcademic } from './contexts/AcademicContext'
import Login from './pages/Login'
import ModuleSelection from './pages/ModuleSelection'
import TestModuleSelection from './pages/TestModuleSelection'
import Dashboard from './pages/Dashboard'
import WelcomeSection from './components/WelcomeSection'

// Componente interno que maneja la navegación
const AppContent = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const { hasAcademicSelection, clearAcademicSelection } = useAcademic()

  // Limpiar la selección académica cuando no hay usuario logueado
  React.useEffect(() => {
    if (!currentUser) {
      clearAcademicSelection()
      // También limpiar directamente del localStorage para asegurar
      localStorage.removeItem('academicSelection')
    }
  }, [currentUser, clearAcademicSelection])

  // Si no hay usuario logueado, mostrar Login con el estilo original
  if (!currentUser) {
    return (
      <div className="min-h-screen flex">
        {/* Lado izquierdo - Imagen con información (50%) */}
        <WelcomeSection />
        
        {/* Lado derecho - Login (50%) */}
        <div className="w-half flex items-center justify-center bg-gray-50">
          <Login onLoginSuccess={(userData) => setCurrentUser(userData)} />
        </div>
      </div>
    )
  }

  // Si hay usuario pero no hay selección académica, mostrar ModuleSelection
  if (!hasAcademicSelection()) {
    return (
      <ModuleSelection 
        onComplete={() => {
          // Se ejecuta cuando se completa la selección
          // El estado se maneja automáticamente por el contexto
        }} 
      />
    )
  }

  // Si hay usuario y selección académica, mostrar Dashboard
  return (
    <Dashboard 
      onLogout={() => {
        setCurrentUser(null)
        clearAcademicSelection() // Limpiar la selección al hacer logout
      }} 
    />
  )
}

function App() {
  return (
    <AcademicProvider>
      <AppContent />
    </AcademicProvider>
  )
}

export default App