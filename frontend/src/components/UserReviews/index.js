import React, {useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { deleteAReview, getUsersReviews } from "../../store/review";
import './UserReviews.css'




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
      <div className="eachCardReview" key={eachReview.id}>
        <img className='imagesNewNew' src={eachReview.Spot.previewImage} alt='prevImage'></img>
        <div className='city_state-review'>{eachReview.Spot.city},{eachReview.Spot.state}</div>
        <div className='average_rating'>{eachReview.Spot.avgRating}</div>
        <div className="review-on-edit">{eachReview.review}</div>
        <button className="reviewDeleteButton" onClick={() => deleteReview(eachReview.id)}>Delete Review</button>
      </div>
    ))}
  </div>
</div>
    </>
  )
}

export default UserReview
