import React, { useEffect } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCookie, getCookie, deleteCookie } from "../../../utils/cookie";
import { actionCreators as userActions } from "../../../redux/modules/user";

function LandingPage() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user?.userId);

  const logOut = () => {
    dispatch(userActions.logOut());
  };


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작 페이지</h2>
      <button onClick={logOut}>
        로그아웃
      </button>

    </div>

  )
}

export default LandingPage