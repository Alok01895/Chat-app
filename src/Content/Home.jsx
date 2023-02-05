import React from 'react'
import Sidebar from '../Components/Sidebar.jsx'
import Chat from '../Components/Chat.jsx'

const Home = () => {
  return (
    <div className='home'>
      <div className="home-container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Home

