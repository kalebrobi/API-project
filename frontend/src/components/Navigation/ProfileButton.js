import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
<div className="profile-button">
  <button onClick={openMenu} className={'profile-dropdown'}>
    <i className="fas fa-user-circle" />
  </button>
  <div className={ulClassName} ref={ulRef}>
    <div className="profile-button-contents">
          <div className="userName-dropdown">{user.username}</div>
          <div className="firstName-dropdown">{user.firstName} {user.lastName}</div>
          <div className="email-dropdown">{user.email}</div>
        <div className="dropdown-logout-button">
          <button onClick={logout}>Log Out</button>
        </div>
    </div>
  </div>
</div>
    </>
  );
}

export default ProfileButton;
