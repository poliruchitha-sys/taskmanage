import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add token to requests if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (name, email, password) => 
    API.post('/auth/register', { name, email, password }),
  login: (email, password) => 
    API.post('/auth/login', { email, password })
};

export const taskAPI = {
  getTasks: () => API.get('/tasks'),
  createTask: (taskData) => API.post('/tasks', taskData),
  updateTask: (id, taskData) => API.put(`/tasks/${id}`, taskData),
  deleteTask: (id) => API.delete(`/tasks/${id}`)
};

export default API;