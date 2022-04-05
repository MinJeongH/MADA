import React, { useRef, useState } from 'react';
import './pages.scss';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import QuillEditor from '../components/quill_editor';
import { uploadContent } from '../service/data_repository';

const { kakao } = window as any;

interface ICallbackResult {
  address_name: string;
  place_name: string;
  x: string;
  y: string;
}

interface IColorArr {
  color: string;
  checking: boolean;
}

const AddContent = () => {
  const nav = useNavigate();
  const location = useLocation();
  const states = location.state as unknown as any;
  const titleRef = useRef<HTMLInputElement>(null);

  const [color, setColor] = useState('#edcdbb');
  const [clickColor, setClickColor] = useState(false);
  const [searchResult, setSearchResult] = useState<ICallbackResult[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [placeAddress, setPlaceAddress] = useState('');
  const [geocodeX, setGeocodeX] = useState<number>(0);
  const [geocodeY, setGeocodeY] = useState<number>(0);
  const [placeOn, setPlaceOn] = useState(false);
  const [selectDate, setSelectDate] = useState(states.selectDays);
  const [body, setBody] = useState('');
  const [yearMonth, setYearMonth] = useState(
    Number(selectDate.replace(/\-/g, '').substring(0, 6))
  );
  const [checkColor, setCheckColor] = useState<IColorArr[]>([
    { color: '#f8b195', checking: false },
    { color: '#99b898', checking: false },
    { color: '#f67280', checking: false },
    { color: '#6c5b7b', checking: false },
    { color: '#feceab', checking: false },
    { color: '#2a363b', checking: false },
    { color: '#a8e6ce', checking: false },
    { color: '#a8a7a7', checking: false },
    { color: '#006c84', checking: false },
    { color: '#fe4365', checking: false },
    { color: '#c4dfe6', checking: false },
    { color: '#eed8c9', checking: false },
  ]);

  const selectedDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectDate(e.target.value);
    setYearMonth(Number(selectDate.replace(/\-/g, '').substring(0, 6)));
  };

  const onSubmit = () => {
    const content = {
      id: Date.now(),
      title: titleRef.current?.value,
      date: selectDate,
      color: color,
      place_name: placeName,
      place_address: placeAddress,
      text: body,
      year_month: yearMonth,
      x: geocodeX,
      y: geocodeY,
    };
    uploadContent(states.id, content);
    goToCalender();
  };

  const goToCalender = () => {
    nav('/calender', { state: { id: states.id } });
  };
  const goToMap = () => {
    nav('/map', { state: { id: states.id } });
  };
  const placesSearch = () => {
    let places = new kakao.maps.services.Places();
    let callback = function (result: ICallbackResult[], status: string) {
      if (status === kakao.maps.services.Status.OK) {
        setSearchResult(result.slice(0, 5));
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색결과가 없습니다.');
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('문제가 발생하였습니다.');
      }
    };
    places.keywordSearch(searchKeyword, callback);
  };

  return (
    <section className='add_content'>
      <img
        src='/logo.svg'
        alt='logo_icon'
        className='logo'
        onClick={goToCalender}
      />
      <img src='/map.svg' alt='map_icon' className='map' onClick={goToMap} />
      <div className='inputs'>
        <div className='titles'>
          <h3>제목</h3>
          <label className='title' htmlFor='title'>
            <input
              ref={titleRef}
              type='text'
              id='title'
              placeholder='제목을 입력하세요'
            />
          </label>
        </div>
        <div className='dates'>
          <h3>날짜</h3>
          <label htmlFor='date'>
            <input
              className='date'
              type='date'
              id='date'
              value={selectDate}
              onChange={selectedDate}
            />
          </label>
        </div>
        <div className='colors'>
          <h3>배경색</h3>
          <div className='color_code'>
            {clickColor ? (
              <input
                type='text'
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            ) : (
              <span>{color}</span>
            )}
            <img
              src='/palette.svg'
              alt='palette_icon'
              className='palette'
              onClick={() => setClickColor((prev) => !prev)}
            />
          </div>
          {clickColor && (
            <div className='color_picker'>
              {checkColor.map((v, idx) => (
                <div
                  className='color_circle'
                  style={{ backgroundColor: `${v.color}` }}
                  onClick={() => {
                    setColor(v.color);
                    setTimeout(() => {
                      setClickColor(false);
                    }, 750);
                  }}
                  key={idx}
                >
                  <label htmlFor={`agree-${idx}`}>
                    <input
                      type='checkbox'
                      name='check'
                      id={`agree-${idx}`}
                      checked={v.checking}
                      onChange={() =>
                        setCheckColor((prev) => {
                          const newVal = prev.map((item) => ({
                            ...item,
                            checking: false,
                          }));
                          newVal[idx].checking = true;
                          return newVal;
                        })
                      }
                    />
                    <span></span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='places'>
          <h3>장소</h3>
          <label className='place' htmlFor='place'>
            {placeOn ? (
              <div className='choose_place'>
                {placeName}{' '}
                <img
                  src='/search.svg'
                  alt='search_icon'
                  onClick={() => setPlaceOn(false)}
                />
              </div>
            ) : (
              <>
                <input
                  type='text'
                  id='place'
                  placeholder='장소를 검색하세요'
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <img
                  src='/search.svg'
                  alt='search_icon'
                  onClick={placesSearch}
                />
                <div className='place_result'>
                  {searchResult?.map((item) => {
                    return (
                      <p
                        onClick={() => {
                          setPlaceOn(true);
                          setPlaceName(item.place_name);
                          setPlaceAddress(item.address_name);
                          setGeocodeX(Number(item.x));
                          setGeocodeY(Number(item.y));
                        }}
                      >
                        {item.place_name}
                      </p>
                    );
                  })}
                </div>
              </>
            )}
          </label>
        </div>
      </div>
      <div className='editor_box'>
        <QuillEditor body={body} handleQuillChange={setBody} />
      </div>
      <div className='buttons'>
        <button onClick={onSubmit}>저장</button>
        <button onClick={goToCalender}>취소</button>
      </div>
    </section>
  );
};

export default AddContent;
