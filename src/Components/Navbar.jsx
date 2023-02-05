import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../Context/AuthContext'

const Navbar = () => {
  const {currUser} = useContext(AuthContext);
  
  return (
    <div className='navbar'>
        <span className='logo'>Lets Chat</span>
        <div className="user">
            <img src={currUser.photoURL} alt="" />
            <span className='userName'>{currUser.displayName}</span>
            <button className='logout' onClick={()=>signOut(auth)}>Logout</button>
        </div>
      
    </div>
  )
}

export default Navbar
