import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { downloadContent, IContent } from '../service/data_repository';
import './pages.scss';

interface IGetContent {
  [id: string]: IContent;
}

const Calender = () => {
  const [getMoment, setMoment] = useState(moment());
  const [selectDay, setSelectDay] = useState('');
  const [content, setContent] = useState<IGetContent>();
  const [contentKey, setContentKey] = useState<string[]>([]);

  const nav = useNavigate();
  const location = useLocation();
  const states = location.state as unknown as any;

  const today = getMoment;
  const weekText = ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'];
  const currentMonth = Number(today.format('YYYYMM'));

  const firstWeek = today.clone().startOf('month').week();
  const lastWeek =
    today.clone().endOf('month').week() === 1
      ? 53
      : today.clone().endOf('month').week();
  const weeks = Array.from(
    { length: lastWeek - firstWeek + 1 },
    (v, i) => i + firstWeek
  );
  const weekArr = () => {
    return weeks.map((week) => {
      return Array(7)
        .fill(0)
        .map((data, index) => {
          let monthBackgroundColor;
          let daycolor = 'black';
          let selectBorder;
          let boxHeight = '140px';
          let days = today
            .clone()
            .startOf('year')
            .week(week)
            .startOf('week')
            .add(index, 'day');

          if (weeks.length > 5) boxHeight = '116px';

          if (days.day() === 0) daycolor = '#d71515';
          else if (days.day() === 6) daycolor = '#003fe0';

          if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
            monthBackgroundColor = '#edcdbb';
          }

          if (today.format('MM') !== days.format('MM')) {
            daycolor = '#9e9e9e';
          }

          if (selectDay) {
            if (selectDay === days.format('YYYY-MM-DD')) {
              selectBorder = '2px solid #e26f1e';
            }
          } else {
            setSelectDay(today.format('YYYY-MM-DD'));
          }

          // let result;

          // if (content) {
          //   for (let i = 0; i < contentKey.length; i++) {
          //     result = (
          //       <div>
          //         {content[contentKey[i]].title} {content[contentKey[i]].date}
          //       </div>
          //     );
          //   }
          // }

          return (
            <td
              key={index}
              style={{
                color: daycolor,
                backgroundColor: monthBackgroundColor,
                border: selectBorder,
                boxSizing: 'border-box',
                height: boxHeight,
              }}
              onClick={() => {
                setSelectDay(days.format('YYYY-MM-DD'));
              }}
            >
              <span>{days.format('D')}</span>
              {() => {
                if (content) {
                  for (let i = 0; i < contentKey.length; i++) {
                    <div>
                      {content[contentKey[i]].title}{' '}
                      {content[contentKey[i]].date}
                    </div>;
                  }
                }
              }}
              {/* {content &&
                content[contentKey[0]].date === days.format('YYYY-MM-DD') &&
                result} */}
            </td>
          );
        });
    });
  };

  const goToMap = () => {
    nav('/map');
  };
  const goToAdd = () => {
    nav('/addcontent', { state: { id: states.id, selectDays: selectDay } });
  };

  useEffect(() => {
    downloadContent(states.id, setContent, currentMonth);
    if (content) setContentKey(Object.keys(content));
  }, [states.id, setContent, currentMonth, setContentKey]);

  return (
    <section className='calender'>
      <img className='logo' src='/logo.svg' alt='logo_icon' />
      <img className='map' src='/map.svg' alt='map_icon' onClick={goToMap} />
      <div className='month'>
        <img
          className='last'
          src='/arrow.svg'
          alt='last_month'
          onClick={() => {
            setMoment(getMoment.clone().subtract(1, 'month'));
          }}
        />
        <span>{today.format('YYYY.MM')}</span>
        <img
          className='next'
          src='/arrow.svg'
          alt='next_month'
          onClick={() => {
            setMoment(getMoment.clone().add(1, 'month'));
          }}
        />
      </div>
      <table>
        <thead>
          <tr>
            {weekText.map((v) => {
              let weekcolor = 'black';
              if (v === 'SUN') weekcolor = '#d71515';
              else if (v === 'SAT') weekcolor = '#003fe0';
              return <th style={{ color: weekcolor }}>{v}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {weekArr().map((v) => {
            return <tr>{v}</tr>;
          })}
        </tbody>
      </table>
      <img
        className='add'
        src='/content_add.svg'
        alt='add_icon'
        onClick={goToAdd}
      />
    </section>
  );
};

export default Calender;
