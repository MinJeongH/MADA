import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Login from './component/login';
import JoinEmail from './component/join_email';
import Home from './component/home';
import Calender from './component/calender';
import Map from './component/map';

function App() {
  return (
    <div className='main'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/joinEmail' element={<JoinEmail />} />
          <Route path='/calender' element={<Calender />} />
          <Route path='/map' element={<Map />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
