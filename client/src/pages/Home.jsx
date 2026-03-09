import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { analyzeRepository } from '../services/api'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleAnalyze = async (url) => {
    setLoading(true)
    setError('')
    try {
      const data = await analyzeRepository(url)
      navigate('/dashboard', { state: { data } })
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const examples = [
    'https://github.com/facebook/react',
    'https://github.com/vuejs/vue',
    'https://github.com/torvalds/linux',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      {/* Header */}
      <header className="py-6 px-6 flex items-center justify-between max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔍</span>
          <span className="font-bold text-gray-800 text-lg">GitHub Analyzer</span>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>⚡</span> Instant Repository Health Analysis
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Analyze Any GitHub
            <span className="text-blue-600"> Repository</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Get instant insights on code quality, documentation, commit activity,
            and an overall health score for any public GitHub repository.
          </p>
        </div>

        <SearchBar onAnalyze={handleAnalyze} loading={loading} />

        {error && (
          <div className="mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm max-w-2xl w-full">
            ❌ {error}
          </div>
        )}

        {loading && (
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 text-sm">Fetching repository data...</p>
          </div>
        )}

        {/* Example repos */}
        {!loading && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400 mb-3">Try an example:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {examples.map(ex => (
                <button
                  key={ex}
                  onClick={() => handleAnalyze(ex)}
                  className="px-3 py-1.5 bg-white border border-gray-200 hover:border-blue-400 hover:text-blue-600 text-gray-600 text-xs rounded-lg transition-colors duration-200 shadow-sm"
                >
                  {ex.replace('https://github.com/', '')}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl w-full">
          {[
            { icon: '📊', label: 'Health Score', desc: '0-10 rating' },
            { icon: '📝', label: 'Documentation', desc: 'README analysis' },
            { icon: '⚡', label: 'Activity', desc: 'Commit tracking' },
            { icon: '🌐', label: 'Languages', desc: 'Distribution chart' },
          ].map(f => (
            <div key={f.label} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">{f.icon}</div>
              <p className="text-sm font-semibold text-gray-700">{f.label}</p>
              <p className="text-xs text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-6 text-center text-gray-400 text-sm">
        Smart GitHub Analyzer — Built with React & Node.js
      </footer>
    </div>
  )
}