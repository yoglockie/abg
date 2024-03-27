import React, { useState } from 'react'
import './Login.css'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
const Login = () => {
   const {login} = useAuth();

   const [userid,setUserID]=useState("");
   const [password,setPassword]=useState("");
  
   const navigate = useNavigate()
  
   const handleLogin =()=>{
       if(userid.trim()=="grasim_vilayat")
       {
           if(password.trim()=="modal")
           {
            sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4MjM5NDc5MTgzIiwibmFtZSI6IkFkaXR5YSBCaXJsYSIsImlhdCI6OTUwOTE4MjE0MX0.rAPVhgq-hTuyowatPdxfihFPuI8-h2E0aNYrPwVpJwM');
             
            login("grasim_vilayat",101);
              navigate('/home');
              return
           }
           else{
            alert("Invalid Password!!")
            return;
           }
       }
       else if(userid.trim()=="grasim_ibr")
       {
           if(password.trim()=="modal")
           {
            sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4MjM5NDc5MTgzIiwibmFtZSI6IkFkaXR5YSBCaXJsYSIsImlhdCI6OTUwOTE4MjE0MX0.rAPVhgq-hTuyowatPdxfihFPuI8-h2E0aNYrPwVpJwM');
              login("grasim_ibr",102)
              navigate('/home');
              return
           }
           else{
            alert("Invalid Password!!")
            return;
           }
       }
       else if(userid.trim()=="grasim_trc")
       {
           if(password.trim()=="modal")
           {
            sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4MjM5NDc5MTgzIiwibmFtZSI6IkFkaXR5YSBCaXJsYSIsImlhdCI6OTUwOTE4MjE0MX0.rAPVhgq-hTuyowatPdxfihFPuI8-h2E0aNYrPwVpJwM');
            login("grasim_trc",103);
              navigate('/home')
              return
           }
           else{
            alert("Invalid Password!!")
            return;
           }
       }
       else if(userid.trim()=="grasim_admin")
       {
           if(password.trim()=="admin")
           {
            sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4MjM5NDc5MTgzIiwibmFtZSI6IkFkaXR5YSBCaXJsYSIsImlhdCI6OTUwOTE4MjE0MX0.rAPVhgq-hTuyowatPdxfihFPuI8-h2E0aNYrPwVpJwM');
            login("grasim_admin",104)
              navigate('/home');
              return;
           }
           else{
            alert("Invalid Password!!")
            return;
           }
       }
       else if(userid.trim()=="mandelbulbtech")
       {
           if(password.trim()=="mandel")
           {
              sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4MjM5NDc5MTgzIiwibmFtZSI6IkFkaXR5YSBCaXJsYSIsImlhdCI6OTUwOTE4MjE0MX0.rAPVhgq-hTuyowatPdxfihFPuI8-h2E0aNYrPwVpJwM'); 
              login("mandelbulbtech",1);
              navigate('/home');
              return;
           }
           else{
            alert("Invalid Password!!")
            return;
           }
       }
       else{
         alert("Invalid UserID !!")
         return
       }

    }  
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };
  return (
      <div className="login-root">
        <header className="login-headers">
          <div className="s-nav">
            <img src="https://companieslogo.com/img/orig/GRASIM.NS_BIG-12105e87.png?t=1603311859" alt="" style={{width:"30px",height:"30px",textIndent: "-10000px"}} />
            Aditya Birla Grasim
          </div>
          
          
      </header>
   

        <div className='login-div'>
         
         <div className="inner-div">
            <span>Login</span>
             <div className="userid">
                <p>User ID</p>
                <input type="text" placeholder='Enter your ID' onChange={(e)=>{setUserID(e.target.value)}}/>
             </div>
             <div className="userid">
                <p>Password</p>
                <input type="password" placeholder='Enter your Password'onChange={(e)=>{setPassword(e.target.value)}} onKeyDown={handleKeyPress}/>
             </div>
             <button className='lbtn' onClick={handleLogin}>Login</button>
             <Link to='/previouswl'>
             <button className='lbtn'>See Previous Result</button>
             </Link>
             
         </div>   
    </div>
      </div>
  )
}

export default Login
