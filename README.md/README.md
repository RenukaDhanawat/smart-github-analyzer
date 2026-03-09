# 🔍 Smart GitHub Analyzer

A web-based tool that analyzes any public GitHub repository and generates an instant health report with scores, insights, and recommendations.

🌐 **Live Demo:** [smart-github-analyzer.vercel.app](https://smart-github-analyzer.vercel.app)

---

## ✨ Features

- 📊 **Repository Health Score** — Get a score from 0-10 based on multiple metrics
- 📝 **Documentation Quality** — Analyzes README completeness and structure
- ⚡ **Commit Activity** — Tracks recent commits and development frequency
- 🌐 **Language Distribution** — Visual pie chart of languages used
- ⭐ **Popularity Metrics** — Stars, forks, watchers and open issues
- ✅ **Strengths & Warnings** — Clear actionable insights about the repository

---

## 🖥️ Screenshots

### Home Page
> Enter any GitHub repository URL and click Analyze

### Dashboard
> View detailed health report with scores, charts and insights

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+
- GitHub Personal Access Token
- MongoDB Atlas account (free)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/RenukaDhanawat/smart-github-analyzer.git
cd smart-github-analyzer
```

**2. Setup Backend**
```bash
cd server
npm install
```

Create `server/.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GITHUB_TOKEN=your_github_personal_access_token
CLIENT_URL=http://localhost:5173
```

Start the backend:
```bash
npm run dev
```

**3. Setup Frontend**
```bash
cd ../client
npm install
```

Create `client/.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

**4. Open your browser**
```
http://localhost:5173
```

---

## 🔑 Getting a GitHub Token

1. Go to GitHub → Settings → Developer Settings
2. Click Personal Access Tokens → Tokens (classic)
3. Click Generate new token (classic)
4. Check ✅ `public_repo`
5. Copy the token and paste it in `server/.env`

---

## 📊 How Health Score Works

| Metric | Weight | Description |
|--------|--------|-------------|
| Documentation | 25% | README quality and completeness |
| Commit Activity | 25% | Recent commits and frequency |
| Code Structure | 20% | Repository size and organization |
| Language Diversity | 15% | Number of languages used |
| Popularity | 15% | Stars, forks and watchers |

### Score Ratings
| Score | Rating |
|-------|--------|
| 8-10 | 🏆 Excellent |
| 6-7 | 👍 Good |
| 4-5 | ⚠️ Fair |
| 0-3 | ❌ Poor |

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Recharts
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- GitHub REST API
- Helmet & Rate Limiting

### Database
- MongoDB Atlas

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## 📁 Project Structure
```
smart-github-analyzer/
├── client/                  # React frontend
│   ├── public/
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── HealthScore.jsx
│   │   │   ├── LanguageChart.jsx
│   │   │   ├── RepoOverview.jsx
│   │   │   └── StrengthsWarnings.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
│
├── server/                  # Node.js backend
│   ├── controllers/
│   │   └── analyzeController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Report.js
│   ├── routes/
│   │   └── analyzeRoutes.js
│   ├── services/
│   │   ├── githubService.js
│   │   └── scoringService.js
│   └── server.js
│
└── README.md
```

---

## 🌐 API Endpoints

### Analyze Repository
```
POST /api/analyze
```

**Request Body:**
```json
{
  "repoUrl": "https://github.com/facebook/react"
}
```

**Response:**
```json
{
  "repoInfo": { ... },
  "languages": [ ... ],
  "commits": { ... },
  "score": 8.8,
  "breakdown": { ... },
  "strengths": [ ... ],
  "warnings": [ ... ]
}
```

---

## 🔮 Future Enhancements

- [ ] AI-based code quality analysis
- [ ] Compare two repositories side by side
- [ ] GitHub profile analyzer
- [ ] Pull request analysis
- [ ] Security vulnerability detection
- [ ] Historical score tracking
- [ ] Private repo support with OAuth

---

## 📄 License

This project is licensed under the MIT License.

---

## 👩‍💻 Author

**Renuka Dhanawat**
- GitHub: [@RenukaDhanawat](https://github.com/RenukaDhanawat)
- Live Project: [smart-github-analyzer.vercel.app](https://smart-github-analyzer.vercel.app)

---

⭐ If you found this useful, please give it a star on GitHub!