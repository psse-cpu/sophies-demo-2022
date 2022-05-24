import axios from 'axios'

export const backend = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ORIGIN,
  withCredentials: true,
})
