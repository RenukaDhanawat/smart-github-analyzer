import { useState } from 'react'

export default function SearchBar({ onAnalyze, loading }) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  const validate = (value) => {
    if (!value) return 'Please enter a GitHub repository URL'
    if (!value.match(/github\.com\/[^/]+\/[^/]+/)) return 'Invalid GitHub URL. Example: https://github.com/user/repo'
    return ''
  }

  const handleSubmit = () => {
    const err = validate(url)
    if (err) { setError(err); return }
    setError('')
    onAnalyze(url)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={url}
          onChange={e => { setUrl(e.target.value); setError('') }}
          onKeyDown={handleKeyDown}
          placeholder="https://github.com/username/repository"
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 text-sm"
          disabled={loading}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors duration-200 text-sm whitespace-nowrap"
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
    </div>
  )
}