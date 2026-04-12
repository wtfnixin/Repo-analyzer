const { fetchGithubData, calculateStats } = require('../services/githubService');

const getGithubProfile = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) return res.status(400).json({ message: 'Username required' });

    const data = await fetchGithubData(username);
    const stats = calculateStats(data.user, data.repos);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getGithubProfile };
