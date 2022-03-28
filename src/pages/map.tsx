import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.scss';

const { kakao } = window as any;

const Map = () => {
  const nav = useNavigate();

  const goToCalender = () => {
    nav({
      pathname: '/calender',
    });
  };

  useEffect(() => {
    let mapContainer = document.getElementById('map');
    let mapOption = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    let map = new kakao.maps.Map(mapContainer, mapOption);

    let imageSrc = '/marker.svg';
    let imageSize = new kakao.maps.Size(64, 69);
    let imageOption = { offset: new kakao.maps.Point(27, 69) };

    let markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    let markerPosition = new kakao.maps.LatLng(
      37.365264512305174,
      127.10676860117488
    );

    let marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    marker.setMap(map);

    let iwContent = '<div style="padding:5px;">Hello World!</div>';
    let iwPosition = new kakao.maps.LatLng(
      37.365264512305174,
      127.10676860117488
    );

    let infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });

    infowindow.open(map, marker);
  }, []);

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
      <img className='add' src='/content_add.svg' alt='add_icon' />
    </section>
  );
};

export default Map;
