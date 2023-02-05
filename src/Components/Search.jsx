import React, { useContext, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase'
import {AuthContext} from '../Context/AuthContext'

const Search = () => {
   
  const {currUser}=useContext(AuthContext);

  const [userName,setUserName]=useState("")
  const [user,setUser]=useState(null)
  const [err,setErr]=useState(false)
  
  const handleSearch= async () =>{
      const q=query(collection(db, 'users'), where("displayName", "==", userName));
      try{
        const snapShot= await getDocs(q);

        snapShot.forEach((doc) => {

        setUser(doc.data())

      });
      
      
      }
      
      catch(err)
      {
        setErr(true)
        console.log("my bad");
      }
  }
  
  const handleKey= (e) =>{
    e.code==="Enter" && handleSearch()
  }

  const handleClick=async ()=>{
    const combinedId=currUser.uid > user.uid ?   currUser.uid + user.uid : user.uid + currUser.uid;
    try{
      const res=getDoc(doc(db, "chats" , combinedId))
      if(!res.exists)
      {
        await setDoc(doc(db, "chats" , combinedId),{messages: [] });

        await updateDoc(doc(db, "userChats" , currUser.uid),{
          [combinedId + ".userInfo"]:{
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        });

        await updateDoc(doc(db, "userChats" , user.uid),{
          [combinedId + ".userInfo"]:{
            uid: currUser.uid,
            displayName: currUser.displayName,
            photoURL: currUser.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        })
      }
    }
    catch (err){}
    
    setUser(null);
    setUserName("")
  };


  return (
    <div className='search'>
      <div className="searchForm">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder='Search' onKeyDown={handleKey} onChange={e=>setUserName(e.target.value)} value={userName} />
      </div>
      {err && <span  className='userChat' >User not found</span>}
      {user && <div className="userChat" onClick={handleClick}>
        <img src={user.photoURL} alt="" />
        <div className="userInfo">
          <span className='userName'>{user.displayName}</span>
        </div>
      </div>}

    </div>
  )
}

export default Search

