import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { googleAuth, LoginEmail } from "../service/auth_provider";

const Login = () => {
  const inputRefEmail = useRef<HTMLInputElement>(null);
  const inputRefPassword = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const goToHome = () => {
    navigate({
      pathname: "/",
    });
  };

  const handleClickEventLogin = async () => {
    if (inputRefEmail.current && inputRefPassword.current) {
      const result = await LoginEmail(
        inputRefEmail.current.value,
        inputRefPassword.current.value
      );

      if (!result.ret) alert(result.message);
      else goToHome();
    }
  };

  const handleClickEventGoogle = () => {
    googleAuth.LoginGoogle("Google");
  };

  const onkeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      handleClickEventLogin();
    }
  };

  return (
    <section>
      <div>
        <input ref={inputRefEmail} type="text" placeholder="e-mail" />
        <input
          ref={inputRefPassword}
          type="text"
          placeholder="password"
          onKeyPress={onkeyPress}
        />
        <button onClick={handleClickEventLogin}>login</button>
      </div>
      <button onClick={handleClickEventGoogle}>Google로 로그인</button>
      <Link to={"/joinEmail"}>
        <button>E-mail Join</button>
      </Link>
    </section>
  );
};

export default Login;
