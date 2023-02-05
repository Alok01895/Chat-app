import React from 'react'
import Navbar from './Navbar.jsx'
import Search from './Search.jsx'
import ChatSec from './ChatSec.jsx'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar/>
      <Search/>
      <ChatSec/>
    </div>
  )
}

export default Sidebar

