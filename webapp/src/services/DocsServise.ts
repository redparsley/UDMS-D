import axios from 'axios';
import { Doc } from '../models/IDoc.ts';

const token = localStorage.getItem('token');

export const fetchDocs = async (): Promise<Doc[]> => {
  try {
    const response = await axios.get<Doc[]>('http://localhost:8020/api/v1/tickets?skip=0&limit=100', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};