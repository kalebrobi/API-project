import LoadAllSpots from "../LoadAllSpots";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getASpot } from "../../store/spots";
import { getReviews } from "../../store/review";
import CreateAReview from "../CreateAReview";
import './ShowSpots.css'


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
<div className="top-container">
    <h1>
    {spot.name}
    </h1>
    <div>
    <i class="fa-sharp fa-solid fa-star"></i>{spot.avgStarRating} ~ {spot.numReviews} reviews ~ {spot.city},{spot.state},{spot.country}
    </div>
      {spot.SpotImages.map(eachImage => (
        <div className="img-container" key={spot.id}><img src={eachImage.url}></img></div>
        ))}
</div>

<div className="bottom-container">
    <div className="spot-description">
      <h2>About this home!</h2>
      {spot.description}
    </div>
      <div className="review-section">
      <h3>Reviews</h3>
        <div className="reviews">

        {reviewsArr.map(eachReview => (
          <div key={eachReview.id}>
            {/* <div>
            <i class="fa-solid fa-circle-user"></i>
              {eachReview.User.firstName}
            </div> */}
            <i class="fa-regular fa-circle-user"></i>
            <div className="eachReview">{eachReview.review} {eachReview.stars} <i class="fa-sharp fa-solid fa-star"></i></div>
          </div>
        ))}
      </div>

  <div className="leave-a-review">
    {user !== null && user.id !== spot.ownerId ? <CreateAReview spot={spot} /> : '' }
  </div>
  </div>
</div>
</>
  )
}

export default ShowSpots
