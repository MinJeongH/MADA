import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { useLocation, useNavigate } from 'react-router-dom';
import { downloadContentMap, IContent } from '../service/data_repository';
import './pages.scss';

interface IGetContent {
  [id: string]: IContent;
}

interface ICenterGeocode {
  lat: number;
  lng: number;
}

const MapView = () => {
  const nav = useNavigate();
  const location = useLocation();
  const states = location.state as unknown as any;

  const [content, setContent] = useState<IGetContent>();
  const [contentKey, setContentKey] = useState<string[]>([]);
  const [viewOverlay, setViewOverlay] = useState<boolean[]>([]);
  const [dragging, setDragging] = useState(false);
  const [centerGeocode, setCenterGeocode] = useState<ICenterGeocode>({
    lat: 37.586643474146,
    lng: 127.174180045525,
  });

  const goToCalender = () => {
    nav('/calender', {
      state: { id: states.id },
    });
  };
  const goToAddcontent = () => {
    nav('/addcontent', {
      state: { id: states.id, selectDays: moment().format('YYYY-MM-DD') },
    });
  };
  const goToContentView = (event: React.MouseEvent<HTMLDivElement>) => {
    const e = event.target as HTMLDivElement;
    if (content && e.dataset.key)
      return nav('/contentView', {
        state: { id: states.id, content: content[e.dataset.key] },
      });
  };

  useEffect(() => {
    downloadContentMap(states.id, setContent);
  }, [states.id, setContent]);

  useEffect(() => {
    if (content) setContentKey(Object.keys(content));
  }, [content]);

  useEffect(() => {
    if (content) {
      setViewOverlay(contentKey.map((key) => false));
    }
  }, [content, contentKey]);

  return (
    <section className='map_container'>
      <div className={`header ${dragging && 'view'}`}>
        <img
          className='logo'
          src='/logo.svg'
          alt='logo_icon'
          onClick={() => nav('/')}
        />
        <p className='logout' onClick={() => nav('/')}>
          로그아웃
        </p>
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
        <p className='go_calender' onClick={goToCalender}>
          달력 이동
        </p>
      </div>
      <img
        className={`add ${dragging && 'add_view'}`}
        src='/content_add.svg'
        alt='add_icon'
        onClick={goToAddcontent}
      />
      <Map
        center={centerGeocode}
        level={12}
        style={{ width: '100vw', height: '100vh' }}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
      >
        {contentKey.map(
          (key, idx) =>
            content && (
              <>
                <MapMarker
                  position={{ lat: content[key].y, lng: content[key].x }}
                  onClick={() => {
                    setViewOverlay((prev) => {
                      const arr = prev.map((v) => false);
                      arr[idx] = !prev[idx];
                      return arr;
                    });
                    setCenterGeocode({
                      lat: content[key].y,
                      lng: content[key].x,
                    });
                  }}
                />
                {viewOverlay[idx] && (
                  <CustomOverlayMap
                    position={{ lat: content[key].y, lng: content[key].x }}
                    yAnchor={3.6}
                    className='overlay'
                  >
                    <div
                      className='content_title'
                      onClick={goToContentView}
                      data-key={key}
                    >
                      {content[key].title}
                    </div>
                  </CustomOverlayMap>
                )}
              </>
            )
        )}
      </Map>
    </section>
  );
};

export default MapView;
