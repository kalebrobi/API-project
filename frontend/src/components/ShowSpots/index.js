import LoadAllSpots from "../LoadAllSpots";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getASpot } from "../../store/spots";



const ShowSpots = () => {
  const dispatch = useDispatch()
  const {spotId} = useParams()
  const spot = useSelector(state => {return state.spots.singleSpot})
  const spotInfo = useSelector(state => state.spots.allSpots)


  useEffect(() =>{
    dispatch(getASpot(spotId))
  },[spotId])



  if(!spot) return null

  return (
    <>
    <img src={spotInfo[spotId].previewImage}  alt='prevImage' />
    <div>
      {spot.address},{spot.state}
    </div>
    <div>
      {spot.avgRaating}
    </div>
    </>
  )
}

export default ShowSpots
