import React, {useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getSpots } from '../../store/spots';
import { NavLink } from 'react-router-dom'
import './Spots.css';

const LoadAllSpots = () => {
  const dispatch = useDispatch();

  const spots = useSelector(state => state.spots.allSpots)
  const spotsArr = Object.values(spots)



  useEffect(() => {
    dispatch(getSpots())
  },[])



  if(!spots) return null

return (
<div>
  <div className='spot-list-container'>
    {spotsArr.map(spot => (
    <NavLink to={`spots/${spot.id}`} key={spot.id} className='eachCard'>
      <div>{spot.previewImage}</div>
      <div className='city_state'>{spot.city},{spot.state}</div>
      <div className='average_rating'>{spot.avgRating}</div>
      <div className='price_night'>{spot.price} night</div>
    </NavLink>
    ))}
  </div>
</div>
)}


export default LoadAllSpots;
