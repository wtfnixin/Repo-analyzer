const axios = require('axios');

const GITHUB_API_BASE = 'https://api.github.com';

async function fetchGithubData(username) {
  try {
    const [userRes, reposRes] = await Promise.all([
      axios.get(`${GITHUB_API_BASE}/users/${username}`),
      axios.get(`${GITHUB_API_BASE}/users/${username}/repos?per_page=100`)
    ]);
    return { user: userRes.data, repos: reposRes.data };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch GitHub data');
  }
}

function calculateStats(user, repos) {
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const languages = repos.reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {});
  const topRepos = repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
    .map(repo => ({ name: repo.name, stars: repo.stargazers_count, language: repo.language }));

  return {
    profile: user,
    stats: {
      totalRepos: repos.length,
      totalStars,
      languages: Object.entries(languages).sort(([,a], [,b]) => b - a),
    },
    topRepos
  };
}

module.exports = { fetchGithubData, calculateStats };
