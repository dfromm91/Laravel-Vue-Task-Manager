import axios from "axios";

// Set up the base URL for the API
const API_BASE_URL = "http://localhost:8000/api";
axios.defaults.withCredentials = true; // Ensure cookies are sent

// Retrieve the CSRF token from the meta tag added in your HTML
const csrfToken = document
  .querySelector('meta[name="csrf-token"]')
  ?.getAttribute("content");

// Add the CSRF token to Axios default headers
if (csrfToken) {
  axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
}

// Handle login
export const login = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/login`, credentials);
  return response.data;
};

// Handle logout
export const logout = async (token) => {
  await axios.post(
    `${API_BASE_URL}/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Get authenticated user
export const getUser = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Fetch tasks (example for additional endpoints)
export const fetchTasks = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Create a task
export const createTask = async (taskData, token) => {
  const response = await axios.post(`${API_BASE_URL}/tasks`, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
