// import { csrfFetch } from './csrf';

//action constants
const LOAD_SPOTS = 'spots/loadSpots'
const LOAD_A_SPOT = 'spots/loadASpot'
// const ADD_SPOT = 'spots/addASpot'
// const DELETE_SPOT = 'spots/deleteSpot'


//action creators
const loadSpots = (list) => {
  return {
    type: LOAD_SPOTS,
    list
  }

}
const loadASpot = (spot) => {
  return {
    type: LOAD_A_SPOT,
    spot
  }
}


// const addASpot = (spot) => {
//   return {
//     type: ADD_SPOT,
//     payload: spot
//   }
// }

// export const deleteSpot = () => {
//   return {
//     type: DELETE_SPOT,
//   }
// }

//thunk function
export const getSpots = () => async (dispatch) => {
  const response = await fetch('/api/spots');

  if (response.ok) {
    const data = await response.json();
    dispatch(loadSpots(data.Spots))
  }
}


export const getASpot = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`)

  if(response.ok) {
    const data = await response.json()
    dispatch(loadASpot(data))
  }
}





const initialState = {allSpots: {}, singleSpot:{}};

const spotsReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_SPOTS:
      const loadState = {allSpots:{}, singleSpot:{}}
      // const loadState = {...state}
      action.list.forEach(spot => {
        loadState.allSpots[spot.id] = spot
      });
      return loadState;
    case LOAD_A_SPOT:
      // const loadSpot = {allSpots: {}, singleSpot:{}}
      const loadSpot = {...state}
      loadSpot.singleSpot = action.spot
      return loadSpot
    default:
       return state
  }
}

export default spotsReducer;
