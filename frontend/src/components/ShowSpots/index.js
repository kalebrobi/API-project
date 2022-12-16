import LoadAllSpots from "../LoadAllSpots";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getASpot } from "../../store/spots";
import { getReviews } from "../../store/review";
import CreateAReview from "../CreateAReview";


const ShowSpots = () => {
  const dispatch = useDispatch()
  const {spotId} = useParams()
  const spot = useSelector(state => {return state.spots.singleSpot})
  const reviews = useSelector(state => state.reviews.spot)
  const user = useSelector(state => state.session.user)

  const reviewsArr = Object.values(reviews)




  useEffect(() => {
    dispatch(getASpot(spotId));
    dispatch(getReviews(spotId));
  }, [spotId]);

  // const checker = reviewsArr.find((review) => review.userId === user.id)
  // if(checker) {
  //   console.log("TRUE")
  // } else console.log("FALSE")






  if(!spot.SpotImages) return null
  if(!spot) return null
  if(!reviews) return null

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
    <div>
      {reviewsArr.map(eachReview => (
        <ul key={eachReview.id}>
          <li>{eachReview.review}</li>
          <li>{eachReview.stars} Stars</li>
        </ul>
      ))}
    </div>
    <div>
      {user !== null && user.id !== spot.ownerId ? <CreateAReview /> : '' }
    </div>
    </>
  )
}

export default ShowSpots
