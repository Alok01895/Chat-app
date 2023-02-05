import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { ChatContext } from '../Context/ChatContext'
import { db, storage } from '../firebase'
import {v4 as uuid} from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const Input = () => {

  const [text,setText]=useState("")
  const [img, setImg]=useState(null)

  const {currUser} = useContext(AuthContext)
  const {data}= useContext(ChatContext)

  const handleSend = async ()=>{
    
    if(img){
       
      const storageRef= ref(storage, uuid() );
      const uploadTask= uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (err) => {
          
        }, 
         () => {
           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db,"chats", data.chatId),{
              messages: arrayUnion({
                id:uuid(),
                text,
                senderId: currUser.uid,
                date: Timestamp.now(),
                img:downloadURL,
              })
            });
          });
        }
      );
    }
    else{
      await updateDoc(doc(db,"chats", data.chatId),{
          messages: arrayUnion({
            id:uuid(),
            text,
            senderId: currUser.uid,
            date: Timestamp.now()
          })
      });
    }

    await updateDoc(doc(db,"userChats",currUser.uid),{
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId + ".date"]: serverTimestamp()
    })

    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId + ".date"]: serverTimestamp()
    })

     setText("")
     setImg(null)
  }
  

 

  return (
    <div className='input'>
      <input type="text" placeholder='Type something...' onChange={(e)=>setText(e.target.value)} value={text} />
      <div className="send">
          <i className="fa-solid fa-paperclip" id='font1'></i>
          <input type="file"  id='file' style={{display:'none'}} onChange={(e)=>setImg(e.target.files[0])} />
          <label htmlFor="file" id='font2'><i class="fa-regular fa-image"></i> </label>
          <button onClick={handleSend} ><i className="fa-sharp fa-solid fa-paper-plane" id='font3'></i></button>
      </div>
    </div>
  )
}

export default Input
