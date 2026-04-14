import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/todos`;

export const getTodos = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.status) params.append("filter", filters.status);
    if (filters.category) params.append("category", filters.category);
    if (filters.priority) params.append("priority", filters.priority);
    if (filters.search) params.append("search", filters.search);
    if (filters.sort) params.append("sort", filters.sort);

    const response = await axios.get(`${API_BASE_URL}?${params}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTodoById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTodo = async (todoData) => {
  try {
    const response = await axios.post(API_BASE_URL, todoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTodo = async (id, todoData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, todoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCompletedTodos = async () => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/completed/delete-all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStats = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/todos/stats/summary`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
