import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import './pages.scss';
import 'react-quill/dist/quill.snow.css';
import { HexColorPicker } from 'react-colorful';

const { kakao } = window as any;

interface ICallbackResult {
  address_name: string;
  place_name: string;
}

const AddContent = () => {
  const [color, setColor] = useState('#edcdbb');
  const [clickColor, setClickColor] = useState(false);
  const [searchResult, setSearchResult] = useState<ICallbackResult[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [placeOn, setPlaceOn] = useState(false);

  const modules = {
    toolbar: [
      //[{ 'font': [] }],
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ['clean'],
    ],
  };
  const formats = [
    //'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
  ];

  const placesSearch = () => {
    let places = new kakao.maps.services.Places();
    let callback = function (result: ICallbackResult[], status: string) {
      console.log(status);
      if (status === kakao.maps.services.Status.OK) {
        setSearchResult(result.slice(0, 5));
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색결과가 없습니다.');
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('문제가 발생하였습니다.');
      }
    };
    console.log(searchKeyword);
    places.keywordSearch(searchKeyword, callback);
  };

  return (
    <section className='add_content'>
      <img src='/logo.svg' alt='logo_icon' className='logo' />
      <img src='/map.svg' alt='map_icon' className='map' />
      <div className='inputs'>
        <div className='titles'>
          <h3>제목</h3>
          <label className='title' htmlFor='title'>
            <input type='text' id='title' placeholder='제목을 입력하세요' />
          </label>
        </div>
        <div className='dates'>
          <h3>날짜</h3>
          <label htmlFor='date'>
            <input
              className='date'
              type='text'
              id='date'
              value={'YYYY-MM-DD'}
              readOnly
            />
          </label>
        </div>
        <div className='colors'>
          <h3>배경색</h3>
          <div className='color_code'>
            {color}
            <img
              src='/palette.svg'
              alt='palette_icon'
              className='palette'
              onClick={() => setClickColor((prev) => !prev)}
            />
          </div>
        </div>
        <div className='places'>
          <h3>장소</h3>
          <label className='place' htmlFor='place'>
            {placeOn ? (
              <div>{placeName}</div>
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
        {clickColor && (
          <HexColorPicker
            className='color_picker'
            color={color}
            onChange={setColor}
          />
        )}
      </div>
      <div className='editor'>
        <ReactQuill
          style={{ width: '1000px', height: '400px' }}
          theme='snow'
          modules={modules}
          formats={formats}
        />
      </div>
    </section>
  );
};

export default AddContent;
