const API_BASE_URL = (process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api').replace(/\/$/, '');
const STORAGE_KEY = 'red_product_user';

const getErrorMessage = (data) => {
  if (data?.errors) {
    const firstError = Object.values(data.errors).flat()[0];
    if (firstError) return firstError;
  }
  return data?.message || 'Une erreur est survenue.';
};

const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(getErrorMessage(data));
  }
  return data;
};

// --- Fonctions d'authentification ---

export const loginUser = async (payload) =>
  apiRequest('/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

// AJOUT DU "async" ICI pour la cohérence
export const registerUser = async (payload) =>
  apiRequest('/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const logoutUser = async () =>
  apiRequest('/logout', {
    method: 'POST',
  }).catch(() => ({ message: 'Déconnexion locale.' }));

// --- Gestion du LocalStorage ---

export const saveUser = (user) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  } catch {
    return null;
  }
};

export const clearUser = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export { API_BASE_URL, STORAGE_KEY };