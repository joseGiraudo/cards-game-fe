import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import type { RootState } from '../store/store';
import * as userService from '../services/userService';
import type { User } from '../models/user';

const Home = () => {


  const [users, setUsers] = useState<User[]>([]);


  const { user } = useSelector((state: RootState) => state.auth)

  const fetchUsers = async () => {
    try {
      const data = await userService.getAll();
      console.log(data);      
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {    
    fetchUsers();
  }, [])
  
  


  return (
    <div>Home. Hola {user?.name} 
    
      <h2>Home. Hola {user?.name}</h2>

      {users.length > 0 ? (
        users.map((user) => (
          <h3 key={user.id}>{user.name}</h3>
        ))
      ) : (
        <p>No hay usuarios.</p>
      )}
    </div>
  )
}

export default Home