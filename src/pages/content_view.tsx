import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteContent, IContent } from '../service/data_repository';

interface IGetContent {
  id: string;
  content: IContent;
}

export default function ContentView() {
  const nav = useNavigate();
  const location = useLocation();
  const states = location.state as IGetContent;
  const [clickDelete, setClickDelete] = useState(false);

  const goToCalender = () => {
    nav('/calender', { state: { id: states.id } });
  };
  const goToMap = () => {
    nav('/map', { state: { id: states.id } });
  };
  const goToAdd = () => {
    nav('/addcontent', { state: { id: states.id, content: states.content } });
  };

  const clickEventDelete = () => {
    deleteContent(states.id, states.content);
    goToCalender();
  };

  return (
    <section className='content_view'>
      <div className={`view_box ${clickDelete && 'box_blur'}`}>
        <img
          className='logo'
          src='/logo.svg'
          alt='logo_icon'
          onClick={goToCalender}
        />
        <p className='go_calender' onClick={goToCalender}>
          달력 이동
        </p>
        <img className='map' src='/map.svg' alt='map_icon' onClick={goToMap} />
        <p className='go_map' onClick={goToMap}>
          지도 이동
        </p>
        {states && (
          <>
            <div
              className='content_first'
              style={{ backgroundColor: `${states.content.color}` }}
            >
              <div className='title_date'>
                <div className='title'>{states.content.title}</div>
                <div className='date'>
                  Date.{states.content.date.replace(/\-/g, '.').concat('.')}
                </div>
              </div>
              <div className='place'>
                <div className='address'>{states.content.place_address}</div>
                <div className='place_name'>{states.content.place_name}</div>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: states.content.text }}
              className='text'
            ></div>
            <div className='buttons'>
              <button onClick={() => goToAdd()}>수정</button>
              <button onClick={() => setClickDelete(true)}>삭제</button>
            </div>
          </>
        )}
      </div>
      {clickDelete && (
        <div className='delete_box'>
          <p>삭제하시겠습니까?</p>
          <div className='buttons'>
            <button onClick={clickEventDelete}>네</button>
            <button className='btn_no' onClick={() => setClickDelete(false)}>
              아니오
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
