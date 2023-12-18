import axios from "axios";

import { showToast } from "../utils";

const baseURL = import.meta.env.VITE_BASE_URL;

// Create a new instance of the axios library with a base URL of '/api/v1'
const API = axios.create({ baseURL });

// Add a response interceptor that handles errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      showToast(
        "Network error: Please check your internet connection.",
        "error"
      );
      console.error("Network error: Please check your internet connection.");
      return Promise.reject(
        new Error("Network error: Please check your internet connection.")
      );
    }

    const { status, data, statusText } = error.response;

    let message = data?.error || statusText || "An error occurred";

    console.error(`${status} - ${message}`);

    return Promise.reject(error);
  }
);

// Set the authorization token in the headers
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

// Auth API endpoints
export const authAPI = {
  // Register a new user
  register: (userData) => API.post("/auth/register", userData),
  // Login a user
  login: (email, password) => API.post("/auth/login", { email, password }),
  // Logout a user
  logout: () => API.get("/auth/logout"),
  // Get the current user
  getCurrentUser: () => API.get("/auth/current-user"),
};

// School API endpoints
export const schoolAPI = {
  // Get all Schools
  getAllSchools: () => API.get("/schools"),
  // Get a specific school
  getSchool: (schoolId) => API.get(`/schools/${schoolId}`),
  // Update a school
  updateScool: (school, schoolId) => {
    console.log(`Updating school with ID ${schoolId}:`, school);
    return API.put(`/schools/${schoolId}`, school);
  },
  // updateSchool: (school, schoolId) => API.put(`/schools/${schoolId}`, school),
  // Add a school
  addSchool: (school) => API.post("/schools", school),
  // Delete a school
  deleteSchool: (schoolId) => API.delete(`/schools/${schoolId}`),
};

// Bus API endpoints
export const busAPI = {
  // Get all Buses
  getAllBuses: () => API.get("/buses"),
  // Get a specific bus
  getBus: (busId) => API.get(`/schools/${busId}`),
  // Update a bus
  updateBus: (bus, busId) => API.put(`/buses/${busId}`, bus),
  // Add a bus
  addBus: (bus) => API.post("/buses", bus),
  // Delete a bus
  deleteBus: (busId) => API.delete(`/buses`),
};
