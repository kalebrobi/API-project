import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CreateNewSpot from '../CreateNewSpotModal';
import EditSpot from '../EditSpot';
import {useHistory} from 'react-router-dom'
import logoImagee from '../images/Airbnb.png'
import './Navigation.css';


function Navigation({ isLoaded }){
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);

  const handleClick = () => {
    // Navigate to the specified path
    history.push("/spots");
  }
  const addAspot = () => {
    history.push('/')
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
  <div className='loggedIn-menu-right'>
  <ProfileButton user={sessionUser} />
  <div className='dropdown'>
  <button className='dropdown-button'>My Account</button>
    <div className='dropdown-content'>

      <div>
        <OpenModalButton
        className={'airbnb-your-home-button'}
        buttonText='AirBnB Your Home'
        modalComponent={<CreateNewSpot />}
        />
      </div>
      <div>
        <NavLink to={'/reviews'}><button className=''>Your Reviews</button></NavLink>
      </div>
      <div>
        <NavLink to={'/account'}><button>Your Profile</button></NavLink>
      </div>
    </div>
  </div>
  </div>
</>

    );
  } else {
    sessionLinks = (
    <div className='menu-right'>
      {/* <button className='spots-button' onClick={handleClick}>View all Spots</button> */}
        <OpenModalButton
          buttonText="Login"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign-Up"
          modalComponent={<SignupFormModal />}
        />
    </div>
    );
  }

  return (

  <div className='header'>
      <NavLink exact to="/"><img  className='logo-image' src={logoImagee} alt='Logo'></img></NavLink>
    {isLoaded && sessionLinks}
  </div>

  );
}

export default Navigation;
