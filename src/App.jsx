import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Previous from './Components/Previous';
import SeeDetails from './Components/SeeDetails';
import Home from './Components/Home';
const App = () => {
  
  return (
    <div className="root-div">
         <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/previous' element={<Previous/>}/>
           <Route path='/seedetails' element={<SeeDetails/>}/> 
          </Routes> 
    </div>
  );
};

export default App;