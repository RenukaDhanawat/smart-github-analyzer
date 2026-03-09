import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import RepoOverview from '../components/RepoOverview'
import HealthScore from '../components/HealthScore'
import LanguageChart from '../components/LanguageChart'
import StrengthsWarnings from '../components/StrengthsWarnings'

export default function Dashboard() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const data = state?.data

  useEffect(() => {
    if (!data) navigate('/')
  }, [data, navigate])

  if (!data) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔍</span>
            <span className="font-bold text-gray-800">GitHub Analyzer</span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            ← Analyze Another
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Repo Overview */}
        <RepoOverview repoInfo={data.repoInfo} commits={data.commits} />

        {/* Score + Languages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HealthScore score={data.score} breakdown={data.breakdown} />
          <LanguageChart languages={data.languages} />
        </div>

        {/* Strengths + Warnings */}
        <StrengthsWarnings strengths={data.strengths} warnings={data.warnings} />

        {/* Score Summary Banner */}
        <div className={`rounded-2xl p-6 text-center text-white shadow-md ${
          data.score >= 8 ? 'bg-green-500' :
          data.score >= 6 ? 'bg-yellow-500' :
          data.score >= 4 ? 'bg-orange-500' : 'bg-red-500'
        }`}>
          <p className="text-lg font-bold">
            Repository Health Score: {data.score} / 10
          </p>
          <p className="text-sm opacity-90 mt-1">
            {data.score >= 8 ? '🏆 Excellent repository — production ready and well maintained' :
             data.score >= 6 ? '👍 Good repository — some improvements recommended' :
             data.score >= 4 ? '⚠️ Fair repository — needs significant improvements' :
             '❌ Poor repository — major issues found'}
          </p>
        </div>
      </main>

      <footer className="py-6 text-center text-gray-400 text-sm mt-4">
        Smart GitHub Analyzer — Built with React & Node.js
      </footer>
    </div>
  )
}