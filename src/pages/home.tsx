import React from 'react';
import { Link } from 'react-router-dom';
import './pages.scss';

const Home = () => {
  return (
    <section className='home'>
      <img
        className='background'
        src='/background_mobile.png'
        alt='home_backgound'
      />
      <img className='logo' src='/logo.svg' alt='logo' />
      <Link to={'/joinEmail'}>
        <h1>Create Account</h1>
      </Link>
      <Link to={'/login'}>
        <button>Sign In</button>
      </Link>
    </section>
  );
};

export default Home;
