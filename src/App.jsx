import React, { useState } from 'react';
import Home from './Home';
import { Route, Routes } from 'react-router-dom';
import Previous from './Previous';
import SeeDetails from './SeeDetails';
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