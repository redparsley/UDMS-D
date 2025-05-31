import { useState, useEffect } from 'react';
import { fetchUsers } from '../../services/UserService';
import { IUser } from '../../models/IUser';

export function UserList() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to fetch users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <div>Загрузка..</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return users;
}