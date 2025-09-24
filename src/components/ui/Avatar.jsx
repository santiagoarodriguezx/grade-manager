"use client";

const Avatar = ({ name, size = "md", className = "" }) => {
  // Función para obtener las iniciales del nombre
  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  // Colores consistentes con la nueva guía de estilo - Grade Manager
  const avatarColors = [
    "bg-gradient-to-r from-blue-500 to-blue-700",      // Primary variant
    "bg-gradient-to-r from-green-500 to-green-600",    // Success
    "bg-gradient-to-r from-indigo-500 to-indigo-600",  // Primary dark
    "bg-gradient-to-r from-purple-500 to-purple-600",  // Accent
    "bg-gradient-to-r from-teal-500 to-teal-600",      // Secondary variant
    "bg-gradient-to-r from-cyan-500 to-cyan-600",      // Info
    "bg-gradient-to-r from-rose-500 to-rose-600",      // Error variant
    "bg-gradient-to-r from-amber-500 to-amber-600"     // Warning variant
  ];

  // Función para obtener un color basado en el nombre (siempre el mismo color para el mismo nombre)
  const getAvatarColor = (name) => {
    if (!name) return avatarColors[0];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % avatarColors.length;
    return avatarColors[index];
  };

  // Tamaños predefinidos
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-lg",
    lg: "w-16 h-16 text-xl",
    xl: "w-20 h-20 text-2xl"
  };

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        ${getAvatarColor(name)} 
        flex items-center justify-center 
        shadow-lg 
        ring-2 ring-white 
        transition-all duration-200 
        hover:scale-105 
        ${className}
      `}
    >
      <span className="text-white font-bold drop-shadow-sm">
        {getInitials(name)}
      </span>
    </div>
  );
};

export default Avatar;