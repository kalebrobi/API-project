import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createAReview } from "../../store/review";
import './CreateAReview.css'

function CreateAReview({spot}) {
  const history = useHistory()
  const dispatch = useDispatch()
  const [review, setReview] = useState('')
  const [stars, setStars] = useState('')
  const [errors, setErrors] = useState([])
  const spotId = spot.id


  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    const newReview = {
      review,
      stars
    }

   await dispatch(createAReview(newReview, spotId)).catch(
    async (res) => {
      const data = await res.json()
      // console.log("TEST", data.message)
      // if(data && data.errors) setErrors(data.errors)
      //if(data && data.message) setErrors([data.message])
      if(data && data.errors) {
        setErrors(data.errors)
      } else if(data && data.message) {
        setErrors([data.message])
      }

    }
  )

    setReview('')
    setStars('')
    (history.push(`/spots/${spotId}`))
    // (history.push(`/spots`))




}

  return(
    <>
   <form onSubmit={handleSubmit} id="review-form">
     <h3>Leave a review</h3>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      <div className="review-input-container">
        <textarea
         type='text'
         onChange={(e) => setReview(e.target.value)}
         value={review}
         id="review-text"
         name="review"
        />
      </div>
      <div>
        <input
         className="star-rating-input"
         type='text'
         onChange={(e) => setStars(e.target.value)}
         value={stars}
         placeholder="Star Rating"
        />
      </div>
        <button className="review-submit-button" type="submit">Submit review</button>
      </form>
    </>

  )


}

export default CreateAReview
















// import React, { useState, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { createAReview } from "../../store/review";
// import OpenModalButton from "../OpenModalButton";
// import CreateReviewForm from "./CreateReviewForm";





// function CreateAReview({spot}) {
//   // const dispatch = useDispatch()
//   // const [review, setReview] = useState('')
//   // const [stars, setStars] = useState('')
//   // const [errors, setErrors] = useState([])
//   // const spotId = spot.id
//   // const spot = useSelector(state.spots.singleSpot)


//   // const handleSubmit = async (e) => {
//   //   e.preventDefault()
//   //   setErrors([])
//   //   const newReview = {
//   //     review,
//   //     stars
//   //   }

//   //  await dispatch(createAReview(newReview, spotId)).catch(
//   //   async (res) => {
//   //     const data = await res.json()
//   //     if(data && data.errors) setErrors(data.errors)
//   //   }
//   // )



//   return(
//     <div>
//       <OpenModalButton
//         buttonText='Leave a Review'
//         modalComponent={<CreateReviewForm />}

//       />

//       {/* <form onSubmit={handleSubmit} id="review-form">
//         <input
//          type='text'
//          onChange={(e) => setReview(e.target.value)}
//          value={review}
//          id="review-text"
//          name="review"
//         />
//         <input
//          type='text'
//          onChange={(e) => setStars(e.target.value)}
//          value={stars}
//          placeholder="Stars"

//         />
//         <button type="submit">Submit review</button>
//       </form> */}
//     </div>
//   )
// }

// export default CreateAReview
