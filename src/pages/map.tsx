import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { downloadContentMap, IContent } from '../service/data_repository';
import './pages.scss';

const { kakao } = window as any;

interface IGetContent {
  [id: string]: IContent;
}

const Map = () => {
  const nav = useNavigate();
  const location = useLocation();
  const states = location.state as unknown as any;

  const [content, setContent] = useState<IGetContent>();
  const [contentKey, setContentKey] = useState<string[]>([]);

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

  useEffect(() => {
    downloadContentMap(states.id, setContent);
  }, [states.id, setContent]);

  useEffect(() => {
    if (content) setContentKey(Object.keys(content));
  }, [content]);

  useEffect(() => {
    let mapContainer = document.getElementById('map');
    let mapOption = {
      center: new kakao.maps.LatLng(37.586643474146, 127.174180045525),
      level: 12,
    };
    let map = new kakao.maps.Map(mapContainer, mapOption);

    let imageSrc = '/marker.svg';
    let imageSize = new kakao.maps.Size(30, 30);
    let imageOption = { offset: new kakao.maps.Point(27, 69) };

    let markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    contentKey.forEach((key) => {
      let div_content = document.createElement('p');
      if (content) {
        div_content.innerHTML = content[key].title!;
        let marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(content[key].y, content[key].x),
          image: markerImage,
          map: map,
        });
        marker.setMap(map);
        let infowindow = new kakao.maps.InfoWindow({
          position: new kakao.maps.LatLng(content[key].y, content[key].x),
          content: div_content.outerHTML,
        });
        infowindow.open(map, marker);
      }
    });
  }, [contentKey, content]);

  return (
    <section className='map_container'>
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
      <div id='map' style={{ width: '100vw', height: '100vh' }}></div>
      <img
        className='add'
        src='/content_add.svg'
        alt='add_icon'
        onClick={goToAddcontent}
      />
    </section>
  );
};

export default Map;
