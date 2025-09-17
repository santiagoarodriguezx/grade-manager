import Login from './pages/Login'
import WelcomeSection from './components/WelcomeSection'

function App() {
  return (
    <div className="min-h-screen flex">
      {/* Lado izquierdo - Imagen con información (50%) */}
      <WelcomeSection />
      
      {/* Lado derecho - Login (50%) */}
      <div className="w-half flex items-center justify-center bg-gray-50">
        <Login />
      </div>
    </div>
  )
}

export default App