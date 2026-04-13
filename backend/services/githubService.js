const axios = require('axios');

const GITHUB_API_BASE = 'https://api.github.com';

// BACK TO ORIGINAL - NO TOKEN, basic calls (rate limit resets hourly)
async function fetchGithubData(username) {
  const headers = { 'User-Agent': 'GitHubProfileAnalyzer/1.0' };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  
  try {
    const [userRes, reposRes] = await Promise.all([
      axios.get(`${GITHUB_API_BASE}/users/${username}`, { headers }),
      axios.get(`${GITHUB_API_BASE}/users/${username}/repos?per_page=100`, { headers })
    ]);
    return { user: userRes.data, repos: reposRes.data };
  } catch (error) {
    console.error('API Error:', error.response?.status, error.response?.data?.message);
    if (error.response?.status === 403 || error.response?.status === 429) {
      throw new Error('Rate limited (IP: 74.220.48.243). Wait 1hr - resets automatically');
    }
    throw new Error(error.response?.data?.message || 'Failed to fetch');
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

