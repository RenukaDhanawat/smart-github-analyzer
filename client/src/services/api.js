import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export const analyzeRepository = (repoUrl) =>
  api.post('/analyze', { repoUrl }).then(res => res.data)