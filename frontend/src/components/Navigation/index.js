import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import logoImagee from '../images/kindpng_1322163.png'
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
    <div className='logIn-signUp'>
      <li>
        <OpenModalButton
          buttonText="Login"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign-Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    </div>
    );
  }

  return (
  <div className='header'>
    <img  className='logo-image' src={logoImagee} alt='Logo'>
    </img>
      <ul>
        <li className='homeLink'>
          <NavLink exact to="/"><i className="fa-brands fa-airbnb"></i></NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
</div>

  );
}

export default Navigation;
