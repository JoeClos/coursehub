import axios from "axios";

export const buildUrl = (base, path) => {
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};

// Base URL for API
const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Create a course
export const addCourse = async (courseData) => {
  const endpoint = buildUrl(baseUrl, "/api/courses", courseData);

  try {
    const response = await axios.post(endpoint, courseData);
    return response.data;
  } catch (error) {
    console.error("Error adding new course:", error);
    throw error;
  }
};

// Delete course
export const deleteCourse = async (courseId) => {
  const endpoint = buildUrl(baseUrl, `/api/courses/${courseId}`);

  try {
    const response = await axios.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error deleting new course:", error);
    throw error;
  }
};

// Update a course by id
export const updateCourse = async (courseId, updatedCourseData) => {
  const endpoint = buildUrl(baseUrl, `/api/courses/${courseId}`);
  try {
    const response = await axios.put(endpoint, updatedCourseData);
    return response.data;
  } catch (error) {
    console.error("Error updating new course:", error);
    throw error;
  }
};

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
export const fetchCourse = async (courseId) => {
  const endpoint = buildUrl(baseUrl, `/api/courses/${courseId}`);

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch course data");
    }
    const data = await response.json();
    console.log("🚀 ~ fetchCourse ~ data:", data);
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

// Fetch subscriptions for a specific learner
export const fetchSubscriptionsForLearner = async (learnerId) => {
  const endpoint = buildUrl(baseUrl, `/api/subscriptions/${learnerId}`);

  try {
    const response = await axios.get(endpoint);
    return response.data; // Return subscribed courses
  } catch (error) {
    console.error("Error fetching subscriptions for learner:", error);
    throw error;
  }
};


// Fetch all subscriptions (Admin)
export const fetchAllSubscriptions = async () => {
  const endpoint = buildUrl(baseUrl, "/api/subscriptions");

  try {
    const response = await axios.get(endpoint);
    return response.data; // Return all subscriptions
  } catch (error) {
    console.error("Error fetching all subscriptions:", error);
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
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Fetch user by Id
export const fetchUser = async (userId) => {
  const endpoint = buildUrl(baseUrl, `/api/users/${userId}`);

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch course data");
    }
    const data = await response.json();
    console.log("🚀 ~ fetchUser ~ data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
