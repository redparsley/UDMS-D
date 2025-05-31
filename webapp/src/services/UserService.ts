import axios from 'axios';
import { IUser } from '../models/IUser';

const token = localStorage.getItem('token');

export const fetchUsers = async (): Promise<IUser[]> => {
  try {
    const response = await axios.get<IUser[]>('http://localhost:8020/api/v1/users?skip=0&limit=100', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};