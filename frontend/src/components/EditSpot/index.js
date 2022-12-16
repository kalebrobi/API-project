import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteASpot, getSpots, updateASpot } from "../../store/spots";
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom";
import './EditSpot.css'
import OpenModalButton from "../OpenModalButton";
import EditSpotModal from "./EditSpotModal";
import { useParams } from "react-router-dom";

function EditSpot() {

  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user)
  const spotsObj = useSelector(state => { return state.spots.allSpots})


  const spotArr = Object.values(spotsObj)
  const userSpots = spotArr.filter(spot => { return spot.ownerId === sessionUser.id})



  const deleteSpot = async (spotId) => {
    await dispatch(deleteASpot(spotId))
    history.push('/spots')

  }



  // console.log(userSpots)


  useEffect(() => {
    dispatch(getSpots())
  }, [])



  return (

<div>
  <div className='containerDivNew'>
    {userSpots.map(spot => (
  <div key={spot.id}>
      <img className='imagesNewNew' src={spot.previewImage} alt='prevImage'></img>
      <div className='city_state'>{spot.city},{spot.state}</div>
      <div className='average_rating'>{spot.avgRating}</div>
      <div className='price_night'>${spot.price} night</div>
      {/* <button>Edit</button>
      <button>Delete</button> */}
      <OpenModalButton
        modalComponent={<EditSpotModal spot={{spot}} />}
        buttonText={'Edit'}
      />
      <button onClick={() => deleteSpot(spot.id)}>Delete</button>
      </div>
    ))}
  </div>
</div>


  )

}



export default EditSpot
