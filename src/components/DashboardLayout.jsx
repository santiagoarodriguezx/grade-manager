"use client"

import Sidebar from "./Sidebar"

const DashboardLayout = ({ children, user, onLogout, onNavigate, currentPage, userType }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex">
      {/* Sidebar */}
      <Sidebar 
        user={user}
        onLogout={onLogout}
        onNavigate={onNavigate}
        currentPage={currentPage}
        userType={userType}
      />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout