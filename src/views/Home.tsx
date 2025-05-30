import React from 'react'
import {  useSelector } from 'react-redux'
import type { RootState } from '../store/store';

const Home = () => {

  const { user } = useSelector((state: RootState) => state.auth)


  return (
    <div>Home. Hola {user?.name} </div>
  )
}

export default Home