import axios from 'axios';

// Récupérer le jeton d'authentification depuis le localStorage
const token = localStorage.getItem('authToken');

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
  console.error("No auth token found. Please log in.");
}

export default axios; 