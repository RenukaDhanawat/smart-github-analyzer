import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#ec4899','#84cc16']

export default function LanguageChart({ languages }) {
  if (!languages || languages.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Language Distribution</h2>
        <p className="text-gray-500 text-sm">No language data available</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Language Distribution</h2>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={languages}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="percentage"
            nameKey="name"
          >
            {languages.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => `${v}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-2 space-y-2">
        {languages.map((lang, i) => (
          <div key={lang.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className="text-gray-700">{lang.name}</span>
            </div>
            <span className="font-semibold text-gray-800">{lang.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}