import { AcademicCapIcon, ChartBarIcon, UserGroupIcon, StarIcon } from '@heroicons/react/24/outline'

const WelcomeSection = () => {
  return (
    <div 
      className="w-half flex items-center justify-center"
      style={{
        background: `
          linear-gradient(
            to bottom right, 
            rgba(67, 56, 202, 0.8), 
            rgba(99, 102, 241, 0.8)
          ),
          linear-gradient(
            rgba(0, 0, 0, 0.3), 
            rgba(0, 0, 0, 0.3)
          ),
          url('/images/Generated Image September 17, 2025 - 4_12PM.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
      }}
    >

      {/* Contenido sobre la imagen */}
      <div className="relative text-white px-12 py-8 max-w-lg">
        {/* Logo y título principal */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
            <AcademicCapIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-3 animate-fade-in">
            Grade Manager
          </h1>
          <p className="text-xl text-blue-100 font-light animate-slide-up">
            Sistema de Gestión de Calificaciones
          </p>
        </div>

        {/* Características principales */}
        <div className="space-y-6 animate-slide-up">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <ChartBarIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Análisis Avanzado</h3>
              <p className="text-blue-100 text-sm">Reportes detallados del rendimiento estudiantil</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <UserGroupIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Gestión Integral</h3>
              <p className="text-blue-100 text-sm">Administra estudiantes, profesores y cursos</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <StarIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Excelencia Educativa</h3>
              <p className="text-blue-100 text-sm">Herramientas para mejorar la calidad educativa</p>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold">1000+</div>
            <div className="text-blue-100 text-sm">Estudiantes</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold">50+</div>
            <div className="text-blue-100 text-sm">Profesores</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold">25+</div>
            <div className="text-blue-100 text-sm">Cursos</div>
          </div>
        </div>

        {/* Quote inspiracional */}
        <div className="mt-8 text-center">
          <blockquote className="text-lg italic text-blue-100">
            "La educación es el arma más poderosa que puedes usar para cambiar el mundo"
          </blockquote>
          <cite className="text-sm text-blue-200 mt-2 block">- Nelson Mandela</cite>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-white bg-opacity-5 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-white bg-opacity-5 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
    </div>
  )
}

export default WelcomeSection