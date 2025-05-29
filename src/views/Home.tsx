import React from 'react'
import {  useSelector } from 'react-redux'
import type { RootState } from '@reduxjs/toolkit/query';

const Home = () => {

  const { token, user, role } = useSelector((state: RootState) => state.auth)


  return (
    <div>Home. Hola {token} </div>
  )
}

export default Home