import { csrfFetch } from './csrf';

const LOAD_REVIEWS = 'review/loadReviews'
const LOAD_USERS_REVIEWS = 'review/loadUserReviews'
const DELETE_REVIEW = 'review/deleteReview'
const CREATE_REVIEW = 'review/createReview'




//action creator
const loadReviews = (list) => {
  return {
    type: LOAD_REVIEWS,
    list
  }
}

const loadUserReviews = (list) => {
  return {
    type: LOAD_USERS_REVIEWS,
    list
  }
}

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId
})

const createReview = (newReview) => {
  return {
    type: CREATE_REVIEW,
    newReview
  }
}





// // thunks
export const createAReview = (newReview, spotId) => async dispatch => {
  const newReviewResponse = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newReview)
  })
  if(newReviewResponse.ok) {
    const data = await newReviewResponse.json()
    dispatch(createReview(data))
    return data
  }

}





export const getUsersReviews = () => async (dispatch) => {
  const response = await csrfFetch('/api/reviews/current')
  if(response.ok) {
    const reviews = await response.json()
    dispatch(loadUserReviews(reviews))
  }
  return response
}



export const getReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
  if(response.ok) {
    const reviews = await response.json()
    dispatch(loadReviews(reviews))
  }
  return response
}

export const deleteAReview = (reviewId) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  })
  if(response.ok) {
    const review = await response.json()
    dispatch(deleteReview)
  }

}




//reducer
const initialState = {spot: {}, user: {}}

const reviewReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_REVIEWS: {
      const newState = {spot: {}, user: {}}
      action.list.Reviews.forEach(review => {
        newState.spot[review.id] = review
      });
      return newState
    }
    case LOAD_USERS_REVIEWS: {
      const newState = {spot:{}, user:{}}
      action.list.Reviews.forEach(review => {
        newState.user[review.id] = review
      })
      return newState
    }
    case CREATE_REVIEW: {
      const newState = {...state}
      newState.spot[action.newReview.id] = action.newReview
      return newState
    }
    default:
      return state
  }
}

export default reviewReducer;
