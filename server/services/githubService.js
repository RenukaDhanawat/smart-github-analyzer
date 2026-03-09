import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
  },
});

export const fetchRepoData = async (owner, repo) => {
  const [repoInfo, languages, commits, readme] = await Promise.allSettled([
    github.get(`/repos/${owner}/${repo}`),
    github.get(`/repos/${owner}/${repo}/languages`),
    github.get(`/repos/${owner}/${repo}/commits?per_page=100`),
    github.get(`/repos/${owner}/${repo}/readme`),
  ]);

  if (repoInfo.status === 'rejected') {
    const status = repoInfo.reason?.response?.status;
    if (status === 404) throw { status: 404, message: 'Repository not found or is private' };
    if (status === 403) throw { status: 403, message: 'GitHub API rate limit exceeded. Try again later.' };
    throw { status: 500, message: 'Failed to fetch repository data' };
  }

  return {
    repoInfo: repoInfo.value.data,
    languages: languages.status === 'fulfilled' ? languages.value.data : {},
    commits: commits.status === 'fulfilled' ? commits.value.data : [],
    readme: readme.status === 'fulfilled' ? readme.value.data : null,
  };
};