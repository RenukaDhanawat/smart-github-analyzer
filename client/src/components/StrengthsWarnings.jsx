export default function StrengthsWarnings({ strengths, warnings }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          ✅ <span>Strengths</span>
          <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
            {strengths.length}
          </span>
        </h2>
        {strengths.length === 0 ? (
          <p className="text-gray-500 text-sm">No strengths identified</p>
        ) : (
          <ul className="space-y-2">
            {strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5 flex-shrink-0">●</span>
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          ⚠️ <span>Warnings</span>
          <span className="ml-auto text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
            {warnings.length}
          </span>
        </h2>
        {warnings.length === 0 ? (
          <p className="text-gray-500 text-sm">No warnings — great repository!</p>
        ) : (
          <ul className="space-y-2">
            {warnings.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-yellow-500 mt-0.5 flex-shrink-0">●</span>
                {w}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}