"use client"

import { useState } from "react"
import {
  CogIcon,
  UserIcon,
  KeyIcon,
  GlobeAltIcon,
  CheckIcon
} from "@heroicons/react/24/outline"

const Settings = ({ user }) => {
  const [settings, setSettings] = useState({
    profile: {
      name: user?.name || 'Instructor',
      email: 'instructor@sena.edu.co',
      phone: '+57 300 123 4567',
      department: 'Tecnologías de la Información',
      position: 'Instructor Especialista'
    },
    preferences: {
      language: 'es',
      theme: 'light',
      dateFormat: 'dd/mm/yyyy',
      gradeScale: '5.0'
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      lastPasswordChange: '2024-01-01'
    }
  })

  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // Here you would normally save to backend
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const tabs = [
    { id: 'profile', name: 'Perfil', icon: UserIcon },
    { id: 'preferences', name: 'Preferencias', icon: GlobeAltIcon },
    { id: 'security', name: 'Seguridad', icon: KeyIcon }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Configuración
              </h1>
              <p className="text-gray-600">Ajustes y preferencias de {user?.name || 'Instructor'}</p>
            </div>
            
            <button 
              onClick={handleSave}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                saved 
                  ? 'bg-green-600 text-white' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {saved ? (
                <div className="flex items-center">
                  <CheckIcon className="h-4 w-4 mr-2" />
                  Guardado
                </div>
              ) : 'Guardar Cambios'}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-green-100 text-green-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {tab.name}
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="glass-card p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Información de Perfil</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        value={settings.profile.name}
                        onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={settings.profile.phone}
                        onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Departamento
                      </label>
                      <input
                        type="text"
                        value={settings.profile.department}
                        onChange={(e) => handleInputChange('profile', 'department', e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cargo
                      </label>
                      <input
                        type="text"
                        value={settings.profile.position}
                        onChange={(e) => handleInputChange('profile', 'position', e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Preferencias del Sistema</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Idioma
                      </label>
                      <select
                        value={settings.preferences.language}
                        onChange={(e) => handleInputChange('preferences', 'language', e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="es">Español</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tema
                      </label>
                      <select
                        value={settings.preferences.theme}
                        onChange={(e) => handleInputChange('preferences', 'theme', e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="light">Claro</option>
                        <option value="dark">Oscuro</option>
                        <option value="auto">Automático</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Formato de Fecha
                      </label>
                      <select
                        value={settings.preferences.dateFormat}
                        onChange={(e) => handleInputChange('preferences', 'dateFormat', e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                        <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                        <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Escala de Calificación
                      </label>
                      <select
                        value={settings.preferences.gradeScale}
                        onChange={(e) => handleInputChange('preferences', 'gradeScale', e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="5.0">Escala 5.0</option>
                        <option value="10.0">Escala 10.0</option>
                        <option value="100">Escala 100</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Configuración de Seguridad</h3>
                  <div className="space-y-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900">Autenticación de Dos Factores</h4>
                          <p className="text-sm text-gray-600 mt-1">Añade una capa extra de seguridad a tu cuenta</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.security.twoFactorAuth}
                            onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tiempo de Sesión (minutos)
                      </label>
                      <select
                        value={settings.security.sessionTimeout}
                        onChange={(e) => handleInputChange('security', 'sessionTimeout', e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="15">15 minutos</option>
                        <option value="30">30 minutos</option>
                        <option value="60">1 hora</option>
                        <option value="120">2 horas</option>
                        <option value="0">Sin límite</option>
                      </select>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Cambio de Contraseña</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Última actualización: {settings.security.lastPasswordChange}
                      </p>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        Cambiar Contraseña
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings