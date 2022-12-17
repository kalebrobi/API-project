import React, {useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getSpots } from '../../store/spots';
import { NavLink } from 'react-router-dom'
import './Spots.css';
import ShowSpots from '../ShowSpots';

const LoadAllSpots = () => {
  const dispatch = useDispatch();

  const spots = useSelector(state => state.spots.allSpots)
  const spotsArr = Object.values(spots)



  useEffect(() => {
    dispatch(getSpots())
  },[])


  if(!spots) return null

return (
  <div className='spot-list-container'>
    {spotsArr.map(spot => (
    <NavLink to={`spots/${spot.id}`} key={spot.id} className='eachCard'>
      <img className='images' src={spot.previewImage} alt='prevImage'/>
        {/* <div className='spot-details'> */}
        <div className='city_state'>{spot.city},{spot.state}
        {spot.avgRating !== null ? <div><i class="fa-sharp fa-solid fa-star"></i> {spot.avgRating}</div> : <div>no reviews</div>}
        </div>
        <div className='name-of-spot'>{spot.name}</div>
        <div className='price_night'>${spot.price} night</div>
     {/* </div> */}
    </NavLink>
    ))}
  </div>
)}


export default LoadAllSpots;
