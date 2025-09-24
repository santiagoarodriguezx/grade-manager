import React, { useState } from "react";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AllGrades from "./pages/AllGrades";
import FullSchedule from "./pages/FullSchedule";
import AllReports from "./pages/AllReports";
import StudentsList from "./pages/StudentsList";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import NewGrade from "./pages/NewGrade";
import Modules from "./pages/Modules";
import WelcomeSection from "./components/WelcomeSection";
import DashboardLayout from "./components/DashboardLayout";

// Componente interno que maneja la navegación
const AppContent = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("dashboard");

  // Si no hay usuario logueado, mostrar Login
  if (!currentUser) {
    return (
      <div className="min-h-screen flex">
        {/* Lado izquierdo - Imagen con información (50%) */}
        <WelcomeSection />

        {/* Lado derecho - Login (50%) */}
        <div className="w-1/2 flex items-center justify-center bg-gray-50 p-8">
          <Login onLoginSuccess={(userData) => setCurrentUser(userData)} />
        </div>
      </div>
    );
  }

  // Mostrar Dashboard apropiado según tipo de usuario
  if (currentUser.type === "estudiante") {
    // Navegación para estudiantes
    const renderStudentPage = () => {
      switch (currentPage) {
        case "allGrades":
          return <AllGrades user={currentUser} />;
        case "fullSchedule":
          return <FullSchedule user={currentUser} />;
        case "notifications":
          return <Notifications />;
        default:
          return (
            <StudentDashboard
              user={currentUser}
              onNavigate={(page) => setCurrentPage(page)}
            />
          );
      }
    };

    return (
      <DashboardLayout
        user={currentUser}
        onLogout={() => setCurrentUser(null)}
        onNavigate={(page) => setCurrentPage(page)}
        currentPage={currentPage}
        userType="estudiante"
      >
        {renderStudentPage()}
      </DashboardLayout>
    );
  } else if (currentUser.type === "aprendiz") {
    // Navegación para profesores
    const renderTeacherPage = () => {
      switch (currentPage) {
        case "newGrade":
          return <NewGrade />;
        case "studentsList":
          return <StudentsList user={currentUser} />;
        case "allReports":
          return <AllReports user={currentUser} />;
        case "modules":
          return <Modules />;
        case "settings":
          return <Settings user={currentUser} />;
        default:
          return (
            <TeacherDashboard
              user={currentUser}
              onNavigate={(page) => setCurrentPage(page)}
            />
          );
      }
    };

    return (
      <DashboardLayout
        user={currentUser}
        onLogout={() => setCurrentUser(null)}
        onNavigate={(page) => setCurrentPage(page)}
        currentPage={currentPage}
        userType="aprendiz"
      >
        {renderTeacherPage()}
      </DashboardLayout>
    );
  }

  // Fallback - mostrar dashboard de estudiante por defecto
  return (
    <DashboardLayout
      user={currentUser}
      onLogout={() => setCurrentUser(null)}
      onNavigate={(page) => setCurrentPage(page)}
      currentPage={currentPage}
      userType="estudiante"
    >
      <StudentDashboard
        user={currentUser}
        onNavigate={(page) => setCurrentPage(page)}
      />
    </DashboardLayout>
  );
};

function App() {
  return <AppContent />;
}

export default App;
