import LoadAllSpots from "../LoadAllSpots";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getASpot } from "../../store/spots";





const ShowSpots = () => {
  const dispatch = useDispatch()
  const {spotId} = useParams()
  const spot = useSelector(state => {return state.spots.singleSpot})



  useEffect(() => {
    dispatch(getASpot(spotId))
  },[spotId])

  if(!spot.SpotImages) return null
  if(!spot) return null

  return (
    <>
  <div>
    {spot.SpotImages.map(eachImage => (
      <div key={spot.id}><img src={eachImage.url}></img></div>
        ))}
        <img />
      {spot.address},{spot.state}
    </div>
    <div>
      {spot.avgStarRating}
    </div>
    </>
  )
}

export default ShowSpots
