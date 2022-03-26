import React from 'react';

const Map = () => {
  return (
    <section className='map'>
      <div className='header'>
        <img className='logo' src='/logo.svg' alt='logo_icon' />
        <label htmlFor='search'>
          <input type='text' name='search' id='search' />
          <img src='/search.svg' alt='search_icon' />
        </label>
        <img className='calender' src='/Date.svg' alt='calender_icon' />
      </div>
      <img className='add' src='/content_add.svg' alt='add_icon' />
    </section>
  );
};

export default Map;
