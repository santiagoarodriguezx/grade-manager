import {
  SparklesIcon,
  ChartBarIcon,
  UserGroupIcon,
  RocketLaunchIcon,
  AcademicCapIcon,
  UsersIcon,
} from "@heroicons/react/24/outline"

const WelcomeSection = () => {
  return (
    <div className="w-1/2 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-12">
        <div className="max-w-lg text-white">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="mx-auto w-28 h-28 glass-card rounded-3xl flex items-center justify-center mb-8">
              <div className="relative">
                <AcademicCapIcon className="w-14 h-14 text-blue-600" />
                <SparklesIcon className="w-6 h-6 text-blue-400 absolute -top-2 -right-2 animate-pulse" />
              </div>
            </div>
            <h1 className="text-5xl font-black mb-4 gradient-text text-shadow">Grade Manager</h1>
            <p className="text-xl text-white/90 font-medium mb-6">Sistema Inteligente de Gestión Académica</p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse status-online"></div>
              <span className="text-sm text-white/70 font-medium">Sistema Activo</span>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6 mb-12">
            {[
              {
                icon: ChartBarIcon,
                title: "IA Predictiva",
                description: "Análisis inteligente del rendimiento estudiantil",
                gradient: "bg-gradient-primary",
              },
              {
                icon: UserGroupIcon,
                title: "Gestión Unificada",
                description: "Control total de estudiantes y profesores",
                gradient: "bg-gradient-secondary",
              },
              {
                icon: RocketLaunchIcon,
                title: "Innovación Educativa",
                description: "Herramientas de vanguardia para la excelencia",
                gradient: "bg-gradient-success",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 animate-fade-in-up card-hover"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className={`w-14 h-14 ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">{feature.title}</h3>
                  <p className="text-white/80 text-sm font-medium">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12 animate-fade-in-up stagger-3">
            {[
              { value: "2.5K+", label: "Estudiantes", icon: UsersIcon },
              { value: "150+", label: "Profesores", icon: AcademicCapIcon },
              { value: "98%", label: "Satisfacción", icon: ChartBarIcon },
            ].map((stat, index) => (
              <div key={index} className="glass-card p-4 text-center card-hover">
                <div className="w-8 h-8 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                  <stat.icon className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/70 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="text-center animate-fade-in-up stagger-4">
            <div className="glass-card p-6 rounded-2xl">
              <blockquote className="text-lg italic text-white/90 mb-3">
                "La tecnología al servicio de la educación del futuro"
              </blockquote>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">GM</span>
                </div>
                <cite className="text-sm text-white/70 font-medium">Grade Manager Team</cite>
              </div>
            </div>
          </div>

          {/* Floating action hint */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="glass-card px-4 py-2 rounded-full">
              <span className="text-sm text-white/80 font-medium">Inicia sesión para continuar →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeSection
