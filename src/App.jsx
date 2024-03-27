import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Previous from './Components/Previous';
import SeeDetails from './Components/SeeDetails';
import Home from './Components/Home';
import Login from './Components/Login';
import PrivateRoutes from './AuthContext/PrivateRoutes';
import SeeDetailsWithoutLogin from './Components/SeeDetailsWithoutLogin';
import PreviousWithoutLogin from './Components/PreviousWithoutLogin';
import { AuthProvider } from './AuthContext/AuthContext';
const App = () => {
  
  return (
    <div className="root-div">
        <AuthProvider>
         <Routes>
           <Route path='/' element={<Login/>}/>
           

           <Route element={<PrivateRoutes />}>
               <Route path='/home' element={<Home/>}/>
               <Route path='/previous' element={<Previous/>}/>
               <Route path='/seedetails' element={<SeeDetails/>}/> 
           </Route>


           <Route path='/seedetailswl' element={<SeeDetailsWithoutLogin/>}/> 
           <Route path='/previouswl' element={<PreviousWithoutLogin/>}/> 
        </Routes> 
        </AuthProvider>   
    </div>
  );
};

export default App;




// import React, { useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Previous from './Components/Previous';
// import SeeDetails from './Components/SeeDetails';
// import Home from './Components/Home';
// import Login from './Components/Login';
// const App = () => {
  
//   return (
//     <div className="root-div">
//          <Routes>
//            <Route path='/' element={<Login/>}/> 
//            <Route path='/home' element={<Home/>}/>
//            <Route path='/previous' element={<Previous/>}/>
//            <Route path='/seedetails' element={<SeeDetails/>}/> 
//         </Routes> 
          
//     </div>
//   );
// };

// export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './AuthContext/AuthContext';
// import ProtectedRoute from './AuthContext/ProtectedRoute';
// import Previous from './Components/Previous';
// import Login from './Components/Login';
// import Home from './Components/Home';
// import SeeDetails from './Components/SeeDetails';


// const App = () => {
//   return (
//     <AuthProvider>
      
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
//           <Route path="/previous" element={<ProtectedRoute element={<Previous />} />} />
//           <Route path="/seedetails" element={<ProtectedRoute element={<SeeDetails />} />} />
          
//         </Routes>
      
//     </AuthProvider>
//   );
// };

// export default App;


