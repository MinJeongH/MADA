import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Join } from '../service/auth_provider';

interface IClickEvent {
  emailClick: boolean;
  pwClick: boolean;
  checkClick: boolean;
}

const JoinEmail = () => {
  const [clickAgree, setClickAgree] = useState(false);
  const [clickPwView, setClickPwView] = useState(false);
  const [ripple, setRipple] = useState(false);
  const [clickEvent, setClickEvent] = useState<IClickEvent>({
    emailClick: false,
    pwClick: false,
    checkClick: false,
  });
  const [mouseCode, setMouseCode] = useState({ x: 0, y: 0 });
  const [clickAni, setClickAni] = useState(false);

  const inputRefEmail = useRef<HTMLInputElement>(null);
  const inputRefPassword = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const goToSuccess = () => {
    navigate({
      pathname: '/login',
    });
  };

  const handleClickEvent = async () => {
    setRipple(true);
    setTimeout(() => {
      setRipple(false);
    }, 800);
    if (inputRefEmail.current?.value === '') {
      setClickEvent((prev) => {
        const newVal = { ...prev, checkClick: false, pwClick: false };
        newVal.emailClick = true;
        return newVal;
      });
      setClickAni(true);
      setTimeout(() => {
        setClickAni(false);
      }, 500);
    } else if (inputRefEmail.current?.value) {
      setClickEvent((prev) => {
        const newVal = { ...prev, checkClick: false, pwClick: false };
        newVal.emailClick = false;
        return newVal;
      });
      if (inputRefPassword.current?.value === '') {
        setClickEvent((prev) => {
          const newVal = { ...prev, checkClick: false, emailClick: false };
          newVal.pwClick = true;
          return newVal;
        });
        setClickAni(true);
        setTimeout(() => {
          setClickAni(false);
        }, 500);
      } else if (inputRefPassword.current?.value) {
        setClickEvent((prev) => {
          const newVal = { ...prev, checkClick: false, emailClick: false };
          newVal.pwClick = false;
          return newVal;
        });
        if (clickAgree === true) {
          setClickEvent((prev) => {
            const newVal = { ...prev, emailClick: false, pwClick: false };
            newVal.checkClick = false;
            return newVal;
          });
          const result = await Join(
            inputRefEmail.current.value,
            inputRefPassword.current.value
          );
          if (!result.ret) alert(result.message);
          else goToSuccess();
        } else {
          setClickEvent((prev) => {
            const newVal = { ...prev, emailClick: false, pwClick: false };
            newVal.checkClick = true;
            return newVal;
          });
          setClickAni(true);
          setTimeout(() => {
            setClickAni(false);
          }, 500);
        }
      }
    }
  };

  const handleMouseCode = (e: any) => {
    setMouseCode({ x: e.offsetX, y: e.offsetY });
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseCode);
    return () => {
      window.removeEventListener('mouseup', handleMouseCode);
    };
  }, []);

  return (
    <section className='join_email'>
      <Link to={'/'}>
        <img className='logo' src='/logo.svg' alt='logo_icon' />
      </Link>
      <div className='inputs'>
        <div className={`email ${clickEvent.emailClick && 'bordered_email'}`}>
          <h1>E-mail</h1>
          <label htmlFor='email'>
            <img id='email' src='/message.svg' alt='email_icon' />
            <input ref={inputRefEmail} type='text' placeholder='e-mail' />
          </label>
        </div>
        <div className={`pw ${clickEvent.pwClick && 'bordered_pw'}`}>
          <h1>Password</h1>
          <label htmlFor='password'>
            <img className='lock' src='/lock.svg' alt='pw_icon' />
            <input
              id='password'
              ref={inputRefPassword}
              type={clickPwView ? 'text' : 'password'}
              placeholder='password'
            />
            {clickPwView ? (
              <img
                className='eye_view'
                src='/eye_view.svg'
                alt='eye_icon'
                onClick={() => setClickPwView((prev) => !prev)}
              />
            ) : (
              <img
                className='eye'
                src='/eye.svg'
                alt='eye_icon'
                onClick={() => setClickPwView((prev) => !prev)}
              />
            )}
          </label>
        </div>
      </div>
      <div className='select'>
        <div
          className={`check_btn ${clickEvent.checkClick && 'bordered_check'}`}
        >
          <label htmlFor='agree'>
            <input
              type='checkbox'
              name='check'
              id='agree'
              onClick={() => setClickAgree((prev) => !prev)}
            />
            <span></span>
          </label>
          <h3>개인 정보 수집 및 이용에 동의합니다.</h3>
        </div>
        {clickEvent.emailClick && <h2>이메일을 입력하세요</h2>}
        {clickEvent.pwClick && <h2>비밀번호를 입력하세요</h2>}
        {clickEvent.checkClick && <h2>약관을 체크해주세요</h2>}
        <button
          className={`${clickAni && 'button_click'}`}
          onClick={handleClickEvent}
        >
          Create Account
          {ripple && (
            <div
              className='circle'
              style={{ top: mouseCode.y, left: mouseCode.x }}
            ></div>
          )}
        </button>
      </div>
    </section>
  );
};

export default JoinEmail;
