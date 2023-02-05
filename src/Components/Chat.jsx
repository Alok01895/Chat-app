import React, { useContext } from 'react'
import Messages from './Messages.jsx'
import Input from './Input'
import { ChatContext } from '../Context/ChatContext.js'

const Chat = () => {
  const {data}= useContext(ChatContext)
  console.log(data)
  console.log(data.chatId)
  return (
    <div className='chat'>
       <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
           <i className="fa-solid fa-video"  id=''></i>
           <i className="fa-solid fa-user-plus"></i>
           <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
       </div>
          <Messages/>
          <Input/>
    </div>
  )
}

export default Chat

