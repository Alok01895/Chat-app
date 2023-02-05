import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

const Login = () => {

  const [err,setErr]=useState(false)
  const navigate=useNavigate()

  const formSubmit=async (e)=>{
    e.preventDefault();
    
    
    const email=e.target[0].value;
    // console.log(email)
    const password=e.target[1].value;
    // console.log(password)
        
    try{
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    
    }
    catch(err)
    {
       setErr(true);
    }
      
      }

  return (
    <div className="Container-form">
        <div className="form-wrapper">
            <span className='logo'>Lets Chat</span>
            <span className='title'>Login</span>
            <form action="" method='POST' onSubmit={formSubmit}>
                <input type="email" placeholder='Enter Email' />
                {/* <input type="text" placeholder='Enter Number'/> */}
                <input type="password" placeholder='Enter Password'/>
                <button className="Login">Login</button>
                {err && <span>Something went wrong!</span>}
            </form>
            <p>Don't have a account? <Link to='/register' style={{color:'#00BBFF',marginLeft:'10px',}}>SignUp</Link> </p>
        </div>
    </div>
  )
}

export default Login
