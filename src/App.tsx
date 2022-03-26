import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Login from './component/login';
import JoinEmail from './component/join/join_email';
import Home from './component/home';
import Calender from './component/calender';

function App() {
  return (
    <div className='main'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/joinEmail' element={<JoinEmail />} />
          <Route path='/calender' element={<Calender />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
