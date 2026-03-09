import { fetchRepoData } from '../services/githubService.js';
import { computeHealthScore } from '../services/scoringService.js';

export const analyzeRepo = async (req, res, next) => {
  try {
    const { repoUrl } = req.body;

    if (!repoUrl || typeof repoUrl !== 'string') {
      return res.status(400).json({ error: 'Repository URL is required' });
    }

    const trimmed = repoUrl.trim().replace(/\/$/, '');
    const match = trimmed.match(/github\.com\/([^/]+)\/([^/\s]+)/);
    if (!match) {
      return res.status(400).json({ error: 'Invalid GitHub repository URL. Example: https://github.com/user/repo' });
    }

    const [, owner, repo] = match;

    const data = await fetchRepoData(owner, repo);
    const analysis = computeHealthScore(data);

    const totalBytes = Object.values(data.languages).reduce((a, b) => a + b, 0);
    const languageStats = Object.entries(data.languages)
      .map(([lang, bytes]) => ({
        name: lang,
        percentage: parseFloat(((bytes / totalBytes) * 100).toFixed(1)),
        bytes,
      }))
      .sort((a, b) => b.percentage - a.percentage);

    const result = {
      repoInfo: {
        name: data.repoInfo.name,
        owner: data.repoInfo.owner.login,
        avatarUrl: data.repoInfo.owner.avatar_url,
        description: data.repoInfo.description,
        stars: data.repoInfo.stargazers_count,
        forks: data.repoInfo.forks_count,
        watchers: data.repoInfo.watchers_count,
        size: data.repoInfo.size,
        lastUpdated: data.repoInfo.updated_at,
        createdAt: data.repoInfo.created_at,
        url: data.repoInfo.html_url,
        defaultBranch: data.repoInfo.default_branch,
        openIssues: data.repoInfo.open_issues_count,
        topics: data.repoInfo.topics || [],
        license: data.repoInfo.license?.name || null,
      },
      languages: languageStats,
      commits: {
        total: data.commits.length,
        lastCommit: data.commits[0]?.commit?.author?.date || null,
      },
      ...analysis,
    };

    res.json(result);
  } catch (err) {
    next(err);
  }
};