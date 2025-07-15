import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/apiService';

interface User {
  id: number;
  name: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data: User[] = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  return (
    <div className="p-4 font-vazirmatn">
      <h1 className="text-xl font-bold mb-4 text-right">لیست کاربران</h1>
      <ul className="list-disc list-inside text-right">
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
