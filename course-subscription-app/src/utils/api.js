import axios from "axios";

export const buildUrl = (base, path) => {
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};

// Base URL for API
const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Fetch all courses
export const fetchCourses = async () => {
  const endpoint = buildUrl(baseUrl, "/api/courses");

  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

// Fetch course by Id
export const fetchCourseById = async (courseId) => {
  const endpoint = buildUrl(baseUrl, `/api/courses/${courseId}`);

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch course data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error;
  }
};

// Subscribe to a course
export const subscribeToCourse = async (learnerId, courseId) => {
  const endpoint = buildUrl(baseUrl, "/api/subscribe");
  const subscriptionDate = new Date().toISOString();

  try {
    const response = await axios.post(endpoint, {
      learnerId,
      courseId,
      subscriptionDate,
    });
    return response.data;
  } catch (error) {
    console.error("Error subscribing to course:", error);
    throw error;
  }
};

// Unsubscribe from a course
export const unsubscribeFromCourse = async (subscriptionId) => {
  const endpoint = buildUrl(baseUrl, `/api/unsubscribe/${subscriptionId}`);

  try {
    const response = await axios.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error unsubscribing from course:", error);
    throw error;
  }
};

//Fetch subscriptions
export const fetchSubscribedCourses = async (learnerId) => {
  const endpoint = buildUrl(baseUrl, `/api/subscriptions/${learnerId}`);

  try {
    const response = await axios.get(endpoint);
    return response.data; // Return subscribed courses
  } catch (error) {
    console.error("Error fetching subscribed courses:", error);
    throw error;
  }
};

// Register function
export const registerUser = async (formData) => {
  const endpoint = buildUrl(baseUrl, "/api/register");

  try {
    const response = await axios.post(endpoint, formData);
    return response;
  } catch (error) {
    console.error(" Error registering user:", error);
    throw error;
  }
};

// Login function
export const loginUser = async (credentials) => {
  const endpoint = buildUrl(baseUrl, "/api/login");

  try {
    const response = await axios.post(endpoint, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch all users
export const fetchUsers = async () => {
  const endpoint = buildUrl(baseUrl, "/api/users");

  try {
    const response = await axios.get(endpoint);
    return response;
    console.log("🚀 ~ fetchUsers ~ response.data:", response)

  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
