import { getAuth, getRedirectResult, User } from 'firebase/auth';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { googleAuth, LoginEmail } from '../service/auth_provider';

const Login = () => {
  const [spinner, setSpinner] = useState(false);
  const [clickPw, setClickPw] = useState(false);

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
    if (inputRefEmail.current && inputRefPassword.current) {
      const result = await LoginEmail(
        inputRefEmail.current.value,
        inputRefPassword.current.value
      );

      if (!result.ret) alert(result.message);
      else goToMain(result.user?.uid);
    }
  };

  const handleClickEventGoogle = () => {
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

  return (
    <section className='login'>
      <img className='logo' src='/logo.svg' alt='logo' />
      <div className='content'>
        <div className='login_btn'>
          <div className='input_user'>
            <div className='email'>
              <h1>E-mail</h1>
              <label htmlFor='email'>
                <img id='email' src='/message.svg' alt='email_icon' />
                <input ref={inputRefEmail} type='text' placeholder='e-mail' />
              </label>
            </div>
            <div className='pw'>
              <h1>Password</h1>
              <label htmlFor='password'>
                <img src='/lock.svg' alt='pw_icon' />
                <input
                  id='password'
                  ref={inputRefPassword}
                  type={clickPw ? 'text' : 'password'}
                  placeholder='password'
                  onKeyPress={onkeyPress}
                />
                <img
                  src='/eye.svg'
                  alt='eye_icon'
                  onClick={() => setClickPw((prev) => !prev)}
                />
              </label>
            </div>
          </div>
          <button onClick={handleClickEventLogin}>Sign In</button>
        </div>
        <h1>OR</h1>
        <button className='google_btn' onClick={handleClickEventGoogle}>
          <img src='/Google.svg' alt='google_icon' /> Sign in with Google
        </button>
      </div>
      <Link to={'/joinEmail'}>
        <button className='join_btn'>Create Account</button>
      </Link>
      {spinner && (
        <div className='spinner_backgrond'>
          <div className='spinner'></div>
          <p className='spinner_text'>로그인 상태를 확인하고 있습니다.</p>
        </div>
      )}
    </section>
  );
};

export default Login;
