const Badge = ({ children, variant = "default", size = "md", className = "", icon = null, ...props }) => {
  const baseStyles = "inline-flex items-center font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm"

  const variants = {
    default: "bg-gray-800/80 text-gray-200 border border-gray-700",
    primary: "bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-500/25",
    success: "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25",
    warning: "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25",
    danger: "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25",
    info: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25",
    purple: "bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-500/25",
    pink: "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/25",
    indigo: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25",
    gradient: "bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-500/25",
    dark: "bg-gray-900/90 text-gray-100 border border-gray-700",
    light: "bg-white/10 text-gray-200 border border-white/20 backdrop-blur-sm",
    glass: "bg-white/5 text-gray-200 border border-white/10 backdrop-blur-xl",
  }

  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-sm font-bold",
  }

  return (
    <span
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${className}
      `}
      {...props}
    >
      {icon && <span className="mr-2 text-base">{icon}</span>}
      {children}
    </span>
  )
}

export default Badge
