import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section>
      <h1>홈화면!!!!!</h1>
      <Link to={"/login"}>
        <button>로그인</button>
      </Link>
    </section>
  );
};

export default Home;
