
import {  useSelector } from 'react-redux'
import type { RootState } from '../store/store';
const Home = () => {
  
  
  const { user } = useSelector((state: RootState) => state.auth);
  console.log("usuario: ", user)


  return (
    <div>
    
      <h2>Home. Hola {user?.name}</h2>
    </div>
  )
}

export default Home