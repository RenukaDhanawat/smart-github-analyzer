import { useState } from 'react'

export default function RepoOverview({ repoInfo, commits }) {
  const [imgError, setImgError] = useState(false)

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  })

  const formatSize = (kb) => {
    if (kb > 1024) return `${(kb / 1024).toFixed(1)} MB`
    return `${kb} KB`
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-start gap-4 mb-4">
        {!imgError ? (
          <img
            src={repoInfo.avatarUrl}
            alt={repoInfo.owner}
            onError={() => setImgError(true)}
            className="w-14 h-14 rounded-full border border-gray-200"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
            {repoInfo.owner[0].toUpperCase()}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <a href={repoInfo.url} target="_blank" rel="noreferrer"
            className="text-xl font-bold text-blue-600 hover:underline truncate block">
            {repoInfo.owner}/{repoInfo.name}
          </a>
          <p className="text-gray-500 text-sm mt-1">{repoInfo.description || 'No description provided'}</p>
        </div>
      </div>

      {repoInfo.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {repoInfo.topics.map(t => (
            <span key={t} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: '⭐ Stars', value: repoInfo.stars.toLocaleString() },
          { label: '🍴 Forks', value: repoInfo.forks.toLocaleString() },
          { label: '👁️ Watchers', value: repoInfo.watchers.toLocaleString() },
          { label: '🐛 Issues', value: repoInfo.openIssues.toLocaleString() },
          { label: '📦 Size', value: formatSize(repoInfo.size) },
          { label: '🌿 Branch', value: repoInfo.defaultBranch },
          { label: '📅 Updated', value: formatDate(repoInfo.lastUpdated) },
          { label: '📜 License', value: repoInfo.license || 'None' },
        ].map(item => (
          <div key={item.label} className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">{item.label}</p>
            <p className="text-sm font-semibold text-gray-800 truncate">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex gap-6 text-sm text-gray-600">
        <span>📝 <strong>{commits.total}+</strong> commits</span>
        <span>🕐 Last commit: <strong>{formatDate(commits.lastCommit)}</strong></span>
      </div>
    </div>
  )
}