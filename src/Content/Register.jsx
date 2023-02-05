import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth,storage,db} from '../firebase'
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Register = () => {
  
  const [err,setErr]=useState(false)
  const navigate=useNavigate()

  const formSubmit=async (e)=>{
    e.preventDefault();
    
    const displayName=e.target[0].value;
    const email=e.target[1].value;
    const number=e.target[2].value;
    const password=e.target[3].value;
    const file=e.target[4].files[0];
    
    if (!displayName || !displayName.match(/^[a-zA-Z0-9]+$/)) {
      setErr(true);
      console.error("Display name is invalid");
      return;
    }
  
    try{
      const res=await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (err) => {
          setErr(true)
          console.log(err)
        }, 
         async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user,{
              displayName,
              photoURL:downloadURL,
            })
            await setDoc(doc(db,"users",res.user.uid),{
               displayName,
               email,
               number,
               photoURL:downloadURL, 
               uid:res.user.uid 
               
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );

      
    }
    catch(err)
    {
       setErr(true);
       console.log(err)
    }
      
      }
  return (
    <div className="Container-form">
        <div className="form-wrapper">
            <span className='logo'>Lets Chat</span>
            <span className='title'>Register</span>
            <form action="" onSubmit={formSubmit} id="form" >
                <input type="text" name='name' id='displayName' placeholder='Enter Name'/>
                <input type="email" placeholder='Enter Email' />
                <input type="text" placeholder='Enter Number'/>
                <input type="password" placeholder='Enter Password'/>
                <input style={{display:'none',marginBottom:'5px'}} type="file" id='file'/>
                <label htmlFor="file"><i className="fa-regular fa-image"></i><span className='avatar'>Add an Avatar</span> </label>
                <button className="SignUp">Sign Up</button>
                {err && <span>Something went wrong!</span>}
            </form>
            <p>Already have a account? <Link to='/login' style={{color:'#00BBFF',marginLeft:'10px',}}>Login</Link> </p>
        </div>
    </div>
  )
}

export default Register
