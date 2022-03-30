import moment from 'moment';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.scss';

const Calender = () => {
  const [getMoment, setMoment] = useState(moment());
  const [selectDay, setSelectDay] = useState('');
  const nav = useNavigate();

  const today = getMoment;
  const weekText = ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'];

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
            </td>
          );
        });
    });
  };
  const goToMap = () => {
    nav('/map');
  };
  // const goToRecode = () => {
  //   nav({
  //     pathname: '/Recode',
  //   });
  // };
  const goToAdd = () => {
    nav('/addcontent', { state: selectDay });
  };

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
