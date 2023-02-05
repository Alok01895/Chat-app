import { onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import { doc } from 'firebase/firestore';
import { AuthContext } from '../Context/AuthContext';
import {ChatContext} from '../Context/ChatContext'

const ChatSec = () => {
   
  const {currUser}= useContext(AuthContext)
  const {dispatch}= useContext(ChatContext)
  const [chats,setChats] = useState([])

  useEffect(()=>{
    const getChats=()=>{
      const unsub = onSnapshot(doc (db, "userChats", currUser.uid), (doc) => {
        setChats(doc.data());
    });
  
    return ()=>{
      unsub();
    };
    }

    currUser.uid && getChats();
  
  },[currUser.uid])

  const handleChat=(u)=>{
    dispatch({type:"CHANGE_USER", payload: u });
  };

  console.log(Object.entries(chats))
  return (
    <div className='chats'>
      {
        Object.entries(chats)?.sort((a,b)=> b[1].date - a[1].date ).map((chat)=>(
          <div className="userChat" key={chat[0]} onClick={()=>handleChat(chat[1].userInfo)}>
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="userInfo">
              <span className='userName'>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))
      }
      
    </div>
  )
}

export default ChatSec

