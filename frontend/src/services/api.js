// client/src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    console.error('API Error:', message);
    return Promise.reject(error.response?.data || { message });
  }
);

// API Methods
const apiService = {
  // Donations
  donations: {
    createPaymentIntent: (data) => api.post('/donations/create-payment-intent', data),
    createSubscription: (data) => api.post('/donations/create-subscription', data),
    createDonation: (data) => api.post('/donations', data),
    getDonations: (params) => api.get('/donations', { params }),
    getDonationById: (id) => api.get(`/donations/${id}`),
    getStats: () => api.get('/donations/stats/summary'),
    cancelSubscription: (data) => api.post('/donations/cancel-subscription', data),
  },

  // Contact
  contact: {
    submit: (data) => api.post('/contact', data),
    getAll: (params) => api.get('/contact', { params }),
    updateStatus: (id, data) => api.patch(`/contact/${id}`, data),
  },

  // Programs
  programs: {
    getAll: (params) => api.get('/programs', { params }),
    getById: (id) => api.get(`/programs/${id}`),
    create: (data) => api.post('/programs', data),
    update: (id, data) => api.put(`/programs/${id}`, data),
    delete: (id) => api.delete(`/programs/${id}`),
  },

  // Stats
  stats: {
    getOverall: () => api.get('/stats'),
  },

  // Health check
  health: () => api.get('/health'),
};

export default apiService;

