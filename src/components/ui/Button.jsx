const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  icon = null,
  iconPosition = "left",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed relative overflow-hidden"

  const variants = {
    primary:
      "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/25 focus:ring-purple-500 disabled:from-gray-600 disabled:to-gray-600",
    secondary:
      "bg-gray-800/80 backdrop-blur-sm border border-white/20 text-gray-200 hover:bg-gray-700/80 hover:border-white/30 focus:ring-gray-500 disabled:text-gray-500 disabled:border-gray-700",
    success:
      "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl hover:shadow-green-500/25 focus:ring-green-500 disabled:from-gray-600 disabled:to-gray-600",
    danger:
      "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg hover:shadow-xl hover:shadow-red-500/25 focus:ring-red-500 disabled:from-gray-600 disabled:to-gray-600",
    ghost: "text-gray-300 hover:text-white hover:bg-white/10 focus:ring-gray-500 backdrop-blur-sm",
    outline:
      "border border-purple-500 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 focus:ring-purple-500 disabled:border-gray-600 disabled:text-gray-500",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-xl",
    md: "px-6 py-3 text-sm rounded-xl",
    lg: "px-8 py-4 text-base rounded-2xl",
    xl: "px-10 py-5 text-lg rounded-2xl",
  }

  const hoverEffects = !disabled ? "hover:scale-[1.02] active:scale-[0.98]" : ""

  return (
    <button
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${hoverEffects}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {/* Shimmer effect for primary buttons */}
      {variant === "primary" && !disabled && (
        <div className="absolute inset-0 -top-px overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
      )}

      {loading && (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
      )}

      {icon && iconPosition === "left" && !loading && <span className="mr-2 text-lg">{icon}</span>}

      {children}

      {icon && iconPosition === "right" && !loading && <span className="ml-2 text-lg">{icon}</span>}
    </button>
  )
}

export default Button
