import React, { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Join } from "../../service/auth_provider";

const JoinEmail = () => {
  const inputRefEmail = useRef<HTMLInputElement>(null);
  const inputRefPassword = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const goToSuccess = () => {
    navigate({
      pathname: "/joinSuccess",
    });
  };

  const handleClickEvent = async () => {
    if (inputRefEmail.current && inputRefPassword.current) {
      const result = await Join(
        inputRefEmail.current.value,
        inputRefPassword.current?.value
      );

      if (!result.ret) alert(result.message);
      else goToSuccess();
    }
  };

  return (
    <section>
      <input ref={inputRefEmail} type="text" placeholder="e-mail" />
      <input ref={inputRefPassword} type="text" placeholder="password" />
      <button onClick={handleClickEvent}>join</button>
    </section>
  );
};

export default JoinEmail;
