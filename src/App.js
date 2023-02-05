import React, { useContext } from 'react'
import Home from './Content/Home.jsx'
import Login from './Content/Login.jsx'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import "./Style.scss"
import Register from './Content/Register.jsx'
import { AuthContext } from './Context/AuthContext.js'
 function App() {

  const {currUser}=useContext(AuthContext);


  const ProtectedRoute=({children})=>{
     if(!currUser)
     {
      return <Navigate to="/login"/>
     }
     return children;
  }
  return (
    <BrowserRouter>
      <Routes>
         <Route path='/'>
            <Route index element={
              <ProtectedRoute><Home/></ProtectedRoute>
              //   // currUser? <Home/> : <Login/>
              // currUser ? <Home/> : <Login/>
            }/>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>

         </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

