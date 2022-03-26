import React from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.scss';

const Map = () => {
  const nav = useNavigate();

  const goToCalender = () => {
    nav({
      pathname: '/calender',
    });
  };
  return (
    <section className='map'>
      <div className='header'>
        <img className='logo' src='/logo.svg' alt='logo_icon' />
        <label htmlFor='search'>
          <input type='text' name='search' id='search' />
          <img src='/search.svg' alt='search_icon' />
        </label>
        <img
          className='calender'
          src='/Date.svg'
          alt='calender_icon'
          onClick={goToCalender}
        />
      </div>
      <img className='add' src='/content_add.svg' alt='add_icon' />
    </section>
  );
};

export default Map;
