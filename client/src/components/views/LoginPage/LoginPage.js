import React, { useState } from 'react'

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (event) => {
    setEmail(event.currentTarget.value);
  }

  const onChangePassword = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // dispatch(loginRequestBody)
    let loginRequestBody = {
      email,
      password,
    }
    console.log("loginRequestBody", loginRequestBody);
  }

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
      <form
        onSubmit={onSubmitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label>이메일</label>
        <input type="email" value={email} onChange={onChangeEmail} />
        <label>비밀번호</label>
        <input type="password" value={password} onChange={onChangePassword} />
        <br />
        <button>로그인</button>
      </form>
    </div>
  )
}

export default LoginPage