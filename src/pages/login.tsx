import { getAuth, getRedirectResult, User } from 'firebase/auth';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { googleAuth, LoginEmail } from '../service/auth_provider';

interface IClickEvent {
  emailClick: boolean;
  pwClick: boolean;
}

const Login = () => {
  const [spinner, setSpinner] = useState(false);
  const [clickPw, setClickPw] = useState(false);
  const [rippleLogin, setRippleLogin] = useState(false);
  const [rippleGoogle, setRippleGoogle] = useState(false);
  const [clickEvent, setClickEvent] = useState<IClickEvent>({
    emailClick: false,
    pwClick: false,
  });
  const [mouseCode, setMouseCode] = useState({ x: 0, y: 0 });
  const [clickAni, setClickAni] = useState(false);

  const inputRefEmail = useRef<HTMLInputElement>(null);
  const inputRefPassword = useRef<HTMLInputElement>(null);

  const nav = useNavigate();
  const goToMain = useCallback(
    (userId?: User | string) => {
      nav('/calender', { state: { id: userId } });
    },
    [nav]
  );

  const handleClickEventLogin = async () => {
    setRippleLogin(true);
    setTimeout(() => {
      setRippleLogin(false);
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
        const result = await LoginEmail(
          inputRefEmail.current.value,
          inputRefPassword.current.value
        );
        if (!result.ret) alert(result.message);
        else goToMain(result.user?.uid);
      }
    }
  };

  const handleClickEventGoogle = () => {
    setRippleGoogle(true);
    setTimeout(() => {
      setRippleGoogle(false);
    }, 800);
    googleAuth.LoginGoogle('Google');
  };

  const onkeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      handleClickEventLogin();
    }
  };

  useEffect(() => {
    const auth = getAuth();
    setSpinner(true);
    getRedirectResult(auth).then((result) => {
      if (result) {
        goToMain(result.user.uid);
      }
      setSpinner(false);
    });
  }, [goToMain]);

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
    <section className='login'>
      <div className={`login_background ${spinner && 'login_spin'}`}>
        <Link to={'/'}>
          <img className='logo' src='/logo.svg' alt='logo' />
        </Link>
        <div className='content'>
          <div className='login_btn'>
            <div className='input_user'>
              <div
                className={`email ${clickEvent.emailClick && 'bordered_email'}`}
              >
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
                    type={clickPw ? 'text' : 'password'}
                    placeholder='password'
                    onKeyPress={onkeyPress}
                  />
                  {clickPw ? (
                    <img
                      className='eye_view'
                      src='/eye_view.svg'
                      alt='eye_icon'
                      onClick={() => setClickPw((prev) => !prev)}
                    />
                  ) : (
                    <img
                      className='eye'
                      src='/eye.svg'
                      alt='eye_icon'
                      onClick={() => setClickPw((prev) => !prev)}
                    />
                  )}
                </label>
              </div>
            </div>
            <button
              className={`${clickAni && 'button_ani'}`}
              onClick={handleClickEventLogin}
            >
              Sign In
              {rippleLogin && (
                <div
                  className='circle'
                  style={{ top: mouseCode.y, left: mouseCode.x }}
                ></div>
              )}
            </button>
            {clickEvent.emailClick && <h2>이메일을 입력하세요</h2>}
            {clickEvent.pwClick && <h2>비밀번호를 입력하세요</h2>}
          </div>
          <h1>OR</h1>
          <button className='google_btn' onClick={handleClickEventGoogle}>
            <img src='/Google.svg' alt='google_icon' /> Sign in with Google
            {rippleGoogle && (
              <div
                className='circle'
                style={{ top: mouseCode.y, left: mouseCode.x }}
              ></div>
            )}
          </button>
        </div>
        <Link to={'/joinEmail'}>
          <div className='join_btn'>Create Account</div>
        </Link>
      </div>
      {spinner && (
        <div className='spinner_background'>
          <div className='spinner'></div>
          <p className='spinner_text'>로그인 상태를 확인하고 있습니다.</p>
        </div>
      )}
    </section>
  );
};

export default Login;
