export default function HealthScore({ score, breakdown }) {
  const getColor = (s) => {
    if (s >= 8) return { text: 'text-green-500', ring: '#22c55e', label: 'Excellent' }
    if (s >= 6) return { text: 'text-yellow-500', ring: '#eab308', label: 'Good' }
    if (s >= 4) return { text: 'text-orange-500', ring: '#f97316', label: 'Fair' }
    return { text: 'text-red-500', ring: '#ef4444', label: 'Poor' }
  }

  const { text, ring, label } = getColor(score)
  const circumference = 2 * Math.PI * 54
  const offset = circumference - (score / 10) * circumference

  const metrics = [
    { label: 'Documentation', value: breakdown.documentation, weight: '25%' },
    { label: 'Commit Activity', value: breakdown.activity, weight: '25%' },
    { label: 'Code Structure', value: breakdown.structure, weight: '20%' },
    { label: 'Lang Diversity', value: breakdown.diversity, weight: '15%' },
    { label: 'Popularity', value: breakdown.popularity, weight: '15%' },
  ]

  const getBarColor = (v) => {
    if (v >= 8) return 'bg-green-500'
    if (v >= 6) return 'bg-yellow-500'
    if (v >= 4) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Repository Health Score</h2>
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-36 h-36">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="10" />
            <circle
              cx="60" cy="60" r="54" fill="none"
              stroke={ring} strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${text}`}>{score}</span>
            <span className="text-xs text-gray-500">out of 10</span>
          </div>
        </div>
        <span className={`mt-2 text-lg font-semibold ${text}`}>{label}</span>
      </div>
      <div className="space-y-3">
        {metrics.map(m => (
          <div key={m.label}>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>{m.label} <span className="text-gray-400">({m.weight})</span></span>
              <span className="font-semibold">{m.value}/10</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getBarColor(m.value)} transition-all duration-700`}
                style={{ width: `${m.value * 10}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}