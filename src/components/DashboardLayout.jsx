"use client";

import Sidebar from "./Sidebar";

const DashboardLayout = ({
  children,
  user,
  onLogout,
  onNavigate,
  currentPage,
  userType,
}) => {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        user={user}
        onLogout={onLogout}
        onNavigate={onNavigate}
        currentPage={currentPage}
        userType={userType}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default DashboardLayout;
