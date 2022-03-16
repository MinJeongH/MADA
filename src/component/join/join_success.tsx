import React from "react";
import { Link } from "react-router-dom";

const JoinSuccess = () => {
  return (
    <section>
      <h1>가입을 축하드립니다!</h1>
      <Link to={"/"}>
        <button>홈으로</button>
      </Link>
      <Link to={"/login"}>
        <button>로그인하러가기</button>
      </Link>
    </section>
  );
};

export default JoinSuccess;
