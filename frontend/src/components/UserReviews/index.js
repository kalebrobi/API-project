import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { deleteAReview, getReviews, getUsersReviews } from "../../store/review";




function UserReview() {
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user)
  const reviewObj = useSelector(state => state.reviews.user)

  const reviewsArr = Object.values(reviewObj)
  const userReviews = reviewsArr.filter(review => {return review.userId === sessionUser.id})

  

  // console.log("SPOT REVIEWED", reviewdSpotsArr)
  // console.log('Reviews',userReviews)

  const deleteReview = async (reviewId) => {
    await dispatch(deleteAReview(reviewId))
    history.push('/')
  }

  useEffect(() => {
    dispatch(getUsersReviews())
  },[])




  return (
    <>
    <div>
       <div className='containerDivNew'>
    {userReviews.map(eachReview => (
      <div key={eachReview.id}>
        <img className='imagesNewNew' src={eachReview.Spot.previewImage} alt='prevImage'></img>
        <div className='city_state'>{eachReview.Spot.city},{eachReview.Spot.state}</div>
        <div className='average_rating'>{eachReview.Spot.avgRating}</div>
        <div>{eachReview.review}</div>
        <button onClick={() => deleteReview(eachReview.id)}>Delete Review</button>
      </div>
    ))}
  </div>

    </div>
    </>
  )
}

export default UserReview
