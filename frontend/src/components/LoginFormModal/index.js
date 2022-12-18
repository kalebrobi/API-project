import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  const handleDemo = (e) => {
  //  e.preventDefault()
    setCredential('Demo-user2')
    setPassword('password2')
    return dispatch(sessionActions.login({ credential, password }))
    .then(closeModal)
  }



  return (


<form onSubmit={handleSubmit}>
  <div className="logIn-form">
    <h1>welcome back!</h1>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      <div className="userName-logIn">
        <label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            className="modalInput"
            placeholder="Username or Email"
          />
        </label>
      </div>
      <div>
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="modalInput"
            placeholder="Password"
          />
        </label>
      </div>
      <div>
        <button className="modalButton" type="submit">Log In</button>
      </div>
      <div>
        <button className="modalButton" onClick={handleDemo}>Demo User</button>
      </div>
    </div>
</form>
  );
}

export default LoginFormModal;
