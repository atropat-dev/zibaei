import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface User {
  id: number;
  name: string;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await apiService.get<User[]>('/users');
  return response.data;
};

export const getAppointments = async () => {
  const response = await apiService.get('/appointments');
  return response.data;
};

export const getIncome = async () => {
  const response = await apiService.get('/income');
  return response.data;
};

export default apiService;
