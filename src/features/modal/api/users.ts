import { api } from "../../../shared/api/axios";

export const createUser = async (user: { name: string; avatar: string }) => {
  const response = await api.post('/users', user);
  return response.data;
};

export const updateUser = async (id: string, user: { name: string; avatar: string }) => {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
};
