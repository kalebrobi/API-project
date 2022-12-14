import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CreateNewSpot from '../CreateNewSpotModal';
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
      <div>
        <ProfileButton user={sessionUser} />
      </div>
      <div>
        <OpenModalButton
        buttonText='AirBnB Your Home'
        modalComponent={<CreateNewSpot />}
        />
      </div>
      </>

    );
  } else {
    sessionLinks = (
    <div className='menu-right'>
      <button className='spots-button' onClick={handleClick}>View all Spots</button>
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
    <div>
      <NavLink exact to="/"><img  className='logo-image' src={logoImagee} alt='Logo'></img></NavLink>
    </div>
    {/* <div className='search-bar'>
      <input type='text' />
        <i class="fa-solid fa-magnifying-glass"></i>
    </div> */}
    {isLoaded && sessionLinks}
</div>

  );
}

export default Navigation;
