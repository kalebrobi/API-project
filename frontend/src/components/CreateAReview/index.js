import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";



function CreateAReview() {
  const dispatch = useDispatch()

  const [review, setReview] = useSelector('')
  const [stars, setStars] = useSelector('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    const newReview = {
      review,
      stars
    }


  const createdReview = await dispatch(createAReview(newReview)).catch(
    async (res) => {
      const data = await res.json()
      if(data && data.errors) setErrors(data.errors)
    }
  )
}

  return(
    <div>
      <h1>Leave a Review</h1>
      <form onSubmit={handleSubmit} id="review-form">
        <textarea id="review-text" name="review"></textarea>

        <button type="submit">Submit review</button>
      </form>
    </div>
  )
}

export default CreateAReview
