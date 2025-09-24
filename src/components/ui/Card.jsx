const Card = ({
  children,
  className = "",
  variant = "default",
  hover = false,
  clickable = false,
  selected = false,
  ...props
}) => {
  const baseStyles = "rounded-2xl transition-all duration-300 ease-out"

  const variants = {
    default: "bg-gray-900/80 backdrop-blur-sm shadow-lg border border-white/10",
    gradient: "bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm shadow-xl border border-white/20",
    glass: "bg-white/5 backdrop-blur-xl shadow-2xl border border-white/10",
    elevated: "bg-gray-900/90 backdrop-blur-sm shadow-2xl border border-white/20",
    soft: "bg-gray-800/50 backdrop-blur-sm shadow-lg border border-white/5",
  }

  const hoverStyles = hover ? "hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] hover:border-purple-500/30" : ""
  const clickableStyles = clickable ? "cursor-pointer active:scale-[0.98]" : ""
  const selectedStyles = selected ? "ring-2 ring-purple-500 shadow-lg shadow-purple-500/20 border-purple-500/50" : ""

  return (
    <div
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${hoverStyles} 
        ${clickableStyles} 
        ${selectedStyles} 
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
