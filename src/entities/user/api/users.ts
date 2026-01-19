import { User } from '../model/types';
import { api } from '../../../shared/api/axios';


export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/users');
  
  return response.data;
};
