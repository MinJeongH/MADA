import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Join } from '../../service/auth_provider';

const JoinEmail = () => {
  const [clickAgree, setClickAgree] = useState(false);

  const inputRefEmail = useRef<HTMLInputElement>(null);
  const inputRefPassword = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const goToSuccess = () => {
    navigate({
      pathname: '/login',
    });
  };

  const handleClickEvent = async () => {
    if (clickAgree === true) {
      if (inputRefEmail.current && inputRefPassword.current) {
        const result = await Join(
          inputRefEmail.current.value,
          inputRefPassword.current?.value
        );

        if (!result.ret) alert(result.message);
        else goToSuccess();
      }
    } else alert('정보 저장에 동의하여 주십시오');
  };

  return (
    <section className='join_email'>
      <img className='logo' src='/logo.svg' alt='logo_icon' />
      <div className='inputs'>
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
            />
            <img src='/eye.svg' alt='eye_icon' />
          </label>{' '}
        </div>
      </div>
      <div className='select'>
        <div className='check_btn'>
          <label htmlFor='agree'>
            <input
              type='checkbox'
              name='check'
              id='agree'
              onClick={() => setClickAgree((prev) => !prev)}
            />
            <span></span>
          </label>
          <h3>
            이메일과 비밀번호의 저장과 로그인 후 등록하는 정보들의 저장에
            동의합니다.
          </h3>
        </div>
        <button onClick={handleClickEvent}>Create Account</button>
      </div>
    </section>
  );
};

export default JoinEmail;
