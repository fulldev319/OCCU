import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const fetchStatuses = async () => {
  const response = await axios.get(`${API_BASE_URL}/status`);
  return response.data;
};

export const fetchAllData = async () => {
  const response = await axios.get(`${API_BASE_URL}/data`);
  return response.data;
};

export const createData = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/data`, data);
  return response.data;
};

export const updateData = async (id: number, data: any) => {
  const response = await axios.put(`${API_BASE_URL}/data/${id}`, data);
  return response.data;
};

export const deleteData = async (id: number) => {
  await axios.delete(`${API_BASE_URL}/data/${id}`);
};
