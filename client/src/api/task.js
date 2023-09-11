import axios from "./axios";

export const getTasksRequest = (task) => axios.get(`/tasks`, task);

export const getTaskRequest = (id) => axios.get(`/tasks/${id}`, task);

export const createTaskRequest = (task) => axios.post(`/tasks`, task);

export const updateTaskRequest = (task) =>
  axios.put(`/tasks/${task._id}`, task);

export const deleteTaskRequest = (task) => axios.delete(`/tasks/${task._id}`);
