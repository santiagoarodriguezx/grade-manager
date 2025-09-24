import Card from "./Card"

const StatCard = ({ title, value, subtitle, icon, color = "primary", trend = null, className = "" }) => {
  const colorConfigs = {
    primary: {
      bg: "from-purple-500 to-violet-600",
      text: "text-purple-400",
      iconBg: "bg-gradient-to-br from-purple-500 to-violet-600",
      trendUp: "text-green-400",
      trendDown: "text-red-400",
      glow: "shadow-purple-500/25",
    },
    success: {
      bg: "from-green-500 to-emerald-600",
      text: "text-green-400",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-600",
      trendUp: "text-green-400",
      trendDown: "text-red-400",
      glow: "shadow-green-500/25",
    },
    secondary: {
      bg: "from-amber-500 to-orange-600",
      text: "text-amber-400",
      iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
      trendUp: "text-green-400",
      trendDown: "text-red-400",
      glow: "shadow-amber-500/25",
    },
    danger: {
      bg: "from-red-500 to-rose-600",
      text: "text-red-400",
      iconBg: "bg-gradient-to-br from-red-500 to-rose-600",
      trendUp: "text-green-400",
      trendDown: "text-red-400",
      glow: "shadow-red-500/25",
    },
  }

  const config = colorConfigs[color] || colorConfigs.primary

  return (
    <Card variant="glass" hover className={`p-6 ${className} card-hover`}>
      <div className="flex items-start justify-between mb-6">
        <div
          className={`w-14 h-14 rounded-2xl ${config.iconBg} flex items-center justify-center shadow-lg ${config.glow} text-2xl`}
        >
          {icon}
        </div>

        {trend && (
          <div
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              trend.type === "up" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
            }`}
          >
            <span className="mr-1">{trend.type === "up" ? "↗" : "↘"}</span>
            {trend.value}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-3xl font-bold text-white">{value}</h3>
        <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider">{title}</p>
        {subtitle && <p className="text-sm text-gray-400 font-medium">{subtitle}</p>}
      </div>

      {/* Animated bottom accent line */}
      <div className="mt-6 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full bg-gradient-to-r ${config.bg} animate-pulse`} style={{ width: "70%" }} />
      </div>
    </Card>
  )
}

export default StatCard
