import { User } from 'firebase/auth';
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { googleAuth, LoginEmail } from '../service/auth_provider';

const Login = () => {
  const inputRefEmail = useRef<HTMLInputElement>(null);
  const inputRefPassword = useRef<HTMLInputElement>(null);

  const nav = useNavigate();
  const goToMain = (userId?: User | string) => {
    nav('/calender', { state: { id: userId } });
  };

  const handleClickEventLogin = async () => {
    if (inputRefEmail.current && inputRefPassword.current) {
      const result = await LoginEmail(
        inputRefEmail.current.value,
        inputRefPassword.current.value
      );

      if (!result.ret) alert(result.message);
      else goToMain(result.user);
    }
  };

  const handleClickEventGoogle = () => {
    googleAuth.LoginGoogle('Google').then((data) => goToMain(data.user.uid));
  };

  const onkeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      handleClickEventLogin();
    }
  };

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
                  type='password'
                  placeholder='password'
                  onKeyPress={onkeyPress}
                />
                <img src='/eye.svg' alt='eye_icon' />
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
    </section>
  );
};

export default Login;
