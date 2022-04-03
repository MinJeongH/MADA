import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IContent } from '../service/data_repository';

interface IGetContent {
  [id: string]: IContent;
}

export default function ContentView() {
  const nav = useNavigate();
  const location = useLocation();
  const states = location.state as IGetContent;
  console.log(states);

  const goToCalender = () => {
    nav('/calender', { state: { id: states.id } });
  };
  const goToMap = () => {
    nav('/map', { state: { id: states.id } });
  };

  return (
    <section className='content_view'>
      <img
        className='logo'
        src='/logo.svg'
        alt='logo_icon'
        onClick={goToCalender}
      />
      <img className='map' src='/map.svg' alt='map_icon' onClick={goToMap} />
      {states && (
        <>
          <div
            className='title_date'
            style={{ backgroundColor: `${states.content.color}` }}
          >
            <div className='title'>{states.content.title}</div>
            <div className='date'>
              Date.{states.content.date.replace(/\-/g, '.').concat('.')}
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: states.content.text }}
            className='text'
          ></div>
          <div
            className='place'
            style={{ backgroundColor: `${states.content.color}` }}
          >
            <div className='address'>{states.content.place_address}</div>
            <div className='place_name'>{states.content.place_name}</div>
          </div>
        </>
      )}
    </section>
  );
}
