import { csrfFetch } from './csrf';

//action constants
const LOAD_REVIEWS = 'reviews/loadReviews'


//action creators
const loadReviews = (list) => {
  return {
    type: LOAD_REVIEWS,
    list
  }
}


//thunk functions
export const getReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

  if(response.ok) {
    const data = await response.json()
    dispatch(loadReviews(data.Reviews))
  }
}



//Reducer

const initialState = {spot: {}, user: {}};

const reviewReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_REVIEWS:
      const newState = {spot: {}, user: {}}
      action.list.forEach(review => {
        newState.spot[review.id] = review
      });
      return newState;
    default:
      return state
  }
}

export default reviewReducer;
