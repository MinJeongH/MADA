import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { downloadContent, IContent } from '../service/data_repository';
import './pages.scss';

interface IGetContent {
  [id: string]: IContent;
}

interface IDaysInfo {
  days: Number;
  isNowMonth: boolean;
  isSun: boolean;
  isSat: boolean;
  isToday: boolean;
  isSelectday: boolean;
  selectedDays: string;
}

const Calender = () => {
  const nav = useNavigate();
  const location = useLocation();
  const states = location.state as any;
  const weekText = ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'];

  const [today, setToday] = useState(moment());
  const [selectDay, setSelectDay] = useState(today.format('YYYY-MM-DD'));
  const [content, setContent] = useState<IGetContent>();
  const [contentKey, setContentKey] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(
    Number(today.format('YYYYMM'))
  );
  const [weeks, setWeeks] = useState([0]);
  const [daysArr, setDaysArr] = useState<IDaysInfo[][]>();

  const goToMap = () => {
    nav('/map', { state: { id: states.id } });
  };
  const goToAdd = () => {
    nav('/addcontent', { state: { id: states.id, selectDays: selectDay } });
  };
  const goToContentView = (event: React.MouseEvent<HTMLDivElement>) => {
    const e = event.target as HTMLDivElement;
    content &&
      e.dataset.key &&
      nav('/contentView', {
        state: { id: states.id, content: content[e.dataset.key] },
      });
  };

  useEffect(() => {
    setCurrentMonth(Number(today.format('YYYYMM')));
  }, [today]);

  useEffect(() => {
    const firstWeek = today.clone().startOf('month').week();
    const lastWeek =
      today.clone().endOf('month').week() === 1
        ? 53
        : today.clone().endOf('month').week();
    const allWeek = Array.from(
      { length: lastWeek - firstWeek + 1 },
      (v, i) => i + firstWeek
    );
    setWeeks(allWeek);
  }, [today]);

  useEffect(() => {
    const weekArr: IDaysInfo[][] = weeks.map((week) =>
      Array(7)
        .fill(0)
        .map((data, index) => {
          let isNowMonth;
          let isSun;
          let isSat;
          let isToday;
          let isSelectday;
          let dates = today
            .clone()
            .startOf('year')
            .week(week)
            .startOf('week')
            .add(index, 'day');
          let days = Number(dates.format('D'));
          let selectedDays = dates.format('YYYY-MM-DD');
          isSun = dates.day() === 0 ? true : false;
          isSat = dates.day() === 6 ? true : false;
          isToday =
            dates.format('YYYY-MM-DD') === today.format('YYYY-MM-DD')
              ? true
              : false;
          isNowMonth = dates.format('MM') === today.format('MM') ? true : false;
          isSelectday = dates.format('YYYY-MM-DD') === selectDay ? true : false;
          return {
            days,
            isNowMonth,
            isSun,
            isSat,
            isToday,
            isSelectday,
            selectedDays,
          };
        })
    );
    setDaysArr(weekArr);
  }, [today, weeks, selectDay]);

  useEffect(() => {
    downloadContent(states.id, setContent, currentMonth);
  }, [states.id, setContent, currentMonth]);

  useEffect(() => {
    if (content) setContentKey(Object.keys(content));
  }, [content]);

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
            setToday(today.clone().subtract(1, 'month'));
          }}
        />
        <span>{today.format('YYYY.MM')}</span>
        <img
          className='next'
          src='/arrow.svg'
          alt='next_month'
          onClick={() => {
            setToday(today.clone().add(1, 'month'));
          }}
        />
      </div>
      <table>
        <thead>
          <tr>
            {weekText.map((v) => (
              <th
                className={`week_name ${v === 'SUN' && 'sun'} ${
                  v === 'SAT' && 'sat'
                }`}
              >
                {v}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {daysArr?.map((v) => (
            <tr>
              {v.map((v) => (
                <td
                  className={`days ${v.isSun && 'sunday'} ${
                    v.isSat && 'saturday'
                  } 
                  ${!v.isNowMonth && 'not_now_month'} 
                  ${v.isToday && 'today'}
                  ${v.isSelectday && 'select_day'}`}
                  onClick={() => setSelectDay(v.selectedDays)}
                >
                  <span>{v.days}</span>
                  {contentKey
                    .filter(
                      (key) => content && content[key]?.date === v.selectedDays
                    )
                    .map((key) => (
                      <div
                        key={key}
                        className='daily_content'
                        style={{
                          backgroundColor: `${content![key].color}`,
                        }}
                        onClick={goToContentView}
                        data-key={key}
                      >
                        <p data-key={key}>{content![key].title}</p>
                      </div>
                    ))}
                </td>
              ))}
            </tr>
          ))}
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
