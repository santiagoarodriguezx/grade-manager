import { useState, useEffect } from 'react'
import { useAcademic } from '../contexts/AcademicContext'

const Dashboard = ({ onLogout }) => {
  const { academicSelection, clearAcademicSelection } = useAcademic()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState({
    students: 32,
    grades: 248,
    average: 8.5,
    pending: 5,
    attendance: 94.2
  })

  // Actualizar hora cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    clearAcademicSelection()
    if (onLogout) {
      onLogout()
    }
  }

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Buenos días"
    if (hour < 18) return "Buenas tardes"
    return "Buenas noches"
  }

  const getModuleIcon = (moduleName) => {
    const icons = {
      'Matemáticas': '📊',
      'Ciencias': '🔬',
      'Español': '📖',
      'Inglés': '🌍',
      'Historia': '🏛️',
      'Educación Física': '⚽'
    }
    return icons[moduleName] || '📚'
  }

  const getModuleColor = (moduleName) => {
    const colors = {
      'Matemáticas': 'from-blue-500 to-indigo-600',
      'Ciencias': 'from-green-500 to-emerald-600',
      'Español': 'from-red-500 to-rose-600',
      'Inglés': 'from-purple-500 to-violet-600',
      'Historia': 'from-yellow-500 to-orange-600',
      'Educación Física': 'from-teal-500 to-cyan-600'
    }
    return colors[moduleName] || 'from-slate-700 to-gray-800'
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu overlay - Only visible on mobile when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 mobile-overlay"
          onClick={() => setSidebarOpen(false)}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'none'
          }}
        />
      )}

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={`
            w-72 flex flex-col sidebar-mobile
            ${sidebarOpen ? 'open' : ''}
          `}
          style={{
            background: 'linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 100%)',
            borderRight: '2px solid #94a3b8',
            boxShadow: '6px 0 32px rgba(0,0,0,0.15)'
          }}>
        {/* Logo/Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #1e293b 0%, #374151 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 16px rgba(30, 41, 59, 0.3)'
              }}>
                <span style={{
                  color: 'white',
                  fontWeight: '900',
                  fontSize: '18px'
                }}>GM</span>
              </div>
              <div>
                <h2 style={{
                  fontWeight: '800',
                  fontSize: '18px',
                  color: '#1e293b',
                  marginBottom: '2px'
                }}>Grade Manager</h2>
                <p style={{
                  fontSize: '12px',
                  color: '#64748b'
                }}>Panel de Control</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              style={{
                color: '#64748b',
                fontSize: '24px',
                padding: '8px',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
                display: 'block'
              }}
              className="lg:hidden"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f1f5f9';
                e.target.style.color = '#1e293b';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                e.target.style.color = '#64748b';
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ 
          flex: 1, 
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '16px',
          margin: '8px 16px',
          border: '1px solid #cbd5e1',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Dashboard - Active */}
            <a href="#" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 20px',
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              borderRadius: '12px',
              color: 'white',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '15px',
              boxShadow: '0 6px 16px rgba(15, 23, 42, 0.4)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateX(4px)';
              e.target.style.boxShadow = '0 8px 20px rgba(15, 23, 42, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateX(0)';
              e.target.style.boxShadow = '0 6px 16px rgba(15, 23, 42, 0.4)';
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}>
                📊
              </div>
              <span>Dashboard</span>
            </a>

            {/* Nueva Calificación */}
            <a href="#" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 20px',
              borderRadius: '12px',
              color: '#64748b',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '15px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(248, 250, 252, 0.8)';
              e.target.style.color = '#1e293b';
              e.target.style.transform = 'translateX(4px)';
              e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#64748b';
              e.target.style.transform = 'translateX(0)';
              e.target.style.boxShadow = 'none';
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                ➕
              </div>
              <span>Nueva Calificación</span>
            </a>

            {/* Estudiantes */}
            <a href="#" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 20px',
              borderRadius: '12px',
              color: '#64748b',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '15px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f1f5f9';
              e.target.style.color = '#1e293b';
              e.target.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#64748b';
              e.target.style.transform = 'translateX(0)';
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                👥
              </div>
              <span>Estudiantes</span>
            </a>

            {/* Reportes */}
            <a href="#" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 20px',
              borderRadius: '12px',
              color: '#64748b',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '15px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f1f5f9';
              e.target.style.color = '#1e293b';
              e.target.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#64748b';
              e.target.style.transform = 'translateX(0)';
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                📋
              </div>
              <span>Reportes</span>
            </a>

            {/* Configuración */}
            <a href="#" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 20px',
              borderRadius: '12px',
              color: '#64748b',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '15px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f1f5f9';
              e.target.style.color = '#1e293b';
              e.target.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#64748b';
              e.target.style.transform = 'translateX(0)';
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                ⚙️
              </div>
              <span>Configuración</span>
            </a>
          </div>
        </nav>

        {/* User Section */}
        <div style={{
          padding: '20px 24px',
          borderTop: '1px solid #e2e8f0',
          marginTop: 'auto'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #1e293b 0%, #374151 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 8px rgba(30, 41, 59, 0.2)'
            }}>
              <span style={{
                color: 'white',
                fontSize: '16px',
                fontWeight: '700'
              }}>A</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '2px'
              }}>Administrador</p>
              <p style={{
                fontSize: '12px',
                color: '#64748b'
              }}>admin@grademanager.com</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#ef4444',
              backgroundColor: 'transparent',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#fef2f2';
              e.target.style.borderColor = '#f87171';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = '#fecaca';
            }}
          >
            <span style={{ fontSize: '16px' }}>🚪</span>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto" style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          minHeight: '100vh'
        }}>
          {/* Mobile Header - ONLY VISIBLE ON MOBILE */}
          <div style={{
            backgroundColor: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            padding: '16px',
            display: 'block'
          }}
          className="lg:hidden">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                style={{
                  padding: '8px',
                  color: '#64748b',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f1f5f9';
                  e.target.style.color = '#1e293b';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#64748b';
                }}
              >
                <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div style={{
                color: '#1e293b',
                fontWeight: '600',
                fontSize: '16px'
              }}>Grade Manager</div>
              <div style={{ width: '32px' }} /> {/* Spacer */}
            </div>
          </div>

          {/* Desktop Sticky Header */}
          <div
            className="hidden lg:block"
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 30,
              background: 'rgba(248, 250, 252, 0.85)',
              backdropFilter: 'blur(10px)',
              borderBottom: '1px solid #e2e8f0'
            }}
          >
            <div
              style={{
                width: '100%',
                // Usa el ancho disponible del main restando el sidebar (~288px) + margen visual (~72px)
                // y limita superiormente para mantener legibilidad en monitores muy anchos
                maxWidth: '100%',
                margin: '0 auto',
                paddingTop: '12px',
                paddingBottom: '12px',
                paddingLeft: 'clamp(16px, 4vw, 48px)',
                paddingRight: 'clamp(16px, 4vw, 48px)'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a' }}>{getGreeting()}, Administrador</h1>
                  <p style={{ fontSize: '14px', color: '#64748b' }}>{formatDate(currentTime)}</p>
                </div>
                <div style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  fontWeight: 800,
                  color: '#0f172a',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '10px 16px',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.06)'
                }}>
                  {formatTime(currentTime)}
                </div>
              </div>
            </div>
          </div>

          {/* Responsive Container */}
          <div
            style={{
              width: '100%',
              maxWidth: '100%',
              margin: '0 auto',
              paddingTop: '16px',
              paddingBottom: '32px',
              paddingLeft: 'clamp(16px, 4vw, 48px)',
              paddingRight: 'clamp(16px, 4vw, 48px)'
            }}
          >
            {/* Header with Time - visible solo en mobile/tablet */}
            <div className="flex flex-col lg:hidden mb-6 space-y-2">
              <div className="animate-float">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                  {getGreeting()}, Administrador
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground mt-1">
                  {formatDate(currentTime)}
                </p>
              </div>
              <div className="text-left">
                <div className="text-lg sm:text-xl font-mono font-bold text-foreground bg-card border border-border rounded-lg px-3 sm:px-4 py-2 shadow-sm">
                  {formatTime(currentTime)}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Hora actual</p>
              </div>
            </div>

            {/* Module and Trimester Info */}
            <div style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #374151 50%, #1f2937 100%)',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '24px',
              color: 'white',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              border: '1px solid rgba(255,255,255,0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            className="sm:rounded-xl sm:p-6 lg:rounded-3xl lg:p-8 lg:mb-8">
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 30% 40%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)',
                pointerEvents: 'none'
              }}></div>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between relative z-10 space-y-6 lg:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 lg:space-x-6 space-y-4 sm:space-y-0">
                  <div style={{
                    fontSize: '48px',
                    animation: 'pulse 2s ease-in-out infinite',
                    filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.5))'
                  }}
                  className="text-center sm:text-left sm:text-5xl lg:text-7xl">
                    {getModuleIcon(academicSelection?.module?.name)}
                  </div>
                  <div className="text-center sm:text-left flex-1">
                    <h2 style={{
                      fontSize: '24px',
                      fontWeight: '900',
                      marginBottom: '8px',
                      background: 'linear-gradient(135deg, #ffffff 0%, #10b981 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                    className="sm:text-2xl lg:text-4xl">
                      {academicSelection?.module?.name || 'Módulo no seleccionado'}
                    </h2>
                    <p style={{
                      fontSize: '16px',
                      color: '#94a3b8',
                      marginBottom: '12px'
                    }}
                    className="sm:text-lg lg:text-xl lg:mb-4">
                      {academicSelection?.trimester?.name || 'Trimestre no seleccionado'}
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '12px',
                      color: '#cbd5e1'
                    }}
                    className="justify-center sm:justify-start sm:text-sm lg:gap-4">
                      <span>📅 Período activo</span>
                      <span className="hidden sm:inline">•</span>
                      <span>👨‍🏫 Profesor titular</span>
                    </div>
                  </div>
                </div>
                <div className="text-center lg:text-right">
                  <div style={{
                    padding: '16px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: '16px',
                    border: '2px solid rgba(16, 185, 129, 0.3)',
                    backdropFilter: 'blur(10px)'
                  }}
                  className="sm:p-5 lg:p-6 lg:rounded-2xl">
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#10b981',
                      marginBottom: '6px'
                    }}
                    className="sm:text-base lg:text-lg lg:mb-2">Progreso Global</div>
                    <div style={{
                      fontSize: '32px',
                      fontWeight: '900',
                      color: '#10b981',
                      textShadow: '0 0 20px rgba(16, 185, 129, 0.5)'
                    }}
                    className="sm:text-4xl lg:text-5xl">78%</div>
                    <div style={{
                      fontSize: '12px',
                      color: '#94a3b8'
                    }}
                    className="sm:text-sm lg:text-base">Este trimestre</div>
                  </div>
                </div>
          </div>
        </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 mb-6 lg:mb-8">
          <div className="p-4 sm:p-6 lg:p-8" style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-8px)';
            e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
          }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#64748b', marginBottom: '8px' }}>Estudiantes</p>
                <p style={{ fontSize: '32px', fontWeight: '800', color: '#1e293b', transition: 'color 0.3s ease' }}>{stats.students}</p>
                <p style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>Activos</p>
              </div>
              <div style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #10b981 0%, #06d6a0 100%)',
                borderRadius: '16px',
                boxShadow: '0 8px 16px rgba(16, 185, 129, 0.3)'
              }}>
                <span style={{ fontSize: '32px' }}>👥</span>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8" style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
            borderRadius: '16px',
            border: '1px solid #e0f2fe',
            boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-8px)';
            e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
          }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#64748b', marginBottom: '8px' }}>Calificaciones</p>
                <p style={{ fontSize: '32px', fontWeight: '800', color: '#1e293b' }}>{stats.grades}</p>
                <p style={{ fontSize: '12px', color: '#0ea5e9', fontWeight: '600' }}>Registradas</p>
              </div>
              <div style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
                borderRadius: '16px',
                boxShadow: '0 8px 16px rgba(14, 165, 233, 0.3)'
              }}>
                <span style={{ fontSize: '32px' }}>📝</span>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8" style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #fffbeb 100%)',
            borderRadius: '16px',
            border: '1px solid #fef3c7',
            boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-8px)';
            e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
          }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#64748b', marginBottom: '8px' }}>Promedio</p>
                <p style={{ fontSize: '32px', fontWeight: '800', color: '#1e293b' }}>{stats.average}</p>
                <p style={{ fontSize: '12px', color: '#f59e0b', fontWeight: '600' }}>General</p>
              </div>
              <div style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                borderRadius: '16px',
                boxShadow: '0 8px 16px rgba(245, 158, 11, 0.3)'
              }}>
                <span style={{ fontSize: '32px' }}>📊</span>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8" style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)',
            borderRadius: '16px',
            border: '1px solid #fecaca',
            boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-8px)';
            e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
          }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#64748b', marginBottom: '8px' }}>Pendientes</p>
                <p style={{ fontSize: '32px', fontWeight: '800', color: '#1e293b' }}>{stats.pending}</p>
                <p style={{ fontSize: '12px', color: '#ef4444', fontWeight: '600' }}>Por revisar</p>
              </div>
              <div style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
                borderRadius: '16px',
                boxShadow: '0 8px 16px rgba(239, 68, 68, 0.3)'
              }}>
                <span style={{ fontSize: '32px' }}>⏰</span>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8" style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
            borderRadius: '16px',
            border: '1px solid #bbf7d0',
            boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-8px)';
            e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
          }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#64748b', marginBottom: '8px' }}>Asistencia</p>
                <p style={{ fontSize: '32px', fontWeight: '800', color: '#1e293b' }}>{stats.attendance}%</p>
                <p style={{ fontSize: '12px', color: '#22c55e', fontWeight: '600' }}>Excelente</p>
              </div>
              <div style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)',
                borderRadius: '16px',
                boxShadow: '0 8px 16px rgba(34, 197, 94, 0.3)'
              }}>
                <span style={{ fontSize: '32px' }}>✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 mb-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-card rounded-2xl shadow-xl p-6 border border-border glass-effect">
            <h3 className="text-xl font-bold text-card-foreground mb-6">Actividad Reciente</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-primary/10 rounded-xl border border-primary/20 hover:bg-primary/20 transition-all">
                <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-card-foreground">Nueva calificación registrada</p>
                  <p className="text-sm text-muted-foreground">Juan Pérez - Examen parcial de {academicSelection?.module?.name}: 9.2</p>
                  <p className="text-xs text-muted-foreground">Hace 2 horas</p>
                </div>
                <span className="text-2xl">📝</span>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-chart-2/10 rounded-xl border border-chart-2/20 hover:bg-chart-2/20 transition-all">
                <div className="w-3 h-3 bg-chart-2 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-card-foreground">Reporte mensual generado</p>
                  <p className="text-sm text-muted-foreground">Reporte de progreso - {academicSelection?.trimester?.name}</p>
                  <p className="text-xs text-muted-foreground">Hace 1 día</p>
                </div>
                <span className="text-2xl">📊</span>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-chart-4/10 rounded-xl border border-chart-4/20 hover:bg-chart-4/20 transition-all">
                <div className="w-3 h-3 bg-chart-4 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-card-foreground">Recordatorio importante</p>
                  <p className="text-sm text-muted-foreground">5 calificaciones pendientes de revisar</p>
                  <p className="text-xs text-muted-foreground">Hace 2 días</p>
                </div>
                <span className="text-2xl">⚠️</span>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-accent/50 rounded-xl border border-accent hover:bg-accent/70 transition-all">
                <div className="w-3 h-3 bg-accent-foreground rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-card-foreground">Nuevo estudiante agregado</p>
                  <p className="text-sm text-muted-foreground">María González se unió al módulo de {academicSelection?.module?.name}</p>
                  <p className="text-xs text-muted-foreground">Hace 3 días</p>
                </div>
                <span className="text-2xl">👥</span>
              </div>
            </div>
            
            <button className="w-full mt-6 text-center py-3 text-sm text-card-foreground hover:text-primary font-medium bg-accent hover:bg-accent/80 rounded-xl transition-colors">
              Ver toda la actividad →
            </button>
          </div>

          {/* Quick Stats */}
          <div className="bg-card rounded-2xl shadow-xl p-6 border border-border glass-effect">
            <h3 className="text-xl font-bold text-card-foreground mb-6">Progreso del Trimestre</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-card-foreground">Calificaciones Completadas</span>
                  <span className="text-sm text-primary">78%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div className="bg-primary h-3 rounded-full shadow-lg transition-all duration-500" style={{width: '78%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-card-foreground">Asistencia General</span>
                  <span className="text-sm text-chart-2">94%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div className="bg-chart-2 h-3 rounded-full shadow-lg transition-all duration-500" style={{width: '94%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-card-foreground">Participación</span>
                  <span className="text-sm text-chart-4">85%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div className="bg-chart-4 h-3 rounded-full shadow-lg transition-all duration-500" style={{width: '85%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-card-foreground">Tareas Entregadas</span>
                  <span className="text-sm text-chart-1">92%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div className="bg-chart-1 h-3 rounded-full shadow-lg transition-all duration-500" style={{width: '92%'}}></div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-6 space-y-2">
              <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                Ver Calificaciones Detalladas
              </button>
              <button className="w-full bg-chart-2 hover:bg-chart-2/90 text-primary-foreground px-4 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                Generar Reporte Completo
              </button>
            </div>
          </div>
        </div>
        </div> {/* Cierra el contenedor responsive */}
      </main>
      </div>
    </div>
  )
}

export default Dashboard