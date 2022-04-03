import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Login from './pages/login';
import JoinEmail from './pages/join_email';
import Home from './pages/home';
import Calender from './pages/calender';
import MapView from './pages/mapView';
import AddContent from './pages/add';
import ContentView from './pages/content_view';

function App() {
  return (
    <div className='main'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/joinEmail' element={<JoinEmail />} />
          <Route path='/calender' element={<Calender />} />
          <Route path='/map' element={<MapView />} />
          <Route path='/addcontent' element={<AddContent />} />
          <Route path='/contentView' element={<ContentView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
