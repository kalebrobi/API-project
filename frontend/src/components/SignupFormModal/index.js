import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
<form onSubmit={handleSubmit}>
    <div className="signUp-form">
      <h1>Sign Up</h1>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      {/* <div className="email-input"> */}
      <div className="signUp-input">
        <label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-modalInput"
            placeholder="Email"
          />
        </label>
      </div>
      <div className="username-signup">
        <label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="signup-modalInput"
            placeholder="Username"
          />
        </label>
      </div>
      <div className="fname-signup">
        <label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="signup-modalInput"
            placeholder="First Name"
          />
        </label>
      </div>
      <div className="lastname-signup">
        <label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="signup-modalInput"
            placeholder="Last Name"
          />
        </label>
      </div>
      <div className="password-signup">
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-modalInput"
            placeholder="Password"
          />
        </label>
      </div>
      <div className="password-confirm">
        <label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="signup-modalInput"
            placeholder="Confirm Password"
          />
        </label>
      </div>
      <div>
        <button className="signUp-button" type="submit">Sign Up</button>
      </div>
  </div>
</form>
  );
}

export default SignupFormModal;
