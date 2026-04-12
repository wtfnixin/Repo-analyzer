# GitHub Profile Analyzer 🚀

Full-stack web app to analyze GitHub user profiles - stats, top repos, language usage.

## ✨ Features

- Profile overview (avatar, repos, followers)
- Total stars across all repos
- Most used languages
- Top 5 starred repos
- Modern responsive UI
- Loading states & error handling
- GitHub REST API integration

## 🛠 Tech Stack

**Backend:** Node.js + Express
- GitHub API fetching
- Stats aggregation
- Rate limiting

**Frontend:** React + Vite + Tailwind CSS
- Responsive design
- Inline styles (solid colors, Inter font)
- Axios for API calls

## 📋 Prerequisites

- Node.js 18+
- Backend port 5000 free
- Frontend port 5173 free

## 🚀 Quick Start

### 1. Backend
```bash
cd backend
npm install
npm start
```
Server: `http://localhost:5000`

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
App: `http://localhost:5173`

### 3. Test
1. Open frontend
2. Search `octocat`
3. View stats/profile/repos/languages

## 🏗 Project Structure

```
.
├── backend/
│   ├── server.js              # Express server
│   ├── routes/githubRoutes.js # API /api/github/:username
│   ├── controllers/githubController.js
│   ├── services/githubService.js # API calls + stats
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main app (search + UI)
│   │   ├── main.jsx           # React entry
│   │   └── index.css
│   ├── vite.config.js
│   ├── index.html
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

```
GET /api/github/:username
```
Response:
```json
{
  "profile": { ... },
  "stats": { "totalStars": 1234, "totalRepos": 56, "languages": [["JavaScript", 12], ...] },
  "topRepos": [{ "name": "repo", "stars": 100, "language": "JS" }, ...]
}
```

## 🎨 UI Design

- **Colors:** Solid blue (#3b82f6), emerald (#059669), purple (#7c3aed), amber (#d97706)
- **Font:** Inter (Google Fonts ready)
- **Style:** Cards, hover effects, shadows, rounded corners
- **Responsive:** Mobile-first

## 🧪 Testing

```bash
# Test API
curl http://localhost:5000/api/github/octocat

# Frontend dev
cd frontend && npm run dev
```

## 🔒 Rate Limiting

Express-rate-limit protects GitHub API calls (15/min IP).

## 📈 Future Enhancements

- [ ] Recharts pie/bar charts
- [ ] Redis caching
- [ ] User auth/compare
- [ ] Export PDF/CSV
- [ ] Dark mode

## 🤝 Contributing

1. Fork repo
2. Create feature branch
3. PR to main

## 📄 License

MIT
