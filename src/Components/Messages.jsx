import { onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../Context/ChatContext'
import { db } from '../firebase'
import Message from './Message'
import { doc } from 'firebase/firestore'

const Messages = () => {

  const {data}= useContext(ChatContext)
  console.log(data)
  console.log(data.chatId)
  const [messages,setMessages]=useState([])

  useEffect(()=>{
      try{const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc)=>{
        
        doc.exists() && setMessages(doc.data().messages)
      });

      return ()=>{
        unSub();
      };}
      catch (err)
      {
        console.log(err)
      }
  }, [data.chatId]);
  console.log(messages)
  

  return (
    <div className='messages'>
      {
        messages.map((m)=>(
          <Message message={m} key={m.id}/>
        ))
      }
    </div>
  )
}

export default Messages

